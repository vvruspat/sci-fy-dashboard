import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import styles from './TabButton.module.css';

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children?: ReactNode;
}

/** A single tab button with hover/active color states and an active-tab glow underline. */
export function TabButton({ active, children, className, ...rest }: TabButtonProps) {
  return (
    <button className={clsx(styles.tab, active && styles.active, className)} {...rest}>
      {children}
    </button>
  );
}

interface TabButtonIconProps {
  children?: ReactNode;
  className?: string;
}

/** Sizes an injected tab icon to TabGroup's 11px slot. */
export function TabButtonIcon({ children, className }: TabButtonIconProps) {
  return <span className={clsx(styles.icon, className)}>{children}</span>;
}
