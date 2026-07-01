import type { Meta, StoryObj } from '@storybook/react';
import { WidgetTitle } from '../atoms/typography/WidgetTitle';

const meta: Meta<typeof WidgetTitle> = {
  title: 'Atoms/WidgetTitle',
  component: WidgetTitle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof WidgetTitle>;

export const Medium: Story = { args: { size: 'md', children: 'System Metrics' } };
export const Small: Story = { args: { size: 'sm', children: 'Network I/O' } };
export const Large: Story = { args: { size: 'lg', children: 'Datacenter Overview' } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <WidgetTitle size="sm">Small — 9px</WidgetTitle>
      <WidgetTitle size="md">Medium — 11px</WidgetTitle>
      <WidgetTitle size="lg">Large — 13px</WidgetTitle>
    </div>
  ),
};
