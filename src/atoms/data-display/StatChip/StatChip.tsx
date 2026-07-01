import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Cluster } from '../../layout/Cluster';
import styles from './StatChip.module.css';

interface StatChipProps {
  icon: ReactNode;
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

/** Inline icon + value + label stat, e.g. topbar uptime/time readouts. */
export function StatChip({ icon, value, label, className }: StatChipProps) {
  return (
    <Cluster gap={5} className={clsx(styles.stat, className)}>
      {icon}
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </Cluster>
  );
}
