import '@/global.css';

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ScheduleProvider } from '@/context/ScheduleContext';
import { AuthProvider } from '@/context/AuthContext';
import { TrackProvider } from '@/context/TrackContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ScheduleProvider>
          <TrackProvider>
            <SafeAreaProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
          </TrackProvider>
        </ScheduleProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
