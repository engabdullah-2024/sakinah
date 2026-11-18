import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, ArabicText } from '@/components/AppText';
import { BackButton, IconButton, Tap } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { getCategory } from '@/data/categories';
import { DUAS } from '@/data/duas';
import { matchesQuery } from '@/lib/arabic';
import { fonts, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

const INDEX = DUAS.map((d) => ({
  dua: d,
  latin: [d.title.en, d.title.so, d.english, d.somali, d.transliteration, d.reference].join(' '),
}));

const SUGGESTIONS = ['sleep', 'travel', 'forgiveness', 'safar', 'hurdo', 'بسم الله'];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [q, setQ] = useState('');

  const results = useMemo(
    () => (q.trim().length < 2 ? [] : INDEX.filter((x) => matchesQuery(q, x.latin, x.dua.arabic)).map((x) => x.dua)),
    [q],
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top + space.sm, backgroundColor: colors.background }]}>
      <View style={styles.bar}>
        <BackButton />
        <View style={[styles.field, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Icon name="search" size={19} color={colors.textMuted} />
          <TextInput
            value={q}
            onChangeText={setQ}
            autoFocus
            placeholder="Search in English, Somali or Arabic"
            placeholderTextColor={colors.textMuted}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            accessibilityLabel="Search duas"
            style={[styles.input, { color: colors.text }]}
          />
          {q ? <IconButton icon="close" label="Clear search" onPress={() => setQ('')} size={36} color={colors.textMuted} /> : null}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(d) => d.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: space.xl, gap: space.md, paddingBottom: insets.bottom + space.xxxl }}
        ListHeaderComponent={
          q.trim().length >= 2 ? (
            <AppText variant="caption" muted>{results.length === 1 ? '1 dua found' : `${results.length} duas found`}</AppText>
          ) : (
            <View style={styles.hints}>
              <AppText variant="label" muted>Try searching for</AppText>
              <View style={styles.suggest}>
                {SUGGESTIONS.map((s) => (
                  <Tap key={s} onPress={() => setQ(s)} accessibilityLabel={`Search ${s}`} style={[styles.suggestChip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <AppText variant="label">{s}</AppText>
                  </Tap>
                ))}
              </View>
            </View>
          )
        }
        ListEmptyComponent={
          q.trim().length >= 2 ? (
            <View style={styles.empty}>
              <AppText variant="title" center>No duas match “{q.trim()}”</AppText>
              <AppText muted center>Try a shorter word, or search in another language.</AppText>
            </View>
          ) : undefined
        }
        renderItem={({ item }) => (
          <Tap
            onPress={() => router.push({ pathname: '/dua/[id]', params: { id: item.id, list: item.categories[0] } })}
            accessibilityLabel={`Open ${item.title.en}`}
            style={[styles.item, { backgroundColor: colors.surface }]}
          >
            <View style={[styles.tag, { backgroundColor: colors.mint }]}>
              <AppText variant="small" color={colors.mintInk}>{getCategory(item.categories[0])?.title.en ?? ''}</AppText>
            </View>
            <ArabicText size={21} align="right" numberOfLines={2}>{item.arabic}</ArabicText>
            <AppText variant="bodyStrong">{item.title.en}</AppText>
            <AppText variant="caption" muted numberOfLines={2}>{item.english}</AppText>
          </Tap>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bar: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: space.md },
  field: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, height: 50, borderRadius: radius.md, borderWidth: 1, paddingLeft: 14, paddingRight: 4 },
  input: { flex: 1, fontFamily: fonts.body, fontSize: 16, paddingVertical: 0 },
  hints: { gap: 10 },
  suggest: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  suggestChip: { height: 38, paddingHorizontal: 14, borderRadius: 19, borderWidth: 1, justifyContent: 'center' },
  empty: { marginTop: 60, gap: 8, paddingHorizontal: space.xl },
  item: { borderRadius: radius.lg, padding: space.lg, gap: 6 },
  tag: { alignSelf: 'flex-start', height: 24, paddingHorizontal: 10, borderRadius: 12, justifyContent: 'center' },
});
