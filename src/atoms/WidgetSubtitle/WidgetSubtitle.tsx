import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './WidgetSubtitle.module.css';

interface WidgetSubtitleProps {
  children: ReactNode;
  className?: string;
}

export function WidgetSubtitle({ children, className }: WidgetSubtitleProps) {
  return (
    <span className={clsx(styles.subtitle, className)}>
      {children}
    </span>
  );
}
