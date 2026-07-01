import { type ReactNode, type ElementType } from 'react';
import { clsx } from 'clsx';
import styles from './GlassPanel.module.css';

interface GlassPanelProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  shimmerColor?: string;
  shimmerOpacity?: number;
  style?: React.CSSProperties;
}

export function GlassPanel({
  children,
  className,
  as: Tag = 'div',
  shimmerColor,
  shimmerOpacity,
  style,
}: GlassPanelProps) {
  const shimmerVars = {
    ...(shimmerColor ? { '--shimmer-color': shimmerColor } : null),
    ...(shimmerOpacity !== undefined ? { '--shimmer-opacity': shimmerOpacity } : null),
  } as React.CSSProperties;

  return (
    <Tag
      className={clsx('glass-panel', styles.panel, className)}
      style={{ ...shimmerVars, ...style }}
    >
      {children}
    </Tag>
  );
}
