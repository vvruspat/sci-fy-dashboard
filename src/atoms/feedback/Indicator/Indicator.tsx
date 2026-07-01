import { clsx } from 'clsx';
import styles from './Indicator.module.css';

export type IndicatorStatus = 'online' | 'offline' | 'warning' | 'critical' | 'idle';

interface IndicatorProps {
  status: IndicatorStatus;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const STATUS_LABELS: Record<IndicatorStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  warning: 'Warning',
  critical: 'Critical',
  idle: 'Idle',
};

export function Indicator({ status, label, size = 'md', pulse = true }: IndicatorProps) {
  return (
    <span className={clsx(styles.indicator, styles[size])}>
      <span className={clsx(styles.dot, styles[status], pulse && styles.pulse)}>
        {pulse && status !== 'offline' && status !== 'idle' && (
          <span className={clsx(styles.ring, styles[status])} />
        )}
      </span>
      {label !== undefined ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <span className={styles.label}>{STATUS_LABELS[status]}</span>
      )}
    </span>
  );
}
