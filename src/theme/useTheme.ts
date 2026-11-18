import { useColorScheme } from 'react-native';

import { useApp } from '@/state/AppState';
import { darkPalette, lightPalette, type Palette } from './tokens';

export function useTheme(): { colors: Palette; isDark: boolean } {
  const system = useColorScheme();
  const { settings } = useApp();
  const isDark = settings.theme === 'dark' || (settings.theme === 'system' && system === 'dark');
  return { colors: isDark ? darkPalette : lightPalette, isDark };
}
