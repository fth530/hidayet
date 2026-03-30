import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

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

const CITY_COORDS: Record<string, Coordinates> = {
  Istanbul: new Coordinates(41.0082, 28.9784),
  Ankara: new Coordinates(39.9334, 32.8597),
  London: new Coordinates(51.5074, -0.1278),
  'New York': new Coordinates(40.7128, -74.0060),
  Berlin: new Coordinates(52.5200, 13.4050),
  Paris: new Coordinates(48.8566, 2.3522),
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function getPrayerTimes(city: string): PrayerTime[] {
  const coords = CITY_COORDS[city] ?? CITY_COORDS['Istanbul'];
  const date = new Date();

  let params;
  if (city === 'Istanbul' || city === 'Ankara') {
    params = CalculationMethod.Turkey();
  } else {
    params = CalculationMethod.MuslimWorldLeague();
  }

  params.madhab = Madhab.Hanafi;

  const prayerTimes = new PrayerTimes(coords, date, params);

  return [
    { name: 'Fajr', nameTr: 'Sabah', time: formatTime(prayerTimes.fajr) },
    { name: 'Dhuhr', nameTr: 'Öğle', time: formatTime(prayerTimes.dhuhr) },
    { name: 'Asr', nameTr: 'İkindi', time: formatTime(prayerTimes.asr) },
    { name: 'Maghrib', nameTr: 'Akşam', time: formatTime(prayerTimes.maghrib) },
    { name: 'Isha', nameTr: 'Yatsı', time: formatTime(prayerTimes.isha) },
  ];
}

export function getNextPrayer(city: string): number {
  const prayers = getPrayerTimes(city);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < prayers.length; i++) {
    const [h, m] = prayers[i].time.split(':').map(Number);
    if (currentMinutes < h * 60 + m) return i;
  }
  return 0; // Default to first prayer if all prayers for the day have passed
}
