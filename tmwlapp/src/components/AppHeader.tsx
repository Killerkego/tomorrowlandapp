import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

type AppHeaderProps = {
  showBack?: boolean;
  transparent?: boolean;
};

export function AppHeader({ showBack = false, transparent = false }: AppHeaderProps = {}) {
  const pathname = usePathname();
  const isContactActive = pathname === '/contact';
  const isUserActive = pathname === '/login' || pathname === '/user' || pathname === '/register';

  const handleUserPress = () => {
    router.push('/user');
  };

  return (
    <View style={[styles.heroHeader, transparent && styles.heroHeaderTransparent]}>
      {showBack ? (
        <TouchableOpacity style={styles.headerSide} onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/lineup');
          }
        }}>
          <Ionicons name="chevron-back" size={28} color="#ffffff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.headerSide} onPress={() => router.push('/contact')}>
          <Ionicons name="information-circle-outline" size={36} color={isContactActive ? '#d4af37' : '#ffffff'} />
        </TouchableOpacity>
      )}

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
  heroHeaderTransparent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
    pointerEvents: 'none',
  },
  centerLogo: {
    width: 40,
    height: 40,
    tintColor: '#ffffff',
  },
});
