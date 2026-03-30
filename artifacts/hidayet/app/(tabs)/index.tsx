import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
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
import {
  CITIES,
  CITY_LABELS,
  getNextPrayer,
  prayerTimesData,
} from '@/data/prayerTimes';

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
  const { progress, preferences, selectedCity, setCity } = useApp();
  const insets = useSafeAreaInsets();
  const lang = preferences.language;
  const greeting = getGreeting(lang);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [nextPrayerIndex, setNextPrayerIndex] = useState(() => getNextPrayer(selectedCity));

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    setNextPrayerIndex(getNextPrayer(selectedCity));
    const interval = setInterval(() => {
      setNextPrayerIndex(getNextPrayer(selectedCity));
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  const todayLesson = lessons.find((l) => l.day === progress.currentDay) || lessons[0];
  const completedCount = progress.completedDays.length;
  const progressPercent = (completedCount / 30) * 100;

  const prayers = prayerTimesData[selectedCity] ?? prayerTimesData['Istanbul'];

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
          <View style={styles.progressCard}>
            <View style={styles.progressRingContainer}>
              <View style={styles.progressRingOuter}>
                <View
                  style={[
                    styles.progressRingFill,
                    {
                      borderColor: Colors.gold,
                      borderTopColor: progressPercent > 25 ? Colors.gold : 'transparent',
                      borderRightColor: progressPercent > 50 ? Colors.gold : 'transparent',
                      borderBottomColor: progressPercent > 75 ? Colors.gold : 'transparent',
                    },
                  ]}
                />
                <View style={styles.progressRingInner}>
                  <Text style={styles.progressDayNum}>{completedCount}</Text>
                  <Text style={styles.progressDayLabel}>/30</Text>
                </View>
              </View>
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>
                {lang === 'tr' ? `Gün ${completedCount} / 30` : `Day ${completedCount} / 30`}
              </Text>
              <View style={[styles.levelBadge, { backgroundColor: Colors.goldLight }]}>
                <Text style={[styles.levelBadgeText, { color: Colors.gold }]}>{progress.level}</Text>
              </View>
              <View style={styles.streakRow}>
                <Text style={styles.streakFire}>🔥</Text>
                <Text style={styles.streakText}>
                  {progress.streak} {lang === 'tr' ? 'gün üst üste' : 'day streak'}
                </Text>
              </View>
            </View>
          </View>

          {/* Prayer Times Card */}
          <View style={styles.prayerCard}>
            <View style={styles.prayerCardHeader}>
              <View style={styles.prayerTitleRow}>
                <View style={styles.prayerIconBg}>
                  <Ionicons name="time-outline" size={16} color={Colors.green} />
                </View>
                <Text style={styles.prayerCardTitle}>
                  {lang === 'tr' ? 'Namaz Vakitleri' : 'Prayer Times'}
                </Text>
              </View>
              <Pressable
                style={styles.citySelector}
                onPress={() => {
                  Haptics.selectionAsync();
                  setCityModalVisible(true);
                }}
              >
                <Text style={styles.citySelectorText}>{CITY_LABELS[selectedCity] ?? selectedCity}</Text>
                <Ionicons name="chevron-down" size={12} color={Colors.green} />
              </Pressable>
            </View>

            <View style={styles.prayerRow}>
              {prayers.map((prayer, i) => {
                const isNext = i === nextPrayerIndex;
                return (
                  <View key={prayer.name} style={[styles.prayerItem, isNext && styles.prayerItemNext]}>
                    <Text style={[styles.prayerName, isNext && styles.prayerNameNext]}>
                      {lang === 'tr' ? prayer.nameTr : prayer.name}
                    </Text>
                    <Text style={[styles.prayerTime, isNext && styles.prayerTimeNext]}>
                      {prayer.time}
                    </Text>
                    {isNext && <View style={styles.prayerDot} />}
                  </View>
                );
              })}
            </View>
          </View>

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

      {/* City Picker Modal */}
      <Modal
        visible={cityModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCityModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setCityModalVisible(false)}>
          <View style={styles.cityModalContainer}>
            <View style={styles.cityModalHandle} />
            <Text style={styles.cityModalTitle}>
              {lang === 'tr' ? 'Şehir Seç' : 'Select City'}
            </Text>
            {CITIES.map((city) => (
              <Pressable
                key={city}
                style={[
                  styles.cityOption,
                  selectedCity === city && styles.cityOptionActive,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setCity(city);
                  setCityModalVisible(false);
                }}
              >
                <Text style={[styles.cityOptionText, selectedCity === city && styles.cityOptionTextActive]}>
                  {CITY_LABELS[city]}
                </Text>
                {selectedCity === city && (
                  <Ionicons name="checkmark" size={18} color={Colors.green} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
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
  progressCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressRingContainer: { marginRight: 20 },
  progressRingOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: Colors.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingFill: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
  },
  progressRingInner: { alignItems: 'center' },
  progressDayNum: { fontSize: 20, fontWeight: '700', color: Colors.gold, fontFamily: 'Inter_700Bold', lineHeight: 22 },
  progressDayLabel: { fontSize: 11, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  progressInfo: { flex: 1 },
  progressTitle: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary, fontFamily: 'Inter_600SemiBold', marginBottom: 6 },
  levelBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, alignSelf: 'flex-start', marginBottom: 6 },
  levelBadgeText: { fontSize: 12, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakFire: { fontSize: 14 },
  streakText: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },

  // Prayer Times
  prayerCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.green + '30',
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  prayerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  prayerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prayerIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.green + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.green + '15',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.green + '30',
  },
  citySelectorText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.green,
    fontFamily: 'Inter_600SemiBold',
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prayerItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    position: 'relative',
  },
  prayerItemNext: {
    backgroundColor: Colors.green + '18',
    borderWidth: 1,
    borderColor: Colors.green + '35',
  },
  prayerName: {
    fontSize: 10,
    color: Colors.textMuted,
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  prayerNameNext: {
    color: Colors.green,
  },
  prayerTime: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontFamily: 'Inter_600SemiBold',
  },
  prayerTimeNext: {
    color: Colors.textPrimary,
  },
  prayerDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.green,
  },

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

  // City Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  cityModalContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  cityModalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.divider,
    alignSelf: 'center',
    marginBottom: 20,
  },
  cityModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  cityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cityOptionActive: {
    backgroundColor: Colors.green + '15',
    borderColor: Colors.green + '30',
  },
  cityOptionText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: 'Inter_500Medium',
  },
  cityOptionTextActive: {
    color: Colors.green,
    fontFamily: 'Inter_600SemiBold',
  },
});
