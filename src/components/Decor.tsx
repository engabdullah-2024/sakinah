import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Path, Pattern, Rect } from 'react-native-svg';

import { brand } from '@/theme/tokens';

/** Faint 8-point star pattern that sits behind teal surfaces. */
export function StarPattern({ opacity = 0.06, id = 'star8' }: { opacity?: number; id?: string }) {
  const stroke = `rgba(245,241,232,${opacity})`;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id={id} width={56} height={56} patternUnits="userSpaceOnUse">
            <Rect x={18} y={18} width={20} height={20} fill="none" stroke={stroke} strokeWidth={1} />
            <Rect x={18} y={18} width={20} height={20} fill="none" stroke={stroke} strokeWidth={1} transform="rotate(45 28 28)" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/** The Sakinah mark: arch, crescent and star. */
export function SakinahMark({ size = 48, background = brand.teal, rounded = 0.27 }: { size?: number; background?: string | null; rounded?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" accessibilityElementsHidden importantForAccessibility="no">
      {background ? <Rect width={1024} height={1024} rx={1024 * rounded} fill={background} /> : null}
      <Path d="M352,740 L352,490 C352,392 440,338 512,286 C584,338 672,392 672,490 L672,740" fill="none" stroke={brand.gold} strokeWidth={44} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M512,410 a80,80 0 1 0 73,113 a70,70 0 1 1 -73,-113 z" fill={brand.gold} />
    </Svg>
  );
}

type RingProps = { size: number; stroke: number; progress: number; color: string; track: string };

/** Circular progress ring, progress 0..1, starting at 12 o'clock. */
export function ProgressRing({ size, stroke, progress, color, track }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }} accessibilityElementsHidden importantForAccessibility="no">
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      {p > 0 ? (
        <Circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={`${c} ${c}`} strokeDashoffset={c * (1 - p)}
        />
      ) : null}
    </Svg>
  );
}
