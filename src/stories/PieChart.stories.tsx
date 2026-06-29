import type { Meta, StoryObj } from '@storybook/react';
import { PieChartWidget } from '../organisms/PieChart';

const meta: Meta<typeof PieChartWidget> = {
  title: 'Organisms/PieChartWidget',
  component: PieChartWidget,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PieChartWidget>;

export const Default: Story = { args: { title: 'Resource Allocation' } };
