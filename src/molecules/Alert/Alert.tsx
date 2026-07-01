import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';
import { Button } from '../../atoms/form/Button';
import styles from './Alert.module.css';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'critical';

interface AlertProps {
  severity: AlertSeverity;
  title: string;
  message?: string;
  timestamp?: string;
  onDismiss?: () => void;
  className?: string;
  children?: ReactNode;
}

const ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  critical: XCircle,
};

export function Alert({ severity, title, message, timestamp, onDismiss, className, children }: AlertProps) {
  const Icon = ICONS[severity];
  return (
    <div className={clsx(styles.alert, styles[severity], className)}>
      <span className={styles.iconWrap}><Icon size={14} /></span>
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {timestamp && <span className={styles.ts}>{timestamp}</span>}
        </div>
        {message && <p className={styles.message}>{message}</p>}
        {children}
      </div>
      {onDismiss && (
        <Button variant="bare" size="sm" icon={<X size={12} />} onClick={onDismiss} aria-label="Dismiss" />
      )}
    </div>
  );
}
