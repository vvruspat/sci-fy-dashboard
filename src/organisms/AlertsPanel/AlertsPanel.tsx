import { useState } from 'react';
import { Alert } from '../../molecules/Alert';
import { Button } from '../../atoms/Button';
import { TabGroup } from '../../molecules/TabGroup';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import { CheckCheck } from 'lucide-react';
import styles from './AlertsPanel.module.css';

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
    <WidgetPanel
      title="System Alerts"
      actions={
        <Button variant="ghost" size="sm" icon={<CheckCheck size={12} />} onClick={dismissAll}>
          Clear All
        </Button>
      }
      className={styles.panel}
    >
      <TabGroup tabs={TABS} defaultTab="all" onChange={setFilter} />

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>✓</span>
            <span>No active alerts</span>
          </div>
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
      </div>
    </WidgetPanel>
  );
}
