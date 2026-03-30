import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
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
import { prayerSteps, wuduSteps } from '@/data/guides';

const { width } = Dimensions.get('window');

export default function GuidesScreen() {
  const { preferences } = useApp();
  const insets = useSafeAreaInsets();
  const lang = preferences.language;
  const [activeGuide, setActiveGuide] = useState<'wudu' | 'prayer'>('wudu');
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const steps = activeGuide === 'wudu' ? wuduSteps : prayerSteps;
  const totalSteps = steps.length;

  const switchGuide = (guide: 'wudu' | 'prayer') => {
    if (guide === activeGuide) return;
    Haptics.selectionAsync();
    setActiveGuide(guide);
    setCurrentStep(0);
  };

  const animate = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      animate();
      setTimeout(() => setCurrentStep((s) => s + 1), 120);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      animate();
      setTimeout(() => setCurrentStep((s) => s - 1), 120);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const currentWudu = wuduSteps[currentStep];
  const currentPrayer = prayerSteps[currentStep];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Text style={styles.headerTitle}>{lang === 'tr' ? 'Rehber' : 'Guide'}</Text>
        <Text style={styles.headerSub}>
          {lang === 'tr' ? 'Adım adım rehber' : 'Step-by-step guide'}
        </Text>
      </View>

      {/* Guide Selector */}
      <View style={styles.selector}>
        <Pressable
          style={[styles.selectorTab, activeGuide === 'wudu' && styles.selectorActive]}
          onPress={() => switchGuide('wudu')}
        >
          <Ionicons name="water-outline" size={16} color={activeGuide === 'wudu' ? Colors.background : Colors.textSecondary} />
          <Text style={[styles.selectorText, activeGuide === 'wudu' && styles.selectorActiveText]}>
            {lang === 'tr' ? 'Abdest' : 'Wudu'}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.selectorTab, activeGuide === 'prayer' && styles.selectorActive]}
          onPress={() => switchGuide('prayer')}
        >
          <Ionicons name="business-outline" size={16} color={activeGuide === 'prayer' ? Colors.background : Colors.textSecondary} />
          <Text style={[styles.selectorText, activeGuide === 'prayer' && styles.selectorActiveText]}>
            {lang === 'tr' ? 'Namaz' : 'Prayer'}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
        {/* Step Card */}
        <Animated.View style={[styles.stepCard, { opacity: fadeAnim }]}>
          <View style={styles.stepNumRow}>
            <View style={[styles.stepNumBadge, { backgroundColor: activeGuide === 'wudu' ? Colors.blue : Colors.green }]}>
              <Text style={styles.stepNumText}>
                {lang === 'tr' ? `Adım ${currentStep + 1}` : `Step ${currentStep + 1}`}
              </Text>
            </View>
            <Text style={styles.stepTotal}>/ {totalSteps}</Text>
          </View>

          <View style={styles.stepIconBg}>
            <Ionicons
              name={
                (activeGuide === 'wudu'
                  ? currentWudu?.icon
                  : currentPrayer?.icon) as any ?? 'star'
              }
              size={48}
              color={activeGuide === 'wudu' ? Colors.blue : Colors.green}
            />
          </View>

          <Text style={styles.stepTitle}>
            {activeGuide === 'wudu'
              ? lang === 'tr' ? currentWudu?.titleTr : currentWudu?.titleEn
              : lang === 'tr' ? currentPrayer?.nameTr : currentPrayer?.nameEn}
          </Text>

          <Text style={styles.stepDesc}>
            {activeGuide === 'wudu'
              ? lang === 'tr' ? currentWudu?.descTr : currentWudu?.descEn
              : lang === 'tr' ? currentPrayer?.descTr : currentPrayer?.descEn}
          </Text>

          {activeGuide === 'prayer' && (
            <View style={styles.reciteBox}>
              <Text style={styles.reciteLabel}>{lang === 'tr' ? 'Okunacak:' : 'Recite:'}</Text>
              <Text style={styles.reciteText}>
                {lang === 'tr' ? currentPrayer?.reciteTr : currentPrayer?.reciteEn}
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <Pressable
              key={i}
              style={[
                styles.dot,
                i === currentStep && styles.dotActive,
                i < currentStep && styles.dotCompleted,
              ]}
              onPress={() => {
                animate();
                setTimeout(() => setCurrentStep(i), 120);
              }}
            />
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navRow}>
          <Pressable
            style={[styles.navBtn, currentStep === 0 && styles.navBtnDisabled]}
            onPress={goPrev}
            disabled={currentStep === 0}
          >
            <Ionicons name="chevron-back" size={22} color={currentStep === 0 ? Colors.textMuted : Colors.textPrimary} />
            <Text style={[styles.navBtnText, currentStep === 0 && { color: Colors.textMuted }]}>
              {lang === 'tr' ? 'Geri' : 'Back'}
            </Text>
          </Pressable>

          {currentStep === totalSteps - 1 ? (
            <Pressable
              style={[styles.navBtn, styles.navBtnFinish]}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                setCurrentStep(0);
              }}
            >
              <Text style={[styles.navBtnText, { color: Colors.background }]}>
                {lang === 'tr' ? '✓ Tamamlandı' : '✓ Done'}
              </Text>
            </Pressable>
          ) : (
            <Pressable style={[styles.navBtn, styles.navBtnNext]} onPress={goNext}>
              <Text style={[styles.navBtnText, { color: Colors.background }]}>
                {lang === 'tr' ? 'İleri' : 'Next'}
              </Text>
              <Ionicons name="chevron-forward" size={22} color={Colors.background} />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold' },
  headerSub: { fontSize: 14, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 4 },
  selector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 4,
    marginBottom: 20,
  },
  selectorTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  selectorActive: { backgroundColor: Colors.gold },
  selectorText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, fontFamily: 'Inter_600SemiBold' },
  selectorActiveText: { color: Colors.background },
  stepCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 28,
    alignItems: 'center',
    minHeight: 320,
    justifyContent: 'center',
  },
  stepNumRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 },
  stepNumBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  stepNumText: { fontSize: 12, fontWeight: '600', color: Colors.background, fontFamily: 'Inter_600SemiBold' },
  stepTotal: { fontSize: 13, color: Colors.textMuted, fontFamily: 'Inter_400Regular' },
  stepIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold', textAlign: 'center', marginBottom: 12 },
  stepDesc: { fontSize: 15, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 24, marginBottom: 16 },
  reciteBox: {
    backgroundColor: Colors.green + '15',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.green,
    alignSelf: 'stretch',
  },
  reciteLabel: { fontSize: 11, color: Colors.green, fontFamily: 'Inter_600SemiBold', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  reciteText: { fontSize: 14, color: Colors.textPrimary, fontFamily: 'Inter_500Medium', lineHeight: 20 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.cardBorder },
  dotActive: { width: 18, height: 6, backgroundColor: Colors.gold, borderRadius: 3 },
  dotCompleted: { backgroundColor: Colors.gold + '60' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20, gap: 12 },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 4,
  },
  navBtnDisabled: { opacity: 0.4 },
  navBtnNext: { backgroundColor: Colors.green, borderColor: Colors.green },
  navBtnFinish: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  navBtnText: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, fontFamily: 'Inter_600SemiBold' },
});
