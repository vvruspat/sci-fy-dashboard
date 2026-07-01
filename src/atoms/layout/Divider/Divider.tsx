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
  thickness = 1,
  opacity,
  className,
  style,
}: DividerProps) {
  const isVertical = orientation === 'vertical';
  const gradientDirection = isVertical ? '180deg' : '90deg';

  return (
    <div
      className={clsx(styles.divider, className)}
      style={{
        width: isVertical ? thickness : '100%',
        height: isVertical ? '100%' : thickness,
        background:
          variant === 'fade'
            ? `linear-gradient(${gradientDirection}, transparent 0%, ${color} 50%, transparent 100%)`
            : color,
        opacity,
        ...style,
      }}
    />
  );
}
