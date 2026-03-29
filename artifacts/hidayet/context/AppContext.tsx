import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Progress {
  currentDay: number;
  completedDays: number[];
  streak: number;
  lastStudiedDate: string | null;
  totalMinutes: number;
  level: 'Temel' | 'Orta' | 'İleri';
}

export interface Preferences {
  language: 'tr' | 'en';
  dhikrTarget: number;
}

export interface DhikrCount {
  date: string;
  subhanallah: number;
  alhamdulillah: number;
  allahuakbar: number;
}

interface AppContextType {
  progress: Progress;
  preferences: Preferences;
  dhikrCount: DhikrCount;
  bookmarks: number[];
  selectedCity: string;
  onboardingDone: boolean;
  setLanguage: (lang: 'tr' | 'en') => void;
  completeDay: (day: number) => Promise<void>;
  resetProgress: () => Promise<void>;
  incrementDhikr: (type: 'subhanallah' | 'alhamdulillah' | 'allahuakbar') => Promise<void>;
  resetDhikr: (type: 'subhanallah' | 'alhamdulillah' | 'allahuakbar') => Promise<void>;
  toggleBookmark: (day: number) => Promise<void>;
  setCity: (city: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const defaultProgress: Progress = {
  currentDay: 1,
  completedDays: [],
  streak: 0,
  lastStudiedDate: null,
  totalMinutes: 0,
  level: 'Temel',
};

const defaultPreferences: Preferences = {
  language: 'tr',
  dhikrTarget: 33,
};

const today = new Date().toISOString().split('T')[0];
const defaultDhikr: DhikrCount = {
  date: today,
  subhanallah: 0,
  alhamdulillah: 0,
  allahuakbar: 0,
};

const AppContext = createContext<AppContextType>({
  progress: defaultProgress,
  preferences: defaultPreferences,
  dhikrCount: defaultDhikr,
  bookmarks: [],
  selectedCity: 'Istanbul',
  onboardingDone: false,
  setLanguage: () => {},
  completeDay: async () => {},
  resetProgress: async () => {},
  incrementDhikr: async () => {},
  resetDhikr: async () => {},
  toggleBookmark: async () => {},
  setCity: async () => {},
  completeOnboarding: async () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [dhikrCount, setDhikrCount] = useState<DhikrCount>(defaultDhikr);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [selectedCity, setSelectedCityState] = useState<string>('Istanbul');
  const [onboardingDone, setOnboardingDone] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [progressData, prefsData, dhikrData, bookmarksData, cityData, onboardingData] =
        await Promise.all([
          AsyncStorage.getItem('progress'),
          AsyncStorage.getItem('preferences'),
          AsyncStorage.getItem('dhikr'),
          AsyncStorage.getItem('bookmarks'),
          AsyncStorage.getItem('selectedCity'),
          AsyncStorage.getItem('onboarding_done'),
        ]);

      if (progressData) {
        const parsed = JSON.parse(progressData) as Progress;
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        let streak = parsed.streak;
        if (parsed.lastStudiedDate !== todayStr && parsed.lastStudiedDate !== yesterday) {
          streak = 0;
        }
        setProgress({ ...parsed, streak });
      }

      if (prefsData) setPreferences(JSON.parse(prefsData));

      if (dhikrData) {
        const parsed = JSON.parse(dhikrData) as DhikrCount;
        const todayStr = new Date().toISOString().split('T')[0];
        if (parsed.date !== todayStr) {
          const fresh = { date: todayStr, subhanallah: 0, alhamdulillah: 0, allahuakbar: 0 };
          setDhikrCount(fresh);
          await AsyncStorage.setItem('dhikr', JSON.stringify(fresh));
        } else {
          setDhikrCount(parsed);
        }
      }

      if (bookmarksData) setBookmarks(JSON.parse(bookmarksData));
      if (cityData) setSelectedCityState(cityData);
      if (onboardingData === 'true') setOnboardingDone(true);
    } catch (e) {}
  };

  const getLevel = (completedCount: number): Progress['level'] => {
    if (completedCount >= 20) return 'İleri';
    if (completedCount >= 10) return 'Orta';
    return 'Temel';
  };

  const completeDay = async (day: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newCompleted = progress.completedDays.includes(day)
      ? progress.completedDays
      : [...progress.completedDays, day].sort((a, b) => a - b);

    const newStreak =
      progress.lastStudiedDate === todayStr
        ? progress.streak
        : progress.lastStudiedDate ===
          new Date(Date.now() - 86400000).toISOString().split('T')[0]
        ? progress.streak + 1
        : 1;

    const newCurrentDay =
      Math.max(...newCompleted) + 1 <= 30 ? Math.max(...newCompleted) + 1 : 30;
    const level = getLevel(newCompleted.length);

    const newProgress: Progress = {
      ...progress,
      completedDays: newCompleted,
      currentDay: newCurrentDay,
      streak: newStreak,
      lastStudiedDate: todayStr,
      totalMinutes: progress.totalMinutes + 5,
      level,
    };

    setProgress(newProgress);
    await AsyncStorage.setItem('progress', JSON.stringify(newProgress));
  };

  const resetProgress = async () => {
    setProgress(defaultProgress);
    await AsyncStorage.setItem('progress', JSON.stringify(defaultProgress));
  };

  const setLanguage = async (lang: 'tr' | 'en') => {
    const newPrefs = { ...preferences, language: lang };
    setPreferences(newPrefs);
    await AsyncStorage.setItem('preferences', JSON.stringify(newPrefs));
  };

  const incrementDhikr = async (type: 'subhanallah' | 'alhamdulillah' | 'allahuakbar') => {
    const todayStr = new Date().toISOString().split('T')[0];
    const base =
      dhikrCount.date !== todayStr
        ? { date: todayStr, subhanallah: 0, alhamdulillah: 0, allahuakbar: 0 }
        : dhikrCount;
    const newDhikr = { ...base, [type]: base[type] + 1 };
    setDhikrCount(newDhikr);
    await AsyncStorage.setItem('dhikr', JSON.stringify(newDhikr));
  };

  const resetDhikr = async (type: 'subhanallah' | 'alhamdulillah' | 'allahuakbar') => {
    const newDhikr = { ...dhikrCount, [type]: 0 };
    setDhikrCount(newDhikr);
    await AsyncStorage.setItem('dhikr', JSON.stringify(newDhikr));
  };

  const toggleBookmark = async (day: number) => {
    const newBookmarks = bookmarks.includes(day)
      ? bookmarks.filter((d) => d !== day)
      : [...bookmarks, day].sort((a, b) => a - b);
    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  const setCity = async (city: string) => {
    setSelectedCityState(city);
    await AsyncStorage.setItem('selectedCity', city);
  };

  const completeOnboarding = async () => {
    setOnboardingDone(true);
    await AsyncStorage.setItem('onboarding_done', 'true');
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        preferences,
        dhikrCount,
        bookmarks,
        selectedCity,
        onboardingDone,
        setLanguage,
        completeDay,
        resetProgress,
        incrementDhikr,
        resetDhikr,
        toggleBookmark,
        setCity,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
