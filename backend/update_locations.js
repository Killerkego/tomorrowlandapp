require('dotenv').config();
const mongoose = require('mongoose');

// Temporary script to update existing users with a location
const getRandomTmlLocation = () => {
  const minLat = 51.0870;
  const maxLat = 51.0960;
  const minLng = 4.3800;
  const maxLng = 4.3890;
  return {
    latitude: minLat + Math.random() * (maxLat - minLat),
    longitude: minLng + Math.random() * (maxLng - minLng)
  };
};

const userSchema = new mongoose.Schema({
  location: { 
    latitude: { type: Number },
    longitude: { type: Number }
  }
}, { strict: false });

const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({ location: { $exists: false } });
    console.log(`Found ${users.length} users without location. Updating...`);
    
    for (const user of users) {
      user.location = getRandomTmlLocation();
      await user.save();
    }
    
    console.log('Update complete!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
