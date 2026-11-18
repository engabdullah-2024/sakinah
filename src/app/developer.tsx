import React from 'react';
import { Image, Linking, ScrollView, Share, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, ArabicText } from '@/components/AppText';
import { BackButton, Tap } from '@/components/Controls';
import { SakinahMark, StarPattern } from '@/components/Decor';
import { GithubIcon, Icon } from '@/components/Icon';
import { CATEGORIES } from '@/data/categories';
import { DUAS } from '@/data/duas';
import type { IconName } from '@/data/types';
import { brand, radius, space } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

const GITHUB = 'https://github.com/engabdullah-2024';
const photo = require('@/assets/images/developer.jpg');

export default function DeveloperScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const credits: { title: string; sub: string; icon: IconName; tone: 'mint' | 'sand' }[] = [
    { title: 'Duas and references', sub: 'Hisnul Muslim by Sa’id ibn Ali ibn Wahf al-Qahtani', icon: 'book', tone: 'mint' },
    { title: 'Morning and evening data', sub: 'Morning-And-Evening-Adhkar-DB by Seen Arabic (MIT)', icon: 'sunrise', tone: 'mint' },
    { title: 'Somali review', sub: 'Somali meanings are drafts awaiting review', icon: 'check', tone: 'sand' },
    { title: 'Design and engineering', sub: 'TTMCHANGE, Mogadishu', icon: 'code', tone: 'mint' },
    { title: 'Typefaces', sub: 'Scheherazade New, Cormorant Garamond, Hanken Grotesk (SIL Open Font License)', icon: 'type', tone: 'mint' },
  ];
  const info = [
    { label: 'Version', value: version },
    { label: 'Duas', value: `${DUAS.length} in ${CATEGORIES.length} categories` },
    { label: 'Works offline', value: 'Yes' },
    { label: 'Data collected', value: 'None' },
  ];

  const openGithub = () => { Linking.openURL(GITHUB).catch(() => {}); };
  const shareApp = () => {
    Share.share({ message: 'Sakinah: daily duas with English and Somali meanings, offline and free. Made by TTMCHANGE.' }).catch(() => {});
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: insets.bottom + space.xxxl, gap: 22 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={[styles.band, { paddingTop: insets.top + space.sm }]}>
          <StarPattern id="devStar" opacity={0.07} />
          <View style={styles.bandRow}>
            <BackButton color={brand.cream} fallback="/settings" />
            <AppText variant="label" color={brand.cream}>About the developer</AppText>
            <View style={{ width: 44 }} />
          </View>
        </View>
        <View style={styles.avatarWrap}>
          <Image source={photo} style={[styles.avatar, { borderColor: colors.background }]} accessibilityLabel="Portrait of Eng Abdalla Ali" />
          <View style={[styles.badge, { borderColor: colors.background }]}><SakinahMark size={30} rounded={0.5} /></View>
        </View>
        <View style={styles.identity}>
          <AppText variant="display" center style={{ fontSize: 36, lineHeight: 40 }}>Eng Abdalla Ali</AppText>
          <AppText muted center style={{ fontSize: 15 }}>Co-founder and CTO, TTMCHANGE</AppText>
          <View style={styles.location}>
            <Icon name="pin" size={13} color={colors.textMuted} strokeWidth={2} />
            <AppText variant="caption" muted>Mogadishu, Somalia</AppText>
          </View>
        </View>
        <View style={styles.tags}>
          {['Software engineering', 'AI', 'Cybersecurity'].map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: colors.mint }]}><AppText variant="small" color={colors.mintInk} style={{ fontSize: 13 }}>{t}</AppText></View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Tap onPress={openGithub} accessibilityRole="link" accessibilityLabel="Open GitHub profile engabdullah-2024" style={[styles.action, { backgroundColor: colors.inverse }]}>
          <GithubIcon color={colors.onInverse} />
          <AppText variant="label" color={colors.onInverse} style={{ fontSize: 15 }}>GitHub</AppText>
        </Tap>
        <Tap onPress={shareApp} accessibilityLabel="Share app" style={[styles.action, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]}>
          <Icon name="share" size={18} color={colors.text} strokeWidth={1.9} />
          <AppText variant="label" style={{ fontSize: 15 }}>Share app</AppText>
        </Tap>
      </View>

      <View style={[styles.quote, { backgroundColor: colors.surface }]}>
        <AppText style={styles.quoteMark} color={brand.goldDeep}>“</AppText>
        <AppText variant="small" color={colors.mintInk} style={{ fontSize: 13, marginTop: 18 }}>Why I built Sakinah</AppText>
        <AppText variant="title" style={{ fontFamily: 'CormorantGaramond_500Medium', fontSize: 22, lineHeight: 30 }}>
          Most dua apps speak English or Arabic. I wanted every Somali Muslim to read the daily duas with a meaning they truly understand, offline, free, and without an account.
        </AppText>
        <AppText variant="caption" muted style={{ fontSize: 14, lineHeight: 21 }}>Every dua comes from the Qur’an or an authentic hadith, with its source shown under it.</AppText>
        <AppText variant="italic" muted style={{ fontSize: 14 }}>Abdalla, founder of Sakinah</AppText>
      </View>

      <View style={styles.group}>
        <AppText variant="small" muted style={styles.groupTitle}>Credits</AppText>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {credits.map((c, i) => (
            <View key={c.title} style={[styles.creditRow, i < credits.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
              <View style={[styles.rowIcon, { backgroundColor: c.tone === 'mint' ? colors.mint : colors.sand }]}>
                <Icon name={c.icon} size={17} color={c.tone === 'mint' ? colors.mintInk : colors.sandInk} strokeWidth={1.9} />
              </View>
              <View style={styles.flex1}>
                <AppText variant="label" style={{ fontSize: 15 }}>{c.title}</AppText>
                <AppText variant="caption" muted>{c.sub}</AppText>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <AppText variant="small" muted style={styles.groupTitle}>App</AppText>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {info.map((r, i) => (
            <View key={r.label} style={[styles.infoRow, i < info.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
              <AppText variant="bodyStrong" style={{ fontFamily: 'HankenGrotesk_500Medium', fontSize: 15 }}>{r.label}</AppText>
              <AppText variant="caption" muted style={{ fontSize: 15 }}>{r.value}</AppText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.duaCard}>
        <StarPattern id="devDua" opacity={0.06} />
        <ArabicText size={24} color={brand.goldSoft}>لَا تَنْسَوْنَا مِنْ صَالِحِ دُعَائِكُمْ</ArabicText>
        <AppText variant="caption" color="#D3E0DF" center style={{ fontSize: 15 }}>Ha nagu illoobin ducadiinna khayrka ah.</AppText>
      </View>

      <AppText variant="caption" muted center>© 2026 TTMCHANGE. Made in Mogadishu.</AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  band: { height: 236, backgroundColor: brand.nightTeal, borderBottomLeftRadius: 36, borderBottomRightRadius: 36, overflow: 'hidden', paddingHorizontal: space.lg },
  bandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatarWrap: { alignSelf: 'center', marginTop: -78, width: 156, height: 156 },
  avatar: { width: 156, height: 156, borderRadius: 78, borderWidth: 5 },
  badge: { position: 'absolute', right: 6, bottom: 6, width: 40, height: 40, borderRadius: 20, borderWidth: 4, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: brand.teal },
  identity: { alignItems: 'center', gap: 4, marginTop: 12, paddingHorizontal: space.xxl },
  location: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 16, paddingHorizontal: space.xxl },
  tag: { height: 30, paddingHorizontal: 12, borderRadius: 15, justifyContent: 'center' },
  actions: { flexDirection: 'row', gap: 10, marginHorizontal: space.xl },
  action: { flex: 1, height: 50, borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  quote: { marginHorizontal: space.xl, borderRadius: radius.xl, paddingHorizontal: 22, paddingTop: 22, paddingBottom: 22, gap: 12 },
  quoteMark: { position: 'absolute', left: 18, top: -6, fontFamily: 'CormorantGaramond_600SemiBold', fontSize: 84, lineHeight: 100 },
  group: { gap: 8, marginHorizontal: space.xl },
  groupTitle: { marginHorizontal: 6, fontSize: 13 },
  card: { borderRadius: radius.lg, overflow: 'hidden' },
  creditRow: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 60, paddingHorizontal: space.lg, paddingVertical: 10 },
  rowIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 52, paddingHorizontal: space.lg },
  duaCard: { marginHorizontal: space.xl, borderRadius: radius.xl, backgroundColor: brand.nightTeal, overflow: 'hidden', paddingVertical: 24, paddingHorizontal: 20, alignItems: 'center', gap: 4 },
});
