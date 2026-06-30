import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './MonoLabel.module.css';

export type MonoLabelSize = 'xs' | 'sm';
export type MonoLabelColor = 'dim' | 'muted';

interface MonoLabelProps {
  children: ReactNode;
  size?: MonoLabelSize;
  color?: MonoLabelColor;
  uppercase?: boolean;
  className?: string;
}

export function MonoLabel({
  children,
  size = 'sm',
  color = 'dim',
  uppercase = true,
  className,
}: MonoLabelProps) {
  return (
    <span
      className={clsx(
        styles.label,
        styles[size],
        styles[color],
        uppercase && styles.uppercase,
        className,
      )}
    >
      {children}
    </span>
  );
}
