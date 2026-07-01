import type { Meta, StoryObj } from '@storybook/react';
import { TabButton } from '../atoms/feedback/TabButton';
import { Badge } from '../atoms/feedback/Badge';

const meta: Meta<typeof TabButton> = {
  title: 'Atoms/Feedback/TabButton',
  component: TabButton,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof TabButton>;

export const Inactive: Story = { args: { children: 'All' } };
export const Active: Story = { args: { active: true, children: 'Critical' } };

export const WithBadge: Story = {
  render: () => (
    <TabButton active>
      <span>Critical</span>
      <Badge variant="cyan">1</Badge>
    </TabButton>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--border-dim)' }}>
      <TabButton active>
        <span>All</span>
        <Badge variant="cyan">6</Badge>
      </TabButton>
      <TabButton>
        <span>Critical</span>
        <Badge variant="dim">1</Badge>
      </TabButton>
      <TabButton>
        <span>Warning</span>
        <Badge variant="dim">2</Badge>
      </TabButton>
    </div>
  ),
};
