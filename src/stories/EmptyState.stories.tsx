import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../atoms/feedback/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Atoms/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoAlerts: Story = {
  args: { icon: '✓', children: 'No active alerts' },
  render: (args) => (
    <div style={{ width: 260, background: 'var(--bg-panel)' }}>
      <EmptyState {...args} />
    </div>
  ),
};

export const NoResults: Story = {
  args: { icon: '∅', children: 'No matching results' },
  render: (args) => (
    <div style={{ width: 260, background: 'var(--bg-panel)' }}>
      <EmptyState {...args} />
    </div>
  ),
};
