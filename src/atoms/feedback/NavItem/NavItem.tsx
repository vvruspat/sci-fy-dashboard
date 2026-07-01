import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Box } from '../../layout/Box';
import styles from './NavItem.module.css';

export type NavItemVariant = 'main' | 'sub';

interface NavItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: NavItemVariant;
  active?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  trailing?: ReactNode;
}

/** Sidebar navigation row: hover/active states with the teal left accent bar + glow. */
export function NavItem({ variant = 'main', active, icon, children, trailing, className, ...rest }: NavItemProps) {
  const isSub = variant === 'sub';

  return (
    <Box
      as="button"
      display="flex"
      align="center"
      gap={isSub ? 7 : 9}
      paddingX={isSub ? 10 : 16}
      paddingY={isSub ? 4 : 7}
      position="relative"
      width="100%"
      className={clsx(styles.navItem, isSub ? styles.sub : styles.main, active && styles.active, className)}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {trailing}
    </Box>
  );
}
