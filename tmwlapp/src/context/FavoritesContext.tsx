import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '@/services/apiConfig';

export type FavoriteArtist = {
  name: string;
};

type FavoritesContextType = {
  favorites: FavoriteArtist[];
  toggleFavorite: (artist: FavoriteArtist) => void;
  isFavorite: (artistName: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteArtist[]>([]);
  const { user, signIn } = useAuth();
  
  const userId = user?.id || user?._id;

  // Load favorites when user changes
  useEffect(() => {
    if (user) {
      if (user.favorites) {
        setFavorites(user.favorites);
      } else {
        loadLocalFavorites();
      }
    } else {
      setFavorites([]);
    }
  }, [userId]);

  const loadLocalFavorites = async () => {
    try {
      const STORAGE_KEY = `favorites_${userId}`;
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const localFavs = JSON.parse(saved);
        setFavorites(localFavs);
        // Sync local to cloud if we just logged in
        syncFavoritesToCloud(localFavs);
      }
    } catch (e) {
      console.error('Failed to load local favorites', e);
    }
  };

  const syncFavoritesToCloud = async (newFavorites: FavoriteArtist[]) => {
    if (!userId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/user/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, favorites: newFavorites }),
      });
      if (response.ok) {
        const data = await response.json();
        // Update user context with new favorites
        if (user) {
          signIn({ ...user, favorites: data.favorites });
        }
      }
    } catch (e) {
      console.error('Failed to sync favorites to cloud', e);
    }
  };

  const toggleFavorite = (artist: FavoriteArtist) => {
    if (!user) return;
    
    const exists = favorites.some((fav) => fav.name === artist.name);
    let updated;
    if (exists) {
      updated = favorites.filter((fav) => fav.name !== artist.name);
    } else {
      updated = [...favorites, artist];
    }
    
    setFavorites(updated);
    syncFavoritesToCloud(updated);
    
    // Backup to local storage
    const STORAGE_KEY = `favorites_${userId}`;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isFavorite = (artistName: string) => {
    return favorites.some((fav) => fav.name === artistName);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Egyedi Hook a könnyebb használathoz
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('A useFavorites hookot a FavoritesProvider-en belül kell használni!');
  }
  return context;
};
