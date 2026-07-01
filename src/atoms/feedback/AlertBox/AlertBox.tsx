import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Box, type BoxProps } from '../../layout/Box';
import styles from './AlertBox.module.css';

export type AlertBoxSeverity = 'info' | 'success' | 'warning' | 'critical';

export interface AlertBoxProps extends Omit<BoxProps, 'children'> {
  severity: AlertBoxSeverity;
  children?: ReactNode;
}

/** Per-severity colored container + slide-in animation for Alert. */
export function AlertBox({ severity, className, children, ...rest }: AlertBoxProps) {
  return (
    <Box className={clsx(styles.alert, styles[severity], className)} {...rest}>
      {children}
    </Box>
  );
}

interface AlertBoxIconProps {
  severity: AlertBoxSeverity;
  children?: ReactNode;
  className?: string;
}

/** Severity-tinted icon wrapper; critical severity blinks softly. */
export function AlertBoxIcon({ severity, children, className }: AlertBoxIconProps) {
  return (
    <span className={clsx(styles.iconWrap, styles[severity], className)}>
      {children}
    </span>
  );
}

interface AlertBoxTitleProps {
  severity: AlertBoxSeverity;
  children?: ReactNode;
  className?: string;
}

/** Severity-tinted alert title text. */
export function AlertBoxTitle({ severity, children, className }: AlertBoxTitleProps) {
  return (
    <span className={clsx(styles.title, styles[severity], className)}>
      {children}
    </span>
  );
}
