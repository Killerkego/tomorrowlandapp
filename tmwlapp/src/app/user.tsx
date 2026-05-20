import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './user.styles';
import { GOLD, MUTED, ACCENT, BG } from './login.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { API_BASE_URL, SERVER_URL } from '@/services/apiConfig';

// Mocked user storage (in a real app, use Context or State Management)
export default function UserScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Try to get user data from params (passed from login) or fallback
  const [userData, setUserData] = useState({
    id: (params.id as string) || '',
    username: (params.username as string) || 'Tomorrowland Citizen',
    email: (params.email as string) || 'citizen@tomorrowland.com',
    profilePicture: (params.profilePicture as string) || null,
    memberSince: '2026.05.20',
  });

  useEffect(() => {
    // Ha nincsenek paraméterek (pl. frissítés után), próbáljuk meg betölteni tárolóból
    if (!params.username || !params.email) {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      console.log('User page: Loading user data from storage...');
      const savedUser = await AsyncStorage.getItem('user');
      console.log('User page: Raw data:', savedUser);

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUserData({
          ...userData,
          id: parsedUser.id || parsedUser._id || '',
          username: parsedUser.username || 'Tomorrowland Citizen',
          email: parsedUser.email || 'citizen@tomorrowland.com',
          profilePicture: parsedUser.profilePicture || null
        });
      } else {
        console.warn('User page: No saved user found in storage');
      }
    } catch (e) {
      console.error('User page: Error loading user data', e);
    }
  };

  const pickImage = async () => {
    // Permission check
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sajnos szükségünk van a galéria hozzáférésre a kép feltöltéséhez!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append('image', {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
      formData.append('userId', userData.id);

      const response = await fetch(`${API_BASE_URL}/upload-profile-picture`, {
        method: 'POST',
        body: formData,
        // NE állítsuk be kézzel a Content-Type-ot FormData esetén!
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({ ...userData, profilePicture: data.profilePicture });
        // Update stored user
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          parsedUser.profilePicture = data.profilePicture;
          await AsyncStorage.setItem('user', JSON.stringify(parsedUser));
        }
      } else {
        console.error('Server response error:', data);
        alert(data.message || 'Hiba történt a feltöltés során');
      }
    } catch (error: any) {
      console.error('Upload error details:', error);
      alert(`Hálózati hiba: ${error.message || 'Ismeretlen hiba'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Töröljük a mentett adatokat
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/login');
      }, 1000);
    } catch (e) {
      setIsLoading(false);
      console.error('Failed to sign out', e);
    }
  };

  const profilePicUrl = userData.profilePicture 
    ? { uri: `${SERVER_URL}${userData.profilePicture}` } 
    : null;

  return (
    <View style={styles.safeArea}>
      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/User.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', '#000000']}
            style={styles.gradientOverlay}
          />

          <View style={{ position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }}>
            <AppHeader />
          </View>

          <View style={styles.heroContent}>
            <View style={styles.avatarContainer}>
              {isUploading ? (
                <ActivityIndicator color={GOLD} />
              ) : profilePicUrl ? (
                <Image source={profilePicUrl} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={60} color={GOLD} />
              )}
              
              <TouchableOpacity 
                style={styles.cameraButton} 
                onPress={pickImage}
                disabled={isUploading}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={18} color={BG} />
              </TouchableOpacity>
            </View>
            <Text style={styles.heroTitle}>{userData.username}</Text>
          </View>
        </View>

        {/* PROFILE INFO */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="mail-outline" size={20} color={GOLD} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="calendar-outline" size={20} color={GOLD} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Member Since</Text>
                <Text style={styles.infoValue}>{userData.memberSince}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="shield-checkmark-outline" size={20} color={GOLD} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Account Status</Text>
                <Text style={styles.infoValue}>Verified Citizen</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={22} color={MUTED} />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.signOutButton]}
            onPress={handleSignOut}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={ACCENT} size="small" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={22} color={ACCENT} />
                <Text style={[styles.actionButtonText, styles.signOutText]}>Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>

      <AppBottomNav />
    </View>
  );
}
