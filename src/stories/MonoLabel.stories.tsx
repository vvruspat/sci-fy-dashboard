import type { Meta, StoryObj } from '@storybook/react';
import { MonoLabel } from '../atoms/typography/MonoLabel';

const meta: Meta<typeof MonoLabel> = {
  title: 'Atoms/MonoLabel',
  component: MonoLabel,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm'] },
    color: { control: 'select', options: ['dim', 'muted'] },
    uppercase: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof MonoLabel>;

export const Default: Story = { args: { children: 'CPU Load', size: 'sm', color: 'dim' } };
export const ExtraSmall: Story = { args: { children: 'avg temp', size: 'xs', color: 'muted' } };
export const Lowercase: Story = { args: { children: 'packets/sec', uppercase: false } };

export const UseCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <MonoLabel size="sm" color="dim">Memory Utilization</MonoLabel>
      <MonoLabel size="xs" color="muted">avg across all nodes</MonoLabel>
      <MonoLabel size="sm" color="dim" uppercase={false}>10.0.1.42</MonoLabel>
      <MonoLabel size="xs" color="muted">last seen 14:32</MonoLabel>
    </div>
  ),
};
