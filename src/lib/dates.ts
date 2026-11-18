/** Local-date helpers. Everything works offline. */

const SO_WEEKDAYS = ['Axad', 'Isniin', 'Talaado', 'Arbaco', 'Khamiis', 'Jimco', 'Sabti'];
const SO_MONTHS = [
  'Janaayo', 'Febraayo', 'Maarso', 'Abriil', 'Maajo', 'Juun',
  'Luuliyo', 'Ogost', 'Sebtembar', 'Oktoobar', 'Nofeembar', 'Desembar',
];

/** YYYY-MM-DD in the phone's local time zone. */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function previousDayKey(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return dayKey(date);
}

/** "Arbaco, 18 Nofeembar" */
export function somaliDate(date: Date): string {
  return `${SO_WEEKDAYS[date.getDay()]}, ${date.getDate()} ${SO_MONTHS[date.getMonth()]}`;
}

export type DayPart = 'morning' | 'evening' | 'night';

/**
 * Approximate part of the day without prayer times:
 * 03:00–14:59 morning adhkar, 15:00–20:59 evening adhkar (after Asr), otherwise night.
 */
export function dayPart(date: Date): DayPart {
  const h = date.getHours();
  if (h >= 3 && h < 15) return 'morning';
  if (h >= 15 && h < 21) return 'evening';
  return 'night';
}

/** Consecutive active days ending today (or yesterday, so a streak survives until tonight). */
export function computeStreak(activeDays: readonly string[], today: string): number {
  const set = new Set(activeDays);
  let cursor = set.has(today) ? today : previousDayKey(today);
  let count = 0;
  while (set.has(cursor)) {
    count += 1;
    cursor = previousDayKey(cursor);
  }
  return count;
}
