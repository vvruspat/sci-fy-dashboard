import { type CSSProperties } from 'react';
import { clsx } from 'clsx';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'fade';

interface DividerProps {
  orientation?: DividerOrientation;
  /** 'fade' renders a gradient that fades to transparent at both ends — used for the
   * decorative accent lines on widget/panel edges. */
  variant?: DividerVariant;
  color?: string;
  /** Second color stop — renders a two-tone fade (color at `colorStop`%, colorEnd at `colorEndStop`%)
   * instead of a single-color fade. Only used when `variant="fade"`. */
  colorEnd?: string;
  /** Position (0-100) of the first color stop. Defaults to 50 for a single color, 40 for two-tone. */
  colorStop?: number;
  /** Position (0-100) of the second color stop, when `colorEnd` is set. Defaults to 70. */
  colorEndStop?: number;
  thickness?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

/** A single hairline separator, solid or fading, horizontal or vertical. */
export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'var(--border-dim)',
  colorEnd,
  colorStop,
  colorEndStop = 70,
  thickness = 1,
  opacity,
  className,
  style,
}: DividerProps) {
  const isVertical = orientation === 'vertical';
  const gradientDirection = isVertical ? '180deg' : '90deg';
  const firstStop = colorStop ?? (colorEnd ? 40 : 50);

  const gradient = colorEnd
    ? `linear-gradient(${gradientDirection}, transparent 0%, ${color} ${firstStop}%, ${colorEnd} ${colorEndStop}%, transparent 100%)`
    : `linear-gradient(${gradientDirection}, transparent 0%, ${color} ${firstStop}%, transparent 100%)`;

  return (
    <div
      className={clsx(styles.divider, className)}
      style={{
        width: isVertical ? thickness : '100%',
        height: isVertical ? '100%' : thickness,
        background: variant === 'fade' ? gradient : color,
        opacity,
        ...style,
      }}
    />
  );
}
