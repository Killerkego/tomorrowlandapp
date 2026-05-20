import React, { useState } from 'react';
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
  TouchableWithoutFeedback,
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

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  
  // States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<'username' | 'email' | 'password' | 'confirm' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    Keyboard.dismiss();
    setError('');
    
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 másodperc timeout

    fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      signal: controller.signal
    })
      .then(async (response) => {
        clearTimeout(timeoutId);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
        return data;
      })
      .then(() => {
        setIsLoading(false);
        router.replace('/login');
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

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.scroll} 
          contentContainerStyle={[styles.scrollContent, { paddingTop: 0 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={false}
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
              <Text style={styles.heroBreadcrumb}>Create Account</Text>
              <Text style={styles.heroTitle}>Join the{"\n"}Magic</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              {/* Username Input */}
              <View style={[styles.inputContainer, focusedField === 'username' && styles.inputContainerFocused]}>
                <Ionicons name="person-outline" size={20} color={focusedField === 'username' ? GOLD : MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={MUTED}
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    setError('');
                  }}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  selectionColor={GOLD}
                  cursorColor={GOLD}
                  underlineColorAndroid="transparent"
                />
              </View>

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

              {/* Confirm Password Input */}
              <View style={[styles.inputContainer, focusedField === 'confirm' && styles.inputContainerFocused]}>
                <Ionicons name="lock-check-outline" size={20} color={focusedField === 'confirm' ? GOLD : MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={MUTED}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setError('');
                  }}
                  secureTextEntry={!isPasswordVisible}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  selectionColor={GOLD}
                  cursorColor={GOLD}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color={WHITE} size="small" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ marginTop: 24, alignItems: 'center' }}
              onPress={() => router.push('/login')}
            >
              <Text style={{ color: MUTED, fontSize: 14 }}>
                Already have an account? <Text style={{ color: GOLD, fontWeight: '700' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <AppBottomNav />
    </View>
  );
}
