import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './index.styles';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={localStyles.center}>
        <Text style={localStyles.emoji}>🗺️</Text>
        <Text style={localStyles.title}>Térkép csak mobilon elérhető</Text>
        <Text style={localStyles.sub}>
          Töltsd le az appot iOS vagy Android eszközödre a teljes térképélményért!
        </Text>
      </View>
      <AppBottomNav />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 32,
    gap: 12,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  sub: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});
