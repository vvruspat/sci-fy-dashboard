import type { Meta, StoryObj } from '@storybook/react';
import { ChartTooltip, ChartTooltipRow } from '../atoms/data-display/ChartTooltip';

const meta: Meta<typeof ChartTooltip> = {
  title: 'Atoms/Data Display/ChartTooltip',
  component: ChartTooltip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ChartTooltip>;

export const TitleHeading: Story = {
  render: () => (
    <ChartTooltip heading="Rack C" headingVariant="title">
      <ChartTooltipRow label="CPU Load" value="87%" valueColor="var(--teal-300)" gap={10} keyColor="var(--text-dim)" />
      <ChartTooltipRow label="Temp" value="42°C" valueColor="var(--amber-400)" gap={10} keyColor="var(--text-dim)" />
    </ChartTooltip>
  ),
};

export const TimeHeadingWithDots: Story = {
  render: () => (
    <ChartTooltip heading="03:41" headingVariant="time">
      <ChartTooltipRow label="Network I/O" value="62.3%" dotColor="var(--teal-400)" gap={6} />
      <ChartTooltipRow label="CPU Load" value="48.1%" dotColor="var(--teal-700)" gap={6} />
    </ChartTooltip>
  ),
};
