import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { GlassPanel } from '../GlassPanel';
import styles from './StatCardFrame.module.css';

export type StatCardAccent = 'cyan' | 'purple' | 'amber' | 'green' | 'red';

interface StatCardFrameProps {
  accent: StatCardAccent;
  children?: ReactNode;
  className?: string;
}

/** GlassPanel wrapper with StatCard's clip-path corner cut, accent border,
 * ambient glow orb, and hover shadow. */
export function StatCardFrame({ accent, children, className }: StatCardFrameProps) {
  return (
    <GlassPanel className={clsx(styles.card, styles[accent], className)}>
      <div className={styles.topLine} />
      {children}
    </GlassPanel>
  );
}

interface StatCardValueProps {
  accent: StatCardAccent;
  children?: ReactNode;
  className?: string;
}

/** Accent-tinted large numeric value text. */
export function StatCardValue({ accent, children, className }: StatCardValueProps) {
  return <span className={clsx(styles.value, styles[accent], className)}>{children}</span>;
}

interface StatCardSparkWrapProps {
  accent: StatCardAccent;
  children?: ReactNode;
  className?: string;
}

/** Accent-tinted sparkline wrapper. */
export function StatCardSparkWrap({ accent, children, className }: StatCardSparkWrapProps) {
  return <div className={clsx(styles.sparkWrap, styles[accent], className)}>{children}</div>;
}

/** Class name that tightens a Badge's line-height to 1 for use inside StatCard's footer. */
export const statCardTrendBadgeClassName = styles.trendBadge;

/** Class name that sizes an injected icon (e.g. a lucide icon) to StatCard's 13px header icon slot. */
export const statCardIconClassName = styles.icon;
