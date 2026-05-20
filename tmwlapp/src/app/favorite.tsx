import React, { useMemo } from 'react';
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, WHITE, GOLD, MUTED, ACCENT } from './lineup.styles';
import artistImages from '../../assets/data/artist_images.json';
import lineupData from '../../assets/data/tomorrowlan_data_2026.json';
import { useFavorites } from '@/context/FavoritesContext';

export default function FavoriteScreen() {
  const insets = useSafeAreaInsets();
  const { favorites, toggleFavorite } = useFavorites();

  // Helper function to get all dates for an artist in a compact way
  const getArtistDates = (artistName: string) => {
    const w1Dates: number[] = [];
    const w2Dates: number[] = [];
    
    Object.entries(lineupData.lineup).forEach(([date, dayData]: [string, any]) => {
      const isPerforming = dayData.stages.some((stage: any) => 
        stage.artists.some((artist: any) => artist.name === artistName)
      );
      
      if (isPerforming) {
        const day = parseInt(dayData.label.split(' ')[1]);
        if (day <= 19) w1Dates.push(day);
        else w2Dates.push(day);
      }
    });

    const parts = [];
    if (w1Dates.length > 0) {
      if (w1Dates.length === 3) parts.push("W1 (All Days)");
      else parts.push(`W1: ${w1Dates.join(', ')}`);
    }
    if (w2Dates.length > 0) {
      if (w2Dates.length === 3) parts.push("W2 (All Days)");
      else parts.push(`W2: ${w2Dates.join(', ')}`);
    }

    return parts.join(' | ');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroContainer, { paddingTop: insets.top }]}>
          <Image
            source={require('../../assets/images/favorites.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)', '#000000']}
            locations={[0, 0.3, 0.5, 0.7, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />
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
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Personal</Text>
            <Text style={styles.heroTitle}>Your{'\n'}Favorites</Text>
          </View>
        </View>

        <View style={styles.body}>
          {favorites.length > 0 ? (
            favorites.map((artist, index) => {
              const artistImgUrl = (artistImages as Record<string, string>)[artist.name];
              const imageSource = artistImgUrl ? { uri: artistImgUrl } : require('../../assets/images/lineup.jpg');
              const performanceDates = getArtistDates(artist.name);

              return (
                <View key={`${artist.name}-${index}`} style={styles.artistCard}>
                  <Image 
                    source={imageSource}
                    style={styles.artistImage}
                    contentFit="cover"
                  />
                  <View style={styles.artistInfo}>
                    <View style={styles.timeRow}>
                      <Ionicons name="calendar-outline" size={14} color={GOLD} />
                      <Text style={styles.timeText}>{performanceDates}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.artistName}>{artist.name}</Text>
                      </View>
                      <TouchableOpacity 
                        style={{ padding: 8 }}
                        onPress={() => toggleFavorite(artist)}
                      >
                        <Ionicons name="heart" size={28} color={ACCENT} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-dislike-outline" size={48} color={MUTED} style={{ marginBottom: 16 }} />
              <Text style={styles.emptyText}>You haven't saved any artists yet.</Text>
              <Text style={[styles.emptyText, { fontSize: 13, marginTop: 8 }]}>Go to the Lineup to add some magic!</Text>
            </View>
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}
