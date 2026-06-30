import { type ReactNode, type ElementType } from 'react';
import { clsx } from 'clsx';
import styles from './WidgetTitle.module.css';

export type WidgetTitleSize = 'sm' | 'md' | 'lg';

interface WidgetTitleProps {
  children: ReactNode;
  size?: WidgetTitleSize;
  className?: string;
  as?: ElementType;
}

export function WidgetTitle({
  children,
  size = 'md',
  className,
  as: Tag = 'span',
}: WidgetTitleProps) {
  return (
    <Tag className={clsx(styles.title, styles[size], className)}>
      {children}
    </Tag>
  );
}
