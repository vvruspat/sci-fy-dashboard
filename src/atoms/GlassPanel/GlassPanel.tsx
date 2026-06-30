import { type ReactNode, type ElementType } from 'react';
import { clsx } from 'clsx';
import styles from './GlassPanel.module.css';

interface GlassPanelProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  shimmerColor?: string;
  style?: React.CSSProperties;
}

export function GlassPanel({
  children,
  className,
  as: Tag = 'div',
  shimmerColor,
  style,
}: GlassPanelProps) {
  return (
    <Tag
      className={clsx('glass-panel', styles.panel, className)}
      style={shimmerColor ? { '--shimmer-color': shimmerColor, ...style } as React.CSSProperties : style}
    >
      {children}
    </Tag>
  );
}
