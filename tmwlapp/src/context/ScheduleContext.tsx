import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '@/services/apiConfig';

export type ScheduledGig = {
  artistName: string;
  date: string;
  start: string;
  end: string;
  stage: string;
};

type ScheduleResult = {
  success: boolean;
  error?: string;
  warning?: string;
  action?: 'added' | 'removed';
};

type ScheduleContextType = {
  schedule: ScheduledGig[];
  toggleSchedule: (gig: ScheduledGig) => ScheduleResult;
  isScheduled: (artistName: string, date: string, start: string) => boolean;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// Segédfüggvény az időpontok percekre váltásához (kezeli az éjfél utáni átnyúlást is)
const timeToMinutes = (timeStr: string) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

const getOverlapType = (gig1: ScheduledGig, gig2: ScheduledGig): 'none' | 'partial' | 'complete' => {
  if (gig1.date !== gig2.date) return 'none';
  
  let start1 = timeToMinutes(gig1.start);
  let end1 = timeToMinutes(gig1.end);
  if (end1 <= start1) end1 += 24 * 60; // Következő napra nyúlik
  
  let start2 = timeToMinutes(gig2.start);
  let end2 = timeToMinutes(gig2.end);
  if (end2 <= start2) end2 += 24 * 60; // Következő napra nyúlik
  
  // Átfedés van, ha az 1. kezdete hamarabb van, mint a 2. vége, ÉS a 2. kezdete hamarabb van, mint az 1. vége
  const overlaps = start1 < end2 && start2 < end1;
  if (!overlaps) return 'none';

  // Teljes ütközés: Az ÚJ gig (gig2) teljesen benne van a RÉGI gig (gig1) idejében.
  // Tehát az új gig semmi "új" szabad időt nem ad, 100%-ban ütközik.
  const isComplete = start2 >= start1 && end2 <= end1;
  
  return isComplete ? 'complete' : 'partial';
};

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [schedule, setSchedule] = useState<ScheduledGig[]>([]);
  const { user, signIn } = useAuth();
  
  const userId = user?.id || user?._id;

  // Load schedule when user changes
  useEffect(() => {
    if (user) {
      if (user.schedule) {
        setSchedule(user.schedule);
      } else {
        loadLocalSchedule();
      }
    } else {
      setSchedule([]);
    }
  }, [userId]);

  const loadLocalSchedule = async () => {
    try {
      const STORAGE_KEY = `schedule_${userId}`;
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const localSched = JSON.parse(saved);
        setSchedule(localSched);
        syncScheduleToCloud(localSched);
      }
    } catch (e) {
      console.error('Failed to load local schedule', e);
    }
  };

  const syncScheduleToCloud = async (newSchedule: ScheduledGig[]) => {
    if (!userId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/user/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, schedule: newSchedule }),
      });
      if (response.ok) {
        const data = await response.json();
        if (user) {
          signIn({ ...user, schedule: data.schedule });
        }
      }
    } catch (e) {
      console.error('Failed to sync schedule to cloud', e);
    }
  };

  const toggleSchedule = (gig: ScheduledGig): ScheduleResult => {
    if (!user) return { success: false, error: 'Not logged in' };
    
    // Uniqueness based on artist, date, and start time
    const exists = schedule.some((s) => s.artistName === gig.artistName && s.date === gig.date && s.start === gig.start);
    let updated;
    
    if (exists) {
      updated = schedule.filter((s) => !(s.artistName === gig.artistName && s.date === gig.date && s.start === gig.start));
      setSchedule(updated);
      syncScheduleToCloud(updated);
      const STORAGE_KEY = `schedule_${userId}`;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { success: true, action: 'removed' };
    } else {
      // Ütközés vizsgálata
      let hasPartial = false;
      let partialGig = null;

      for (const s of schedule) {
        const overlapType = getOverlapType(s, gig);
        if (overlapType === 'complete') {
          return { 
            success: false, 
            error: `You are already seeing ${s.artistName} at this time (${s.start} - ${s.end} at ${s.stage}). Cannot add gig.` 
          };
        } else if (overlapType === 'partial') {
          hasPartial = true;
          partialGig = s;
        }
      }

      updated = [...schedule, gig];
      setSchedule(updated);
      syncScheduleToCloud(updated);
      const STORAGE_KEY = `schedule_${userId}`;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      if (hasPartial && partialGig) {
        return { 
          success: true, 
          action: 'added', 
          warning: `Schedule Conflict:\nYou will miss part of this performance because it overlaps with ${partialGig.artistName} (${partialGig.start} - ${partialGig.end}).` 
        };
      }

      return { success: true, action: 'added' };
    }
  };

  const isScheduled = (artistName: string, date: string, start: string) => {
    return schedule.some((s) => s.artistName === artistName && s.date === date && s.start === start);
  };

  return (
    <ScheduleContext.Provider value={{ schedule, toggleSchedule, isScheduled }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
