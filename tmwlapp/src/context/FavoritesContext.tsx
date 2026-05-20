import React, { createContext, useState, useContext, ReactNode } from 'react';

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

  const toggleFavorite = (artist: FavoriteArtist) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.name === artist.name);
      if (exists) {
        return prev.filter((fav) => fav.name !== artist.name);
      } else {
        return [...prev, artist];
      }
    });
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
