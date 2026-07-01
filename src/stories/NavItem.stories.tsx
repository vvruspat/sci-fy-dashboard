import type { Meta, StoryObj } from '@storybook/react';
import { LayoutDashboard, Server, Bell } from 'lucide-react';
import { NavItem } from '../atoms/feedback/NavItem';
import { Badge } from '../atoms/feedback/Badge';

const meta: Meta<typeof NavItem> = {
  title: 'Atoms/Feedback/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['main', 'sub'] },
    active: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof NavItem>;

export const Main: Story = {
  args: { variant: 'main', icon: <LayoutDashboard size={15} />, children: 'Dashboard' },
  render: (args) => (
    <div style={{ width: 220, background: 'var(--bg-deep)' }}>
      <NavItem {...args} />
    </div>
  ),
};

export const MainActive: Story = {
  args: { variant: 'main', active: true, icon: <Server size={15} />, children: 'Servers' },
  render: (args) => (
    <div style={{ width: 220, background: 'var(--bg-deep)' }}>
      <NavItem {...args} />
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    variant: 'main',
    icon: <Bell size={15} />,
    children: 'Alerts',
    trailing: <Badge variant="red">12</Badge>,
  },
  render: (args) => (
    <div style={{ width: 220, background: 'var(--bg-deep)' }}>
      <NavItem {...args} />
    </div>
  ),
};

export const Sub: Story = {
  args: { variant: 'sub', children: 'Rack Alpha' },
  render: (args) => (
    <div style={{ width: 220, background: 'var(--bg-deep)' }}>
      <NavItem {...args} />
    </div>
  ),
};
