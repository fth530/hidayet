import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import {
  Animated,
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
import { dailyDuas, dailyVerses } from '@/data/verses';

export default function DailyScreen() {
  const { preferences, dhikrCount, incrementDhikr, resetDhikr } = useApp();
  const insets = useSafeAreaInsets();
  const lang = preferences.language;
  const [activeTab, setActiveTab] = useState<'verse' | 'dua' | 'dhikr'>('verse');
  const [learnedDuas, setLearnedDuas] = useState<number[]>([]);
  const [activeDhikr, setActiveDhikr] = useState<'subhanallah' | 'alhamdulillah' | 'allahuakbar'>('subhanallah');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const todayVerse = dailyVerses[dayOfYear % dailyVerses.length];
  const todayDua = dailyDuas[dayOfYear % dailyDuas.length];

  const dhikrLabels = {
    subhanallah: 'Sübhanallah',
    alhamdulillah: 'Elhamdülillah',
    allahuakbar: 'Allahu Ekber',
  };

  const dhikrTarget = preferences.dhikrTarget;
  const currentCount = dhikrCount[activeDhikr];

  const handleDhikrTap = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 0.94, duration: 80, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    await incrementDhikr(activeDhikr);
    if ((dhikrCount[activeDhikr] + 1) % dhikrTarget === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Text style={styles.headerTitle}>{lang === 'tr' ? 'Günlük' : 'Daily'}</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabRow}>
        {(['verse', 'dua', 'dhikr'] as const).map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => { setActiveTab(tab); Haptics.selectionAsync(); }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'verse' ? (lang === 'tr' ? 'Ayet' : 'Verse') :
               tab === 'dua' ? (lang === 'tr' ? 'Dua' : 'Du\'a') :
               (lang === 'tr' ? 'Zikir' : 'Dhikr')}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: Platform.OS === 'web' ? 120 : 100 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* VERSE TAB */}
        {activeTab === 'verse' && (
          <View style={styles.verseCard}>
            <View style={styles.verseHeader}>
              <Text style={styles.verseRef}>{todayVerse.ref}</Text>
              <Text style={styles.veruseSurah}>
                {lang === 'tr' ? todayVerse.surahTr : todayVerse.surahEn}
              </Text>
            </View>
            <Text style={styles.arabicText}>{todayVerse.arabic}</Text>
            <Text style={styles.transliteration}>{todayVerse.transliteration}</Text>
            <View style={styles.divider} />
            <Text style={styles.meaningLabel}>{lang === 'tr' ? 'Türkçe Anlam' : 'English Meaning'}</Text>
            <Text style={styles.meaningText}>{lang === 'tr' ? todayVerse.turkish : todayVerse.english}</Text>
          </View>
        )}

        {/* DUA TAB */}
        {activeTab === 'dua' && (
          <View style={styles.duaCard}>
            <View style={styles.duaOccasionBadge}>
              <Text style={styles.duaOccasionText}>
                {lang === 'tr' ? todayDua.occasionTr : todayDua.occasionEn}
              </Text>
            </View>
            <Text style={styles.arabicText}>{todayDua.arabic}</Text>
            <Text style={styles.transliteration}>{todayDua.transliteration}</Text>
            <View style={styles.divider} />
            <Text style={styles.meaningText}>{lang === 'tr' ? todayDua.turkish : todayDua.english}</Text>
            <Pressable
              style={[
                styles.learnedBtn,
                learnedDuas.includes(todayDua.id) && styles.learnedBtnDone,
              ]}
              onPress={() => {
                if (learnedDuas.includes(todayDua.id)) {
                  setLearnedDuas((prev) => prev.filter((id) => id !== todayDua.id));
                } else {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  setLearnedDuas((prev) => [...prev, todayDua.id]);
                }
              }}
            >
              <Text style={styles.learnedBtnText}>
                {learnedDuas.includes(todayDua.id)
                  ? (lang === 'tr' ? '✅ Öğrendim' : '✅ Learned')
                  : (lang === 'tr' ? 'Bu Duayı Öğrendim ✓' : 'I Learned This Du\'a ✓')}
              </Text>
            </Pressable>
          </View>
        )}

        {/* DHIKR TAB */}
        {activeTab === 'dhikr' && (
          <View style={styles.dhikrSection}>
            {/* Selector */}
            <View style={styles.dhikrSelector}>
              {(['subhanallah', 'alhamdulillah', 'allahuakbar'] as const).map((type) => (
                <Pressable
                  key={type}
                  style={[styles.dhikrSelectBtn, activeDhikr === type && styles.dhikrSelectActive]}
                  onPress={() => { setActiveDhikr(type); Haptics.selectionAsync(); }}
                >
                  <Text style={[styles.dhikrSelectText, activeDhikr === type && { color: Colors.background }]}>
                    {dhikrLabels[type]}
                  </Text>
                  <Text style={[styles.dhikrCount, activeDhikr === type && { color: Colors.background + 'cc' }]}>
                    {dhikrCount[type]}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Big Counter Button */}
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Pressable style={styles.dhikrBtn} onPress={handleDhikrTap}>
                <Text style={styles.dhikrBtnCount}>{currentCount}</Text>
                <Text style={styles.dhikrBtnLabel}>{dhikrLabels[activeDhikr]}</Text>
                <View style={styles.dhikrProgress}>
                  <View
                    style={[
                      styles.dhikrProgressFill,
                      { width: `${Math.min(100, (currentCount % dhikrTarget) / dhikrTarget * 100)}%` as any },
                    ]}
                  />
                </View>
                <Text style={styles.dhikrTarget}>
                  {currentCount % dhikrTarget} / {dhikrTarget}
                </Text>
              </Pressable>
            </Animated.View>

            {/* Quick Presets */}
            <View style={styles.presetsRow}>
              {([33, 99] as const).map((n) => (
                <Pressable
                  key={n}
                  style={styles.presetBtn}
                  onPress={() => { setActiveDhikr('subhanallah'); Haptics.selectionAsync(); }}
                >
                  <Text style={styles.presetText}>×{n}</Text>
                </Pressable>
              ))}
            </View>

            {/* Reset */}
            <Pressable
              style={styles.resetBtn}
              onPress={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                await resetDhikr(activeDhikr);
              }}
            >
              <Text style={styles.resetText}>{lang === 'tr' ? 'Sıfırla' : 'Reset'}</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold' },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 4,
    marginBottom: 20,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 10 },
  tabActive: { backgroundColor: Colors.gold },
  tabText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, fontFamily: 'Inter_600SemiBold' },
  tabTextActive: { color: Colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20 },
  verseCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 24,
  },
  verseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  verseRef: { fontSize: 13, color: Colors.gold, fontFamily: 'Inter_600SemiBold' },
  veruseSurah: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  arabicText: { fontSize: 26, color: Colors.gold, textAlign: 'center', lineHeight: 44, marginBottom: 12, fontWeight: '400' },
  transliteration: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', fontStyle: 'italic', fontFamily: 'Inter_400Regular', lineHeight: 24, marginBottom: 16 },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: 16 },
  meaningLabel: { fontSize: 11, color: Colors.gold, fontFamily: 'Inter_600SemiBold', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  meaningText: { fontSize: 15, color: Colors.textPrimary, fontFamily: 'Inter_400Regular', lineHeight: 24 },
  duaCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 24,
  },
  duaOccasionBadge: {
    backgroundColor: Colors.green + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  duaOccasionText: { fontSize: 12, color: Colors.green, fontFamily: 'Inter_600SemiBold' },
  learnedBtn: {
    backgroundColor: Colors.gold,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 20,
  },
  learnedBtnDone: { backgroundColor: Colors.green },
  learnedBtnText: { fontSize: 14, fontWeight: '600', color: Colors.background, fontFamily: 'Inter_600SemiBold' },
  dhikrSection: { alignItems: 'center' },
  dhikrSelector: { flexDirection: 'row', gap: 8, marginBottom: 32, width: '100%' },
  dhikrSelectBtn: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  dhikrSelectActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  dhikrSelectText: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary, fontFamily: 'Inter_600SemiBold', textAlign: 'center', marginBottom: 4 },
  dhikrCount: { fontSize: 16, fontWeight: '700', color: Colors.gold, fontFamily: 'Inter_700Bold' },
  dhikrBtn: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: Colors.gold,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  dhikrBtnCount: { fontSize: 48, fontWeight: '700', color: Colors.background, fontFamily: 'Inter_700Bold', lineHeight: 52 },
  dhikrBtnLabel: { fontSize: 13, fontWeight: '500', color: Colors.background + 'cc', fontFamily: 'Inter_500Medium', marginBottom: 12 },
  dhikrProgress: { width: 120, height: 4, backgroundColor: Colors.background + '40', borderRadius: 2, overflow: 'hidden' },
  dhikrProgressFill: { height: '100%', backgroundColor: Colors.background, borderRadius: 2 },
  dhikrTarget: { fontSize: 12, color: Colors.background + 'aa', fontFamily: 'Inter_400Regular', marginTop: 6 },
  presetsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  presetBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  presetText: { fontSize: 14, fontWeight: '600', color: Colors.gold, fontFamily: 'Inter_600SemiBold' },
  resetBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  resetText: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular' },
});
