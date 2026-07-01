import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../atoms/layout/Stack';

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    reverse: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Stack>;

const item = (label: string) => (
  <div
    key={label}
    style={{
      padding: '8px 12px',
      background: 'var(--bg-panel)',
      border: '1px solid var(--border-dim)',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: {
    gap: 8,
    children: [item('First'), item('Second'), item('Third')],
  },
};

export const WideGap: Story = {
  args: {
    gap: 24,
    children: [item('First'), item('Second'), item('Third')],
  },
};

export const Reversed: Story = {
  args: {
    gap: 8,
    reverse: true,
    children: [item('First'), item('Second'), item('Third')],
  },
};
