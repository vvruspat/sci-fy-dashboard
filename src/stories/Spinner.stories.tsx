import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../atoms/feedback/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['cyan', 'purple', 'amber'] },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { size: 'md', variant: 'cyan' } };
export const WithLabel: Story = { args: { size: 'lg', variant: 'cyan', label: 'Connecting...' } };
export const Purple: Story = { args: { size: 'lg', variant: 'purple', label: 'Processing...' } };
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};
