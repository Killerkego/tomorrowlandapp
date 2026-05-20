import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './user.styles';
import { GOLD, MUTED, ACCENT, BG, WHITE } from './login.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { API_BASE_URL, SERVER_URL } from '@/services/apiConfig';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function UserScreen() {
  const insets = useSafeAreaInsets();
  const { user, signIn, signOut, isLoggedIn } = useAuth();
  const { favorites } = useFavorites();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  // Edit form states
  const [editData, setEditData] = useState({
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    password: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    if (user) {
      setEditData({
        username: user.username || '',
        email: user.email || '',
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        password: '',
      });
    }
  }, [user, isEditModalVisible]);

  const pickImage = async () => {
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

    if (!result.canceled && user?.id) {
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
      formData.append('userId', user?.id || user?._id);

      const response = await fetch(`${API_BASE_URL}/upload-profile-picture`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        await signIn(data.user);
      } else {
        alert(data.message || 'Hiba történt a feltöltés során');
      }
    } catch (error: any) {
      alert(`Hálózati hiba: ${error.message || 'Ismeretlen hiba'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setEditError('');
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id || user?._id,
          ...editData,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await signIn(data.user);
        setIsEditModalVisible(false);
      } else {
        setEditError(data.message || 'Failed to update profile');
      }
    } catch (error: any) {
      setEditError('Connection error. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/login');
    }, 500);
  };

  const profilePicUrl = user?.profilePicture 
    ? { uri: `${SERVER_URL}${user.profilePicture}` } 
    : null;

  if (!user) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={GOLD} size="large" />
      </View>
    );
  }

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
            <Text style={styles.heroTitle}>{user.fullName || user.username}</Text>
            {user.fullName && <Text style={{ color: MUTED, fontSize: 14 }}>@{user.username}</Text>}
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
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="call-outline" size={20} color={GOLD} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{user.phoneNumber || 'Not set'}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="heart-outline" size={20} color={ACCENT} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Favorite Artists</Text>
                <Text style={styles.infoValue}>{favorites.length} Artists Saved</Text>
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
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsEditModalVisible(true)}
          >
            <Ionicons name="create-outline" size={22} color={MUTED} />
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

      {/* EDIT PROFILE MODAL */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)' }}
        >
          <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
            <View style={{ backgroundColor: '#1A1A1A', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: GOLD }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Text style={{ color: WHITE, fontSize: 24, fontWeight: '700' }}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                  <Ionicons name="close" size={28} color={MUTED} />
                </TouchableOpacity>
              </View>

              <View style={{ gap: 16 }}>
                <View>
                  <Text style={{ color: GOLD, fontSize: 12, marginBottom: 8, fontWeight: '600' }}>FULL NAME</Text>
                  <TextInput
                    style={{ backgroundColor: '#000', color: WHITE, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    value={editData.fullName}
                    onChangeText={(text) => setEditData({...editData, fullName: text})}
                    placeholder="Enter full name"
                    placeholderTextColor={MUTED}
                  />
                </View>

                <View>
                  <Text style={{ color: GOLD, fontSize: 12, marginBottom: 8, fontWeight: '600' }}>USERNAME</Text>
                  <TextInput
                    style={{ backgroundColor: '#000', color: WHITE, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    value={editData.username}
                    onChangeText={(text) => setEditData({...editData, username: text})}
                  />
                </View>

                <View>
                  <Text style={{ color: GOLD, fontSize: 12, marginBottom: 8, fontWeight: '600' }}>EMAIL ADDRESS</Text>
                  <TextInput
                    style={{ backgroundColor: '#000', color: WHITE, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    value={editData.email}
                    onChangeText={(text) => setEditData({...editData, email: text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View>
                  <Text style={{ color: GOLD, fontSize: 12, marginBottom: 8, fontWeight: '600' }}>PHONE NUMBER</Text>
                  <TextInput
                    style={{ backgroundColor: '#000', color: WHITE, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    value={editData.phoneNumber}
                    onChangeText={(text) => setEditData({...editData, phoneNumber: text})}
                    keyboardType="phone-pad"
                    placeholder="e.g. +36 30 123 4567"
                    placeholderTextColor={MUTED}
                  />
                </View>

                <View>
                  <Text style={{ color: GOLD, fontSize: 12, marginBottom: 8, fontWeight: '600' }}>NEW PASSWORD (OPTIONAL)</Text>
                  <TextInput
                    style={{ backgroundColor: '#000', color: WHITE, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    value={editData.password}
                    onChangeText={(text) => setEditData({...editData, password: text})}
                    secureTextEntry
                    placeholder="Leave blank to keep current"
                    placeholderTextColor={MUTED}
                  />
                </View>
              </View>

              {editError ? <Text style={{ color: ACCENT, marginTop: 16, textAlign: 'center' }}>{editError}</Text> : null}

              <TouchableOpacity 
                style={{ 
                  backgroundColor: 'rgba(200, 65, 122, 0.15)', 
                  marginTop: 32, 
                  padding: 16, 
                  borderRadius: 12, 
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: ACCENT,
                }}
                onPress={handleUpdateProfile}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color={ACCENT} />
                ) : (
                  <Text style={{ color: ACCENT, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <AppBottomNav />
    </View>
  );
}
