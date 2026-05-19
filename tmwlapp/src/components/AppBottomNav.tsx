import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppBottomNav() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isHomeActive = pathname === '/' || pathname === '/index';
  const isLineupActive = pathname === '/lineup';
  const isFavoriteActive = pathname === '/favorite';
  const isMapActive = pathname === '/map';
  const isMenuActive = pathname === '/menu';

  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Ionicons name="home-outline" size={32} color={isHomeActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/lineup')}>
        <Ionicons name="musical-notes-outline" size={32} color={isLineupActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/favorite')}>
        <Ionicons name="heart-outline" size={32} color={isFavoriteActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/map')}>
        <Ionicons name="map-outline" size={32} color={isMapActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/menu')}>
        <Ionicons name="menu-outline" size={36} color={isMenuActive ? '#d4af37' : '#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 14,
    minHeight: 62,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#000000',
  },
});
