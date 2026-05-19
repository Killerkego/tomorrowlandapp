import React, { useState, useMemo } from 'react';
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
  
  // State for selectors
  const [selectedWeek, setSelectedWeek] = useState<1 | 2>(1);
  
  // Available dates based on week
  const week1Dates = ['2026-07-17', '2026-07-18', '2026-07-19'];
  const week2Dates = ['2026-07-24', '2026-07-25', '2026-07-26'];
  const currentWeekDates = selectedWeek === 1 ? week1Dates : week2Dates;
  
  const [selectedDate, setSelectedDate] = useState(currentWeekDates[0]);
  const [selectedStage, setSelectedStage] = useState<string>('ALL');

  // When week changes, reset date and stage
  const handleWeekChange = (week: 1 | 2) => {
    setSelectedWeek(week);
    const newDates = week === 1 ? week1Dates : week2Dates;
    setSelectedDate(newDates[0]);
    setSelectedStage('ALL');
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedStage('ALL');
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
              onPress={() => setSelectedStage('ALL')}
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
                  onPress={() => setSelectedStage(stage)}
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
                <View key={`${artist.name}-${index}`} style={styles.artistCard}>
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
                      <TouchableOpacity style={{ padding: 8 }}>
                        <Ionicons name="heart-outline" size={28} color={ACCENT} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
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

      <AppBottomNav />
    </SafeAreaView>
  );
}
