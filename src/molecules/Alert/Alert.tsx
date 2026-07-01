import { type ReactNode } from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react';
import { Button } from '../../atoms/form/Button';
import { AlertBox, AlertBoxIcon, AlertBoxTitle } from '../../atoms/feedback/AlertBox';
import { Box } from '../../atoms/layout/Box';
import { Cluster } from '../../atoms/layout/Cluster';
import { MonoLabel } from '../../atoms/typography/MonoLabel';

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
    <AlertBox severity={severity} display="flex" align="start" gap={10} paddingX={12} paddingY={10} className={className}>
      <AlertBoxIcon severity={severity}><Icon size={14} /></AlertBoxIcon>
      <Box flex="1" minWidth={0}>
        <Cluster justify="between" gap={8} marginBottom={2}>
          <AlertBoxTitle severity={severity}>{title}</AlertBoxTitle>
          {timestamp && (
            <Box flexShrink={0}>
              <MonoLabel size="sm" color="dim" uppercase={false}>{timestamp}</MonoLabel>
            </Box>
          )}
        </Cluster>
        {message && (
          <Box as="p" style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {message}
          </Box>
        )}
        {children}
      </Box>
      {onDismiss && (
        <Button variant="bare" size="sm" icon={<X size={12} />} onClick={onDismiss} aria-label="Dismiss" />
      )}
    </AlertBox>
  );
}
