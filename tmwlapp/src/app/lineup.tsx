import React, { useState, useMemo, useCallback } from 'react';
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
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, WHITE, GOLD, MUTED, ACCENT, BG } from './lineup.styles';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import lineup data
import lineupData from '../../assets/data/tomorrowlan_data_2026.json';
import artistImages from '../../assets/data/artist_images.json';

const STAGE_CONFIG: Record<string, { color: string; icon: any }> = {
  'MAINSTAGE': { color: '#FACC15', icon: 'star' },
  'FREEDOM BY BUD': { color: '#60A5FA', icon: 'shield-checkmark' },
  'THE ROSE GARDEN': { color: '#FB7185', icon: 'flower' },
  'ELIXIR': { color: '#C084FC', icon: 'beaker' },
  'CAGE': { color: '#94A3B8', icon: 'grid' },
  'THE RAVE CAVE': { color: '#CBD5E1', icon: 'flashlight' },
  'PLANAXIS': { color: '#22D3EE', icon: 'water' },
  'MELODIA BY CORONA': { color: '#FB923C', icon: 'sunny' },
  'CELESTIA by Kucoin': { color: '#818CF8', icon: 'sparkles' },
  'ATMOSPHERE': { color: '#38BDF8', icon: 'cloudy' },
  'CORE': { color: '#4ADE80', icon: 'leaf' },
  'CRYSTAL GARDEN': { color: '#2DD4BF', icon: 'prism' },
  'THE GREAT LIBRARY': { color: '#FBBF24', icon: 'book' },
  'MOOSE BAR': { color: '#A3E635', icon: 'paw' },
  'HOUSE OF FORTUNE BY JBL': { color: '#F472B6', icon: 'musical-notes' },
};

const getStageConfig = (name: string) => STAGE_CONFIG[name] || { color: '#ffffff', icon: 'musical-note' };

type DayData = {
  date: string;
  day: string;
  label: string;
  stages: Array<{
    name: string;
    host: string | null;
    artists: Array<{
      name: string;
      start: string;
      end: string;
    }>;
  }>;
};

