import type { Meta, StoryObj } from '@storybook/react';
import { BarChartWidget } from '../organisms/BarChart';

const meta: Meta<typeof BarChartWidget> = {
  title: 'Organisms/BarChartWidget',
  component: BarChartWidget,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BarChartWidget>;

export const Default: Story = { args: { title: 'Rack Load Distribution' } };
