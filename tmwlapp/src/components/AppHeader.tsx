import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

export function AppHeader() {
  const pathname = usePathname();
  const isContactActive = pathname === '/contact';
  const isUserActive = pathname === '/login' || pathname === '/user';

  const handleUserPress = () => {
    router.push('/user');
  };

  return (
    <View style={styles.heroHeader}>
      <TouchableOpacity style={styles.headerSide} onPress={() => router.push('/contact')}>
        <Ionicons name="information-circle-outline" size={36} color={isContactActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Image
          source={require('../../assets/images/tmwl_logo.png')}
          style={styles.centerLogo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={[styles.headerSide, styles.headerSideRight]} onPress={handleUserPress}>
        <Ionicons name="person-circle-outline" size={36} color={isUserActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heroHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 2,
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
    pointerEvents: 'none',
  },
  centerLogo: {
    width: 40,
    height: 40,
    tintColor: '#ffffff',
  },
});
