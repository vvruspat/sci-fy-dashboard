import { type ReactNode, type ElementType } from 'react';
import { clsx } from 'clsx';
import styles from './GlassPanel.module.css';

export type GlassPanelMode = 'default' | 'invisible';

interface GlassPanelProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  shimmerColor?: string;
  shimmerOpacity?: number;
  style?: React.CSSProperties;
  /** 'invisible' drops the background, border, and shimmer line — just a layout shell. */
  mode?: GlassPanelMode;
}

export function GlassPanel({
  children,
  className,
  as: Tag = 'div',
  shimmerColor,
  shimmerOpacity,
  style,
  mode = 'default',
}: GlassPanelProps) {
  const shimmerVars = {
    ...(shimmerColor ? { '--shimmer-color': shimmerColor } : null),
    ...(shimmerOpacity !== undefined ? { '--shimmer-opacity': shimmerOpacity } : null),
  } as React.CSSProperties;

  return (
    <Tag
      className={clsx(mode === 'invisible' ? styles.invisible : ['glass-panel', styles.panel], className)}
      style={{ ...shimmerVars, ...style }}
    >
      {children}
    </Tag>
  );
}
