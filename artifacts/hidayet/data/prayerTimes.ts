export interface PrayerTime {
  name: string;
  nameTr: string;
  time: string;
}

export interface CityPrayerData {
  city: string;
  cityTr: string;
  prayers: PrayerTime[];
}

export const CITIES = [
  'Istanbul',
  'Ankara',
  'London',
  'New York',
  'Berlin',
  'Paris',
];

export const CITY_LABELS: Record<string, string> = {
  Istanbul: 'İstanbul',
  Ankara: 'Ankara',
  London: 'Londra',
  'New York': 'New York',
  Berlin: 'Berlin',
  Paris: 'Paris',
};

export const prayerTimesData: Record<string, PrayerTime[]> = {
  Istanbul: [
    { name: 'Fajr', nameTr: 'Sabah', time: '05:14' },
    { name: 'Dhuhr', nameTr: 'Öğle', time: '12:52' },
    { name: 'Asr', nameTr: 'İkindi', time: '16:28' },
    { name: 'Maghrib', nameTr: 'Akşam', time: '19:38' },
    { name: 'Isha', nameTr: 'Yatsı', time: '21:12' },
  ],
  Ankara: [
    { name: 'Fajr', nameTr: 'Sabah', time: '05:06' },
    { name: 'Dhuhr', nameTr: 'Öğle', time: '12:44' },
    { name: 'Asr', nameTr: 'İkindi', time: '16:22' },
    { name: 'Maghrib', nameTr: 'Akşam', time: '19:30' },
    { name: 'Isha', nameTr: 'Yatsı', time: '21:02' },
  ],
  London: [
    { name: 'Fajr', nameTr: 'Sabah', time: '03:52' },
    { name: 'Dhuhr', nameTr: 'Öğle', time: '13:04' },
    { name: 'Asr', nameTr: 'İkindi', time: '17:10' },
    { name: 'Maghrib', nameTr: 'Akşam', time: '20:48' },
    { name: 'Isha', nameTr: 'Yatsı', time: '22:28' },
  ],
  'New York': [
    { name: 'Fajr', nameTr: 'Sabah', time: '04:22' },
    { name: 'Dhuhr', nameTr: 'Öğle', time: '12:58' },
    { name: 'Asr', nameTr: 'İkindi', time: '16:44' },
    { name: 'Maghrib', nameTr: 'Akşam', time: '20:06' },
    { name: 'Isha', nameTr: 'Yatsı', time: '21:36' },
  ],
  Berlin: [
    { name: 'Fajr', nameTr: 'Sabah', time: '03:42' },
    { name: 'Dhuhr', nameTr: 'Öğle', time: '13:14' },
    { name: 'Asr', nameTr: 'İkindi', time: '17:18' },
    { name: 'Maghrib', nameTr: 'Akşam', time: '21:02' },
    { name: 'Isha', nameTr: 'Yatsı', time: '22:48' },
  ],
  Paris: [
    { name: 'Fajr', nameTr: 'Sabah', time: '04:08' },
    { name: 'Dhuhr', nameTr: 'Öğle', time: '13:52' },
    { name: 'Asr', nameTr: 'İkindi', time: '17:44' },
    { name: 'Maghrib', nameTr: 'Akşam', time: '21:28' },
    { name: 'Isha', nameTr: 'Yatsı', time: '23:04' },
  ],
};

export function getNextPrayer(city: string): number {
  const prayers = prayerTimesData[city] ?? prayerTimesData['Istanbul'];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < prayers.length; i++) {
    const [h, m] = prayers[i].time.split(':').map(Number);
    if (currentMinutes < h * 60 + m) return i;
  }
  return 0;
}
