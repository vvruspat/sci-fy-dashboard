import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { GlassPanel } from '../../atoms/GlassPanel';
import { WidgetTitle } from '../../atoms/WidgetTitle';
import { WidgetSubtitle } from '../../atoms/WidgetSubtitle';
import styles from './WidgetPanel.module.css';

interface WidgetPanelProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function WidgetPanel({ title, subtitle, actions, children, className }: WidgetPanelProps) {
  return (
    <GlassPanel className={clsx(styles.panel, className)}>
      <div className={`${styles.header} drag-handle`}>
        <div className={styles.titleBlock}>
          <WidgetTitle>{title}</WidgetTitle>
          {subtitle && <WidgetSubtitle>{subtitle}</WidgetSubtitle>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {children}
    </GlassPanel>
  );
}
