import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Image as RNImage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, WHITE, GOLD, MUTED, ACCENT, BG } from './lineup.styles';
import { API_BASE_URL, SERVER_URL } from '@/services/apiConfig';
import { useAuth } from '@/context/AuthContext';
import { useTrack } from '@/context/TrackContext';

type SoloUser = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
  favorites: any[];
  schedule: any[];
  location?: { latitude: number; longitude: number };
};

export default function SoloScreen() {
  const insets = useSafeAreaInsets();
  const { user, isLoggedIn } = useAuth();
  const { trackedUser, setTrackedUser } = useTrack();
  const [soloUsers, setSoloUsers] = useState<SoloUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSoloUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/solo`);
      if (response.ok) {
        const data = await response.json();
        // Filter out the current user from the list
        const otherSoloUsers = data.users.filter((u: SoloUser) => u._id !== user?.id && u._id !== user?._id);
        setSoloUsers(otherSoloUsers);
      }
    } catch (error) {
      console.error('Failed to fetch solo users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isLoggedIn) {
        fetchSoloUsers();
      }
    }, [user, isLoggedIn])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO BANNER */}
        <View style={[styles.heroContainer, { paddingTop: insets.top }]}>
          <Image
            source={require('../../assets/images/solocrew.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)', '#000000']}
            locations={[0, 0.3, 0.5, 0.7, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* HEADER OVERLAY */}
          <View style={[styles.overlayHeader, { top: insets.top }]}>
            <TouchableOpacity style={styles.headerSide} onPress={() => router.push('/contact')}>
              <Ionicons name="information-circle-outline" size={36} color={WHITE} />
            </TouchableOpacity>
            <View style={styles.headerCenter} pointerEvents="none">
              <RNImage
                source={require('../../assets/images/tmwl_logo.png')}
                style={styles.centerLogo}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={[styles.headerSide, styles.headerSideRight]}
              onPress={() => router.push('/user')}
            >
              <Ionicons name="person-circle-outline" size={36} color={WHITE} />
            </TouchableOpacity>
          </View>

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Community</Text>
            <Text style={styles.heroTitle}>Solo{'\n'}Crew</Text>
          </View>

          {/* Spacer to match Lineup layout */}
          <View style={[styles.selectorContainer, { height: 120 }]} />
        </View>

        {/* CONTENT */}
        <View style={styles.body}>
          {!isLoggedIn ? (
            <View style={{ alignItems: 'center', padding: 24, marginTop: 40 }}>
              <Ionicons name="people-circle-outline" size={80} color={ACCENT} style={{ marginBottom: 20 }} />
              <Text style={{ color: WHITE, fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 12 }}>
                Join the Solo Crew
              </Text>
              <Text style={{ color: MUTED, fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 32 }}>
                Connect with other People of Tomorrow who are attending the festival solo. Sign in to unlock this feature!
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(200, 65, 122, 0.15)',
                  paddingVertical: 16,
                  paddingHorizontal: 32,
                  borderRadius: 12,
                  width: '100%',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: ACCENT,
                }}
                onPress={() => router.push('/login')}
              >
                <Text style={{ color: WHITE, fontSize: 16, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>Sign In Now</Text>
              </TouchableOpacity>
            </View>
          ) : isLoading ? (
            <ActivityIndicator color={GOLD} style={{ marginTop: 32 }} />
          ) : soloUsers.length > 0 ? (
            soloUsers.map((soloUser, index) => {
              const profilePicUrl = soloUser.profilePicture 
                ? { uri: `${SERVER_URL}${soloUser.profilePicture}` } 
                : null;

              return (
                <View key={`${soloUser._id}-${index}`} style={[styles.artistCard, { padding: 12 }]}>
                  {profilePicUrl ? (
                    <Image 
                      source={profilePicUrl}
                      style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16, backgroundColor: '#1A1A1A' }}
                      contentFit="cover"
                    />
                  ) : (
                    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#1A1A1A', marginRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="person" size={32} color={GOLD} />
                    </View>
                  )}
                  
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: WHITE, fontSize: 16, fontWeight: 'bold' }}>
                      {soloUser.fullName || soloUser.username}
                    </Text>
                    {!!soloUser.fullName && (
                      <Text style={{ color: MUTED, fontSize: 13, marginTop: 2 }}>
                        @{soloUser.username}
                      </Text>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="calendar-outline" size={12} color={GOLD} />
                        <Text style={{ color: GOLD, fontSize: 12 }}>{soloUser.schedule?.length || 0} Sets</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="heart-outline" size={12} color={ACCENT} />
                        <Text style={{ color: ACCENT, fontSize: 12 }}>{soloUser.favorites?.length || 0} Favs</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={{ padding: 8 }}
                    onPress={() => {
                      const isCurrentlyTracked = trackedUser?._id === soloUser._id;
                      if (isCurrentlyTracked) {
                        setTrackedUser(null);
                      } else {
                        // Ha nincs API-ból kapott lokáció, generálunk egyet Tomorrowland környékén a demóhoz
                        const userToTrack = { ...soloUser };
                        if (!userToTrack.location) {
                          userToTrack.location = {
                            latitude: 51.0910 + (Math.random() * 0.005 - 0.0025),
                            longitude: 4.3840 + (Math.random() * 0.005 - 0.0025)
                          };
                        }
                        setTrackedUser(userToTrack);
                        router.push({ pathname: '/map', params: { trackUser: 'true' } });
                      }
                    }}
                  >
                    <Ionicons 
                      name={trackedUser?._id === soloUser._id ? "location" : "location-outline"} 
                      size={24} 
                      color={trackedUser?._id === soloUser._id ? GOLD : WHITE} 
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color={MUTED} style={{ marginBottom: 16 }} />
              <Text style={styles.emptyText}>You are the first solo traveler here!</Text>
              <Text style={[styles.emptyText, { fontSize: 13, marginTop: 8 }]}>Invite friends or check back later.</Text>
            </View>
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}
