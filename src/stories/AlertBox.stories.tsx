import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, Info as InfoIcon, CheckCircle, XCircle } from 'lucide-react';
import { AlertBox, AlertBoxIcon, AlertBoxTitle } from '../atoms/feedback/AlertBox';

const meta: Meta<typeof AlertBox> = {
  title: 'Atoms/Feedback/AlertBox',
  component: AlertBox,
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'select', options: ['info', 'success', 'warning', 'critical'] },
  },
};
export default meta;
type Story = StoryObj<typeof AlertBox>;

const ICONS = { info: InfoIcon, success: CheckCircle, warning: AlertTriangle, critical: XCircle };

function row(severity: 'info' | 'success' | 'warning' | 'critical', title: string) {
  const Icon = ICONS[severity];
  return (
    <AlertBox key={severity} severity={severity} display="flex" align="start" gap={10} paddingX={12} paddingY={10} style={{ width: 320 }}>
      <AlertBoxIcon severity={severity}>
        <Icon size={14} />
      </AlertBoxIcon>
      <AlertBoxTitle severity={severity}>{title}</AlertBoxTitle>
    </AlertBox>
  );
}

export const Info: Story = { render: () => row('info', 'Backup Completed') };
export const Success: Story = { render: () => row('success', 'Node Restored') };
export const Warning: Story = { render: () => row('warning', 'Temperature High') };
export const Critical: Story = { render: () => row('critical', 'CPU Critical') };

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {row('info', 'Backup Completed')}
      {row('success', 'Node Restored')}
      {row('warning', 'Temperature High')}
      {row('critical', 'CPU Critical')}
    </div>
  ),
};
