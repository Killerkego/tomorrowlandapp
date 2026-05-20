import React from 'react';
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

// IMPORTÁLD A HOOKOT
import { useFavorites } from '@/context/FavoritesContext';

const STAGE_CONFIG: Record<string, { color: string; icon: any }> = {
  'MAINSTAGE': { color: '#FACC15', icon: 'star' },
  'FREEDOM BY BUD': { color: '#60A5FA', icon: 'shield-checkmark' },
  'THE ROSE GARDEN': { color: '#FB7185', icon: 'flower' },
  'CORE': { color: '#4ADE80', icon: 'leaf' },
};
const getStageConfig = (name: string) => STAGE_CONFIG[name] || { color: '#ffffff', icon: 'musical-note' };

export default function FavoriteScreen() {
  const insets = useSafeAreaInsets();
  
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroContainer, { minHeight: 300, paddingTop: insets.top }]}>
          <Image
            source={require('../../assets/images/lineup.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', '#000000']}
            locations={[0, 0.6, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.overlayHeader, { top: insets.top }]}>
            <TouchableOpacity style={styles.headerSide} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={32} color={WHITE} />
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
            <Text style={styles.heroTitle}>Your Favorites</Text>
          </View>
        </View>

        <View style={styles.body}>
          {favorites.length > 0 ? (
            favorites.map((artist, index) => {
              const stageConfig = getStageConfig(artist.stage);
              const artistImgUrl = (artistImages as Record<string, string>)[artist.name];
              const imageSource = artistImgUrl ? { uri: artistImgUrl } : require('../../assets/images/lineup.jpg');

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
                      <Text style={styles.timeText}>{artist.date} • {artist.start} - {artist.end}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.artistName}>{artist.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Ionicons name={stageConfig.icon} size={12} color={stageConfig.color} />
                          <Text style={[styles.stageName, { color: stageConfig.color }]}>{artist.stage}</Text>
                        </View>
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