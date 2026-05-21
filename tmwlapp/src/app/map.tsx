import React, { useRef, useState, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './index.styles';
import { useAuth } from '@/context/AuthContext';
import { useTrack } from '@/context/TrackContext';
import { SERVER_URL } from '@/services/apiConfig';

// Helper: Calculate distance in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

import lineupData from '../../assets/data/tomorrowlan_data_2026.json';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;

const GOLD = '#d4af37';
const ACCENT = '#c8417a';
const MUTED = 'rgba(255,255,255,0.65)';
const WHITE = '#ffffff';

type Stage = {
  id: string;
  title: string;
  description: string;
  image?: any;
  coords: { latitude: number; longitude: number };
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  type?: 'stage' | 'facility';
  openingHours?: string;
};

const DAY_LABELS: Record<string, string> = {
  '2026-07-17': 'FRI 17',
  '2026-07-18': 'SAT 18',
  '2026-07-19': 'SUN 19',
  '2026-07-24': 'FRI 24',
  '2026-07-25': 'SAT 25',
  '2026-07-26': 'SUN 26',
};

const WEEK_LABEL: Record<string, string> = {
  '2026-07-17': 'W1',
  '2026-07-18': 'W1',
  '2026-07-19': 'W1',
  '2026-07-24': 'W2',
  '2026-07-25': 'W2',
  '2026-07-26': 'W2',
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isTrackedUserSelected, setIsTrackedUserSelected] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const { trackedUser } = useTrack();
  const userLocation = user?.location || { latitude: 51.0915, longitude: 4.3845 };

  const TOMORROWLAND_REGION = {
    latitude: 51.0913,
    longitude: 4.3843,
    latitudeDelta: 0.006, 
    longitudeDelta: 0.006,
  };

  const STAGES: Stage[] = [
    // --- STAGES ---
    {
      id: 'MAINSTAGE',
      title: 'Mainstage',
      description: 'The monumental heart of Tomorrowland. The iconic stage that started it all.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0913, longitude: 4.3843 },
      color: '#FACC15',
      icon: 'star',
      type: 'stage',
    },
    {
      id: 'FREEDOM BY BUD',
      title: 'Freedom by Bud',
      description: 'Indoor technical masterpiece. Pushing boundaries of sound and production.',
      image: require('../../assets/images/freedom.jpg'),
      coords: { latitude: 51.0932, longitude: 4.3862 },
      color: '#60A5FA',
      icon: 'shield-checkmark',
      type: 'stage',
    },
    {
      id: 'ATMOSPHERE',
      title: 'Atmosphere',
      description: 'Massive techno tent with raw industrial sound design.',
      image: require('../../assets/images/atmosphere.jpg'),
      coords: { latitude: 51.0897, longitude: 4.3831 },
      color: '#38BDF8',
      icon: 'cloudy',
      type: 'stage',
    },
    {
      id: 'CORE',
      title: 'Core Stage',
      description: 'Deep sounds in the forested area of the park.',
      image: require('../../assets/images/core.jpg'),
      coords: { latitude: 51.0905, longitude: 4.3818 },
      color: '#4ADE80',
      icon: 'leaf',
      type: 'stage',
    },
    {
      id: 'THE ROSE GARDEN',
      title: 'The Rose Garden',
      description: 'Watch out for the dragon. A magical floral experience.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0921, longitude: 4.3820 },
      color: '#FB7185',
      icon: 'flower',
      type: 'stage',
    },
    {
      id: 'ELIXIR',
      title: 'Elixir',
      description: 'Magical vibes near the water. Alchemical sound journeys.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0908, longitude: 4.3858 },
      color: '#C084FC',
      icon: 'beaker',
      type: 'stage',
    },
    {
      id: 'CAGE',
      title: 'Cage',
      description: 'Dark, intense, unyielding. Hardcore energy unleashed.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0940, longitude: 4.3870 },
      color: '#94A3B8',
      icon: 'grid',
      type: 'stage',
    },
    {
      id: 'THE RAVE CAVE',
      title: 'The Rave Cave',
      description: 'Intimate underground tunnel vibes.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0926, longitude: 4.3808 },
      color: '#CBD5E1',
      icon: 'flashlight',
      type: 'stage',
    },
    {
      id: 'PLANAXIS',
      title: 'Planaxis',
      description: 'An underwater world of progressive sounds.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0900, longitude: 4.3872 },
      color: '#22D3EE',
      icon: 'water',
      type: 'stage',
    },
    {
      id: 'MELODIA BY CORONA',
      title: 'Melodia by Corona',
      description: 'Sunset and chill vibes by the riverside.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0888, longitude: 4.3862 },
      color: '#FB923C',
      icon: 'sunny',
      type: 'stage',
    },
    {
      id: 'CELESTIA by Kucoin',
      title: 'Celestia by Kucoin',
      description: 'Journey to the stars. Euphoric, galactic soundscapes.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0948, longitude: 4.3838 },
      color: '#818CF8',
      icon: 'sparkles',
      type: 'stage',
    },
    {
      id: 'CRYSTAL GARDEN',
      title: 'Crystal Garden',
      description: 'Floating on the water. Crystal clear melodic sets.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0929, longitude: 4.3880 },
      color: '#2DD4BF',
      icon: 'prism',
      type: 'stage',
    },
    {
      id: 'THE GREAT LIBRARY',
      title: 'The Great Library',
      description: 'Stories come alive with eclectic sounds.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0878, longitude: 4.3848 },
      color: '#FBBF24',
      icon: 'book',
      type: 'stage',
    },
    {
      id: 'MOOSE BAR',
      title: 'Moose Bar',
      description: 'Après-ski madness in summer. Party all day long!',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0937, longitude: 4.3815 },
      color: '#A3E635',
      icon: 'paw',
      type: 'stage',
    },
    {
      id: 'HOUSE OF FORTUNE BY JBL',
      title: 'House of Fortune by JBL',
      description: 'Discover your destiny in this immersive stage experience.',
      image: require('../../assets/images/mainstage.jpg'),
      coords: { latitude: 51.0884, longitude: 4.3820 },
      color: '#F472B6',
      icon: 'musical-notes',
      type: 'stage',
    },

    // --- UTILITIES (First Aid & Restrooms - KÉPEK NÉLKÜL) ---
    {
      id: 'FIRST_AID_1',
      title: 'First Aid Station',
      description: 'Professional medical team available for any emergencies or assistance.',
      coords: { latitude: 51.0920, longitude: 4.3830 }, 
      color: '#EF4444', 
      icon: 'medkit',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'FIRST_AID_2',
      title: 'First Aid Station',
      description: 'Professional medical team available for any emergencies or assistance.',
      coords: { latitude: 51.0945, longitude: 4.3850 }, 
      color: '#EF4444',
      icon: 'medkit',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'FIRST_AID_3',
      title: 'First Aid Station',
      description: 'Professional medical team available for any emergencies or assistance.',
      coords: { latitude: 51.0890, longitude: 4.3845 }, 
      color: '#EF4444',
      icon: 'medkit',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'RESTROOM_1',
      title: 'Restrooms & Water',
      description: 'Free toilets, refreshment areas, and drinking water stations.',
      coords: { latitude: 51.0915, longitude: 4.3855 }, 
      color: '#14B8A6', 
      icon: 'water-outline', 
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'RESTROOM_2',
      title: 'Restrooms & Water',
      description: 'Free toilets, refreshment areas, and drinking water stations.',
      coords: { latitude: 51.0938, longitude: 4.3865 }, 
      color: '#14B8A6',
      icon: 'water-outline',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'RESTROOM_3',
      title: 'Restrooms & Water',
      description: 'Free toilets, refreshment areas, and drinking water stations.',
      coords: { latitude: 51.0895, longitude: 4.3820 }, 
      color: '#14B8A6',
      icon: 'water-outline',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'RESTROOM_4',
      title: 'Restrooms & Water',
      description: 'Free toilets, refreshment areas, and drinking water stations.',
      coords: { latitude: 51.0925, longitude: 4.3810 }, 
      color: '#14B8A6',
      icon: 'water-outline',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
    {
      id: 'RESTROOM_5',
      title: 'Restrooms & Water',
      description: 'Free toilets, refreshment areas, and drinking water stations.',
      coords: { latitude: 51.0880, longitude: 4.3860 }, 
      color: '#14B8A6',
      icon: 'water-outline',
      type: 'facility',
      openingHours: '0-24h (Non-stop)',
    },
  ];

  const stageDays = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.entries((lineupData as any).lineup).forEach(([dateStr, dayData]: [string, any]) => {
      dayData.stages.forEach((stage: any) => {
        if (stage.artists && stage.artists.length > 0) {
          if (!map[stage.name]) map[stage.name] = [];
          map[stage.name].push(dateStr);
        }
      });
    });
    return map;
  }, []);

  const onStagePress = (stage: Stage) => {
    setSelectedStageId(stage.id);
    setIsUserSelected(false);
    setIsTrackedUserSelected(false);
    mapRef.current?.animateToRegion({
      ...stage.coords,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    }, 800);
  };

  const onUserPress = () => {
    setSelectedStageId(null);
    setIsUserSelected(true);
    setIsTrackedUserSelected(false);
    mapRef.current?.animateToRegion({
      ...userLocation,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    }, 800);
  };

  const onTrackedUserPress = () => {
    setSelectedStageId(null);
    setIsUserSelected(false);
    setIsTrackedUserSelected(true);
    if (trackedUser?.location) {
      mapRef.current?.animateToRegion({
        ...trackedUser.location,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }, 800);
    }
  };

  const handleLineupNavigation = (stageId: string) => {
    router.push({
      pathname: '/lineup',
      params: { stage: stageId },
    });
  };

  const selectedStage = STAGES.find(s => s.id === selectedStageId);
  const activeDays = selectedStage ? (stageDays[selectedStage.id] || []) : [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.screen}>
        <AppHeader />

        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={TOMORROWLAND_REGION}
            mapType="satellite"
            onPress={() => {
              setSelectedStageId(null);
              setIsUserSelected(false);
              setIsTrackedUserSelected(false);
            }}
          >
            {STAGES.map((stage) => {
              const isSelected = selectedStageId === stage.id;
              const isUtility = stage.type === 'facility';
              
              return (
                <Marker
                  key={stage.id}
                  coordinate={stage.coords}
                  calloutEnabled={false}
                  onPress={(e) => {
                    e.stopPropagation();
                    onStagePress(stage);
                  }}
                >
                  <View style={localStyles.customMarkerContainer}>
                    <View style={[
                      localStyles.markerIconBox,
                      {
                        width: isUtility ? 28 : 34,
                        height: isUtility ? 28 : 34,
                        borderRadius: isUtility ? 14 : 17,
                        borderColor: stage.color,
                        backgroundColor: isSelected ? stage.color : '#1e293b',
                        transform: [{ scale: isSelected ? 1.18 : 1 }],
                      },
                    ]}>
                      <Ionicons
                        name={stage.icon}
                        size={isUtility ? 14 : 16}
                        color={isSelected ? '#fff' : stage.color}
                      />
                    </View>
                    <View style={[
                      localStyles.markerArrow,
                      { borderTopColor: isSelected ? stage.color : '#1e293b' },
                    ]} />
                  </View>
                </Marker>
              );
            })}

            {/* USER MARKER */}
            {isLoggedIn && user && (
              <Marker
                coordinate={userLocation}
                style={{ zIndex: 999 }}
                calloutEnabled={false}
                onPress={(e) => {
                  e.stopPropagation();
                  onUserPress();
                }}
              >
                <View style={localStyles.customMarkerContainer}>
                  <View style={[
                    localStyles.markerIconBox,
                    {
                      borderColor: ACCENT,
                      backgroundColor: '#1e293b',
                      transform: [{ scale: 1.1 }],
                    },
                  ]}>
                    {user.profilePicture ? (
                      <Image 
                        source={{ uri: `${SERVER_URL}${user.profilePicture}` }} 
                        style={{ width: 30, height: 30, borderRadius: 15 }} 
                      />
                    ) : (
                      <Ionicons name="person" size={16} color={ACCENT} />
                    )}
                  </View>
                  <View style={[localStyles.markerArrow, { borderTopColor: '#1e293b' }]} />
                </View>
              </Marker>
            )}

            {/* TRACKED USER MARKER */}
            {isLoggedIn && trackedUser && trackedUser.location && (
              <Marker
                coordinate={trackedUser.location}
                style={{ zIndex: 998 }}
                calloutEnabled={false}
                onPress={(e) => {
                  e.stopPropagation();
                  onTrackedUserPress();
                }}
              >
                <View style={localStyles.customMarkerContainer}>
                  <View style={[
                    localStyles.markerIconBox,
                    {
                      borderColor: GOLD,
                      backgroundColor: '#1e293b',
                      transform: [{ scale: 1.15 }],
                    },
                  ]}>
                    {trackedUser.profilePicture ? (
                      <Image 
                        source={{ uri: `${SERVER_URL}${trackedUser.profilePicture}` }} 
                        style={{ width: 30, height: 30, borderRadius: 15 }} 
                      />
                    ) : (
                      <Ionicons name="person" size={16} color={GOLD} />
                    )}
                  </View>
                  <View style={[localStyles.markerArrow, { borderTopColor: '#1e293b' }]} />
                </View>
              </Marker>
            )}
          </MapView>

          {/* STAGE VAGY FACILITY KÁRTYA */}
          {selectedStage && (
            <View style={localStyles.cardWrapper}>
              <View style={[localStyles.card, { borderColor: selectedStage.color }]}>

                {/* FELSŐ SOR: kép (csak színpadoknál) + infó */}
                <View style={[localStyles.cardTop, selectedStage.type === 'facility' && { minHeight: 90, alignItems: 'center' }]}>
                  {selectedStage.type === 'stage' && selectedStage.image && (
                    <Image source={selectedStage.image} style={localStyles.cardImage} />
                  )}
                  <View style={[localStyles.cardInfo, selectedStage.type === 'facility' && { paddingLeft: 18, paddingTop: 16, paddingBottom: 16 }]}>
                    {/* Stage neve + ikon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <View style={[localStyles.iconBadge, { backgroundColor: selectedStage.color + '22', borderColor: selectedStage.color }]}>
                        <Ionicons name={selectedStage.icon} size={14} color={selectedStage.color} />
                      </View>
                      <Text style={localStyles.cardTitle} numberOfLines={2}>{selectedStage.title}</Text>
                    </View>

                    {/* Leírás */}
                    <Text style={localStyles.cardDesc} numberOfLines={3}>{selectedStage.description}</Text>
                    
                    {/* Opening Hours - Csak a facility pontoknál jelenik meg */}
                    {selectedStage.type === 'facility' && selectedStage.openingHours && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
                        <Ionicons name="time-outline" size={14} color={selectedStage.color} />
                        <Text style={{ color: WHITE, fontSize: 12, fontWeight: '700' }}>
                          Opening Hours: <Text style={{ fontWeight: '400', color: MUTED }}>{selectedStage.openingHours}</Text>
                        </Text>
                      </View>
                    )}

                  </View>
                </View>

                {/* DIVIDER & LINEUP BUTTON - Csak színpadoknál mutatjuk */}
                {selectedStage.type === 'stage' && (
                  <>
                    <View style={[localStyles.divider, { backgroundColor: selectedStage.color + '33' }]} />

                    <View style={localStyles.cardBottom}>
                      {/* Active Days */}
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                        <Ionicons name="calendar-outline" size={12} color={MUTED} />
                        <Text style={localStyles.daysLabel}>
                          {activeDays.length > 0 ? 'Active Days' : 'Coming Soon'}
                        </Text>
                      </View>
                      {activeDays.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                          <View style={{ flexDirection: 'row', gap: 5 }}>
                            {activeDays.map(dateStr => (
                              <View
                                key={dateStr}
                                style={[
                                  localStyles.dayBadge,
                                  {
                                    backgroundColor: selectedStage.color + '20',
                                    borderColor: selectedStage.color + '80',
                                  },
                                ]}
                              >
                                <Text style={[localStyles.dayBadgeWeek, { color: selectedStage.color }]}>
                                  {WEEK_LABEL[dateStr]}
                                </Text>
                                <Text style={[localStyles.dayBadgeText, { color: WHITE }]}>
                                  {DAY_LABELS[dateStr]}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </ScrollView>
                      ) : (
                        <Text style={{ color: MUTED, fontSize: 12, marginBottom: 12 }}>—</Text>
                      )}

                      {/* LINEUP gomb — teljes szélességű */}
                      <TouchableOpacity
                        style={[localStyles.lineupButton, { backgroundColor: selectedStage.color }]}
                        onPress={() => handleLineupNavigation(selectedStage.id)}
                      >
                        <Ionicons name="musical-notes" size={15} color="#fff" />
                        <Text style={localStyles.lineupButtonText}>View Lineup</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

              </View>
            </View>
          )}

          {/* USER KÁRTYA */}
          {isUserSelected && user && (
            <View style={localStyles.cardWrapper}>
              <View style={[localStyles.card, { borderColor: ACCENT }]}>
                {/* FELSŐ SOR: kép + infó */}
                <View style={localStyles.cardTop}>
                  {user.profilePicture ? (
                    <Image 
                      source={{ uri: `${SERVER_URL}${user.profilePicture}` }} 
                      style={localStyles.cardImage} 
                    />
                  ) : (
                    <View style={[localStyles.cardImage, { backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center' }]}>
                      <Ionicons name="person" size={48} color={ACCENT} />
                    </View>
                  )}
                  <View style={localStyles.cardInfo}>
                    {/* Név + ikon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <View style={[localStyles.iconBadge, { backgroundColor: ACCENT + '22', borderColor: ACCENT }]}>
                        <Ionicons name="person" size={14} color={ACCENT} />
                      </View>
                      <Text style={localStyles.cardTitle} numberOfLines={2}>You are here</Text>
                    </View>

                    {/* Leírás */}
                    <Text style={localStyles.cardDesc} numberOfLines={3}>Your current location in Tomorrowland.</Text>
                  </View>
                </View>

                {/* DIVIDER */}
                <View style={[localStyles.divider, { backgroundColor: ACCENT + '33' }]} />

                {/* PROFILE GOMB */}
                <View style={localStyles.cardBottom}>
                  <TouchableOpacity
                    style={[localStyles.lineupButton, { backgroundColor: ACCENT, marginTop: 4 }]}
                    onPress={() => router.push('/user')}
                  >
                    <Ionicons name="person-circle" size={18} color="#fff" />
                    <Text style={localStyles.lineupButtonText}>View My Profile</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}

          {/* TRACKED USER KÁRTYA */}
          {isTrackedUserSelected && trackedUser && trackedUser.location && (
            <View style={localStyles.cardWrapper}>
              <View style={[localStyles.card, { borderColor: GOLD }]}>
                {/* FELSŐ SOR: kép + infó */}
                <View style={localStyles.cardTop}>
                  {trackedUser.profilePicture ? (
                    <Image 
                      source={{ uri: `${SERVER_URL}${trackedUser.profilePicture}` }} 
                      style={localStyles.cardImage} 
                    />
                  ) : (
                    <View style={[localStyles.cardImage, { backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center' }]}>
                      <Ionicons name="person" size={48} color={GOLD} />
                    </View>
                  )}
                  <View style={localStyles.cardInfo}>
                    {/* Név + ikon */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <View style={[localStyles.iconBadge, { backgroundColor: GOLD + '22', borderColor: GOLD }]}>
                        <Ionicons name="location" size={14} color={GOLD} />
                      </View>
                      <Text style={localStyles.cardTitle} numberOfLines={2}>
                        {trackedUser.fullName || trackedUser.username}
                      </Text>
                    </View>

                    {/* Távolság leírás */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <Ionicons name="navigate-outline" size={16} color={MUTED} />
                      <Text style={localStyles.cardDesc} numberOfLines={2}>
                        {getDistance(userLocation.latitude, userLocation.longitude, trackedUser.location.latitude, trackedUser.location.longitude)} meters away from you
                      </Text>
                    </View>
                  </View>
                </View>

                {/* DIVIDER 
                <View style={[localStyles.divider, { backgroundColor: GOLD + '33' }]} />
                */}

              </View>
            </View>
          )}
        </View>

        <AppBottomNav />
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  customMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },

  cardWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#0d1117',
    width: CARD_WIDTH,
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 10,
  },

  cardTop: {
    flexDirection: 'row',
    minHeight: 110,
  },
  cardImage: {
    width: 100,
    height: '100%', 
    minHeight: 130,
    resizeMode: 'cover',
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'flex-start',
  },
  iconBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
    lineHeight: 20,
  },
  cardDesc: {
    color: MUTED,
    fontSize: 12.5,
    lineHeight: 18,
  },

  divider: {
    height: 1,
    marginHorizontal: 0,
  },

  cardBottom: {
    flexDirection: 'column',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 0,
  },
  daysLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  dayBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 52,
  },
  dayBadgeWeek: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  dayBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },

  lineupButton: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    width: '100%',
  },
  lineupButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});