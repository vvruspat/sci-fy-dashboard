import { type ReactNode } from 'react';
import styles from './MetricRow.module.css';

interface MetricRowProps {
  label: ReactNode;
  value: ReactNode;
  valueColor?: string;
}

/** A single "label ... value" line, right-aligned value — used in metric/detail grids. */
export function MetricRow({ label, value, valueColor }: MetricRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value} style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </span>
    </div>
  );
}
