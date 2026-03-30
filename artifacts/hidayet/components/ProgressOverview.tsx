import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { useApp } from '@/context/AppContext';

export default function ProgressOverview() {
  const { progress, preferences } = useApp();
  const lang = preferences.language;

  const completedCount = progress.completedDays.length;
  const progressPercent = (completedCount / 30) * 100;

  return (
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
  );
}

const styles = StyleSheet.create({
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
});
