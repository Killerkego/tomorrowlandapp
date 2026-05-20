const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('Could not connect to MongoDB');
    console.error('Error details:', err);
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbState: mongoose.connection.readyState });
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  profilePicture: { type: String, default: null },
  favorites: [{ name: String }],
  schedule: [{ 
    artistName: String, 
    date: String, 
    start: String, 
    end: String, 
    stage: String 
  }]
});

const User = mongoose.model('User', userSchema);

// Sync Schedule Endpoint
app.post('/api/user/schedule', async (req, res) => {
  try {
    const { userId, schedule } = req.body;
    const user = await User.findByIdAndUpdate(userId, { schedule }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Schedule synced', schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Sync Favorites Endpoint
app.post('/api/user/favorites', async (req, res) => {
  try {
    const { userId, favorites } = req.body;
    const user = await User.findByIdAndUpdate(userId, { favorites }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Favorites synced', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get User Profile Endpoint
app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        favorites: user.favorites,
        schedule: user.schedule
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Profile Update Endpoint
app.put('/api/user/update', async (req, res) => {
  try {
    const { userId, username, email, fullName, phoneNumber } = req.body;
    
    const updateData = { username, email, fullName, phoneNumber };
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        favorites: user.favorites,
        schedule: user.schedule
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Change Password Endpoint
app.put('/api/user/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Profile Picture Upload Endpoint
app.post('/api/upload-profile-picture', upload.single('image'), async (req, res) => {
  console.log('Received upload request for userId:', req.body.userId);
  try {
    const { userId } = req.body;
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(userId, { profilePicture: imageUrl }, { new: true });

    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Upload successful:', imageUrl);
    res.json({ 
      message: 'Profile picture updated', 
      profilePicture: imageUrl, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        favorites: user.favorites,
        schedule: user.schedule
      } 
    });
  } catch (error) {
    console.error('Upload error details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        favorites: user.favorites,
        schedule: user.schedule
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
