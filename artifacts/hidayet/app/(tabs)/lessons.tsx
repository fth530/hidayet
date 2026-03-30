import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  FlatList,
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

const CATEGORY_COLORS: Record<string, string> = {
  belief: Colors.gold,
  prayer: Colors.green,
  quran: Colors.blue,
  daily: Colors.orange,
  community: Colors.purple,
};

export default function LessonsScreen() {
  const { progress, preferences, completeDay, bookmarks, toggleBookmark } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedLesson, setSelectedLesson] = useState<(typeof lessons)[0] | null>(null);
  const lang = preferences.language;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const getLessonStatus = (day: number) => {
    if (progress.completedDays.includes(day)) return 'completed';
    if (day === progress.currentDay) return 'current';
    if (day <= progress.currentDay) return 'current';
    return 'locked';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Text style={styles.headerTitle}>{lang === 'tr' ? 'Dersler' : 'Lessons'}</Text>
        <Text style={styles.headerSub}>
          {lang === 'tr'
            ? `${progress.completedDays.length} / 30 tamamlandı`
            : `${progress.completedDays.length} / 30 completed`}
        </Text>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.day.toString()}
        contentContainerStyle={[styles.listContent, { paddingBottom: Platform.OS === 'web' ? 120 : 100 + insets.bottom }]}
        renderItem={({ item }) => {
          const status = getLessonStatus(item.day);
          const catColor = CATEGORY_COLORS[item.category];
          const isLocked = status === 'locked';
          const isBookmarked = bookmarks.includes(item.day);

          return (
            <Pressable
              style={({ pressed }) => [
                styles.lessonCard,
                isLocked && styles.lockedCard,
                pressed && !isLocked && { transform: [{ scale: 0.98 }] },
              ]}
              onPress={() => {
                if (isLocked) {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                  return;
                }
                Haptics.selectionAsync();
                setSelectedLesson(item);
              }}
            >
              <View style={[styles.dayCircle, { backgroundColor: isLocked ? Colors.textMuted : catColor }]}>
                <Text style={styles.dayNum}>{item.day}</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={[styles.lessonTitle, isLocked && { color: Colors.textMuted }]}>
                  {lang === 'tr' ? item.titleTr : item.titleEn}
                </Text>
                <Text style={styles.lessonDuration}>{item.duration}</Text>
              </View>
              <View style={styles.rightActions}>
                <Pressable
                  style={styles.bookmarkBtn}
                  onPress={async (e) => {
                    e.stopPropagation?.();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    await toggleBookmark(item.day);
                  }}
                  hitSlop={8}
                >
                  <Ionicons
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={18}
                    color={isBookmarked ? Colors.gold : Colors.textMuted}
                  />
                </Pressable>
                <View style={styles.statusIcon}>
                  {status === 'completed' && <Text style={styles.completedIcon}>✅</Text>}
                  {status === 'current' && <Text style={styles.currentIcon}>▶</Text>}
                  {status === 'locked' && <Text style={styles.lockedIcon}>🔒</Text>}
                </View>
              </View>
            </Pressable>
          );
        }}
      />

      {/* Lesson Detail Modal */}
      <Modal
        visible={!!selectedLesson}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedLesson(null)}
      >
        {selectedLesson && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View style={[styles.modalDayBadge, { backgroundColor: CATEGORY_COLORS[selectedLesson.category] }]}>
                  <Text style={styles.modalDayNum}>{selectedLesson.day}</Text>
                </View>
                <Text style={styles.modalTitle}>
                  {lang === 'tr' ? selectedLesson.titleTr : selectedLesson.titleEn}
                </Text>
                <Pressable
                  style={styles.bookmarkBtnModal}
                  onPress={async () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    await toggleBookmark(selectedLesson.day);
                  }}
                >
                  <Ionicons
                    name={bookmarks.includes(selectedLesson.day) ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={bookmarks.includes(selectedLesson.day) ? Colors.gold : Colors.textMuted}
                  />
                </Pressable>
                <Pressable style={styles.closeBtn} onPress={() => setSelectedLesson(null)}>
                  <Text style={styles.closeText}>✕</Text>
                </Pressable>
              </View>

              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {(lang === 'tr' ? selectedLesson.contentTr : selectedLesson.contentEn).map((para, idx) => (
                  <Text key={idx} style={styles.modalPara}>
                    {para}
                  </Text>
                ))}
                <View style={{ height: 40 }} />
              </ScrollView>

              <View style={styles.modalFooter}>
                {!progress.completedDays.includes(selectedLesson.day) ? (
                  <Pressable
                    style={styles.completeBtn}
                    onPress={async () => {
                      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                      await completeDay(selectedLesson.day);
                      setSelectedLesson(null);
                    }}
                  >
                    <Text style={styles.completeBtnText}>
                      {lang === 'tr' ? '✓ Tamamlandı Olarak İşaretle' : '✓ Mark as Completed'}
                    </Text>
                  </Pressable>
                ) : (
                  <View style={styles.alreadyCompleted}>
                    <Text style={styles.alreadyCompletedText}>
                      ✅ {lang === 'tr' ? 'Tamamlandı' : 'Completed'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'Inter_700Bold' },
  headerSub: { fontSize: 14, color: Colors.textSecondary, fontFamily: 'Inter_400Regular', marginTop: 4 },
  listContent: { paddingHorizontal: 16, paddingTop: 8 },
  lessonCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lockedCard: { opacity: 0.5 },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  dayNum: { fontSize: 14, fontWeight: '700', color: Colors.background, fontFamily: 'Inter_700Bold' },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, fontFamily: 'Inter_600SemiBold', marginBottom: 3 },
  lessonDuration: { fontSize: 12, color: Colors.textSecondary, fontFamily: 'Inter_400Regular' },
  rightActions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 8 },
  bookmarkBtn: { padding: 4 },
  statusIcon: {},
  completedIcon: { fontSize: 18 },
  currentIcon: { fontSize: 16, color: Colors.green },
  lockedIcon: { fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 12,
  },
  modalDayBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  modalDayNum: { fontSize: 14, fontWeight: '700', color: Colors.background, fontFamily: 'Inter_700Bold' },
  modalTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: Colors.textPrimary, fontFamily: 'Inter_600SemiBold', lineHeight: 22 },
  bookmarkBtnModal: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center' },
  closeText: { fontSize: 14, color: Colors.textSecondary },
  modalScroll: { paddingHorizontal: 20, paddingTop: 16, maxHeight: 500 },
  modalPara: { fontSize: 15, color: Colors.textPrimary, fontFamily: 'Inter_400Regular', lineHeight: 26, marginBottom: 16 },
  modalFooter: { paddingHorizontal: 20, paddingTop: 12 },
  completeBtn: {
    backgroundColor: Colors.gold,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  completeBtnText: { fontSize: 15, fontWeight: '600', color: Colors.background, fontFamily: 'Inter_600SemiBold' },
  alreadyCompleted: {
    backgroundColor: Colors.green + '20',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.green + '40',
  },
  alreadyCompletedText: { fontSize: 15, fontWeight: '600', color: Colors.green, fontFamily: 'Inter_600SemiBold' },
});
