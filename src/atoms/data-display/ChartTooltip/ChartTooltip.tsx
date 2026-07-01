import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './ChartTooltip.module.css';

interface ChartTooltipProps {
  heading: ReactNode;
  /** Uppercase mono heading (chart title) vs. plain dim time label. */
  headingVariant?: 'title' | 'time';
  children: ReactNode;
  className?: string;
}

/** Shell for recharts custom tooltips — consistent glass background + heading + rows. */
export function ChartTooltip({ heading, headingVariant = 'title', children, className }: ChartTooltipProps) {
  return (
    <div className={clsx(styles.tooltip, className)}>
      <div className={clsx(styles.heading, styles[headingVariant])}>{heading}</div>
      {children}
    </div>
  );
}

interface ChartTooltipRowProps {
  label: ReactNode;
  value: ReactNode;
  dotColor?: string;
  valueColor?: string;
}

export function ChartTooltipRow({ label, value, dotColor, valueColor }: ChartTooltipRowProps) {
  return (
    <div className={styles.row}>
      {dotColor && <span className={styles.dot} style={{ background: dotColor }} />}
      <span className={styles.key}>{label}</span>
      <span className={styles.value} style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </span>
    </div>
  );
}
