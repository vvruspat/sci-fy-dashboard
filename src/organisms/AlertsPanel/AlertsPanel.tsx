import { useState } from 'react';
import { Alert } from '../../molecules/Alert';
import { Button } from '../../atoms/form/Button';
import { TabGroup } from '../../molecules/TabGroup';
import { GlassPanel } from '../../atoms/surfaces/GlassPanel';
import { WidgetTitle } from '../../atoms/typography/WidgetTitle';
import { EmptyState } from '../../atoms/feedback/EmptyState';
import { Box, buildBoxStyle } from '../../atoms/layout/Box';
import { Stack } from '../../atoms/layout/Stack';
import { CheckCheck } from 'lucide-react';

interface AlertItem {
  id: string;
  severity: 'info' | 'success' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: string;
}

const INITIAL_ALERTS: AlertItem[] = [
  { id: '1', severity: 'critical', title: 'COMPUTE-02 CPU Critical', message: 'CPU utilization exceeded 92% for 5 consecutive minutes. Auto-scaling triggered.', timestamp: '14:32:01' },
  { id: '2', severity: 'warning', title: 'Rack C Temperature High', message: 'Ambient temperature at 74°C approaching thermal threshold. Check cooling system.', timestamp: '14:28:44' },
  { id: '3', severity: 'warning', title: 'Network Packet Loss', message: 'Packet loss detected on upstream link NIC-3 (3.2%). Investigating route flap.', timestamp: '14:15:20' },
  { id: '4', severity: 'info', title: 'Backup Completed', message: 'Full system backup to STOR-NAS-01 completed successfully. 2.4TB archived.', timestamp: '13:58:00' },
  { id: '5', severity: 'success', title: 'COMPUTE-04 Restored', message: 'Node COMPUTE-04 returned to healthy state after maintenance window.', timestamp: '13:45:12' },
  { id: '6', severity: 'info', title: 'SSL Certificate Renewal', message: 'Certificate for api.orion.internal expires in 14 days. Auto-renewal scheduled.', timestamp: '13:30:00' },
];

const TABS = [
  { id: 'all', label: 'All', badge: 6 },
  { id: 'critical', label: 'Critical', badge: 1 },
  { id: 'warning', label: 'Warning', badge: 2 },
  { id: 'info', label: 'Info', badge: 3 },
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [filter, setFilter] = useState('all');

  const dismiss = (id: string) => setAlerts(prev => prev.filter(a => a.id !== id));
  const dismissAll = () => setAlerts([]);

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <GlassPanel
      shimmerColor="var(--red-500)"
      shimmerOpacity={0.35}
      style={buildBoxStyle({ display: 'flex', direction: 'column', height: '100%' })}
    >
      <Box className="drag-handle" display="flex" align="start" justify="between" gap={12} padding={20} paddingBottom={10}>
        <WidgetTitle>System Alerts</WidgetTitle>
        <Button variant="ghost" size="sm" icon={<CheckCheck size={12} />} onClick={dismissAll}>
          Clear All
        </Button>
      </Box>

      <TabGroup tabs={TABS} defaultTab="all" onChange={setFilter} />

      <Stack grow overflowY="auto" gap={2} paddingX={8} paddingY={6}>
        {filtered.length === 0 ? (
          <EmptyState icon="✓">No active alerts</EmptyState>
        ) : (
          filtered.map(alert => (
            <Alert
              key={alert.id}
              severity={alert.severity}
              title={alert.title}
              message={alert.message}
              timestamp={alert.timestamp}
              onDismiss={() => dismiss(alert.id)}
            />
          ))
        )}
      </Stack>
    </GlassPanel>
  );
}
