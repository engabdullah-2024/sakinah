import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/AppText';
import { BackButton, IconButton, Tap } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { CATEGORIES } from '@/data/categories';
import { DUAS, duasInCategory } from '@/data/duas';
import { useApp } from '@/state/AppState';
import { space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

export default function CategoriesScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const app = useApp();
  const tileW = (width - space.xl * 2 - space.md) / 2;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: insets.top + space.sm, paddingBottom: insets.bottom + space.xxxl, paddingHorizontal: space.xl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.top}>
        <BackButton />
        <IconButton icon="search" label="Search duas" onPress={() => router.push('/search')} bordered background={colors.surface} />
      </View>
      <AppText variant="display" style={styles.title}>All duas</AppText>
      <AppText muted style={styles.sub}>{DUAS.length} authentic duas in {CATEGORIES.length} categories</AppText>

      <View style={styles.grid}>
        {CATEGORIES.map((c) => {
          const total = duasInCategory(c.id).length;
          const { done } = app.categoryProgress(c.id);
          const mint = c.tone === 'mint';
          return (
            <Tap
              key={c.id}
              onPress={() => router.push({ pathname: '/category/[id]', params: { id: c.id } })}
              accessibilityLabel={`${c.title.en}, ${total} duas`}
              style={[styles.tile, { width: tileW, backgroundColor: colors.surface }]}
            >
              <View style={[styles.iconWrap, { backgroundColor: mint ? colors.mint : colors.sand }]}>
                <Icon name={c.icon} size={22} color={mint ? colors.mintInk : colors.sandInk} />
              </View>
              <View style={styles.tileText}>
                <AppText variant="label" numberOfLines={2} style={{ fontSize: 15, lineHeight: 19 }}>{c.title.en}</AppText>
                <AppText variant="small" muted numberOfLines={1}>{c.title.so}</AppText>
                <AppText variant="small" color={colors.mintInk}>{done > 0 ? `${done} of ${total} today` : `${total} duas`}</AppText>
              </View>
            </Tap>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { marginTop: space.md, marginHorizontal: 4 },
  sub: { marginHorizontal: 4, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md, marginTop: space.xl },
  tile: { height: 168, borderTopLeftRadius: 80, borderTopRightRadius: 80, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, padding: space.lg, justifyContent: 'flex-end', gap: 10 },
  iconWrap: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  tileText: { gap: 2 },
});
