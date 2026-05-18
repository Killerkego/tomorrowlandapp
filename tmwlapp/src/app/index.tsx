import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. HÁTTÉRVIDEÓ: A teljes képernyőt kitölti a háttérben */}
      <Video
        source={require('../../assets/videos/tmwl_video.mp4')} 
        style={StyleSheet.absoluteFillObject}
        resizeMode={ResizeMode.COVER} // A COVER megtartja a képarányt és levágja a széleket
        shouldPlay
        isLooping
        isMuted
      />

      {/* 2. SÖTÉTÍTŐ RÉTEG: A teljes videóra rásimul a jobb olvashatóságért */}
      <View style={styles.overlay} />

      {/* 3. TARTALOM KONTÉNER: Ez tartja össze a felette lebegő elemeket */}
      <View style={styles.contentContainer}>
        
        {/* Felső menüsor */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.headerSide}>
            <MaterialCommunityIcons name="web" size={34} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.headerCenter} pointerEvents="none">
            <Image
              source={require('../../assets/images/tmwl_logo.png')}
              style={styles.centerLogo}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={[styles.headerSide, styles.headerSideRight]}>
            <Ionicons name="person-circle-outline" size={36} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* KÖZÉPSŐ RÉSZ: Szövegek */}
        <View style={styles.mainContent}>
          <Text style={styles.mainTitle}>Tomorrowland Belgium</Text>
          <Text style={styles.locationText}>DE SCHORRE • BOOM, BELGIUM</Text>

          <View style={styles.weekendContainer}>
            <Text style={styles.weekendTitle}>WEEKEND 1</Text>
            <Text style={styles.dateText}>JULY 17-19, 2026</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.weekendContainer}>
            <Text style={styles.weekendTitle}>WEEKEND 2</Text>
            <Text style={styles.dateText}>JULY 24-26, 2026</Text>
          </View>
        </View>

        {/* Alsó rész: Üdvözlő szöveg és Menü sáv */}
        <View style={styles.bottomSection}>
          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>Dear People of Tomorrow, Tomorrowland Belgium 2026 is officially sold out. /br 
              The love reached far beyond the capacity of the Holy Grounds, and it’s difficult knowing we can’t welcome everyone who dreamed of being there. 
              You are the magic that makes Tomorrowland live forever.</Text> 
          </View>

          <View style={styles.bottomNav}>
            <TouchableOpacity>
              <Ionicons name="home-outline" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="menu-outline" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject, // Rásimítja a teljes tartalom-réteget a videóra
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  headerSide: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSideRight: {
    alignItems: 'flex-end',
  },
  headerCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLogo: {
    width: 40,
    height: 40,
  },
  mainContent: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50%-os sötétítés az egész képernyőre
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  locationText: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 40,
    textAlign: 'center',
  },
  weekendContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  weekendTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
  },
  dateText: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  separator: {
    width: 60,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 15,
  },
  bottomSection: {
    width: '100%',
    backgroundColor: 'rgba(10, 10, 10, 0.6)', // Enyhén áttetsző sötét háttér
  },
  welcomeBox: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Áttetsző fekete a navigációnak
  },
});