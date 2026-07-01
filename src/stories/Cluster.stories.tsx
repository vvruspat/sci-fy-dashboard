import type { Meta, StoryObj } from '@storybook/react';
import { Cluster } from '../atoms/layout/Cluster';

const meta: Meta<typeof Cluster> = {
  title: 'Atoms/Layout/Cluster',
  component: Cluster,
  tags: ['autodocs'],
  argTypes: {
    reverse: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Cluster>;

const chip = (label: string) => (
  <span
    key={label}
    style={{
      padding: '4px 10px',
      background: 'var(--bg-panel)',
      border: '1px solid var(--border-dim)',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
    }}
  >
    {label}
  </span>
);

export const Default: Story = {
  args: {
    gap: 8,
    children: [chip('Compute'), chip('Storage'), chip('Network'), chip('Security')],
  },
};

export const Wrapping: Story = {
  render: () => (
    <div style={{ width: 220, border: '1px dashed var(--border-dim)', padding: 8 }}>
      <Cluster gap={6}>
        {['Compute', 'Storage', 'Network', 'Security', 'Monitoring', 'Alerts'].map(chip)}
      </Cluster>
    </div>
  ),
};

export const NoWrap: Story = {
  args: {
    gap: 8,
    wrap: 'nowrap',
    children: [chip('One'), chip('Two'), chip('Three')],
  },
};
