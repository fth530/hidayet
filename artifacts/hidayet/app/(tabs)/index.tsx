import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { useApp } from '@/context/AppContext';
import { lessons } from '@/data/lessons';

import ProgressOverview from '@/components/ProgressOverview';
import PrayerTimeCard from '@/components/PrayerTimeCard';

const { width } = Dimensions.get('window');

function getGreeting(lang: 'tr' | 'en'): { top: string; sub: string } {
  const hour = new Date().getHours();
  if (lang === 'tr') {
    if (hour >= 5 && hour < 12) return { top: 'Sabahul Khayr ☀️', sub: 'Bugün ne öğrenmek istersin?' };
    if (hour >= 12 && hour < 17) return { top: 'Merhaba 🌤️', sub: 'Bugün ne öğrenmek istersin?' };
    if (hour >= 17 && hour < 21) return { top: 'Mesaul Khayr 🌙', sub: 'Bugün ne öğrenmek istersin?' };
    return { top: 'Layla Saida ⭐', sub: 'Bugün ne öğrenmek istersin?' };
  } else {
    if (hour >= 5 && hour < 12) return { top: 'Sabahul Khayr ☀️', sub: 'What would you like to learn today?' };
    if (hour >= 12 && hour < 17) return { top: 'Hello 🌤️', sub: 'What would you like to learn today?' };
    if (hour >= 17 && hour < 21) return { top: 'Mesaul Khayr 🌙', sub: 'What would you like to learn today?' };
    return { top: 'Layla Saida ⭐', sub: 'What would you like to learn today?' };
  }
}

export default function HomeScreen() {
  const { progress, preferences } = useApp();
  const insets = useSafeAreaInsets();
  const lang = preferences.language;
  const greeting = getGreeting(lang);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const todayLesson = lessons.find((l) => l.day === progress.currentDay) || lessons[0];

  const quickAccessItems = [
    { icon: 'water-outline', labelTr: 'Abdest Rehberi', labelEn: 'Wudu Guide', route: '/(tabs)/guides' as const, color: Colors.blue },
    { icon: 'business-outline', labelTr: 'Namaz Rehberi', labelEn: 'Prayer Guide', route: '/(tabs)/guides' as const, color: Colors.green },
    { icon: 'book-outline', labelTr: 'Günlük Ayet', labelEn: 'Daily Verse', route: '/(tabs)/daily' as const, color: Colors.gold },
    { icon: 'help-circle-outline', labelTr: 'SSS', labelEn: 'FAQ', route: '/(tabs)/profile' as const, color: Colors.purple },
  ];

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: topPad + 16, paddingBottom: Platform.OS === 'web' ? 120 : 100 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Greeting */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingTop}>{greeting.top}</Text>
            <Text style={styles.greetingSub}>{greeting.sub}</Text>
          </View>

          {/* Progress Overview */}
          <ProgressOverview />

          {/* Prayer Times Card */}
          <PrayerTimeCard />

          {/* Today's Lesson */}
          <Pressable
            style={({ pressed }) => [styles.lessonCard, pressed && { transform: [{ scale: 0.97 }] }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push('/(tabs)/lessons');
            }}
          >
            <View style={styles.lessonGlow} />
            <View style={styles.lessonHeader}>
              <View style={styles.lessonDayBadge}>
                <Text style={styles.lessonDayNum}>{todayLesson.day}</Text>
              </View>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonDuration}>⏱ {todayLesson.duration}</Text>
              </View>
            </View>
            <Text style={styles.lessonLabel}>{lang === 'tr' ? 'Bugünün Dersi' : "Today's Lesson"}</Text>
            <Text style={styles.lessonTitle}>
              {lang === 'tr' ? todayLesson.titleTr : todayLesson.titleEn}
            </Text>
            <View style={styles.lessonStartBtn}>
              <Text style={styles.lessonStartText}>
                {lang === 'tr' ? 'Derse Başla' : 'Start Lesson'} →
              </Text>
            </View>
          </Pressable>

          {/* Quick Access */}
          <Text style={styles.sectionLabel}>{lang === 'tr' ? 'Hızlı Erişim' : 'Quick Access'}</Text>
          <View style={styles.quickGrid}>
            {quickAccessItems.map((item, idx) => (
              <Pressable
                key={idx}
                style={({ pressed }) => [
                  styles.quickCard,
                  pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  router.push(item.route);
                }}
              >
                <View style={[styles.quickIconBg, { backgroundColor: item.color + '25' }]}>
                  <Ionicons name={item.icon as any} size={26} color={item.color} />
                </View>
                <Text style={styles.quickLabel}>{lang === 'tr' ? item.labelTr : item.labelEn}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  greetingSection: { marginBottom: 24 },
  greetingTop: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  greetingSub: { fontSize: 15, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },

  lessonCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gold + '40',
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  lessonGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.gold + '12',
  },
  lessonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  lessonDayBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonDayNum: { fontSize: 14, fontWeight: '700', color: Colors.background, fontFamily: 'Inter_700Bold' },
  lessonMeta: {},
  lessonDuration: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  lessonLabel: { fontSize: 12, color: Colors.gold, fontFamily: 'Inter_500Medium', marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' },
  lessonTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold', marginBottom: 16, lineHeight: 26 },
  lessonStartBtn: {
    backgroundColor: Colors.gold,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  lessonStartText: { fontSize: 14, fontWeight: '600', color: Colors.background, fontFamily: 'Inter_600SemiBold' },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, fontFamily: 'Inter_600SemiBold', marginBottom: 12, letterSpacing: 0.3 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    alignItems: 'flex-start',
  },
  quickIconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  quickLabel: { fontSize: 13, fontWeight: '500', color: Colors.textPrimary, fontFamily: 'Inter_500Medium', lineHeight: 18 },
});
