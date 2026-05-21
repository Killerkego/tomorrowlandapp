import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Image as RNImage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, WHITE, GOLD, MUTED, ACCENT, BG } from './lineup.styles';
import { useSchedule } from '@/context/ScheduleContext';
import { useFavorites } from '@/context/FavoritesContext';
import artistImages from '../../assets/data/artist_images.json';
import lineupData from '../../assets/data/tomorrowlan_data_2026.json';

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

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const { schedule, toggleSchedule } = useSchedule();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [conflictError, setConflictError] = useState<string | null>(null);

  // State for selectors
  const [selectedWeek, setSelectedWeek] = useState<1 | 2>(1);
  const week1Dates = ['2026-07-17', '2026-07-18', '2026-07-19'];
  const week2Dates = ['2026-07-24', '2026-07-25', '2026-07-26'];
  const [selectedDate, setSelectedDate] = useState(week1Dates[0]);

  const currentWeekDates = selectedWeek === 1 ? week1Dates : week2Dates;

  const handleWeekChange = (week: 1 | 2) => {
    setSelectedWeek(week);
    setSelectedDate(week === 1 ? week1Dates[0] : week2Dates[0]);
  };

  const handleSchedulePress = (gig: any) => {
    const result = toggleSchedule(gig);
    if (result && !result.success && result.error) {
      setConflictError(result.error);
    } else if (result && result.success && result.warning) {
      setConflictError(result.warning);
    }
  };

  // Filter schedule for the selected date and sort by start time
  const dailySchedule = useMemo(() => {
    return schedule
      .filter(gig => gig.date === selectedDate)
      .sort((a, b) => a.start.localeCompare(b.start));
  }, [schedule, selectedDate]);

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
              <Ionicons name="person-circle-outline" size={36} color={WHITE} />
            </TouchableOpacity>
          </View>

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Personal</Text>
            <Text style={styles.heroTitle}>My{'\n'}Schedule</Text>
          </View>

          {/* WEEK & DAY SELECTOR */}
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
                const d = (lineupData.lineup as Record<string, any>)[date];
                if (!d) return null;
                const hasGigs = schedule.some(s => s.date === date);

                return (
                  <TouchableOpacity 
                    key={date}
                    style={[styles.dayButton, selectedDate === date && styles.dayButtonActive, hasGigs && selectedDate !== date && { borderColor: GOLD, borderWidth: 1 }]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[styles.dayButtonText, selectedDate === date && styles.dayButtonTextActive]}>
                      {d.day.substring(0, 3).toUpperCase()}
                    </Text>
                    <Text style={[styles.dayButtonText, { fontSize: 10, marginTop: 2 }, selectedDate === date && styles.dayButtonTextActive]}>
                      {d.label.split(' ')[1]} {d.label.split(' ')[2]}
                    </Text>
                    {hasGigs && (
                      <View style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD }} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* SCHEDULE LIST */}
        <View style={styles.body}>

          {dailySchedule.length > 0 ? (
            dailySchedule.map((gig, index) => {
              const stageConfig = getStageConfig(gig.stage);
              const artistImgUrl = (artistImages as Record<string, string>)[gig.artistName];
              const imageSource = artistImgUrl ? { uri: artistImgUrl } : require('../../assets/images/lineup.jpg');

              return (
                <TouchableOpacity 
                  key={`${gig.artistName}-${gig.start}-${index}`} 
                  style={styles.artistCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/artist/${encodeURIComponent(gig.artistName)}`)}
                >
                  <Image 
                    source={imageSource}
                    style={styles.artistImage}
                    contentFit="cover"
                  />
                  <View style={styles.artistInfo}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <View style={styles.timeRow}>
                        <Ionicons name="time-outline" size={14} color={GOLD} />
                        <Text style={styles.timeText}>{gig.start} - {gig.end}</Text>
                      </View>
                      <Text style={styles.artistName}>{gig.artistName}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name={stageConfig.icon} size={12} color={stageConfig.color} />
                        <Text style={[styles.stageName, { color: stageConfig.color }]}>{gig.stage}</Text>
                      </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 8, gap: 4 }}>
                      <TouchableOpacity
                        style={{ padding: 4 }}
                        onPress={(e) => { e.stopPropagation(); toggleSchedule(gig); }}
                      >
                        <Ionicons name="calendar" size={24} color={GOLD} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ padding: 4 }}
                        onPress={(e) => { e.stopPropagation(); toggleFavorite({ name: gig.artistName }); }}
                      >
                        <Ionicons
                          name={isFavorite(gig.artistName) ? 'heart' : 'heart-outline'}
                          size={24}
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
              <Ionicons name="calendar-outline" size={48} color={MUTED} style={{ marginBottom: 16 }} />
              <Text style={styles.emptyText}>Your schedule is empty for this day.</Text>
              <Text style={[styles.emptyText, { fontSize: 13, marginTop: 8 }]}>Go to the Lineup to build your journey!</Text>
            </View>
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* CONFLICT NOTICE MODAL */}
      <Modal
        visible={!!conflictError}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setConflictError(null)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center' }}
        >
          <View style={{ padding: 24, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#1A1A1A', borderRadius: 24, padding: 24, paddingBottom: 32, borderWidth: 1, borderColor: ACCENT, width: '100%', maxWidth: 360, alignItems: 'center' }}>
              <Ionicons name="warning-outline" size={56} color={ACCENT} style={{ marginBottom: 16, marginTop: 8 }} />
              
              <Text style={{ color: MUTED, fontSize: 15, textAlign: 'center', lineHeight: 22, paddingHorizontal: 12 }}>
                {conflictError}
              </Text>

              <TouchableOpacity 
                style={{ 
                  backgroundColor: 'rgba(200, 65, 122, 0.15)', 
                  marginTop: 24, 
                  paddingVertical: 14, 
                  paddingHorizontal: 32, 
                  borderRadius: 12, 
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: ACCENT,
                  width: '100%'
                }}
                onPress={() => setConflictError(null)}
              >
                <Text style={{ color: ACCENT, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>Understood</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <AppBottomNav />
    </SafeAreaView>
  );
}
