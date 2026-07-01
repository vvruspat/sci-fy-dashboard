import type { Meta, StoryObj } from '@storybook/react';
import { NotificationDot } from '../atoms/feedback/NotificationDot';

const meta: Meta<typeof NotificationDot> = {
  title: 'Atoms/NotificationDot',
  component: NotificationDot,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['red', 'teal', 'amber'] },
    size: { control: 'select', options: ['sm', 'md'] },
    pulse: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationDot>;

export const Red: Story = { args: { color: 'red', pulse: true } };
export const Teal: Story = { args: { color: 'teal', pulse: true } };
export const Amber: Story = { args: { color: 'amber', pulse: false } };
export const Large: Story = { args: { color: 'red', size: 'md', pulse: true } };
export const NoPulse: Story = { args: { color: 'teal', pulse: false } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <NotificationDot color="red" pulse />
      <NotificationDot color="teal" pulse />
      <NotificationDot color="amber" pulse />
      <NotificationDot color="red" size="md" pulse />
      <NotificationDot color="teal" size="md" pulse={false} />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: 12 }}>AK</div>
        <NotificationDot color="teal" size="sm" pulse style={{ position: 'absolute', top: 0, right: 0 }} />
      </div>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--bg-card)', border: '1px solid var(--border-dim)' }} />
        <NotificationDot color="red" size="md" pulse style={{ position: 'absolute', top: -4, right: -4 }} />
      </div>
    </div>
  ),
};
