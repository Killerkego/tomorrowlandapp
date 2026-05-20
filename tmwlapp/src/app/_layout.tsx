import '@/global.css';

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ScheduleProvider } from '@/context/ScheduleContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ScheduleProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaProvider>
        </ScheduleProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
