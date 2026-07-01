import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../atoms/feedback/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: 'select', options: ['cyan', 'purple', 'amber', 'green', 'red'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = { args: { value: 65, label: 'CPU Usage' } };
export const AutoVariant: Story = { args: { value: 92, label: 'Memory (auto-red)' } };
export const Purple: Story = { args: { value: 48, variant: 'purple', label: 'Storage IOPS' } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
      <ProgressBar value={60} label="Small" size="sm" />
      <ProgressBar value={60} label="Medium" size="md" />
      <ProgressBar value={60} label="Large" size="lg" />
    </div>
  ),
};

export const ServerMetrics: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '280px' }}>
      <ProgressBar value={87} label="CPU Load" />
      <ProgressBar value={62} label="Memory" variant="purple" />
      <ProgressBar value={45} label="Storage" variant="amber" />
      <ProgressBar value={92} label="Temperature" />
      <ProgressBar value={31} label="Network" variant="green" />
    </div>
  ),
};
