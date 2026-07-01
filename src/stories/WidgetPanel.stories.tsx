import type { Meta, StoryObj } from '@storybook/react';
import { WidgetPanel } from '../molecules/WidgetPanel';
import { Button } from '../atoms/form/Button';
import { Badge } from '../atoms/feedback/Badge';
import { RefreshCw } from 'lucide-react';

const meta: Meta<typeof WidgetPanel> = {
  title: 'Molecules/WidgetPanel',
  component: WidgetPanel,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof WidgetPanel>;

export const Default: Story = {
  args: {
    title: 'System Metrics',
    children: (
      <div style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
        Widget content area
      </div>
    ),
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Server Rack — Alpha',
    subtitle: 'RACK-A · 42U · Tier III',
    children: (
      <div style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
        Widget content area
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: 'Network Traffic',
    subtitle: 'Live visualization',
    actions: (
      <Button variant="ghost" size="sm" icon={<RefreshCw size={12} />}>
        Refresh
      </Button>
    ),
    children: (
      <div style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
        Widget content area
      </div>
    ),
  },
};

export const WithBadgeActions: Story = {
  args: {
    title: 'System Alerts',
    actions: <Badge variant="red" dot>3 Critical</Badge>,
    children: (
      <div style={{ padding: '16px', color: 'var(--text-dim)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
        Alert list goes here
      </div>
    ),
  },
};

export const Realistic: Story = {
  render: () => (
    <div style={{ width: '380px' }}>
      <WidgetPanel
        title="CPU Aggregate"
        subtitle="Avg across all cores"
        actions={<Badge variant="green" dot>Healthy</Badge>}
      >
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            68.4<span style={{ fontSize: '14px', color: 'var(--text-dim)' }}>%</span>
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
            ↓ 3.1% from last hour
          </div>
        </div>
      </WidgetPanel>
    </div>
  ),
};
