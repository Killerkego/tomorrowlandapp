import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './index.styles';

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.screen}>
        {/* Felső menüsor */}
        <AppHeader />

        {/* Fő tartalom */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
          <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '500' }}>contact details</Text>
        </View>

        {/* Alsó menüsáv */}
        <AppBottomNav />
      </View>
    </SafeAreaView>
  );
}
