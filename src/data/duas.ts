import raw from './duas.json';
import { isCategoryId } from './categories';
import type { CategoryId, Dua } from './types';

/**
 * Validates content once at startup so a broken entry can never crash a screen.
 * Invalid entries are skipped (and reported in development).
 */
function validate(input: unknown): Dua[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const out: Dua[] = [];
  for (const item of input as Record<string, unknown>[]) {
    const ok =
      item && typeof item.id === 'string' && !seen.has(item.id) &&
      Array.isArray(item.categories) && item.categories.length > 0 &&
      (item.categories as unknown[]).every((c) => typeof c === 'string' && isCategoryId(c)) &&
      typeof item.arabic === 'string' && item.arabic.length > 0 &&
      typeof item.english === 'string' && typeof item.somali === 'string' &&
      typeof item.reference === 'string' && typeof item.repeat === 'number' && item.repeat >= 1 &&
      typeof (item.title as Record<string, unknown>)?.en === 'string';
    if (!ok) {
      if (__DEV__) console.warn('Sakinah: skipped invalid dua', item?.id);
      continue;
    }
    seen.add(item.id as string);
    out.push(item as unknown as Dua);
  }
  return out;
}

export const DUAS: Dua[] = validate(raw);

const BY_ID = new Map(DUAS.map((d) => [d.id, d]));

export function getDua(id: string): Dua | undefined {
  return BY_ID.get(id);
}

export function duasInCategory(id: CategoryId): Dua[] {
  return DUAS.filter((d) => d.categories.includes(id));
}

/** Same dua for everyone on a given day, rotating through the collection. */
export function duaOfTheDay(dayKey: string): Dua {
  const pool = DUAS.filter((d) => d.arabic.length < 220);
  let hash = 0;
  for (let i = 0; i < dayKey.length; i += 1) hash = (hash * 31 + dayKey.charCodeAt(i)) >>> 0;
  return pool[hash % pool.length] ?? DUAS[0];
}
