import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  Alert,
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
import { faqs } from '@/data/faqs';

export default function ProfileScreen() {
  const { progress, preferences, setLanguage, resetProgress } = useApp();
  const insets = useSafeAreaInsets();
  const lang = preferences.language;
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const levelEmoji = progress.level === 'Temel' ? '🌙' : progress.level === 'Orta' ? '⭐' : '☀️';

  const handleReset = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        lang === 'tr'
          ? 'Tüm ilerlemeniz silinecek. Emin misiniz?'
          : 'All your progress will be deleted. Are you sure?'
      );
      if (confirmed) {
        resetProgress();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } else {
      Alert.alert(
        lang === 'tr' ? 'İlerlemeyi Sıfırla' : 'Reset Progress',
        lang === 'tr'
          ? 'Tüm ilerlemeniz silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?'
          : 'All your progress will be deleted. This action cannot be undone. Do you want to continue?',
        [
          { text: lang === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
          {
            text: lang === 'tr' ? 'Sıfırla' : 'Reset',
            style: 'destructive',
            onPress: () => {
              resetProgress();
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: topPad + 16, paddingBottom: Platform.OS === 'web' ? 120 : 100 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>{lang === 'tr' ? 'Profil' : 'Profile'}</Text>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <Text style={styles.levelEmoji}>{levelEmoji}</Text>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>{progress.level}</Text>
            <Text style={styles.levelDesc}>
              {progress.level === 'Temel' ? (lang === 'tr' ? 'Gün 1-10' : 'Day 1-10') :
               progress.level === 'Orta' ? (lang === 'tr' ? 'Gün 11-20' : 'Day 11-20') :
               (lang === 'tr' ? 'Gün 21-30' : 'Day 21-30')}
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{progress.completedDays.length}</Text>
            <Text style={styles.statLabel}>{lang === 'tr' ? 'Ders' : 'Lessons'}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>🔥 {progress.streak}</Text>
            <Text style={styles.statLabel}>{lang === 'tr' ? 'Seri' : 'Streak'}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{progress.totalMinutes}</Text>
            <Text style={styles.statLabel}>{lang === 'tr' ? 'Dakika' : 'Minutes'}</Text>
          </View>
        </View>

        {/* Language Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{lang === 'tr' ? 'Dil / Language' : 'Language / Dil'}</Text>
          <View style={styles.langRow}>
            <Pressable
              style={[styles.langBtn, lang === 'tr' && styles.langBtnActive]}
              onPress={() => { setLanguage('tr'); Haptics.selectionAsync(); }}
            >
              <Text style={styles.langFlag}>🇹🇷</Text>
              <Text style={[styles.langText, lang === 'tr' && { color: Colors.background }]}>Türkçe</Text>
            </Pressable>
            <Pressable
              style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
              onPress={() => { setLanguage('en'); Haptics.selectionAsync(); }}
            >
              <Text style={styles.langFlag}>🇬🇧</Text>
              <Text style={[styles.langText, lang === 'en' && { color: Colors.background }]}>English</Text>
            </Pressable>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{lang === 'tr' ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}</Text>
          {faqs.map((faq) => (
            <Pressable
              key={faq.id}
              style={styles.faqCard}
              onPress={() => {
                setExpandedFaq(expandedFaq === faq.id ? null : faq.id);
                Haptics.selectionAsync();
              }}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>
                  {lang === 'tr' ? faq.questionTr : faq.questionEn}
                </Text>
                <Ionicons
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={Colors.textMuted}
                />
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>
                  {lang === 'tr' ? faq.answerTr : faq.answerEn}
                </Text>
              )}
            </Pressable>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{lang === 'tr' ? 'Ayarlar' : 'Settings'}</Text>
          <Pressable style={styles.settingRow} onPress={handleReset}>
            <Ionicons name="refresh-outline" size={18} color={Colors.orange} />
            <Text style={[styles.settingText, { color: Colors.orange }]}>
              {lang === 'tr' ? 'İlerlemeyi Sıfırla' : 'Reset Progress'}
            </Text>
          </Pressable>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Ionicons name="information-circle-outline" size={18} color={Colors.textMuted} />
            <Text style={styles.settingText}>Hidayet v1.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold', marginBottom: 20 },
  levelCard: {
    backgroundColor: Colors.goldLight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gold + '40',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  levelEmoji: { fontSize: 40 },
  levelInfo: {},
  levelName: { fontSize: 22, fontWeight: '700', color: Colors.gold, fontFamily: 'Inter_700Bold' },
  levelDesc: { fontSize: 13, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    alignItems: 'center',
  },
  statNum: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  statLabel: { fontSize: 11, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, fontFamily: 'Inter_600SemiBold', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  langRow: { flexDirection: 'row', gap: 12 },
  langBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 12,
    gap: 8,
  },
  langBtnActive: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  langFlag: { fontSize: 18 },
  langText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, fontFamily: 'Inter_600SemiBold' },
  faqCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    marginBottom: 8,
  },
  faqHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '500', color: Colors.textPrimary, fontFamily: 'Inter_500Medium', lineHeight: 20 },
  faqAnswer: { fontSize: 14, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', lineHeight: 22, marginTop: 12 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 12,
  },
  settingText: { fontSize: 14, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
});
