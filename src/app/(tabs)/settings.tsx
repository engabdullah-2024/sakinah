import React from 'react';
import { Alert, ScrollView, Share, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, ArabicText } from '@/components/AppText';
import { Tap, Toggle } from '@/components/Controls';
import { SakinahMark, StarPattern } from '@/components/Decor';
import { Icon } from '@/components/Icon';
import { tabBarSpace } from '@/components/NotchedTabBar';
import { TASBIH_TARGETS } from '@/data/dhikr';
import type { IconName } from '@/data/types';
import { selectionHaptic } from '@/lib/haptics';
import { useApp, type Meanings, type ThemePref } from '@/state/AppState';
import { ARABIC_SIZES, brand, radius, space, type Palette } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

const MEANINGS: { id: Meanings; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'so', label: 'Somali' },
  { id: 'both', label: 'English and Somali' },
];

const THEMES: { id: ThemePref; label: string; screen: string; line: string }[] = [
  { id: 'light', label: 'Light', screen: '#FFFFFF', line: '#DCE5E4' },
  { id: 'dark', label: 'Dark', screen: '#17292A', line: '#3C5254' },
  { id: 'system', label: 'System', screen: '#8FA3A3', line: '#C5D1D0' },
];

type RowProps = {
  icon: IconName; tone?: 'mint' | 'sand' | 'grey'; label: string; value?: string; onPress: () => void; danger?: boolean; last?: boolean;
  colors: Palette;
};

