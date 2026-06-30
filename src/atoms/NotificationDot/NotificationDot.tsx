import { clsx } from 'clsx';
import styles from './NotificationDot.module.css';

export type NotificationDotColor = 'red' | 'teal' | 'amber';
export type NotificationDotSize = 'sm' | 'md';

interface NotificationDotProps {
  color?: NotificationDotColor;
  size?: NotificationDotSize;
  pulse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function NotificationDot({
  color = 'red',
  size = 'sm',
  pulse = true,
  className,
  style,
}: NotificationDotProps) {
  return (
    <span
      className={clsx(
        styles.dot,
        styles[color],
        styles[size],
        pulse && styles.pulse,
        className,
      )}
      style={style}
    />
  );
}
