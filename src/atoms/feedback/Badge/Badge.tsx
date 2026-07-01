import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'cyan' | 'purple' | 'amber' | 'green' | 'red' | 'dim';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({ variant = 'cyan', children, dot, className }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {dot && <span className={clsx(styles.dot, styles[`dot_${variant}`])} />}
      {children}
    </span>
  );
}
