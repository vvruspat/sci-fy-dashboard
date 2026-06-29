import { clsx } from 'clsx';
import styles from './ProgressBar.module.css';

export type ProgressVariant = 'cyan' | 'purple' | 'amber' | 'green' | 'red';

interface ProgressBarProps {
  value: number; // 0-100
  variant?: ProgressVariant;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

function getAutoVariant(value: number): ProgressVariant {
  if (value >= 90) return 'red';
  if (value >= 75) return 'amber';
  return 'cyan';
}

export function ProgressBar({
  value,
  variant,
  label,
  showValue = true,
  size = 'md',
  animated = true,
  className,
}: ProgressBarProps) {
  const resolvedVariant = variant ?? getAutoVariant(value);
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={clsx(styles.wrapper, className)}>
      {(label || showValue) && (
        <div className={styles.meta}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && (
            <span className={clsx(styles.value, styles[resolvedVariant])}>
              {clamped.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={clsx(styles.track, styles[size])}>
        <div
          className={clsx(styles.fill, styles[resolvedVariant], animated && styles.animated)}
          style={{ width: `${clamped}%` }}
        />
        {animated && <div className={clsx(styles.shimmer, styles[resolvedVariant])} style={{ width: `${clamped}%` }} />}
      </div>
    </div>
  );
}
