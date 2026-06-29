import type { Meta, StoryObj } from '@storybook/react';
import { LineChartWidget } from '../organisms/LineChart';

const meta: Meta<typeof LineChartWidget> = {
  title: 'Organisms/LineChartWidget',
  component: LineChartWidget,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LineChartWidget>;

export const Default: Story = { args: { title: 'Network Traffic' } };
export const CPUMetrics: Story = { args: { title: 'CPU / Memory Utilization' } };
