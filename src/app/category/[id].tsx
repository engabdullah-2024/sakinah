import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, ArabicText } from '@/components/AppText';
import { BackButton, Tap } from '@/components/Controls';
import { ProgressRing, StarPattern } from '@/components/Decor';
import { Icon } from '@/components/Icon';
import { getCategory } from '@/data/categories';
import { duasInCategory } from '@/data/duas';
import { useApp } from '@/state/AppState';
import { brand, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const app = useApp();
  const category = getCategory(id ?? '');

  if (!category) {
    return (
      <View style={[styles.flex1, { paddingTop: insets.top + space.lg, paddingHorizontal: space.lg, backgroundColor: colors.background }]}>
        <BackButton />
        <View style={styles.missing}>
          <AppText variant="title" center>Category not found</AppText>
          <AppText muted center>Go back and pick a category from the list.</AppText>
        </View>
      </View>
    );
  }

  const list = duasInCategory(category.id);
  const { done, total } = app.categoryProgress(category.id);
  const nextUp = list.find((d) => app.countFor(d.id) < d.repeat) ?? list[0];
  const allDone = total > 0 && done >= total;

  const open = (duaId: string) => router.push({ pathname: '/dua/[id]', params: { id: duaId, list: category.id } });

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: insets.bottom + space.xxxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.hero, { paddingTop: insets.top + space.sm }]}>
        <StarPattern id="catStar" />
        <BackButton color={brand.cream} />
        <View style={styles.heroRow}>
          <View style={styles.flex1}>
            <AppText variant="caption" color={brand.goldSoft}>{category.hint.en}</AppText>
            <AppText variant="display" color={brand.cream}>{category.title.en}</AppText>
            <AppText variant="caption" color="#A9C0BF">{category.title.so}, {total} duas</AppText>
          </View>
          <View style={styles.ring}>
            <ProgressRing size={84} stroke={6} progress={total ? done / total : 0} color={brand.gold} track="rgba(245,241,232,0.15)" />
            <View style={StyleSheet.absoluteFill}>
              <View style={styles.ringCenter}>
                <AppText variant="heading" color={brand.cream}>{done}</AppText>
                <AppText variant="small" color="#A9C0BF">of {total}</AppText>
              </View>
            </View>
          </View>
        </View>
        {nextUp ? (
          <Tap onPress={() => open(nextUp.id)} accessibilityLabel={allDone ? 'Read again' : done > 0 ? 'Continue reading' : 'Start reading'} style={styles.startBtn}>
            <Icon name="play" size={16} color="#17292A" />
            <AppText variant="label" color="#17292A">{allDone ? 'Read again' : done > 0 ? 'Continue reading' : 'Start reading'}</AppText>
          </Tap>
        ) : null}
      </View>

      <View style={styles.list}>
        {list.map((d, i) => {
          const c = app.countFor(d.id);
          const isDone = c >= d.repeat;
          return (
            <Tap key={d.id} onPress={() => open(d.id)} accessibilityLabel={`${d.title.en}${isDone ? ', done' : ''}`} style={[styles.item, { backgroundColor: colors.surface }]}>
              <View style={styles.itemHead}>
                <View style={[styles.num, { backgroundColor: isDone ? brand.teal : colors.surfaceAlt }]}>
                  {isDone ? <Icon name="check" size={15} color="#FFFFFF" strokeWidth={2.4} /> : <AppText variant="small" muted>{i + 1}</AppText>}
                </View>
                <View style={styles.flex1}>
                  <AppText variant="bodyStrong" numberOfLines={2}>{d.title.en}</AppText>
                  <AppText variant="caption" muted numberOfLines={1}>{d.title.so}</AppText>
                </View>
                {d.repeat > 1 ? (
                  <View style={[styles.badge, { backgroundColor: colors.sand }]}>
                    <AppText variant="small" color={colors.sandInk}>{Math.min(c, d.repeat)}/{d.repeat}</AppText>
                  </View>
                ) : null}
              </View>
              <ArabicText size={21} align="right" numberOfLines={2}>{d.arabic}</ArabicText>
            </Tap>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  missing: { flex: 1, justifyContent: 'center', gap: space.md },
  hero: { backgroundColor: brand.nightTeal, borderBottomLeftRadius: 36, borderBottomRightRadius: 36, overflow: 'hidden', paddingHorizontal: space.lg, paddingBottom: 26, gap: 14 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: space.lg, paddingHorizontal: 8 },
  ring: { width: 84, height: 84 },
  ringCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  startBtn: { marginHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 25, backgroundColor: brand.gold },
  list: { paddingHorizontal: space.xl, paddingTop: space.xl, gap: space.md },
  item: { borderRadius: radius.lg + 2, padding: space.lg, gap: space.sm },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  num: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  badge: { height: 26, paddingHorizontal: 10, borderRadius: 13, justifyContent: 'center' },
});
