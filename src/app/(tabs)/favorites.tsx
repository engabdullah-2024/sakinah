import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, ArabicText } from '@/components/AppText';
import { Chip, IconButton, Tap } from '@/components/Controls';
import { StarPattern } from '@/components/Decor';
import { Icon } from '@/components/Icon';
import { tabBarSpace } from '@/components/NotchedTabBar';
import { getCategory } from '@/data/categories';
import { getDua } from '@/data/duas';
import type { CategoryId, Dua } from '@/data/types';
import { tapHaptic } from '@/lib/haptics';
import { useApp } from '@/state/AppState';
import { brand, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { favorites, toggleFavorite, settings } = useApp();
  const [filter, setFilter] = useState<CategoryId | 'all'>('all');

  const saved = useMemo(() => favorites.map(getDua).filter((d): d is Dua => !!d), [favorites]);
  const cats = useMemo(() => {
    const ids: CategoryId[] = [];
    for (const d of saved) if (!ids.includes(d.categories[0])) ids.push(d.categories[0]);
    return ids;
  }, [saved]);
  const active = filter !== 'all' && !cats.includes(filter) ? 'all' : filter;
  const shown = active === 'all' ? saved : saved.filter((d) => d.categories[0] === active);

  const readAll = () => {
    if (saved.length === 0) return;
    router.push({ pathname: '/dua/[id]', params: { id: saved[0].id, list: 'favorites' } });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + space.lg, paddingBottom: tabBarSpace(insets.bottom), paddingHorizontal: space.xl, gap: 18 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <AppText variant="display">Favorites</AppText>
          <AppText variant="caption" muted>
            {saved.length === 1 ? '1 dua saved on this phone' : `${saved.length} duas saved on this phone`}
          </AppText>
        </View>
        <IconButton icon="search" label="Search duas" onPress={() => router.push('/search')} bordered background={colors.surface} size={46} />
      </View>

      {saved.length > 0 ? (
        <Tap onPress={readAll} accessibilityLabel="Read all favorites in a row" style={styles.readAll}>
          <StarPattern id="favStar" opacity={0.07} />
          <View style={styles.play}><Icon name="play" size={20} color="#17292A" /></View>
          <View style={styles.flex1}>
            <AppText variant="bodyStrong" color={brand.cream}>Read all in a row</AppText>
            <AppText variant="caption" color="#A9C0BF">{saved.length} saved duas, one after another</AppText>
          </View>
        </Tap>
      ) : null}

      {cats.length > 1 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} style={styles.chipsWrap}>
          <Chip label={`All ${saved.length}`} selected={active === 'all'} onPress={() => setFilter('all')} />
          {cats.map((c) => (
            <Chip
              key={c}
              label={`${getCategory(c)?.title.en ?? c} ${saved.filter((d) => d.categories[0] === c).length}`}
              selected={active === c}
              onPress={() => setFilter(c)}
            />
          ))}
        </ScrollView>
      ) : null}

      {shown.map((d) => (
        <View key={d.id} style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.cardHead}>
            <View style={[styles.tag, { backgroundColor: colors.mint }]}>
              <AppText variant="small" color={colors.mintInk}>{getCategory(d.categories[0])?.title.en ?? ''}</AppText>
            </View>
            <IconButton
              icon="heart"
              label={`Remove ${d.title.en} from favorites`}
              onPress={() => { toggleFavorite(d.id); tapHaptic(settings.haptics); }}
              color={colors.sandInk}
              fill={brand.goldDeep}
            />
          </View>
          <Tap
            onPress={() => router.push({ pathname: '/dua/[id]', params: { id: d.id, list: 'favorites' } })}
            accessibilityLabel={`Open ${d.title.en}`}
            style={styles.cardBody}
          >
            <ArabicText size={23} align="right" numberOfLines={3}>{d.arabic}</ArabicText>
            <View style={[styles.cardFoot, { borderTopColor: colors.divider }]}>
              <View style={styles.flex1}>
                <AppText variant="bodyStrong">{d.title.en}</AppText>
                <AppText variant="caption" muted numberOfLines={1}>{d.reference}</AppText>
              </View>
              <View style={[styles.arrow, { backgroundColor: colors.background }]}><Icon name="forward" size={16} color={colors.text} strokeWidth={2} /></View>
            </View>
          </Tap>
        </View>
      ))}

      {shown.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.surface }]}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.sand }]}><Icon name="heart" size={28} color={colors.sandInk} /></View>
          <AppText variant="title" center>No favorites yet</AppText>
          <AppText variant="caption" muted center style={{ maxWidth: 240 }}>Tap the heart on any dua to keep it here.</AppText>
          <Tap onPress={() => router.push('/categories')} accessibilityLabel="Browse duas" style={[styles.browse, { backgroundColor: colors.inverse }]}>
            <AppText variant="label" color={colors.onInverse}>Browse duas</AppText>
          </Tap>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 4 },
  readAll: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderRadius: radius.xl, backgroundColor: brand.nightTeal, overflow: 'hidden' },
  play: { width: 52, height: 52, borderRadius: 26, backgroundColor: brand.gold, alignItems: 'center', justifyContent: 'center' },
  chipsWrap: { marginHorizontal: -space.xl, flexGrow: 0 },
  chips: { gap: 8, paddingHorizontal: space.xl },
  card: { borderRadius: 22, paddingHorizontal: space.lg, paddingTop: 8, paddingBottom: 14 },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: -10 },
  tag: { height: 26, paddingHorizontal: 10, borderRadius: 13, justifyContent: 'center' },
  cardBody: { gap: 10 },
  cardFoot: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10, borderTopWidth: 1 },
  arrow: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', gap: 10, paddingVertical: 40, paddingHorizontal: 24, borderRadius: radius.xl },
  emptyIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  browse: { marginTop: 6, height: 44, paddingHorizontal: 22, borderRadius: 22, justifyContent: 'center' },
});
