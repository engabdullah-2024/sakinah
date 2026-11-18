import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'sakinah:v1:';

/** Reads JSON; returns the fallback on missing, corrupt or wrong-shaped data. Never throws. */
export async function readJSON<T>(key: string, fallback: T, isValid: (v: unknown) => v is T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/** Writes JSON; failures are swallowed so storage problems never crash the UI. */
export async function writeJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    if (__DEV__) console.warn('Sakinah: could not save', key, e);
  }
}

export const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
