import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../atoms/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['cyan', 'purple', 'amber', 'green', 'red', 'dim'] },
    dot: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Cyan: Story = { args: { variant: 'cyan', children: 'Online', dot: true } };
export const Purple: Story = { args: { variant: 'purple', children: 'Staging' } };
export const Amber: Story = { args: { variant: 'amber', children: 'Warning', dot: true } };
export const Green: Story = { args: { variant: 'green', children: 'Healthy', dot: true } };
export const Red: Story = { args: { variant: 'red', children: 'Critical', dot: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="cyan" dot>Compute</Badge>
      <Badge variant="purple">v4.2.1</Badge>
      <Badge variant="amber" dot>High Load</Badge>
      <Badge variant="green" dot>Online</Badge>
      <Badge variant="red" dot>Critical</Badge>
      <Badge variant="dim">Idle</Badge>
    </div>
  ),
};
