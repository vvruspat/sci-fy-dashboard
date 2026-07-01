import type { Meta, StoryObj } from '@storybook/react';
import { WidgetSubtitle } from '../atoms/typography/WidgetSubtitle';

const meta: Meta<typeof WidgetSubtitle> = {
  title: 'Atoms/Typography/WidgetSubtitle',
  component: WidgetSubtitle,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof WidgetSubtitle>;

export const Default: Story = { args: { children: 'RACK-A · 42U · Tier III' } };
export const StatusLine: Story = { args: { children: 'Live traffic visualization' } };
export const Timestamp: Story = { args: { children: 'Last updated 14:32:01' } };

export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--teal-300)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Server Rack — Alpha
      </span>
      <WidgetSubtitle>RACK-A · 42U · Tier III</WidgetSubtitle>
    </div>
  ),
};
