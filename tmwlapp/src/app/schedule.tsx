import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './index.styles';

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.screen}>
        {/* Felső menüsor */}
        <AppHeader />

        {/* Fő tartalom */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
          <Text style={{ color: '#d4af37', fontSize: 28, fontWeight: '700', letterSpacing: 1 }}>My Schedule</Text>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginTop: 12 }}>Coming soon...</Text>
        </View>

        {/* Alsó menüsáv */}
        <AppBottomNav />
      </View>
    </SafeAreaView>
  );
}
