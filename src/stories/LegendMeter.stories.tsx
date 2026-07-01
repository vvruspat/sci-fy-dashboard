import type { Meta, StoryObj } from '@storybook/react';
import { LegendMeter } from '../atoms/data-display/LegendMeter';

const meta: Meta<typeof LegendMeter> = {
  title: 'Atoms/Data Display/LegendMeter',
  component: LegendMeter,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LegendMeter>;

export const Default: Story = {
  args: { color: 'var(--teal-300)', name: 'Compute', value: 38 },
  render: (args) => (
    <div style={{ width: 160 }}>
      <LegendMeter {...args} />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: 160 }}>
      <LegendMeter color="hsl(185 100% 43%)" name="Compute" value={38} />
      <LegendMeter color="hsl(185 85% 36%)" name="Memory" value={24} />
      <LegendMeter color="hsl(185 74% 22%)" name="Storage" value={21} />
      <LegendMeter color="hsl(185 76% 15%)" name="Network" value={11} />
      <LegendMeter color="hsl(352 100% 62%)" name="Cooling" value={6} />
    </div>
  ),
};
