import React, { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { BottomTabBarProps } from 'expo-router/js-tabs';

import type { IconName } from '@/data/types';
import { selectionHaptic } from '@/lib/haptics';
import { useApp } from '@/state/AppState';
import { brand } from '@/theme/tokens';
import { Icon } from './Icon';

const BAR_H = 76;
const OVERHANG = 32; // how far the active circle rises above the bar
const CIRCLE = 56;
const SIDE = 16;
const BAR_COLOR = '#17292A';

const TABS: Record<string, { icon: IconName; label: string }> = {
  index: { icon: 'home', label: 'Home' },
  favorites: { icon: 'heart', label: 'Favorites' },
  settings: { icon: 'sliders', label: 'Settings' },
};

/** Total vertical space the floating bar needs; screens pad their content by this. */
export function tabBarSpace(bottomInset: number) {
  return BAR_H + OVERHANG + Math.max(bottomInset, 12) + 16;
}

function notchPath(w: number, h: number, cx: number): string {
  const r = 22;
  const hw = Math.min(58, w * 0.16); // half width of the notch opening
  const depth = 46;
  const x = Math.max(r + hw, Math.min(w - r - hw, cx));
  return [
    `M0,${r}`, `A${r},${r} 0 0 1 ${r},0`,
    `L${x - hw},0`,
    `C${x - hw + 14},0 ${x - hw + 18},9 ${x - hw + 24},20`,
    `C${x - 28},${depth - 8} ${x - 18},${depth} ${x},${depth}`,
    `C${x + 18},${depth} ${x + 28},${depth - 8} ${x + hw - 24},20`,
    `C${x + hw - 18},9 ${x + hw - 14},0 ${x + hw},0`,
    `L${w - r},0`, `A${r},${r} 0 0 1 ${w},${r}`,
    `L${w},${h - r}`, `A${r},${r} 0 0 1 ${w - r},${h}`,
    `L${r},${h}`, `A${r},${r} 0 0 1 0,${h - r}`, 'Z',
  ].join(' ');
}

export function NotchedTabBar({ state, emitter, navigateToTab, insets }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const { settings } = useApp();
  const barW = width - SIDE * 2;
  const count = state.routes.length || 1;
  const centers = state.routes.map((_, i) => (barW / count) * (i + 0.5));
  const target = centers[state.index] ?? centers[0] ?? barW / 2;

  const [anim] = useState(() => new Animated.Value(target));
  const [cx, setCx] = useState(target);

  useEffect(() => {
    const id = anim.addListener(({ value }) => setCx(value));
    return () => anim.removeListener(id);
  }, [anim]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: target, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: false,
    }).start();
  }, [anim, target]);

  const bottom = Math.max(insets.bottom, 12);

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom, left: SIDE, right: SIDE, height: BAR_H + OVERHANG }]}>
      <Svg width={barW} height={BAR_H} style={styles.bar}>
        <Path d={notchPath(barW, BAR_H, cx)} fill={BAR_COLOR} />
      </Svg>

      <View
        pointerEvents="none"
        style={[styles.circle, { left: cx - CIRCLE / 2, top: OVERHANG - CIRCLE / 2 + 2 }]}
      >
        <Icon name={TABS[state.routes[state.index]?.name]?.icon ?? 'home'} size={25} color={brand.gold} strokeWidth={2} />
      </View>

      {state.routes.map((route, i) => {
        const focused = i === state.index;
        const meta = TABS[route.name] ?? { icon: 'home' as IconName, label: route.name };
        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            selectionHaptic(settings.haptics);
            navigateToTab(route.key);
          }
        };
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityLabel={meta.label}
            accessibilityState={{ selected: focused }}
            style={[styles.tab, { left: centers[i] - 30, top: focused ? OVERHANG - 30 : OVERHANG + BAR_H / 2 - 30 }]}
          >
            {focused ? null : <Icon name={meta.icon} size={24} color="#FFFFFF" strokeWidth={1.8} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute' },
  bar: { position: 'absolute', left: 0, bottom: 0 },
  circle: {
    position: 'absolute', width: CIRCLE, height: CIRCLE, borderRadius: CIRCLE / 2, backgroundColor: BAR_COLOR,
    alignItems: 'center', justifyContent: 'center',
  },
  tab: { position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
});
