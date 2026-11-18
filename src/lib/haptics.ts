import * as Haptics from 'expo-haptics';

/** Haptics never throw (some devices and the web have no vibration motor). */
export function tapHaptic(enabled: boolean) {
  if (!enabled) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function successHaptic(enabled: boolean) {
  if (!enabled) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

export function selectionHaptic(enabled: boolean) {
  if (!enabled) return;
  Haptics.selectionAsync().catch(() => {});
}