function Row({ icon, tone = 'mint', label, value, onPress, danger, last, colors }: RowProps) {
  const bg = danger ? colors.dangerTint : tone === 'mint' ? colors.mint : tone === 'sand' ? colors.sand : colors.surfaceAlt;
  const fg = danger ? colors.danger : tone === 'mint' ? colors.mintInk : tone === 'sand' ? colors.sandInk : colors.text;
  return (
    <Tap onPress={onPress} accessibilityLabel={value ? `${label}, ${value}` : label} style={[styles.row, !last && { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
      <View style={[styles.rowIcon, { backgroundColor: bg }]}><Icon name={icon} size={17} color={fg} strokeWidth={1.9} /></View>
      <AppText variant="bodyStrong" color={danger ? colors.danger : colors.text} style={styles.rowLabel}>{label}</AppText>
      {value ? <AppText variant="caption" muted style={{ fontSize: 15 }}>{value}</AppText> : null}
      {!danger ? <Icon name="forward" size={16} color="#9AABAA" strokeWidth={2} /> : null}
    </Tap>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const app = useApp();
  const { settings, updateSettings } = app;
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const set = (patch: Parameters<typeof updateSettings>[0]) => {
    updateSettings(patch);
    selectionHaptic(settings.haptics);
  };

  const cycleMeanings = () => {
    const i = MEANINGS.findIndex((m) => m.id === settings.meanings);
    set({ meanings: MEANINGS[(i + 1) % MEANINGS.length].id });
  };
  const cycleTarget = () => {
    const i = TASBIH_TARGETS.indexOf(settings.tasbihTarget);
    set({ tasbihTarget: TASBIH_TARGETS[(i + 1) % TASBIH_TARGETS.length] });
  };
  const resize = (delta: number) => {
    const next = Math.max(ARABIC_SIZES.min, Math.min(ARABIC_SIZES.max, settings.arabicSize + delta));
    if (next !== settings.arabicSize) set({ arabicSize: next });
  };
  const confirmReset = () => {
    Alert.alert('Reset all counters?', 'Today’s progress and your tasbih total will go back to zero. Favorites and settings stay.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: app.resetAllCounters },
    ]);
  };
  const shareApp = () => {
    Share.share({ message: 'Sakinah: daily duas with English and Somali meanings, offline and free. Made by TTMCHANGE.' }).catch(() => {});
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + space.lg, paddingBottom: tabBarSpace(insets.bottom), paddingHorizontal: space.xl, gap: 22 }}
      showsVerticalScrollIndicator={false}
    >
      <AppText variant="display" style={{ marginHorizontal: 4 }}>Settings</AppText>

      <View style={styles.progress}>
        <StarPattern id="setStar" opacity={0.06} />
        <View style={styles.progressHead}>
          <SakinahMark size={44} rounded={0.27} />
          <View>
            <AppText variant="bodyStrong" color={brand.cream}>Your progress</AppText>
            <AppText variant="caption" color="#A9C0BF">Saved on this phone only</AppText>
          </View>
        </View>
        <View style={styles.stats}>
          {[
            { n: app.streak, l: app.streak === 1 ? 'day in a row' : 'days in a row' },
            { n: app.tasbihTotal, l: 'dhikr counted' },
            { n: app.favorites.length, l: 'favorites' },
          ].map((s) => (
            <View key={s.l} style={styles.stat}>
              <AppText variant="heading" color={brand.goldSoft} style={{ fontSize: 22, lineHeight: 28 }}>{s.n.toLocaleString('en-US')}</AppText>
              <AppText variant="small" color="#C3D4D3">{s.l}</AppText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <AppText variant="small" muted style={styles.groupTitle}>Reading</AppText>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Row icon="globe" label="Meanings" value={MEANINGS.find((m) => m.id === settings.meanings)?.label} onPress={cycleMeanings} colors={colors} />
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.mint }]}><Icon name="type" size={17} color={colors.mintInk} strokeWidth={1.9} /></View>
            <AppText variant="bodyStrong" style={styles.rowLabel}>Transliteration</AppText>
            <Toggle label="Transliteration" value={settings.transliteration} onChange={(v) => set({ transliteration: v })} />
          </View>
          <View style={styles.sizeBlock}>
            <View style={styles.sizeHead}>
              <View style={[styles.rowIcon, { backgroundColor: colors.mint }]}><ArabicText size={16} bold color={colors.mintInk} style={{ lineHeight: 22 }}>ع</ArabicText></View>
              <AppText variant="bodyStrong" style={styles.rowLabel}>Arabic size</AppText>
              <View style={[styles.stepper, { backgroundColor: colors.background }]}>
                <Tap onPress={() => resize(-ARABIC_SIZES.step)} accessibilityLabel="Smaller Arabic text" style={styles.stepBtn}>
                  <AppText variant="label">A−</AppText>
                </Tap>
                <AppText variant="label" style={styles.stepValue}>{settings.arabicSize}</AppText>
                <Tap onPress={() => resize(ARABIC_SIZES.step)} accessibilityLabel="Larger Arabic text" style={[styles.stepBtn, { backgroundColor: colors.surface }]}>
                  <AppText variant="label" style={{ fontSize: 16 }}>A+</AppText>
                </Tap>
              </View>
            </View>
            <View style={[styles.preview, { backgroundColor: colors.sand }]}>
              <ArabicText size={settings.arabicSize}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</ArabicText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.group}>
        <AppText variant="small" muted style={styles.groupTitle}>Appearance</AppText>
        <View style={[styles.card, styles.themes, { backgroundColor: colors.surface }]}>
          {THEMES.map((t) => {
            const on = settings.theme === t.id;
            return (
              <Tap key={t.id} onPress={() => set({ theme: t.id })} accessibilityLabel={`${t.label} theme`} accessibilityState={{ selected: on }} style={styles.theme}>
                <View style={[styles.phone, { borderColor: on ? brand.teal : colors.border }]}>
                  <View style={[styles.phoneScreen, { backgroundColor: t.screen }]}>
                    <View style={styles.phoneTop} />
                    <View style={[styles.phoneLine, { backgroundColor: t.line }]} />
                    <View style={[styles.phoneLine, { width: '60%', backgroundColor: t.line }]} />
                    <View style={[styles.phoneLine, { width: '40%', backgroundColor: brand.goldDeep }]} />
                  </View>
                </View>
                <AppText variant={on ? 'label' : 'caption'} color={on ? colors.text : colors.textMuted}>{t.label}</AppText>
              </Tap>
            );
          })}
        </View>
      </View>

      <View style={styles.group}>
        <AppText variant="small" muted style={styles.groupTitle}>Tasbih</AppText>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.sand }]}><Icon name="vibrate" size={17} color={colors.sandInk} strokeWidth={1.9} /></View>
            <AppText variant="bodyStrong" style={styles.rowLabel}>Vibrate on each count</AppText>
            <Toggle label="Vibrate on each count" value={settings.haptics} onChange={(v) => set({ haptics: v })} />
          </View>
          <Row icon="target" tone="sand" label="Default target" value={String(settings.tasbihTarget)} onPress={cycleTarget} colors={colors} />
          <Row icon="reset" label="Reset all counters" onPress={confirmReset} danger last colors={colors} />
        </View>
      </View>

      <View style={styles.group}>
        <AppText variant="small" muted style={styles.groupTitle}>About</AppText>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Row icon="user" tone="grey" label="About the developer" onPress={() => router.push('/developer')} colors={colors} />
          <Row icon="share" tone="grey" label="Share Sakinah" onPress={shareApp} colors={colors} />
          <Row icon="book" tone="grey" label="Source" value="Hisnul Muslim" onPress={() => router.push('/developer')} colors={colors} />
          <Row icon="info" tone="grey" label="Version" value={version} onPress={() => router.push('/developer')} last colors={colors} />
        </View>
      </View>

      <View style={styles.privacy}>
        <Icon name="lock" size={16} color={colors.textMuted} />
        <AppText variant="caption" muted style={styles.flex1}>No account, no internet, no tracking. Everything stays on this phone.</AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  progress: { borderRadius: radius.xl, backgroundColor: brand.nightTeal, padding: 18, gap: 16, overflow: 'hidden' },
  progressHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, padding: 12, borderRadius: 16, backgroundColor: 'rgba(245,241,232,0.08)', gap: 2 },
  group: { gap: 8 },
  groupTitle: { marginHorizontal: 6, fontSize: 13 },
  card: { borderRadius: radius.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 56, paddingHorizontal: space.lg },
  rowIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontFamily: 'HankenGrotesk_500Medium' },
  sizeBlock: { padding: space.lg, paddingTop: 14, gap: 12 },
  sizeHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 3, borderRadius: 14 },
  stepBtn: { width: 44, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  stepValue: { minWidth: 28, textAlign: 'center', fontVariant: ['tabular-nums'] },
  preview: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6 },
  themes: { flexDirection: 'row', padding: 14, gap: 10 },
  theme: { flex: 1, alignItems: 'center', gap: 8 },
  phone: { width: 64, height: 92, borderRadius: 14, borderWidth: 2, padding: 4 },
  phoneScreen: { flex: 1, borderRadius: 9, overflow: 'hidden' },
  phoneTop: { height: 34, backgroundColor: brand.nightTeal },
  phoneLine: { height: 5, borderRadius: 3, marginTop: 5, marginHorizontal: 6 },
  privacy: { flexDirection: 'row', gap: 10, marginHorizontal: 6, alignItems: 'flex-start' },
});
