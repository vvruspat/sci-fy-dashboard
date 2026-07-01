import type { Meta, StoryObj } from '@storybook/react';
import { GlassSurface } from '../atoms/surfaces/GlassSurface';

const meta: Meta<typeof GlassSurface> = {
  title: 'Atoms/Surfaces/GlassSurface',
  component: GlassSurface,
  tags: ['autodocs'],
  argTypes: {
    edge: { control: 'select', options: [undefined, 'right', 'bottom'] },
  },
};
export default meta;
type Story = StoryObj<typeof GlassSurface>;

export const Plain: Story = {
  render: () => (
    <div style={{ background: 'var(--bg-void)', padding: 20 }}>
      <GlassSurface position="relative" padding={20} style={{ width: 260 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
          glass background, no edge line
        </span>
      </GlassSurface>
    </div>
  ),
};

export const RightEdge: Story = {
  render: () => (
    <div style={{ background: 'var(--bg-void)', padding: 20, display: 'flex' }}>
      <GlassSurface
        position="relative"
        padding={20}
        edge="right"
        edgeColor="var(--teal-700)"
        edgeColorEnd="var(--teal-800)"
        style={{ width: 220, height: 160 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
          sidebar-style right edge
        </span>
      </GlassSurface>
    </div>
  ),
};

export const BottomEdge: Story = {
  render: () => (
    <div style={{ background: 'var(--bg-void)', padding: 20 }}>
      <GlassSurface
        position="relative"
        padding={20}
        edge="bottom"
        edgeColor="var(--teal-700)"
        edgeColorEnd="var(--teal-600)"
        edgeColorStop={30}
        edgeColorEndStop={60}
        edgeOpacity={0.35}
        style={{ width: 320 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
          topbar-style bottom edge
        </span>
      </GlassSurface>
    </div>
  ),
};
