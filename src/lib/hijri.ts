/**
 * Hijri date, offline.
 * Uses the Umm al-Qura calendar from Intl when the JS engine supports it,
 * otherwise falls back to the arithmetical (tabular) Islamic calendar,
 * which can differ by about a day from moon sighting.
 */

export const HIJRI_MONTHS_SO = [
  'Muxarram', 'Safar', 'Rabiicul Awwal', 'Rabiicul Aakhir', 'Jumaadal Uulaa', 'Jumaadal Aakhir',
  'Rajab', 'Shacbaan', 'Ramadaan', 'Shawaal', 'Dul Qacda', 'Dul Xijja',
];

export type HijriDate = { day: number; month: number; year: number; source: 'umalqura' | 'tabular' };

function isValid(d: number, m: number, y: number): boolean {
  return Number.isInteger(d) && Number.isInteger(m) && Number.isInteger(y) &&
    d >= 1 && d <= 30 && m >= 1 && m <= 12 && y >= 1400 && y <= 1600;
}

function fromIntl(date: Date): HijriDate | null {
  try {
    const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric', month: 'numeric', year: 'numeric',
    });
    const parts = fmt.formatToParts(date);
    const get = (t: string) => Number((parts.find((p) => p.type === t)?.value ?? '').replace(/[^0-9]/g, ''));
    const day = get('day');
    const month = get('month');
    const year = get('year');
    return isValid(day, month, year) ? { day, month, year, source: 'umalqura' } : null;
  } catch {
    return null;
  }
}

export function tabularHijri(date: Date): HijriDate {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  const a = Math.floor((14 - gm) / 12);
  const y = gy + 4800 - a;
  const m = gm + 12 * a - 3;
  const jd = gd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { day, month, year, source: 'tabular' };
}

export function hijriDate(date: Date): HijriDate {
  return fromIntl(date) ?? tabularHijri(date);
}

/** "8 Jumaadal Aakhir 1448" */
export function formatHijri(h: HijriDate): string {
  return `${h.day} ${HIJRI_MONTHS_SO[h.month - 1]} ${h.year}`;
}
