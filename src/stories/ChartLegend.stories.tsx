import type { Meta, StoryObj } from '@storybook/react';
import { ChartLegend } from '../molecules/ChartLegend';

const meta: Meta<typeof ChartLegend> = {
  title: 'Molecules/ChartLegend',
  component: ChartLegend,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ChartLegend>;

export const Default: Story = {
  args: {
    items: [
      { color: 'var(--teal-400)', label: 'Compute' },
      { color: 'var(--amber-400)', label: 'Storage' },
      { color: 'hsl(352 100% 62%)', label: 'Network' },
    ],
  },
};

export const BandwidthLegend: Story = {
  args: {
    items: [
      { color: 'var(--teal-400)', label: 'Low BW' },
      { color: 'var(--amber-400)', label: 'High BW' },
      { color: 'hsl(352 100% 62%)', label: 'Saturated' },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { color: 'var(--teal-300)', label: 'Online' },
      { color: 'hsl(352 100% 62%)', label: 'Offline' },
    ],
  },
};
