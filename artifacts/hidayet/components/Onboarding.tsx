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
import { Colors } from '@/constants/colors';
import { useApp } from '@/context/AppContext';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    emoji: '🕌',
    titleTr: "Hidayet'e\nHoş Geldin",
    subtitleTr: 'Yeni Müslümanlar için adım adım rehber',
    titleEn: 'Welcome to\nHidayet',
    subtitleEn: 'A step-by-step guide for new Muslims',
  },
  {
    emoji: '📚',
    titleTr: '30 Günde\nTemel İslam',
    subtitleTr: 'Her gün 5 dakika. İman, namaz, Kur\'an ve günlük hayat',
    titleEn: 'Islamic Basics\nin 30 Days',
    subtitleEn: '5 minutes each day. Faith, prayer, Quran and daily life',
  },
  {
    emoji: '🤲',
    titleTr: 'Hadi\nBaşlayalım',
    subtitleTr: 'Allah yolunuzu kolaylaştırsın. Sabır ile, sevgi ile',
    titleEn: "Let's\nBegin",
    subtitleEn: 'May Allah make your path easy. With patience and love',
  },
];

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const lang = 'tr';

  const goToSlide = (index: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.4, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const slide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.bgGlow1} />
      <View style={styles.bgGlow2} />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {slides.map((s, i) => (
          <View key={i} style={styles.slide} />
        ))}
      </ScrollView>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
        </View>

        <Text style={styles.title}>
          {lang === 'tr' ? slide.titleTr : slide.titleEn}
        </Text>
        <Text style={styles.subtitle}>
          {lang === 'tr' ? slide.subtitleTr : slide.subtitleEn}
        </Text>
      </Animated.View>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <Pressable key={i} onPress={() => goToSlide(i)}>
              <View
                style={[
                  styles.dot,
                  i === currentIndex && styles.dotActive,
                  i < currentIndex && styles.dotPast,
                ]}
              />
            </Pressable>
          ))}
        </View>

        {currentIndex < slides.length - 1 ? (
          <View style={styles.btnRow}>
            <Pressable style={styles.skipBtn} onPress={() => completeOnboarding()}>
              <Text style={styles.skipText}>Geç</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}
              onPress={handleNext}
            >
              <Text style={styles.nextText}>İleri →</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.startBtn, pressed && { opacity: 0.85 }]}
            onPress={handleNext}
          >
            <View style={styles.startGradientLayer} />
            <Text style={styles.startText}>🤲 Başla</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgGlow1: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.gold + '12',
  },
  bgGlow2: {
    position: 'absolute',
    bottom: 100,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.green + '10',
  },
  scrollView: {
    position: 'absolute',
    width,
    height,
  },
  slide: {
    width,
    height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: Platform.OS === 'web' ? 80 : 100,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.goldLight,
    borderWidth: 1,
    borderColor: Colors.gold + '40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: Colors.textPrimary,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 28,
  },
  bottom: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'web' ? 48 : 60,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.cardBorder,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.gold,
    borderRadius: 4,
  },
  dotPast: {
    backgroundColor: Colors.gold + '50',
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  skipBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: 'Inter_500Medium',
  },
  nextBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.gold + '50',
    alignItems: 'center',
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gold,
    fontFamily: 'Inter_600SemiBold',
  },
  startBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: Colors.gold,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  startGradientLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  startText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.background,
    fontFamily: 'Inter_700Bold',
  },
});
