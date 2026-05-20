import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/services/apiConfig';

type User = {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  favorites?: { name: string }[];
  schedule?: { artistName: string; date: string; start: string; end: string; stage: string }[];
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User, token?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // Fetch latest data from server silently to sync cross-device changes
        const userId = parsedUser.id || parsedUser._id;
        if (userId) {
          fetch(`${API_BASE_URL}/user/${userId}`)
            .then(res => res.json())
            .then(data => {
              if (data.user) {
                setUser(data.user);
                AsyncStorage.setItem('user', JSON.stringify(data.user));
              }
            })
            .catch(err => console.error('Silent sync failed:', err));
        }
      }
    } catch (e) {
      console.error('Failed to load user', e);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (userData: User, token?: string) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      await AsyncStorage.setItem('token', token);
    }
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signIn, 
      signOut, 
      isLoggedIn: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
