import type { Meta, StoryObj } from '@storybook/react';
import { TabGroup } from '../molecules/TabGroup';
import { LayoutDashboard, Server, Bell } from 'lucide-react';

const meta: Meta<typeof TabGroup> = {
  title: 'Molecules/TabGroup',
  component: TabGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TabGroup>;

export const Default: Story = {
  args: {
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'metrics', label: 'Metrics' },
      { id: 'logs', label: 'Logs' },
      { id: 'alerts', label: 'Alerts', badge: 5 },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={12} /> },
      { id: 'servers', label: 'Servers', icon: <Server size={12} />, badge: 24 },
      { id: 'alerts', label: 'Alerts', icon: <Bell size={12} />, badge: 3 },
    ],
  },
};

export const TimeRanges: Story = {
  args: {
    tabs: [
      { id: '1h', label: '1H' },
      { id: '6h', label: '6H' },
      { id: '24h', label: '24H' },
      { id: '7d', label: '7D' },
      { id: '30d', label: '30D' },
    ],
  },
};
