import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { AppText, ArabicText } from '@/components/AppText';
import { IconButton, Tap } from '@/components/Controls';
import { ProgressRing, SakinahMark, StarPattern } from '@/components/Decor';
import { Icon } from '@/components/Icon';
import { tabBarSpace } from '@/components/NotchedTabBar';
import { duaOfTheDay } from '@/data/duas';
import type { CategoryId, IconName } from '@/data/types';
import { dayPart, somaliDate } from '@/lib/dates';
import { formatHijri, hijriDate } from '@/lib/hijri';
import { useApp } from '@/state/AppState';
import { brand, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

function openCategory(id: CategoryId) {
  router.push({ pathname: '/category/[id]', params: { id } });
}

function Beads() {
  const beads = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    const n = 22;
    for (let i = 0; i < n; i += 1) {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
      const x = 70 + 48 * Math.cos(a);
      const y = 62 + 40 * Math.sin(a);
      if (y > 62 + 40 - 6 && Math.abs(x - 70) < 8) continue;
      out.push({ x, y });
    }
    return out;
  }, []);
  return (
    <Svg width={130} height={150} viewBox="0 0 140 160" accessibilityElementsHidden importantForAccessibility="no">
      <Circle cx={70} cy={62} r={62} fill="rgba(245,241,232,0.06)" />
      {beads.map((b, i) => <Circle key={i} cx={b.x} cy={b.y} r={6.2} fill={brand.gold} />)}
      <Circle cx={70} cy={104} r={8} fill={brand.goldSoft} />
      <Path d="M70,112 L70,124" stroke={brand.gold} strokeWidth={3} strokeLinecap="round" />
      <Path d="M63,124 L77,124 L80,150 L60,150 Z" fill={brand.gold} />
    </Svg>
  );
}

