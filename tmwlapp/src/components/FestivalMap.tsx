import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.90;

type Stage = {
  id: string;
  title: string;
  description: string;
  image: any;
  coords: { latitude: number; longitude: number };
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export function FestivalMap() {
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  const TOMORROWLAND_REGION = {
    latitude: 51.0910,
    longitude: 4.3835,
    latitudeDelta: 0.012,
    longitudeDelta: 0.012,
  };

  const STAGES: Stage[] = [
    {
      id: 'MAINSTAGE',
      title: 'Mainstage',
      description: 'The monumental heart of Tomorrowland.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0918, longitude: 4.3840 }, 
      color: '#FACC15',
      icon: 'star', 
    },
    {
      id: 'FREEDOM BY BUD',
      title: 'Freedom', 
      description: 'Indoor technical masterpiece.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0935, longitude: 4.3855 }, 
      color: '#60A5FA',
      icon: 'shield-checkmark',
    },
    {
      id: 'ATMOSPHERE',
      title: 'Atmosphere',
      description: 'Massive techno tent.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0880, longitude: 4.3840 }, 
      color: '#38BDF8',
      icon: 'cloudy',
    },
    {
      id: 'CORE',
      title: 'Core Stage',
      description: 'Deep sounds in the forest.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0895, longitude: 4.3821 }, 
      color: '#4ADE80',
      icon: 'leaf',
    },
    {
      id: 'THE ROSE GARDEN',
      title: 'The Rose Garden',
      description: 'Watch out for the dragon.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0905, longitude: 4.3810 }, 
      color: '#FB7185',
      icon: 'flower',
    },
    {
      id: 'ELIXIR',
      title: 'Elixir',
      description: 'Magical vibes on the water.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0912, longitude: 4.3825 }, 
      color: '#C084FC',
      icon: 'beaker',
    },
    {
      id: 'CAGE',
      title: 'Cage',
      description: 'Dark, intense, unyielding.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0945, longitude: 4.3860 }, 
      color: '#94A3B8',
      icon: 'grid',
    },
    {
      id: 'THE RAVE CAVE',
      title: 'The Rave Cave',
      description: 'Intimate tunnel vibes.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0925, longitude: 4.3805 }, 
      color: '#CBD5E1',
      icon: 'flashlight',
    },
    {
      id: 'PLANAXIS',
      title: 'Planaxis',
      description: 'An underwater world.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0900, longitude: 4.3875 }, 
      color: '#22D3EE',
      icon: 'water',
    },
    {
      id: 'MELODIA BY CORONA',
      title: 'Melodia',
      description: 'Sunset and chill vibes.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0890, longitude: 4.3865 }, 
      color: '#FB923C',
      icon: 'sunny',
    },
    {
      id: 'CELESTIA by Kucoin',
      title: 'Celestia',
      description: 'Journey to the stars.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0955, longitude: 4.3830 }, 
      color: '#818CF8',
      icon: 'sparkles',
    },
    {
      id: 'CRYSTAL GARDEN',
      title: 'Crystal Garden',
      description: 'Floating on the water.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0930, longitude: 4.3885 }, 
      color: '#2DD4BF',
      icon: 'prism',
    },
    {
      id: 'THE GREAT LIBRARY',
      title: 'The Great Library',
      description: 'Stories come alive.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0875, longitude: 4.3855 }, 
      color: '#FBBF24',
      icon: 'book',
    },
    {
      id: 'MOOSE BAR',
      title: 'Moose Bar',
      description: 'Apres-ski madness in summer.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0940, longitude: 4.3815 }, 
      color: '#A3E635',
      icon: 'paw',
    },
    {
      id: 'HOUSE OF FORTUNE BY JBL',
      title: 'House of Fortune',
      description: 'Discover your destiny.',
      image: require('../../assets/images/lineup.jpg'),
      coords: { latitude: 51.0885, longitude: 4.3815 }, 
      color: '#F472B6',
      icon: 'musical-notes',
    }
  ];

  const onStagePress = (stage: Stage) => {
    setSelectedStageId(stage.id);
    mapRef.current?.animateToRegion({
      ...stage.coords,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    }, 800);
  };

  const handleLineupNavigation = (stageId: string) => {
    router.push({
      pathname: '/lineup',
      params: { stage: stageId } 
    });
  };

  const selectedStage = STAGES.find(s => s.id === selectedStageId);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={TOMORROWLAND_REGION}
        mapType="satellite"
        onPress={() => setSelectedStageId(null)} 
      >
        {STAGES.map((stage) => {
          const isSelected = selectedStageId === stage.id;
          
          return (
            <Marker
              key={stage.id}
              coordinate={stage.coords}
              onPress={(e) => {
                e.stopPropagation(); 
                onStagePress(stage); 
              }}
            >
              <View style={localStyles.customMarkerContainer}>
                <View style={[
                  localStyles.markerIconBox, 
                  { 
                    borderColor: stage.color,
                    backgroundColor: isSelected ? stage.color : '#1e293b',
                    transform: [{ scale: isSelected ? 1.1 : 1 }] 
                  }
                ]}>
                  <Ionicons 
                    name={stage.icon} 
                    size={16} 
                    color={isSelected ? '#fff' : stage.color} 
                  />
                </View>
                <View style={[
                  localStyles.markerArrow, 
                  { borderTopColor: isSelected ? stage.color : '#1e293b' }
                ]} />
              </View>
            </Marker>
          );
        })}
      </MapView>

      {selectedStage && (
        <View style={localStyles.singleCardContainer}>
          <View style={localStyles.card}>
            <TouchableOpacity 
              activeOpacity={1}
              style={localStyles.cardTouchArea}
            >
              <Image source={selectedStage.image} style={localStyles.cardImage} contentFit="cover" />
              <View style={localStyles.cardInfo}>
                <Text numberOfLines={1} style={localStyles.cardTitle}>{selectedStage.title}</Text>
                <Text numberOfLines={2} style={localStyles.cardDesc}>{selectedStage.description}</Text>
              </View>
            </TouchableOpacity>

            <View style={localStyles.buttonContainer}>
              <TouchableOpacity 
                style={[localStyles.lineupButton, { backgroundColor: selectedStage.color }]}
                onPress={() => handleLineupNavigation(selectedStage.title)}
              >
                <Text style={localStyles.lineupButtonText}>Lineup 🎵</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  customMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  singleCardContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    width: CARD_WIDTH,
    height: 100,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardTouchArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 100,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    paddingLeft: 4,
  },
  lineupButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  lineupButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
