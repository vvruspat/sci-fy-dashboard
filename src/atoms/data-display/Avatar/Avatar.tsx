import { clsx } from 'clsx';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md';

interface AvatarProps {
  initials: string;
  online?: boolean;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ initials, online = false, size = 'md', className }: AvatarProps) {
  return (
    <div className={clsx(styles.avatar, styles[size], className)}>
      <span>{initials}</span>
      {online && <span className={styles.onlineDot} />}
    </div>
  );
}
