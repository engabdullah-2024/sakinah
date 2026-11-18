import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState as RNAppState } from 'react-native';

import { duasInCategory, getDua } from '@/data/duas';
import { TASBIH_TARGETS, type TasbihTarget } from '@/data/dhikr';
import type { CategoryId } from '@/data/types';
import { computeStreak, dayKey } from '@/lib/dates';
import { isObject, readJSON, writeJSON } from '@/lib/storage';
import { ARABIC_SIZES } from '@/theme/tokens';

export type Meanings = 'en' | 'so' | 'both';
export type ThemePref = 'light' | 'dark' | 'system';

export type Settings = {
  meanings: Meanings;
  transliteration: boolean;
  arabicSize: number;
  theme: ThemePref;
  haptics: boolean;
  tasbihTarget: TasbihTarget;
};

export const DEFAULT_SETTINGS: Settings = {
  meanings: 'both',
  transliteration: true,
  arabicSize: ARABIC_SIZES.default,
  theme: 'system',
  haptics: true,
  tasbihTarget: 33,
};

type Progress = { day: string; counts: Record<string, number> };
type Stats = { tasbihTotal: number; activeDays: string[] };

const isSettings = (v: unknown): v is Settings =>
  isObject(v) &&
  (v.meanings === 'en' || v.meanings === 'so' || v.meanings === 'both') &&
  typeof v.transliteration === 'boolean' &&
  typeof v.arabicSize === 'number' && v.arabicSize >= ARABIC_SIZES.min && v.arabicSize <= ARABIC_SIZES.max &&
  (v.theme === 'light' || v.theme === 'dark' || v.theme === 'system') &&
  typeof v.haptics === 'boolean' &&
  (TASBIH_TARGETS as readonly number[]).includes(v.tasbihTarget as number);

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string');

const isProgress = (v: unknown): v is Progress =>
  isObject(v) && typeof v.day === 'string' && isObject(v.counts) &&
  Object.values(v.counts).every((n) => typeof n === 'number' && n >= 0);

const isStats = (v: unknown): v is Stats =>
  isObject(v) && typeof v.tasbihTotal === 'number' && isStringArray(v.activeDays);

type AppStateValue = {
  ready: boolean;
  today: string;
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  countFor: (duaId: string) => number;
  /** Adds one repetition; returns the new count (capped at the dua's repeat). */
  incrementDua: (duaId: string) => number;
  resetDua: (duaId: string) => void;
  categoryProgress: (id: CategoryId) => { done: number; total: number };
  tasbihTotal: number;
  addTasbih: (n?: number) => void;
  streak: number;
  resetAllCounters: () => void;
};

const Ctx = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState(() => dayKey(new Date()));
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState<Progress>({ day: dayKey(new Date()), counts: {} });
  const [stats, setStats] = useState<Stats>({ tasbihTotal: 0, activeDays: [] });
  const hydrated = useRef(false);

  // Load everything once.
  useEffect(() => {
    let alive = true;
    (async () => {
      const [s, f, p, st] = await Promise.all([
        readJSON('settings', DEFAULT_SETTINGS, isSettings),
        readJSON('favorites', [] as string[], isStringArray),
        readJSON('progress', { day: dayKey(new Date()), counts: {} } as Progress, isProgress),
        readJSON('stats', { tasbihTotal: 0, activeDays: [] } as Stats, isStats),
      ]);
      if (!alive) return;
      const now = dayKey(new Date());
      setSettings({ ...DEFAULT_SETTINGS, ...s });
      setFavorites(f.filter((id) => getDua(id)));
      setProgress(p.day === now ? p : { day: now, counts: {} });
      setStats(st);
      hydrated.current = true;
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Persist after hydration.
  useEffect(() => { if (hydrated.current) void writeJSON('settings', settings); }, [settings]);
  useEffect(() => { if (hydrated.current) void writeJSON('favorites', favorites); }, [favorites]);
  useEffect(() => { if (hydrated.current) void writeJSON('progress', progress); }, [progress]);
  useEffect(() => { if (hydrated.current) void writeJSON('stats', stats); }, [stats]);

  // Roll over to a new day when the app returns to the foreground or every minute.
  useEffect(() => {
    const refresh = () => setToday(dayKey(new Date()));
    const sub = RNAppState.addEventListener('change', (s) => { if (s === 'active') refresh(); });
    const timer = setInterval(refresh, 60_000);
    return () => { sub.remove(); clearInterval(timer); };
  }, []);

  const markActive = useCallback((day: string) => {
    setStats((s) => (s.activeDays.includes(day) ? s : { ...s, activeDays: [...s.activeDays, day].slice(-400) }));
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...patch }));
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, []);

  const countFor = useCallback(
    (duaId: string) => (progress.day === today ? progress.counts[duaId] ?? 0 : 0),
    [progress, today],
  );

  const incrementDua = useCallback((duaId: string) => {
    const dua = getDua(duaId);
    if (!dua) return 0;
    const day = dayKey(new Date());
    const current = progress.day === day ? progress.counts[duaId] ?? 0 : 0;
    const next = Math.min(dua.repeat, current + 1);
    setProgress((p) => {
      const base = p.day === day ? p.counts : {};
      return { day, counts: { ...base, [duaId]: next } };
    });
    if (next >= dua.repeat) markActive(day);
    return next;
  }, [progress, markActive]);

  const resetDua = useCallback((duaId: string) => {
    setProgress((p) => {
      const counts = { ...p.counts };
      delete counts[duaId];
      return { ...p, counts };
    });
  }, []);

  const categoryProgress = useCallback((id: CategoryId) => {
    const list = duasInCategory(id);
    const counts = progress.day === today ? progress.counts : {};
    const done = list.filter((d) => (counts[d.id] ?? 0) >= d.repeat).length;
    return { done, total: list.length };
  }, [progress, today]);

  const addTasbih = useCallback((n = 1) => {
    const day = dayKey(new Date());
    setStats((s) => ({
      tasbihTotal: s.tasbihTotal + n,
      activeDays: s.activeDays.includes(day) ? s.activeDays : [...s.activeDays, day].slice(-400),
    }));
  }, []);

  const resetAllCounters = useCallback(() => {
    setProgress({ day: dayKey(new Date()), counts: {} });
    setStats((s) => ({ ...s, tasbihTotal: 0 }));
  }, []);

  const streak = useMemo(() => computeStreak(stats.activeDays, today), [stats.activeDays, today]);

  const value = useMemo<AppStateValue>(() => ({
    ready, today, settings, updateSettings, favorites, isFavorite, toggleFavorite,
    countFor, incrementDua, resetDua, categoryProgress,
    tasbihTotal: stats.tasbihTotal, addTasbih, streak, resetAllCounters,
  }), [ready, today, settings, updateSettings, favorites, isFavorite, toggleFavorite, countFor,
    incrementDua, resetDua, categoryProgress, stats.tasbihTotal, addTasbih, streak, resetAllCounters]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppStateValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside AppStateProvider');
  return v;
}