type Slide = { key: string; eyebrow: string; title: string; action: string; onPress: () => void; art: React.ReactNode };

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { today, categoryProgress } = useApp();
  const [slide, setSlide] = useState(0);

  const now = new Date();
  const part = dayPart(now);
  const hijri = formatHijri(hijriDate(now));
  const dotd = duaOfTheDay(today);
  const cardW = width - space.xxl * 2;

  const currentCat: CategoryId = part === 'morning' ? 'morning' : part === 'evening' ? 'evening' : 'sleep';
  const currentProg = categoryProgress(currentCat);

  const slides: Slide[] = [
    {
      key: 'tasbih', eyebrow: 'Remember Allah', title: 'Start the tasbih counter', action: 'Start now',
      onPress: () => router.push('/tasbih'), art: <Beads />,
    },
    {
      key: 'adhkar',
      eyebrow: part === 'morning' ? 'After Fajr' : part === 'evening' ? 'After Asr' : 'Before you sleep',
      title: part === 'morning' ? 'Morning adhkar' : part === 'evening' ? 'Evening adhkar' : 'Sleep adhkar',
      action: currentProg.done > 0 ? `Continue, ${currentProg.done} of ${currentProg.total}` : 'Start reading',
      onPress: () => openCategory(currentCat),
      art: (
        <View style={styles.ringArt}>
          <ProgressRing size={104} stroke={7} progress={currentProg.total ? currentProg.done / currentProg.total : 0} color={brand.gold} track="rgba(245,241,232,0.15)" />
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.ringCenter}><Icon name={part === 'morning' ? 'sunrise' : 'moon'} size={34} color={brand.gold} /></View>
          </View>
        </View>
      ),
    },
    {
      key: 'dotd', eyebrow: 'Dua of the day', title: dotd.title.en, action: 'Read it',
      onPress: () => router.push({ pathname: '/dua/[id]', params: { id: dotd.id, list: dotd.categories[0] } }),
      art: <View style={styles.dotdArt}><ArabicText size={22} color={brand.goldSoft} numberOfLines={3}>{dotd.arabic}</ArabicText></View>,
    },
  ];

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / (cardW + space.md));
    if (i !== slide && i >= 0 && i < slides.length) setSlide(i);
  };

  const features: { label: string; icon: IconName; tone: 'mint' | 'sand'; onPress: () => void }[] = [
    { label: 'Morning', icon: 'sunrise', tone: 'sand', onPress: () => openCategory('morning') },
    { label: 'Evening', icon: 'moon', tone: 'mint', onPress: () => openCategory('evening') },
    { label: 'Tasbih', icon: 'beads', tone: 'mint', onPress: () => router.push('/tasbih') },
    { label: 'All duas', icon: 'book', tone: 'mint', onPress: () => router.push('/categories') },
    { label: 'Favorites', icon: 'heart', tone: 'sand', onPress: () => router.navigate('/favorites') },
    { label: 'Worry', icon: 'wind', tone: 'mint', onPress: () => openCategory('worry') },
  ];

  const times: { id: CategoryId; when: string; label: string; icon: IconName }[] = [
    { id: 'morning', when: 'After Fajr', label: 'Morning', icon: 'sunrise' },
    { id: 'evening', when: 'After Asr', label: 'Evening', icon: 'moon' },
    { id: 'sleep', when: 'Bedtime', label: 'Sleep', icon: 'star' },
    { id: 'waking', when: 'On waking', label: 'Waking', icon: 'sun' },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + space.lg, paddingBottom: tabBarSpace(insets.bottom) }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingHorizontal: space.xxl }]}>
        <SakinahMark size={46} rounded={0.5} />
        <View style={styles.flex1}>
          <AppText variant="caption" muted>Assalaamu calaykum!</AppText>
          <AppText variant="heading">Ku soo dhowow Sakinah</AppText>
        </View>
        <IconButton icon="search" label="Search duas" onPress={() => router.push('/search')} bordered background={colors.surface} size={46} />
      </View>

      <ScrollView
        horizontal
        pagingEnabled={false}
        snapToInterval={cardW + space.md}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: space.xxl, gap: space.md }}
        onScroll={onScroll}
        scrollEventThrottle={32}
        style={{ marginTop: space.xxl }}
      >
        {slides.map((s) => (
          <Tap key={s.key} onPress={s.onPress} accessibilityLabel={`${s.title}. ${s.action}`} style={[styles.slide, { width: cardW }]}>
            <View style={styles.slideCircle} />
            <View style={styles.slideArt}>{s.art}</View>
            <View style={styles.slideText}>
              <AppText variant="caption" color={brand.goldSoft}>{s.eyebrow}</AppText>
              <AppText variant="title" color={brand.cream} numberOfLines={2} style={{ fontSize: 28, lineHeight: 30 }}>{s.title}</AppText>
              <View style={styles.slideBtn}><AppText variant="label" color="#17292A">{s.action}</AppText></View>
            </View>
          </Tap>
        ))}
      </ScrollView>
      <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {slides.map((s, i) => (
          <View key={s.key} style={[styles.dot, { width: i === slide ? 20 : 6, backgroundColor: i === slide ? brand.teal : colors.track }]} />
        ))}
      </View>

      <View style={[styles.grid, { paddingHorizontal: space.xxl }]}>
        {features.map((f) => (
          <Tap
            key={f.label}
            onPress={f.onPress}
            accessibilityLabel={f.label}
            style={[styles.feature, { backgroundColor: colors.surface, borderColor: colors.divider, width: (cardW - space.md * 2) / 3 }]}
          >
            <View style={[styles.featureIcon, { backgroundColor: f.tone === 'mint' ? colors.mint : colors.sand }]}>
              <Icon name={f.icon} size={22} color={f.tone === 'mint' ? colors.mintInk : colors.sandInk} />
            </View>
            <AppText variant="label">{f.label}</AppText>
          </Tap>
        ))}
      </View>

      <View style={[styles.times, { marginHorizontal: space.xxl }]}>
        <StarPattern id="homeStar" />
        <View style={styles.timesHead}>
          <View style={styles.hijriPill}>
            <Icon name="moon" size={13} color={brand.goldSoft} />
            <AppText variant="small" color={brand.goldSoft}>{hijri}</AppText>
          </View>
          <AppText variant="title" color={brand.cream} center style={{ marginTop: 6 }}>Adhkar times</AppText>
          <AppText variant="caption" color="#A9C0BF" center>{somaliDate(now)}</AppText>
        </View>
        <View style={styles.timesRow}>
          {times.map((t) => {
            const p = categoryProgress(t.id);
            const isNow = t.id === currentCat;
            const done = p.total > 0 && p.done >= p.total;
            return (
              <Tap
                key={t.id}
                onPress={() => openCategory(t.id)}
                accessibilityLabel={`${t.label} adhkar, ${done ? 'done' : `${p.done} of ${p.total} read`}`}
                style={[styles.timeTile, { backgroundColor: isNow ? brand.gold : 'rgba(245,241,232,0.08)' }]}
              >
                <AppText variant="small" color={isNow ? '#17292A' : '#C3D4D3'} style={{ fontSize: 11 }}>{t.when}</AppText>
                <Icon name={done ? 'check' : t.icon} size={22} color={isNow ? '#17292A' : brand.cream} />
                <AppText variant="label" color={isNow ? '#17292A' : brand.cream} style={{ fontSize: 13 }}>{t.label}</AppText>
                <AppText variant="small" color={isNow ? '#17292A' : '#C3D4D3'} style={{ fontSize: 11 }}>{done ? 'Done' : `${p.done} of ${p.total}`}</AppText>
              </Tap>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  slide: { height: 184, borderRadius: radius.xl + 2, backgroundColor: brand.teal, overflow: 'hidden', paddingHorizontal: 22, justifyContent: 'center' },
  slideCircle: { position: 'absolute', right: -40, bottom: -70, width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(214,185,132,0.25)' },
  slideArt: { position: 'absolute', right: 8, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width: 140 },
  slideText: { width: '58%', gap: 6 },
  slideBtn: { alignSelf: 'flex-start', marginTop: 8, height: 40, paddingHorizontal: 18, borderRadius: 20, backgroundColor: brand.gold, justifyContent: 'center' },
  ringArt: { width: 104, height: 104 },
  ringCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  dotdArt: { width: 130 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: space.md },
  dot: { height: 6, borderRadius: 3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md, marginTop: space.xxl },
  feature: {
    height: 104, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 10,
    shadowColor: '#17292A', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 1,
  },
  featureIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  times: { marginTop: space.xxl, borderRadius: 28, backgroundColor: brand.nightTeal, overflow: 'hidden', paddingTop: 22, paddingHorizontal: 14, paddingBottom: 16, gap: 16 },
  timesHead: { alignItems: 'center' },
  hijriPill: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 28, paddingHorizontal: 12, borderRadius: 14, backgroundColor: 'rgba(245,241,232,0.1)' },
  timesRow: { flexDirection: 'row', gap: 8 },
  timeTile: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 2, borderRadius: 18 },
});
