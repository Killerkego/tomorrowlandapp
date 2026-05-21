import React, { createContext, useState, useContext, ReactNode } from 'react';

type SoloUser = {
  _id: string;
  username: string;
  fullName?: string;
  profilePicture?: string | null;
  location?: { latitude: number; longitude: number };
};

type TrackContextType = {
  trackedUser: SoloUser | null;
  setTrackedUser: (user: SoloUser | null) => void;
};

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export function TrackProvider({ children }: { children: ReactNode }) {
  const [trackedUser, setTrackedUser] = useState<SoloUser | null>(null);

  return (
    <TrackContext.Provider value={{ trackedUser, setTrackedUser }}>
      {children}
    </TrackContext.Provider>
  );
}

export const useTrack = () => {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return context;
};
