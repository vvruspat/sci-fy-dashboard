import type { Meta, StoryObj } from '@storybook/react';
import { Wifi, Clock } from 'lucide-react';
import { StatChip } from '../atoms/data-display/StatChip';

const meta: Meta<typeof StatChip> = {
  title: 'Atoms/Data Display/StatChip',
  component: StatChip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StatChip>;

export const Uptime: Story = {
  args: { icon: <Wifi size={12} />, value: '98.7%', label: 'Uptime' },
};

export const Clock_: Story = {
  name: 'Clock',
  args: { icon: <Clock size={12} />, value: '03:47:46', label: 'UTC+0' },
};

export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <StatChip icon={<Wifi size={12} />} value="98.7%" label="Uptime" />
      <StatChip icon={<Clock size={12} />} value="03:47:46" label="UTC+0" />
    </div>
  ),
};
