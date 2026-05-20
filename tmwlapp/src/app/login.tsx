import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, WHITE, GOLD, MUTED, ACCENT } from './login.styles';
import { API_BASE_URL } from '@/services/apiConfig';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { user, signIn, signOut } = useAuth();
  
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    Keyboard.dismiss();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      signal: controller.signal
    })
      .then(async (response) => {
        clearTimeout(timeoutId);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        return data;
      })
      .then(async (data) => {
        setIsLoading(false);
        await signIn(data.user, data.token);

        router.replace({
          pathname: '/user',
          params: { 
            id: data.user.id || data.user._id,
            username: data.user.username,
            email: data.user.email,
            profilePicture: data.user.profilePicture || ''
          }
        });
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.name === 'AbortError') {
          setError('Server request timed out. Make sure the backend is running.');
        } else {
          setError(error.message || 'Connection error');
        }
      });
  };

  const handleSignOut = async () => {
    await signOut();
    setEmail('');
    setPassword('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      {/* iOS-en szükség van rá, Androidon a rendszer natívan kezeli (adjustResize) */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.scroll} 
          contentContainerStyle={[styles.scrollContent, { paddingTop: 0 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={false} // Segít a fókusz megtartásában
        >
          {/* HERO SECTION */}
          <View style={styles.heroContainer}>
            <Image
              source={require('../../assets/images/User.jpg')}
              style={styles.heroBgImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)', '#000000']}
              style={styles.gradientOverlay}
            />

            <View style={{ position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }}>
              <AppHeader />
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroBreadcrumb}>
                {user ? 'Active Account' : 'Sign in to your'}
              </Text>
              <Text style={styles.heroTitle}>
                {user ? 'Citizen\nAccount' : 'Tomorrowland\nAccount'}
              </Text>
            </View>
          </View>

          {user ? (
            /* Success State */
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={80} color={GOLD} />
              <Text style={styles.successText}>
                You are signed in as:{"\n"}
                <Text style={{ fontWeight: 'bold', color: GOLD }}>{user.email}</Text>
              </Text>
              
              <TouchableOpacity 
                style={styles.successButton}
                onPress={handleSignOut}
                activeOpacity={0.7}
              >
                <Text style={styles.successButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Login Form State */
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                {/* Email Input */}
                <View style={[styles.inputContainer, focusedField === 'email' && styles.inputContainerFocused]}>
                  <Ionicons name="mail-outline" size={20} color={focusedField === 'email' ? GOLD : MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor={MUTED}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setError('');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    selectionColor={GOLD}
                    cursorColor={GOLD}
                    underlineColorAndroid="transparent"
                  />
                </View>

                {/* Password Input */}
                <View style={[styles.inputContainer, focusedField === 'password' && styles.inputContainerFocused]}>
                  <Ionicons name="lock-closed-outline" size={20} color={focusedField === 'password' ? GOLD : MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={MUTED}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setError('');
                    }}
                    secureTextEntry={!isPasswordVisible}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    selectionColor={GOLD}
                    cursorColor={GOLD}
                    underlineColorAndroid="transparent"
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon} 
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color={MUTED} />
                  </TouchableOpacity>
                </View>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSignIn}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={WHITE} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Sign in</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={{ marginTop: 24, alignItems: 'center' }}
                onPress={() => router.push('/register')}
              >
                <Text style={{ color: MUTED, fontSize: 14 }}>
                  Don't have an account? <Text style={{ color: GOLD, fontWeight: '700' }}>Register Now</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Nagyobb üres hely alul, hogy a billentyűzet ne takarja ki a gombot */}
          <View style={{ height: 200 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <AppBottomNav />
    </View>
  );
}
