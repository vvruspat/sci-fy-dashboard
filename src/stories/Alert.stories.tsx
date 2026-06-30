import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../molecules/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'select', options: ['info', 'success', 'warning', 'critical'] },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'SSL Certificate Renewal',
    message: 'Certificate for api.orion.internal expires in 14 days. Auto-renewal scheduled.',
    timestamp: '14:30:00',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    title: 'Node Restored',
    message: 'COMPUTE-04 returned to healthy state after maintenance window.',
    timestamp: '13:45:12',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: 'Rack C Temperature High',
    message: 'Ambient temperature at 74°C approaching thermal threshold.',
    timestamp: '14:28:44',
  },
};

export const Critical: Story = {
  args: {
    severity: 'critical',
    title: 'COMPUTE-02 CPU Critical',
    message: 'CPU utilization exceeded 92% for 5 consecutive minutes.',
    timestamp: '14:32:01',
  },
};

export const Dismissible: Story = {
  args: {
    severity: 'warning',
    title: 'Packet Loss Detected',
    message: 'Packet loss on upstream link NIC-3 (3.2%).',
    timestamp: '14:15:20',
    onDismiss: () => alert('dismissed'),
  },
};

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
      <Alert severity="info" title="Info Alert" message="System information message." timestamp="09:00:00" />
      <Alert severity="success" title="Success Alert" message="Operation completed successfully." timestamp="09:01:00" />
      <Alert severity="warning" title="Warning Alert" message="Threshold approaching critical level." timestamp="09:02:00" />
      <Alert severity="critical" title="Critical Alert" message="Immediate action required." timestamp="09:03:00" onDismiss={() => {}} />
    </div>
  ),
};
