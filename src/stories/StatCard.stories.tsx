import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '../molecules/StatCard';
import { Cpu, Server, Wifi } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: 'CPU Aggregate',
    value: '68.4',
    unit: '%',
    trend: -3.1,
    accent: 'purple',
    sublabel: 'Avg across all cores',
    icon: <Cpu size={14} />,
    sparkline: [55, 60, 58, 72, 68, 75, 70, 82, 78, 85, 80, 87],
  },
};

export const Nodes: Story = {
  args: {
    label: 'Nodes Online',
    value: 247,
    unit: '/ 256',
    trend: 1.2,
    accent: 'cyan',
    icon: <Server size={14} />,
    sparkline: [230, 238, 242, 240, 245, 243, 247, 245, 248, 246, 247, 247],
  },
};

export const Network: Story = {
  args: {
    label: 'Network I/O',
    value: '9.3',
    unit: 'Gbps',
    trend: 12.4,
    accent: 'cyan',
    icon: <Wifi size={14} />,
    sparkline: [30, 45, 38, 62, 55, 70, 65, 80, 72, 68, 74, 78],
  },
};

export const AllAccents: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', width: '640px' }}>
      <StatCard label="Cyan" value={42} trend={5} accent="cyan" />
      <StatCard label="Purple" value={68} trend={-2} accent="purple" />
      <StatCard label="Amber" value={89} trend={1} accent="amber" />
      <StatCard label="Green" value={97} trend={0.4} accent="green" />
      <StatCard label="Red" value={94} trend={8.2} accent="red" />
    </div>
  ),
};
