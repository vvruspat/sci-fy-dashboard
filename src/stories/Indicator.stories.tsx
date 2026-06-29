import type { Meta, StoryObj } from '@storybook/react';
import { Indicator } from '../atoms/Indicator';

const meta: Meta<typeof Indicator> = {
  title: 'Atoms/Indicator',
  component: Indicator,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['online', 'offline', 'warning', 'critical', 'idle'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    pulse: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Indicator>;

export const Online: Story = { args: { status: 'online' } };
export const Warning: Story = { args: { status: 'warning' } };
export const Critical: Story = { args: { status: 'critical' } };
export const Offline: Story = { args: { status: 'offline' } };
export const Idle: Story = { args: { status: 'idle' } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Indicator status="online" />
      <Indicator status="warning" />
      <Indicator status="critical" />
      <Indicator status="idle" />
      <Indicator status="offline" />
    </div>
  ),
};

export const CustomLabel: Story = {
  args: { status: 'online', label: 'COMPUTE-01 · 10.0.1.42', size: 'lg' }
};
