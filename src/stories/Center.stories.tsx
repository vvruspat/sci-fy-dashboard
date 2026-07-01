import type { Meta, StoryObj } from '@storybook/react';
import { Center } from '../atoms/layout/Center';

const meta: Meta<typeof Center> = {
  title: 'Atoms/Layout/Center',
  component: Center,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Center>;

export const Default: Story = {
  args: {
    style: { width: 240, height: 140, border: '1px dashed var(--border-dim)' },
    children: (
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal-300)' }}>
        centered
      </span>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    style: { width: 240, height: 140, border: '1px dashed var(--border-dim)' },
    children: (
      <span style={{ fontSize: 28, color: 'var(--teal-300)', textShadow: '0 0 12px var(--teal-300)' }}>✓</span>
    ),
  },
};
