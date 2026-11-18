/** Text normalisation for search across Arabic, English, Somali and transliteration. */

const HARAKAT = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;

export function normalizeArabic(input: string): string {
  return input
    .replace(HARAKAT, '')
    .replace(/[آأإٱ]/g, 'ا') // alef forms -> bare alef
    .replace(/ى/g, 'ي') // alef maqsura -> ya
    .replace(/ة/g, 'ه') // ta marbuta -> ha
    .replace(/[ؤئ]/g, 'ء') // hamza carriers -> hamza
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeLatin(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents (ā, ḥ, ṣ…)
    .replace(/[ʿʾ'’`ʻ-]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const ARABIC_CHAR = /[؀-ۿ]/;

export function hasArabic(input: string): boolean {
  return ARABIC_CHAR.test(input);
}

/** True when every word of the query appears in the haystack (order free). */
export function matchesQuery(query: string, haystackLatin: string, haystackArabic: string): boolean {
  const q = query.trim();
  if (!q) return false;
  if (hasArabic(q)) {
    const nq = normalizeArabic(q);
    return nq.length > 0 && normalizeArabic(haystackArabic).includes(nq);
  }
  const words = normalizeLatin(q).split(' ').filter(Boolean);
  const hay = normalizeLatin(haystackLatin);
  return words.length > 0 && words.every((w) => hay.includes(w));
}
