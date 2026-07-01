import type { Meta, StoryObj } from '@storybook/react';
import { MetricRow } from '../atoms/data-display/MetricRow';

const meta: Meta<typeof MetricRow> = {
  title: 'Atoms/Data Display/MetricRow',
  component: MetricRow,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MetricRow>;

export const Default: Story = {
  args: { label: 'Uptime', value: '47d 12h' },
  render: (args) => (
    <div style={{ width: 200 }}>
      <MetricRow {...args} />
    </div>
  ),
};

export const WithValueColor: Story = {
  args: { label: 'Memory', value: '64%', valueColor: 'var(--teal-300)' },
  render: (args) => (
    <div style={{ width: 200 }}>
      <MetricRow {...args} />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', width: 260 }}>
      <MetricRow label="Memory" value="64%" valueColor="var(--teal-300)" />
      <MetricRow label="Uptime" value="47d 12h" />
      <MetricRow label="IP" value="10.0.1.42" />
      <MetricRow label="Cores" value="32 vCPU" />
    </div>
  ),
};
