/**
 * Sakinah design system tokens.
 * One source of truth for color, type, spacing and radius, matching the canvas designs.
 */

export const brand = {
  nightTeal: '#143F45',
  teal: '#1F5F63',
  gold: '#D6B984',
  goldSoft: '#E2C793',
  goldDeep: '#C9A96E',
  goldInk: '#8A6A2F',
  cream: '#F5F1E8',
  danger: '#A3362B',
} as const;

export type Palette = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  divider: string;
  mint: string;
  mintInk: string;
  sand: string;
  sandInk: string;
  dangerTint: string;
  danger: string;
  track: string;
  inverse: string;
  onInverse: string;
};

export const lightPalette: Palette = {
  background: '#F3F6F5',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF3F2',
  text: '#17292A',
  textMuted: '#4F6264',
  border: '#DCE5E4',
  divider: '#EDF1F0',
  mint: '#E8F1EF',
  mintInk: '#1F5F63',
  sand: '#F6EEDF',
  sandInk: '#8A6A2F',
  dangerTint: '#FBEAE8',
  danger: '#A3362B',
  track: '#C5D1D0',
  inverse: '#17292A',
  onInverse: '#FFFFFF',
};

export const darkPalette: Palette = {
  background: '#0E2326',
  surface: '#16302F',
  surfaceAlt: '#1C3A3B',
  text: '#EEF3F2',
  textMuted: '#A9C0BF',
  border: '#2A4A4B',
  divider: '#21403F',
  mint: '#1F4A4B',
  mintInk: '#B9DCD7',
  sand: '#3A3122',
  sandInk: '#E2C793',
  dangerTint: '#4A2421',
  danger: '#F2A097',
  track: '#3C5658',
  inverse: '#EEF3F2',
  onInverse: '#17292A',
};

export const fonts = {
  arabic: 'ScheherazadeNew_400Regular',
  arabicBold: 'ScheherazadeNew_700Bold',
  display: 'CormorantGaramond_600SemiBold',
  displayMedium: 'CormorantGaramond_500Medium',
  body: 'HankenGrotesk_400Regular',
  bodyItalic: 'HankenGrotesk_400Regular_Italic',
  medium: 'HankenGrotesk_500Medium',
  semibold: 'HankenGrotesk_600SemiBold',
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;

export const radius = { sm: 10, md: 14, lg: 20, xl: 24, xxl: 30, pill: 999 } as const;

/** Arabic text needs generous line height so harakat never collide. */
export const arabicLineHeight = (size: number) => Math.round(size * 1.9);

export const ARABIC_SIZES = { min: 20, max: 40, step: 2, default: 28 } as const;