export default function LineupScreen() {
  const insets = useSafeAreaInsets();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isLoggedIn } = useAuth();
  
  // State for selectors
  const [selectedWeek, setSelectedWeek] = useState<1 | 2>(1);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  
  // Available dates based on week
  const week1Dates = ['2026-07-17', '2026-07-18', '2026-07-19'];
  const week2Dates = ['2026-07-24', '2026-07-25', '2026-07-26'];
  
  const [selectedDate, setSelectedDate] = useState(week1Dates[0]);
  const [selectedStage, setSelectedStage] = useState<string>('ALL');

  const { stage: mapStage } = useLocalSearchParams<{ stage?: string }>();

  // Load saved filters on focus, but let mapStage override if present
  useFocusEffect(
    useCallback(() => {
      const loadFilters = async () => {
        try {
          const savedWeek = await AsyncStorage.getItem('lineup_week');
          const savedDate = await AsyncStorage.getItem('lineup_date');
          const savedStage = await AsyncStorage.getItem('lineup_stage');

          if (savedWeek) setSelectedWeek(parseInt(savedWeek) as 1 | 2);
          if (savedDate) setSelectedDate(savedDate);

          // Ha a térképről jött stage param, azt használjuk — ne az AsyncStorage-t
          if (mapStage) {
            setSelectedStage(mapStage.toUpperCase());
          } else if (savedStage) {
            setSelectedStage(savedStage);
          }
        } catch (e) {
          console.error('Failed to load lineup filters', e);
        }
      };
      loadFilters();
    }, [mapStage])
  );

  const currentWeekDates = selectedWeek === 1 ? week1Dates : week2Dates;

  const handleFavoritePress = (artistName: string) => {
    if (!isLoggedIn) {
      setShowLoginNotice(true);
    } else {
      toggleFavorite({ name: artistName });
    }
  };

  // When week changes, reset date and stage and save to storage
  const handleWeekChange = async (week: 1 | 2) => {
    setSelectedWeek(week);
    const newDates = week === 1 ? week1Dates : week2Dates;
    setSelectedDate(newDates[0]);
    setSelectedStage('ALL');
    
    try {
      await AsyncStorage.setItem('lineup_week', week.toString());
      await AsyncStorage.setItem('lineup_date', newDates[0]);
      await AsyncStorage.setItem('lineup_stage', 'ALL');
    } catch (e) {
      console.error('Failed to save week filter', e);
    }
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    setSelectedStage('ALL');
    
    try {
      await AsyncStorage.setItem('lineup_date', date);
      await AsyncStorage.setItem('lineup_stage', 'ALL');
    } catch (e) {
      console.error('Failed to save date filter', e);
    }
  };

  const handleStageChange = async (stage: string) => {
    setSelectedStage(stage);
    
    try {
      await AsyncStorage.setItem('lineup_stage', stage);
    } catch (e) {
      console.error('Failed to save stage filter', e);
    }
  };

  // Get data for the selected day
  const dayData = (lineupData.lineup as Record<string, DayData>)[selectedDate];

  // Get all available stages for the selected day
  const stages = useMemo(() => {
    if (!dayData) return [];
    return dayData.stages.map(s => s.name);
  }, [dayData]);

  // Filter and sort artists
  const filteredArtists = useMemo(() => {
    if (!dayData) return [];
    
    let list: Array<{ name: string; start: string; end: string; stage: string }> = [];
    
    dayData.stages.forEach(stage => {
      if (selectedStage === 'ALL' || stage.name === selectedStage) {
        stage.artists.forEach(artist => {
          list.push({ ...artist, stage: stage.name });
        });
      }
    });

    // Sort: Alphabetical if ALL, otherwise by time
    if (selectedStage === 'ALL') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return list.sort((a, b) => a.start.localeCompare(b.start));
    }
  }, [dayData, selectedStage]);

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
            source={require('../../assets/images/lineup.jpg')}
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
              onPress={() => router.push('/login')}
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
            <Text style={styles.heroBreadcrumb}>Lineup</Text>
            <Text style={styles.heroTitle}>Discover the{'\n'}Magic</Text>
          </View>

          {/* WEEK & DAY SELECTOR (Moved inside hero for background) */}
          <View style={styles.selectorContainer}>
            <View style={styles.weekRow}>
              <TouchableOpacity 
                style={[styles.weekButton, selectedWeek === 1 && styles.weekButtonActive]}
                onPress={() => handleWeekChange(1)}
              >
                <Text style={[styles.weekButtonText, selectedWeek === 1 && styles.weekButtonTextActive]}>WEEK 1</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.weekButton, selectedWeek === 2 && styles.weekButtonActive]}
                onPress={() => handleWeekChange(2)}
              >
                <Text style={[styles.weekButtonText, selectedWeek === 2 && styles.weekButtonTextActive]}>WEEK 2</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayRow}>
              {currentWeekDates.map((date) => {
                const d = (lineupData.lineup as Record<string, DayData>)[date];
                return (
                  <TouchableOpacity 
                    key={date}
                    style={[styles.dayButton, selectedDate === date && styles.dayButtonActive]}
                    onPress={() => handleDateChange(date)}
                  >
                    <Text style={[styles.dayButtonText, selectedDate === date && styles.dayButtonTextActive]}>
                      {d?.day.substring(0, 3).toUpperCase()}
                    </Text>
                    <Text style={[styles.dayButtonText, { fontSize: 10, marginTop: 2 }, selectedDate === date && styles.dayButtonTextActive]}>
                      {d?.label.split(' ')[1]} {d?.label.split(' ')[2]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* STAGE SELECTOR (Horizontal) */}
        <View style={{ backgroundColor: '#000' }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stageSelector}
          >
            <TouchableOpacity 
              style={[styles.stageButton, selectedStage === 'ALL' && styles.stageButtonActive]}
              onPress={() => handleStageChange('ALL')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="apps-outline" size={16} color={selectedStage === 'ALL' ? GOLD : MUTED} />
                <Text style={[styles.stageButtonText, selectedStage === 'ALL' && styles.stageButtonTextActive]}>ALL STAGES</Text>
              </View>
            </TouchableOpacity>
            {stages.map(stage => {
              const config = getStageConfig(stage);
              const isActive = selectedStage === stage;
              return (
                <TouchableOpacity 
                  key={stage}
                  style={[styles.stageButton, isActive && { borderColor: config.color, backgroundColor: `${config.color}20` }]}
                  onPress={() => handleStageChange(stage)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Ionicons name={config.icon} size={16} color={isActive ? config.color : MUTED} />
                    <Text style={[styles.stageButtonText, isActive && { color: config.color, fontWeight: '700' }]}>{stage}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ARTIST LIST */}
        <View style={styles.body}>
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist, index) => {
              const stageConfig = getStageConfig(artist.stage);
              const artistImgUrl = (artistImages as Record<string, string>)[artist.name];
              const imageSource = artistImgUrl ? { uri: artistImgUrl } : require('../../assets/images/lineup.jpg');

              return (
                <TouchableOpacity 
                  key={`${artist.name}-${index}`} 
                  style={styles.artistCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/artist/${encodeURIComponent(artist.name)}`)}
                >
                  <Image 
                    source={imageSource}
                    style={styles.artistImage}
                    contentFit="cover"
                  />
                  <View style={styles.artistInfo}>
                    <View style={styles.timeRow}>
                      <Ionicons name="time-outline" size={14} color={GOLD} />
                      <Text style={styles.timeText}>{artist.start} - {artist.end}</Text>
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
                        onPress={() => handleFavoritePress(artist.name)}
                      >
                        <Ionicons 
                          name={isFavorite(artist.name) ? "heart" : "heart-outline"} 
                          size={28} 
                          color={ACCENT} 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No artists found for this selection.</Text>
            </View>
          )}
        </View>

        <View style={{ height: 80 }} />
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

      <AppBottomNav />
    </SafeAreaView>
  );
}
