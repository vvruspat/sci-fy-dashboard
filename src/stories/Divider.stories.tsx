import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../atoms/layout/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['solid', 'fade'] },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Solid: Story = {
  args: { orientation: 'horizontal', variant: 'solid' },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Divider {...args} />
    </div>
  ),
};

export const Fade: Story = {
  args: { orientation: 'horizontal', variant: 'fade', color: 'var(--teal-500)' },
  render: (args) => (
    <div style={{ width: 300, padding: '20px 0', background: 'var(--bg-void)' }}>
      <Divider {...args} />
    </div>
  ),
};

export const TwoToneFade: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'fade',
    color: 'var(--teal-700)',
    colorEnd: 'var(--teal-600)',
    colorStop: 30,
    colorEndStop: 60,
  },
  render: (args) => (
    <div style={{ width: 300, padding: '20px 0', background: 'var(--bg-void)' }}>
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', variant: 'fade', color: 'var(--teal-700)', colorEnd: 'var(--teal-800)' },
  render: (args) => (
    <div style={{ height: 120, background: 'var(--bg-void)' }}>
      <Divider {...args} />
    </div>
  ),
};
