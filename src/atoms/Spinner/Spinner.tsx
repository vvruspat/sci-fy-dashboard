import { clsx } from 'clsx';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'cyan' | 'purple' | 'amber';
  label?: string;
}

export function Spinner({ size = 'md', variant = 'cyan', label }: SpinnerProps) {
  return (
    <div className={clsx(styles.wrap, styles[size])}>
      <div className={clsx(styles.outer, styles[variant])} />
      <div className={clsx(styles.inner, styles[variant])} />
      <div className={clsx(styles.core, styles[variant])} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
