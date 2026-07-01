import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Center } from '../../layout/Center';
import { Stack } from '../../layout/Stack';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Centered "nothing here" placeholder with a glowing icon — used inside scrollable lists/panels. */
export function EmptyState({ icon, children, className }: EmptyStateProps) {
  return (
    <Center height={100} className={clsx(styles.empty, className)}>
      <Stack align="center" gap={8}>
        <span className={styles.icon}>{icon}</span>
        <span>{children}</span>
      </Stack>
    </Center>
  );
}
