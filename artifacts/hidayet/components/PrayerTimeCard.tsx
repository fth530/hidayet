import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { useApp } from '@/context/AppContext';
import { CITIES, CITY_LABELS, getNextPrayer, getPrayerTimes } from '@/data/prayerTimes';

export default function PrayerTimeCard() {
  const { preferences, selectedCity, setCity } = useApp();
  const lang = preferences.language;

  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [nextPrayerIndex, setNextPrayerIndex] = useState(() => getNextPrayer(selectedCity));

  useEffect(() => {
    setNextPrayerIndex(getNextPrayer(selectedCity));
    const interval = setInterval(() => {
      setNextPrayerIndex(getNextPrayer(selectedCity));
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  const prayers = getPrayerTimes(selectedCity);

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
