import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { AppText, ArabicText } from '@/components/AppText';
import { BackButton, Chip, Tap } from '@/components/Controls';
import { StarPattern } from '@/components/Decor';
import { Icon } from '@/components/Icon';
import { DHIKR, TASBIH_TARGETS } from '@/data/dhikr';
import type { IconName } from '@/data/types';
import { successHaptic, tapHaptic } from '@/lib/haptics';
import { useApp } from '@/state/AppState';
import { brand, fonts, space } from '@/theme/tokens';

const SIZE = 264;
const R = 120;
const C = 2 * Math.PI * R;

export default function TasbihScreen() {
  const insets = useSafeAreaInsets();
  const { settings, updateSettings, addTasbih } = useApp();
  const [dhikrIndex, setDhikrIndex] = useState(2);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const [secs, setSecs] = useState(0);
  const target = settings.tasbihTarget;

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const d = DHIKR[dhikrIndex] ?? DHIKR[0];
  const p = Math.min(1, count / target);
  const angle = (-90 + 360 * p) * (Math.PI / 180);
  const knobX = SIZE / 2 + R * Math.cos(angle);
  const knobY = SIZE / 2 + R * Math.sin(angle);
  const complete = count >= target;
  const clock = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const tap = () => {
    if (complete) {
      setRound((r) => r + 1);
      setCount(1);
      tapHaptic(settings.haptics);
    } else {
      const n = count + 1;
      setCount(n);
      if (n >= target) successHaptic(settings.haptics);
      else tapHaptic(settings.haptics);
    }
    addTasbih(1);
  };

  const pick = (i: number) => {
    setDhikrIndex(i);
    setCount(0);
    setRound(1);
  };

  const cycleTarget = () => {
    const i = TASBIH_TARGETS.indexOf(target);
    const nextTarget = TASBIH_TARGETS[(i + 1) % TASBIH_TARGETS.length];
    updateSettings({ tasbihTarget: nextTarget });
    setCount((c) => Math.min(c, nextTarget));
  };

  const tools: { icon: IconName; label: string; onPress: () => void; active?: boolean }[] = [
    { icon: 'undo', label: 'Undo', onPress: () => setCount((c) => Math.max(0, c - 1)) },
    { icon: 'reset', label: 'Reset', onPress: () => { setCount(0); setRound(1); setSecs(0); } },
    { icon: 'vibrate', label: 'Vibrate', onPress: () => updateSettings({ haptics: !settings.haptics }), active: settings.haptics },
    { icon: 'target', label: `Target ${target}`, onPress: cycleTarget },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top + space.sm, paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
      <StarPattern id="tasbihStar" opacity={0.05} />
      <View style={styles.glow} pointerEvents="none" />

      <View style={styles.top}>
        <BackButton color={brand.cream} />
        <AppText variant="title" color={brand.cream} style={{ fontSize: 26 }}>Tasbih</AppText>
        <Tap onPress={cycleTarget} accessibilityLabel={`Target ${target}, change target`} style={styles.targetBtn}>
          <AppText variant="label" color={brand.cream} style={{ fontSize: 13 }}>Target {target}</AppText>
        </Tap>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} style={styles.chipsWrap}>
        {DHIKR.map((x, i) => (
          <Chip key={x.id} label={x.name} selected={i === dhikrIndex} onPress={() => pick(i)} dark />
        ))}
      </ScrollView>

      <View style={styles.dhikr}>
        <ArabicText size={46} bold color={brand.cream} numberOfLines={2} adjustsFontSizeToFit>{d.arabic}</ArabicText>
        <AppText variant="body" color={brand.goldSoft} center style={{ fontSize: 15 }}>{d.english}</AppText>
        <AppText variant="caption" color="#A9C0BF" center>{d.somali}</AppText>
      </View>

      <View style={styles.pills}>
        <View style={styles.pill}>
          <Icon name="clock" size={14} color={brand.cream} strokeWidth={2} />
          <AppText variant="caption" color={brand.cream} style={styles.tabular}>{clock}</AppText>
        </View>
        <View style={styles.pill}><AppText variant="caption" color={brand.cream}>Round {round}</AppText></View>
      </View>

      <View style={styles.center}>
        <Tap
          onPress={tap}
          pressedOpacity={0.92}
          accessibilityLabel={`Count ${d.name}, ${count} of ${target}`}
          accessibilityHint="Tap anywhere on the circle to count"
          style={styles.counter}
        >
          <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
            <Circle cx={SIZE / 2} cy={SIZE / 2} r={104} fill="#173F45" stroke="rgba(245,241,232,0.06)" strokeWidth={1} />
            <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(245,241,232,0.1)" strokeWidth={6} />
            {p > 0 ? (
              <Circle
                cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={brand.gold} strokeWidth={6} strokeLinecap="round"
                strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - p)} transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              />
            ) : null}
            <Circle cx={knobX} cy={knobY} r={10} fill={brand.goldSoft} stroke={brand.nightTeal} strokeWidth={4} />
          </Svg>
          <AppText color={brand.goldSoft} style={styles.count}>{count}</AppText>
          <AppText variant="body" color="#A9C0BF" style={{ fontSize: 15 }}>of {target}</AppText>
          <AppText variant="caption" color={brand.cream} style={{ marginTop: 10 }}>{complete ? 'Round complete, tap to continue' : 'Tap to count'}</AppText>
        </Tap>
      </View>

      <View style={styles.toolbar}>
        {tools.map((t) => (
          <Tap
            key={t.label}
            onPress={t.onPress}
            accessibilityLabel={t.label}
            accessibilityState={t.active !== undefined ? { checked: t.active } : undefined}
            style={styles.tool}
          >
            <Icon name={t.icon} size={20} color={t.active === false ? '#A9C0BF' : t.active ? brand.goldSoft : brand.cream} strokeWidth={1.9} />
            <AppText variant="small" color={t.active === false ? '#A9C0BF' : brand.cream} style={{ fontSize: 11 }}>{t.label.startsWith('Target') ? 'Target' : t.label}</AppText>
          </Tap>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: brand.nightTeal, overflow: 'hidden' },
  glow: { position: 'absolute', alignSelf: 'center', top: '40%', width: 380, height: 380, borderRadius: 190, backgroundColor: brand.teal, opacity: 0.45 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space.lg },
  targetBtn: { height: 36, paddingHorizontal: 14, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(245,241,232,0.2)', justifyContent: 'center' },
  chipsWrap: { flexGrow: 0, marginTop: space.lg },
  chips: { gap: 8, paddingHorizontal: space.xl },
  dhikr: { alignItems: 'center', gap: 4, paddingHorizontal: 28, marginTop: space.xl },
  pills: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: space.lg },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 32, paddingHorizontal: 14, borderRadius: 16, backgroundColor: 'rgba(245,241,232,0.08)' },
  tabular: { fontVariant: ['tabular-nums'] },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: SIZE + 20 },
  counter: { width: SIZE, height: SIZE, borderRadius: SIZE / 2, alignItems: 'center', justifyContent: 'center' },
  count: { fontFamily: fonts.semibold, fontSize: 84, lineHeight: 92, letterSpacing: -2, fontVariant: ['tabular-nums'] },
  toolbar: { marginHorizontal: space.xxl, height: 64, borderRadius: 32, backgroundColor: 'rgba(245,241,232,0.08)', borderWidth: 1, borderColor: 'rgba(245,241,232,0.1)', flexDirection: 'row', alignItems: 'center' },
  tool: { flex: 1, height: 56, alignItems: 'center', justifyContent: 'center', gap: 3 },
});
