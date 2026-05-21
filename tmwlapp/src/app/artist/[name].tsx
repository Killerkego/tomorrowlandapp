import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Linking,
  Image as RNImage,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { Audio } from 'expo-av';

import lineupData from '../../../assets/data/tomorrowlan_data_2026.json';
import artistImages from '../../../assets/data/artist_images.json';
import { styles, GOLD, MUTED, ACCENT, WHITE, BG, BORDER } from '../lineup.styles';
import { AppBottomNav } from '@/components/AppBottomNav';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';

export default function ArtistDetailScreen() {
  const insets = useSafeAreaInsets();
  const { name } = useLocalSearchParams<{ name: string }>();
  const decodedName = name ? decodeURIComponent(name) : 'Unknown Artist';

  const { toggleFavorite, isFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  const isFav = isFavorite(decodedName);

  const handleFavoritePress = () => {
    if (!isLoggedIn) {
      setShowLoginNotice(true);
    } else {
      toggleFavorite({ name: decodedName });
    }
  };

  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Deezer track preview state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [trackTitle, setTrackTitle] = useState<string>('Popular Track');
  const [isFetchingPreview, setIsFetchingPreview] = useState(true);

  const FALLBACK_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  // Weben Spotify linket nyitunk (CORS miatt nem játszható le audio)
  // Natívon iTunes API-val töltjük le az előadó saját számát
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Weben nincs audio fetch — a gomb Spotify-t nyit
      setIsFetchingPreview(false);
      return;
    }

    let cancelled = false;
    async function fetchiTunesPreview() {
      setIsFetchingPreview(true);
      try {
        const query = encodeURIComponent(decodedName);
        const res = await fetch(
          `https://itunes.apple.com/search?term=${query}&entity=song&limit=10&media=music`
        );
        const data = await res.json();
        if (!cancelled && data?.results?.length > 0) {
          const track =
            data.results.find(
              (t: any) =>
                t.previewUrl &&
                t.artistName?.toLowerCase().includes(decodedName.toLowerCase().split(' ')[0])
            ) ||
            data.results.find((t: any) => t.previewUrl);
          if (track?.previewUrl) {
            setPreviewUrl(track.previewUrl);
            setTrackTitle(track.trackName || 'Popular Track');
          } else {
            setPreviewUrl(FALLBACK_URL);
          }
        } else if (!cancelled) {
          setPreviewUrl(FALLBACK_URL);
        }
      } catch {
        if (!cancelled) setPreviewUrl(FALLBACK_URL);
      } finally {
        if (!cancelled) setIsFetchingPreview(false);
      }
    }
    fetchiTunesPreview();
    return () => { cancelled = true; };
  }, [decodedName]);

  // Parse Gigs
  const gigs = useMemo(() => {
    const foundGigs: Array<{ date: string; dayLabel: string; stage: string; start: string; end: string }> = [];
    Object.entries(lineupData.lineup).forEach(([dateStr, dayData]: [string, any]) => {
      dayData.stages.forEach((stage: any) => {
        stage.artists.forEach((artist: any) => {
          if (artist.name === decodedName) {
            foundGigs.push({
              date: dateStr,
              dayLabel: dayData.label,
              stage: stage.name,
              start: artist.start,
              end: artist.end,
            });
          }
        });
      });
    });
    return foundGigs.sort((a, b) => a.date.localeCompare(b.date));
  }, [decodedName]);

  const artistImgUrl = (artistImages as Record<string, string>)[decodedName];
  const imageSource = artistImgUrl ? { uri: artistImgUrl } : require('../../../assets/images/lineup.jpg');

  // Generate dynamic bio
  const bio = `Experience the incredible energy of ${decodedName}. Known for their electrifying performances, unique soundscapes, and ability to move crowds, ${decodedName} is set to take over the stage at Tomorrowland 2026. Get ready for an unforgettable musical journey filled with magical moments.`;

  // Spotify keresési URL web-re
  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(decodedName)}`;

  // Audio Playback (csak natív)
  async function handlePlayPause() {
    // Weben Spotify-t nyitunk
    if (Platform.OS === 'web') {
      Linking.openURL(spotifyUrl);
      return;
    }

    const url = previewUrl || FALLBACK_URL;
    if (sound) {
      try {
        const status = await sound.getStatusAsync();
        if (!status.isLoaded) {
          // Ha a sound objektum nem töltött, reset
          await sound.unloadAsync();
          setSound(undefined);
          setIsPlaying(false);
          return;
        }
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } catch {
        // Ha hiba van, reseteljük a sound state-et
        setSound(undefined);
        setIsPlaying(false);
      }
    } else {
      setIsLoadingAudio(true);
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: true }
        );
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        setSound(newSound);
        setIsPlaying(true);
      } catch {
        alert('Failed to load audio snippet.');
      } finally {
        setIsLoadingAudio(false);
      }
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return sound
      ? () => { sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  // Reset sound when navigating away and back
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, []);

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
            source={imageSource}
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
            <TouchableOpacity style={styles.headerSide} onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/lineup');
              }
            }}>
              <Ionicons name="chevron-back" size={28} color={WHITE} />
            </TouchableOpacity>
            <View style={styles.headerCenter} pointerEvents="none">
              <RNImage
                source={require('../../../assets/images/tmwl_logo.png')}
                style={styles.centerLogo}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={[styles.headerSide, styles.headerSideRight]}
              onPress={() => router.push('/user')}
            >
              <Ionicons
                name="person-circle-outline"
                size={36}
                color={WHITE}
              />
            </TouchableOpacity>
          </View>

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Tomorrowland 2026</Text>
            <Text style={styles.heroTitle}>{decodedName}</Text>
            <TouchableOpacity 
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: isFav ? 'rgba(200, 65, 122, 0.15)' : 'rgba(0,0,0,0.5)',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 24,
                borderWidth: 1.2,
                borderColor: isFav ? ACCENT : 'rgba(255,255,255,0.3)',
                marginTop: 12,
                gap: 8,
              }}
              onPress={handleFavoritePress}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isFav ? "heart" : "heart-outline"} 
                size={18} 
                color={isFav ? ACCENT : WHITE} 
              />
              <Text style={{ color: WHITE, fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>
                {isFav ? 'FAVORITE' : 'ADD TO FAVORITES'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <View style={{ padding: 24, gap: 32 }}>
          
          {/* AUDIO PLAYER */}
          <View style={{ backgroundColor: '#1A1A1A', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: BORDER, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <Ionicons name="musical-notes" size={14} color={ACCENT} />
                <Text style={{ color: ACCENT, fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {Platform.OS === 'web'
                    ? 'Spotify'
                    : isFetchingPreview ? 'Keresés...' : previewUrl === FALLBACK_URL ? 'Demo' : 'iTunes előnézet'}
                </Text>
              </View>
              <Text style={{ color: WHITE, fontSize: 15, fontWeight: '700' }} numberOfLines={1}>
                {Platform.OS === 'web' ? 'Hallgasd Spotify-on' : isFetchingPreview ? 'Szám betöltése...' : trackTitle}
              </Text>
              <Text style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{decodedName}</Text>
            </View>
            <TouchableOpacity
              style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: Platform.OS === 'web' ? 'rgba(30,215,96,0.15)' : 'rgba(200, 65, 122, 0.15)', borderWidth: 1.5, borderColor: Platform.OS === 'web' ? '#1ED760' : ACCENT, justifyContent: 'center', alignItems: 'center' }}
              onPress={handlePlayPause}
              disabled={isLoadingAudio || isFetchingPreview}
            >
              {isLoadingAudio || isFetchingPreview ? (
                <ActivityIndicator color={Platform.OS === 'web' ? '#1ED760' : ACCENT} />
              ) : (
                <Ionicons
                  name={Platform.OS === 'web' ? 'open-outline' : isPlaying ? 'pause' : 'play'}
                  size={26}
                  color={Platform.OS === 'web' ? '#1ED760' : ACCENT}
                  style={{ marginLeft: (!isPlaying && Platform.OS !== 'web') ? 3 : 0 }}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* BIO */}
          <View>
            <Text style={{ color: WHITE, fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Biography</Text>
            <Text style={{ color: MUTED, fontSize: 15, lineHeight: 24 }}>{bio}</Text>
          </View>

          {/* PERFORMANCES */}
          <View>
            <Text style={{ color: WHITE, fontSize: 20, fontWeight: '700', marginBottom: 16 }}>Performances</Text>
            {gigs.length > 0 ? (
              <View style={{ gap: 12 }}>
                {gigs.map((gig, index) => (
                  <View key={index} style={{ backgroundColor: '#1A1A1A', padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                      <Ionicons name="calendar" size={24} color={GOLD} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: WHITE, fontSize: 16, fontWeight: '600' }}>{gig.dayLabel}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6, flexWrap: 'wrap' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Ionicons name="time-outline" size={14} color={MUTED} style={{ marginTop: 1 }} />
                          <Text style={{ color: MUTED, fontSize: 13 }}>{gig.start} - {gig.end}</Text>
                        </View>
                        <Text style={{ color: MUTED, fontSize: 13 }}>•</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 1 }}>
                          <Ionicons name="location-outline" size={14} color={MUTED} style={{ marginTop: 1 }} />
                          <Text style={{ color: MUTED, fontSize: 13, flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">{gig.stage}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ color: MUTED }}>No performances found.</Text>
            )}
          </View>

        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* LOGIN NOTICE MODAL */}
      <Modal
        visible={showLoginNotice}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLoginNotice(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#1A1A1A', borderRadius: 24, padding: 32, width: '100%', maxWidth: 400, borderWidth: 1, borderColor: GOLD, alignItems: 'center' }}>
            <TouchableOpacity 
              style={{ position: 'absolute', top: 16, right: 16, padding: 4 }}
              onPress={() => setShowLoginNotice(false)}
            >
              <Ionicons name="close" size={28} color={MUTED} />
            </TouchableOpacity>
            
            <Ionicons name="heart-half-outline" size={64} color={ACCENT} style={{ marginBottom: 20 }} />
            
            <Text style={{ color: WHITE, fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 12 }}>
              Save Your Magic
            </Text>
            
            <Text style={{ color: MUTED, fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 32 }}>
              Please sign in to your Tomorrowland Account to save your favorite artists.
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
                shadowColor: ACCENT,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 10
              }}
              onPress={() => {
                setShowLoginNotice(false);
                router.push('/login');
              }}
            >
              <Text style={{ color: WHITE, fontSize: 16, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>Sign In Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{ marginTop: 20, padding: 8 }}
              onPress={() => setShowLoginNotice(false)}
            >
              <Text style={{ color: MUTED, fontSize: 14, fontWeight: '500' }}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ALSÓ MENÜSÁV */}
      <AppBottomNav />
    </SafeAreaView>
  );
}
