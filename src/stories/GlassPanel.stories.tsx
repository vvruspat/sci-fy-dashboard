import type { Meta, StoryObj } from '@storybook/react';
import { GlassPanel } from '../atoms/surfaces/GlassPanel';

const meta: Meta<typeof GlassPanel> = {
  title: 'Atoms/Surfaces/GlassPanel',
  component: GlassPanel,
  tags: ['autodocs'],
  argTypes: {
    shimmerColor: { control: 'color' },
    as: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof GlassPanel>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: '16px', color: 'var(--text-primary)' }}>Glass panel content</div>,
  },
};

export const WithShimmer: Story = {
  args: {
    shimmerColor: 'var(--teal-400)',
    children: <div style={{ padding: '16px', color: 'var(--text-primary)' }}>Teal shimmer variant</div>,
  },
};

export const WithContent: Story = {
  render: () => (
    <GlassPanel style={{ padding: '20px', maxWidth: '320px' }}>
      <div style={{ color: 'var(--teal-300)', fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.12em', marginBottom: '8px' }}>
        WIDGET TITLE
      </div>
      <div style={{ color: 'var(--text-primary)', fontSize: '28px', fontWeight: 700 }}>98.7%</div>
      <div style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>system uptime</div>
    </GlassPanel>
  ),
};

export const Nested: Story = {
  render: () => (
    <GlassPanel style={{ padding: '16px', maxWidth: '400px' }}>
      <div style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Outer panel</div>
      <GlassPanel shimmerColor="var(--amber-400)" style={{ padding: '12px' }}>
        <div style={{ color: 'var(--text-dim)', fontSize: '10px' }}>Nested panel with amber shimmer</div>
      </GlassPanel>
    </GlassPanel>
  ),
};
