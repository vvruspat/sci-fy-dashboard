import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../atoms/Button';
import { Zap, Download, Shield, Trash2 } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    glow: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Initialize', size: 'md' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Deploy Node', size: 'md' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel', size: 'md' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Terminate', size: 'md', icon: <Trash2 size={12} /> },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Confirm', size: 'md', icon: <Shield size={12} /> },
};

export const WithIcon: Story = {
  args: { variant: 'primary', children: 'Power On', icon: <Zap size={12} />, size: 'md' },
};

export const Loading: Story = {
  args: { variant: 'primary', children: 'Connecting...', loading: true, size: 'md' },
};

export const Glowing: Story = {
  args: { variant: 'primary', children: 'Activate', glow: true, icon: <Zap size={12} /> },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" icon={<Download size={12} />}>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger" icon={<Trash2 size={12} />}>Danger</Button>
      <Button variant="success" icon={<Shield size={12} />}>Success</Button>
    </div>
  ),
};
