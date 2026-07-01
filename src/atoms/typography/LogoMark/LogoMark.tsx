import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './LogoMark.module.css';

interface LogoMarkProps {
  children: ReactNode;
  className?: string;
}

/** Floating, glowing wrapper for a logo icon (SVG mark). */
export function LogoMark({ children, className }: LogoMarkProps) {
  return <div className={clsx(styles.mark, className)}>{children}</div>;
}
