// Pure logic: search normalisation, dates, Hijri calendar, streaks.
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { matchesQuery, normalizeArabic, normalizeLatin } from '../src/lib/arabic.ts';
import { computeStreak, dayKey, dayPart, previousDayKey, somaliDate } from '../src/lib/dates.ts';
import { formatHijri, hijriDate, tabularHijri } from '../src/lib/hijri.ts';

test('arabic search ignores vowel marks and alef forms', () => {
  assert.equal(normalizeArabic('بِسْمِ اللَّهِ'), 'بسم الله');
  assert.ok(matchesQuery('بسم الله', '', 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ'));
  assert.ok(matchesQuery('أعوذ', '', 'أَعُوذُ بِكَلِمَاتِ اللَّهِ'));
});

test('latin search ignores accents and word order', () => {
  assert.equal(normalizeLatin('Bismillāhil-ladhī'), 'bismillahilladhi');
  assert.ok(matchesQuery('travel dua', 'Dua for travel Ducada safarka', ''));
  assert.ok(matchesQuery('SAFAR', 'Ducada safarka', ''));
  assert.ok(!matchesQuery('', 'anything', ''));
  assert.ok(!matchesQuery('sleep', 'Leaving the house', ''));
});

test('day keys and previous day across month and year ends', () => {
  assert.equal(dayKey(new Date(2026, 10, 18)), '2026-11-18');
  assert.equal(previousDayKey('2026-03-01'), '2026-02-28');
  assert.equal(previousDayKey('2027-01-01'), '2026-12-31');
});

test('somali date and day parts', () => {
  assert.equal(somaliDate(new Date(2026, 10, 18)), 'Arbaco, 18 Nofeembar');
  assert.equal(dayPart(new Date(2026, 10, 18, 6)), 'morning');
  assert.equal(dayPart(new Date(2026, 10, 18, 17)), 'evening');
  assert.equal(dayPart(new Date(2026, 10, 18, 23)), 'night');
});

test('streak counts consecutive days and survives until the day ends', () => {
  assert.equal(computeStreak(['2026-11-16', '2026-11-17', '2026-11-18'], '2026-11-18'), 3);
  assert.equal(computeStreak(['2026-11-16', '2026-11-17'], '2026-11-18'), 2);
  assert.equal(computeStreak(['2026-11-10'], '2026-11-18'), 0);
  assert.equal(computeStreak([], '2026-11-18'), 0);
});

test('hijri date for 18 November 2026 is in Jumada al-Akhirah 1448', () => {
  const h = hijriDate(new Date(2026, 10, 18, 12));
  assert.equal(h.year, 1448);
  assert.equal(h.month, 6);
  assert.ok(h.day >= 7 && h.day <= 9, `day ${h.day}`);
  assert.match(formatHijri(h), /Jumaadal Aakhir 1448$/);
});

test('tabular fallback stays within a day of Umm al-Qura', () => {
  const t = tabularHijri(new Date(2026, 10, 18, 12));
  assert.equal(t.year, 1448);
  assert.equal(t.month, 6);
  assert.ok(Math.abs(t.day - 8) <= 1, `day ${t.day}`);
});
