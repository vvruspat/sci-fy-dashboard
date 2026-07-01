import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../atoms/layout/Grid';

const meta: Meta<typeof Grid> = {
  title: 'Atoms/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Grid>;

const cell = (label: string) => (
  <div
    key={label}
    style={{
      padding: '12px',
      background: 'var(--bg-panel)',
      border: '1px solid var(--border-dim)',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 12,
    style: { width: 400 },
    children: ['1', '2', '3', '4', '5', '6'].map(cell),
  },
};

export const TwoColumnsWithSeparateGaps: Story = {
  args: {
    columns: 2,
    rowGap: 6,
    columnGap: 24,
    style: { width: 280 },
    children: ['Memory', '64%', 'Uptime', '47d 12h', 'IP', '10.0.1.42', 'Cores', '32 vCPU'].map(cell),
  },
};

export const CustomTemplate: Story = {
  args: {
    columns: '1fr 2fr 1fr',
    gap: 8,
    style: { width: 400 },
    children: ['narrow', 'wide', 'narrow'].map(cell),
  },
};
