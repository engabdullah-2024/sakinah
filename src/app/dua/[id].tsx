import React, { useMemo } from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, ArabicText } from '@/components/AppText';
import { BackButton, IconButton, Tap } from '@/components/Controls';
import { ProgressRing, StarPattern } from '@/components/Decor';
import { Icon } from '@/components/Icon';
import { getCategory, isCategoryId } from '@/data/categories';
import { duasInCategory, getDua } from '@/data/duas';
import type { Dua } from '@/data/types';
import { successHaptic, tapHaptic } from '@/lib/haptics';
import { useApp } from '@/state/AppState';
import { brand, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? v[0] ?? '' : v ?? '';
}

export default function DuaScreen() {
  const params = useLocalSearchParams<{ id: string; list?: string }>();
  const id = first(params.id);
  const listParam = first(params.list);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const app = useApp();
  const { settings } = app;

  const dua = getDua(id);

  const sequence: Dua[] = useMemo(() => {
    if (!dua) return [];
    if (listParam === 'favorites') {
      const favs = app.favorites.map(getDua).filter((d): d is Dua => !!d);
      return favs.some((d) => d.id === dua.id) ? favs : [dua];
    }
    const cat = isCategoryId(listParam) ? listParam : dua.categories[0];
    const list = duasInCategory(cat);
    return list.some((d) => d.id === dua.id) ? list : [dua];
  }, [dua, listParam, app.favorites]);

  if (!dua) {
    return (
      <View style={[styles.missing, { paddingTop: insets.top + space.lg, backgroundColor: colors.background }]}>
        <BackButton />
        <View style={styles.missingBody}>
          <AppText variant="title" center>This dua could not be found</AppText>
          <AppText muted center>It may have been removed in an update. Go back and choose another dua.</AppText>
        </View>
      </View>
    );
  }

  const index = Math.max(0, sequence.findIndex((d) => d.id === dua.id));
  const prev = index > 0 ? sequence[index - 1] : undefined;
  const next = index < sequence.length - 1 ? sequence[index + 1] : undefined;
  const listTitle = listParam === 'favorites' ? 'Favorites' : getCategory(isCategoryId(listParam) ? listParam : dua.categories[0])?.title.en ?? 'Dua';

  const count = app.countFor(dua.id);
  const done = count >= dua.repeat;
  const fav = app.isFavorite(dua.id);

  const go = (target?: Dua) => {
    if (!target) return;
    router.replace({ pathname: '/dua/[id]', params: { id: target.id, list: listParam || dua.categories[0] } });
  };

  const onCount = () => {
    if (done) {
      if (next) go(next);
      return;
    }
    const n = app.incrementDua(dua.id);
    if (n >= dua.repeat) successHaptic(settings.haptics);
    else tapHaptic(settings.haptics);
  };

  const onShare = () => {
    const parts = [dua.arabic, '', dua.english];
    if (settings.meanings !== 'en') parts.push('', dua.somali);
    parts.push('', dua.reference, '', 'Shared from Sakinah');
    Share.share({ message: parts.join('\n') }).catch(() => {});
  };

  const showEn = settings.meanings !== 'so';
  const showSo = settings.meanings !== 'en';
  const nextActive = done && !!next;

  return (
    <View style={[styles.flex1, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: space.xxl }} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { paddingTop: insets.top + space.sm }]}>
          <StarPattern id="duaStar" />
          <View style={styles.topBar}>
            <BackButton color={brand.cream} />
            <AppText variant="label" color={brand.cream} numberOfLines={1} style={styles.topTitle}>{listTitle}</AppText>
            <View style={styles.row}>
              <IconButton
                icon="heart" label={fav ? 'Remove from favorites' : 'Save to favorites'}
                onPress={() => { app.toggleFavorite(dua.id); tapHaptic(settings.haptics); }}
                color={brand.goldSoft} fill={fav ? brand.goldSoft : 'none'}
              />
              <IconButton icon="share" label="Share dua" onPress={onShare} color={brand.cream} />
            </View>
          </View>

          {sequence.length > 1 ? (
            <View style={styles.steps} accessibilityLabel={`Dua ${index + 1} of ${sequence.length}`}>
              <View style={styles.stepRow}>
                {sequence.map((d, i) => {
                  const isDone = app.countFor(d.id) >= d.repeat;
                  const bg = i === index ? brand.cream : isDone ? brand.gold : 'rgba(245,241,232,0.18)';
                  return <View key={d.id} style={[styles.step, { backgroundColor: bg }]} />;
                })}
              </View>
              <AppText variant="small" color="#A9C0BF">Dua {index + 1} of {sequence.length}</AppText>
            </View>
          ) : null}

          <View style={styles.heroBody}>
            <AppText variant="title" color={brand.cream} center>{dua.title.en}</AppText>
            <ArabicText size={settings.arabicSize} color={brand.cream} selectable>{dua.arabic}</ArabicText>
            {dua.repeat > 1 ? (
              <View style={styles.repeatPill}>
                <Icon name="repeat" size={14} color={brand.goldSoft} strokeWidth={2} />
                <AppText variant="small" color={brand.goldSoft}>Say it {dua.repeat} times</AppText>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.body}>
          {settings.transliteration && dua.transliteration ? (
            <AppText variant="italic" muted selectable>{dua.transliteration}</AppText>
          ) : null}

          {showEn ? (
            <View style={styles.meaning}>
              <View style={[styles.langPill, { backgroundColor: colors.mint }]}><AppText variant="small" color={colors.mintInk}>English</AppText></View>
              <AppText variant="body" selectable style={styles.meaningText}>{dua.english}</AppText>
            </View>
          ) : null}

          {showSo ? (
            <View style={styles.meaning}>
              <View style={styles.row}>
                <View style={[styles.langPill, { backgroundColor: colors.mint }]}><AppText variant="small" color={colors.mintInk}>Soomaali</AppText></View>
                {!dua.somaliReviewed ? (
                  <View style={[styles.langPill, { backgroundColor: colors.sand, marginLeft: 6 }]}>
                    <AppText variant="small" color={colors.sandInk}>Draft, awaiting review</AppText>
                  </View>
                ) : null}
              </View>
              <AppText variant="body" selectable style={styles.meaningText}>{dua.somali}</AppText>
            </View>
          ) : null}

          {dua.virtue ? (
            <View style={[styles.virtue, { backgroundColor: colors.sand }]}>
              <View style={[styles.virtueIcon, { backgroundColor: colors.surface }]}><Icon name="shield" size={18} color={colors.sandInk} /></View>
              <View style={styles.flex1}>
                <AppText variant="label" color={colors.sandInk}>Virtue</AppText>
                <AppText variant="body" style={{ fontSize: 15, lineHeight: 23 }}>{dua.virtue}</AppText>
              </View>
            </View>
          ) : null}

          <View style={styles.source}>
            <Icon name="book" size={18} color={colors.textMuted} />
            <AppText variant="caption" muted style={styles.flex1}>{dua.reference}</AppText>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.dock, { paddingBottom: Math.max(insets.bottom, 14) + 8, backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <Tap onPress={() => go(prev)} disabled={!prev} accessibilityLabel="Previous dua" style={[styles.navBtn, !prev && styles.disabled]}>
          <View style={[styles.navCircle, { borderColor: colors.border }]}><Icon name="back" size={18} color={colors.text} strokeWidth={2} /></View>
          <AppText variant="label">Prev</AppText>
        </Tap>

        <Tap
          onPress={onCount}
          accessibilityLabel={done ? (next ? 'Completed. Go to the next dua' : 'Completed') : `Count once, ${count} of ${dua.repeat}`}
          style={styles.counter}
        >
          <ProgressRing size={78} stroke={3.5} progress={count / dua.repeat} color={brand.goldDeep} track={colors.divider} />
          <View style={[styles.counterInner, { backgroundColor: brand.nightTeal }]}>
            {done ? (
              <Icon name="check" size={26} color={brand.goldSoft} strokeWidth={2.4} />
            ) : (
              <AppText variant="heading" color={brand.goldSoft} style={styles.counterText}>
                {count}<AppText variant="caption" color="#A9C0BF">/{dua.repeat}</AppText>
              </AppText>
            )}
          </View>
        </Tap>

        <Tap onPress={() => go(next)} disabled={!next} accessibilityLabel="Next dua" style={[styles.navBtn, styles.navRight, !next && styles.disabled]}>
          <AppText variant="label">Next</AppText>
          <View style={[styles.navCircle, nextActive ? { backgroundColor: brand.nightTeal, borderColor: brand.nightTeal } : { borderColor: colors.border }]}>
            <Icon name="forward" size={18} color={nextActive ? brand.goldSoft : colors.text} strokeWidth={2} />
          </View>
        </Tap>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  missing: { flex: 1, paddingHorizontal: space.lg },
  missingBody: { flex: 1, justifyContent: 'center', gap: space.md, paddingHorizontal: space.xxl },
  hero: { backgroundColor: brand.nightTeal, borderBottomLeftRadius: 36, borderBottomRightRadius: 36, overflow: 'hidden', paddingHorizontal: space.lg, paddingBottom: 30, gap: 18 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topTitle: { flex: 1, textAlign: 'center' },
  steps: { gap: 8, paddingHorizontal: 4 },
  stepRow: { flexDirection: 'row', gap: 3 },
  step: { flex: 1, height: 4, borderRadius: 2 },
  heroBody: { alignItems: 'center', gap: 14, paddingHorizontal: 4 },
  repeatPill: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 32, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(214,185,132,0.5)' },
  body: { paddingHorizontal: space.xxl, paddingTop: space.xxl, gap: 22 },
  meaning: { gap: 8 },
  langPill: { alignSelf: 'flex-start', height: 24, paddingHorizontal: 10, borderRadius: 12, justifyContent: 'center' },
  meaningText: { fontSize: 17, lineHeight: 27 },
  virtue: { flexDirection: 'row', gap: 14, padding: 18, borderRadius: radius.lg },
  virtueIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  source: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space.xxl, paddingTop: 12, borderTopWidth: 1 },
  navBtn: { width: 96, flexDirection: 'row', alignItems: 'center', gap: 8 },
  navRight: { justifyContent: 'flex-end' },
  navCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.35 },
  counter: { width: 78, height: 78, alignItems: 'center', justifyContent: 'center' },
  counterInner: { position: 'absolute', width: 62, height: 62, borderRadius: 31, alignItems: 'center', justifyContent: 'center' },
  counterText: { fontSize: 22, lineHeight: 26 },
});
