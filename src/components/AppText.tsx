import React from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { arabicLineHeight, fonts } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

type Variant =
  | 'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'label' | 'caption' | 'small' | 'italic';

const VARIANTS: Record<Variant, TextStyle> = {
  display: { fontFamily: fonts.display, fontSize: 34, lineHeight: 38 },
  title: { fontFamily: fonts.display, fontSize: 28, lineHeight: 32 },
  heading: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 25 },
  bodyStrong: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22 },
  label: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 19 },
  caption: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18 },
  small: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
  italic: { fontFamily: fonts.bodyItalic, fontSize: 15, lineHeight: 24 },
};

type Props = TextProps & { variant?: Variant; color?: string; muted?: boolean; center?: boolean };

export function AppText({ variant = 'body', color, muted, center, style, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <Text
      maxFontSizeMultiplier={1.4}
      {...rest}
      style={[
        VARIANTS[variant],
        { color: color ?? (muted ? colors.textMuted : colors.text) },
        center && styles.center,
        style,
      ]}
    />
  );
}

type ArabicProps = TextProps & { size?: number; bold?: boolean; color?: string; align?: 'center' | 'right' };

/** Arabic text: Scheherazade New, RTL, generous line height for harakat. */
export function ArabicText({ size = 28, bold, color, align = 'center', style, ...rest }: ArabicProps) {
  const { colors } = useTheme();
  return (
    <Text
      maxFontSizeMultiplier={1.3}
      {...rest}
      style={[
        {
          fontFamily: bold ? fonts.arabicBold : fonts.arabic,
          fontSize: size,
          lineHeight: arabicLineHeight(size),
          color: color ?? colors.text,
          textAlign: align,
          writingDirection: 'rtl',
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({ center: { textAlign: 'center' } });
