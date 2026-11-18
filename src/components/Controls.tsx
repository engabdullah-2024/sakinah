import React from 'react';
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { router } from 'expo-router';

import type { IconName } from '@/data/types';
import { radius } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type TapProps = Omit<PressableProps, 'style'> & { style?: StyleProp<ViewStyle>; pressedOpacity?: number };

/** Pressable with a calm press state used everywhere. */
export function Tap({ style, pressedOpacity = 0.7, children, ...rest }: TapProps) {
  return (
    <Pressable
      accessibilityRole="button"
      {...rest}
      style={({ pressed }) => [style, pressed && { opacity: pressedOpacity, transform: [{ scale: 0.98 }] }]}
    >
      {children}
    </Pressable>
  );
}

type IconButtonProps = {
  icon: IconName;
  label: string;
  onPress: () => void;
  color?: string;
  fill?: string;
  bordered?: boolean;
  borderColor?: string;
  background?: string;
  size?: number;
};

export function IconButton({ icon, label, onPress, color, fill, bordered, borderColor, background, size = 44 }: IconButtonProps) {
  const { colors } = useTheme();
  return (
    <Tap
      onPress={onPress}
      accessibilityLabel={label}
      hitSlop={6}
      style={[
        styles.iconBtn,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background ?? 'transparent' },
        bordered && { borderWidth: 1, borderColor: borderColor ?? colors.border },
      ]}
    >
      <Icon name={icon} size={21} color={color ?? colors.text} fill={fill} />
    </Tap>
  );
}

export function BackButton({ color, fallback = '/' }: { color?: string; fallback?: string }) {
  const { colors } = useTheme();
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace(fallback as never);
  };
  return <IconButton icon="back" label="Go back" onPress={goBack} color={color ?? colors.text} />;
}

export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      hitSlop={8}
      style={[styles.track, { backgroundColor: value ? '#1F5F63' : colors.track }]}
    >
      <View style={[styles.knob, { left: value ? 23 : 3 }]} />
    </Pressable>
  );
}

type ChipProps = { label: string; selected: boolean; onPress: () => void; dark?: boolean };

export function Chip({ label, selected, onPress, dark }: ChipProps) {
  const { colors } = useTheme();
  const bg = selected ? (dark ? '#D6B984' : colors.inverse) : dark ? 'transparent' : colors.surface;
  const fg = selected ? (dark ? '#17292A' : colors.onInverse) : dark ? '#F5F1E8' : colors.text;
  const border = selected ? bg : dark ? 'rgba(245,241,232,0.22)' : colors.border;
  return (
    <Tap
      onPress={onPress}
      accessibilityState={{ selected }}
      style={[styles.chip, { backgroundColor: bg, borderColor: border }]}
    >
      <AppText variant="label" color={fg}>{label}</AppText>
    </Tap>
  );
}

const styles = StyleSheet.create({
  iconBtn: { alignItems: 'center', justifyContent: 'center' },
  track: { width: 50, height: 30, borderRadius: 15, justifyContent: 'center' },
  knob: {
    position: 'absolute', top: 3, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2,
  },
  chip: { height: 40, paddingHorizontal: 16, borderRadius: radius.pill, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
