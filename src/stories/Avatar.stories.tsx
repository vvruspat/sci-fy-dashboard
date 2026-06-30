import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../atoms/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    online: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { initials: 'AK', online: true, size: 'md' } };
export const Offline: Story = { args: { initials: 'JD', online: false, size: 'md' } };
export const Small: Story = { args: { initials: 'MR', online: true, size: 'sm' } };

export const Team: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Avatar initials="AK" online size="md" />
      <Avatar initials="JD" online={false} size="md" />
      <Avatar initials="MR" online size="md" />
      <Avatar initials="SK" online size="sm" />
      <Avatar initials="PL" online={false} size="sm" />
    </div>
  ),
};
