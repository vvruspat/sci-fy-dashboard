import type { Meta, StoryObj } from '@storybook/react';
import { StatCardFrame, StatCardValue } from '../atoms/surfaces/StatCardFrame';

const meta: Meta<typeof StatCardFrame> = {
  title: 'Atoms/Surfaces/StatCardFrame',
  component: StatCardFrame,
  tags: ['autodocs'],
  argTypes: {
    accent: { control: 'select', options: ['cyan', 'purple', 'amber', 'green', 'red'] },
  },
};
export default meta;
type Story = StoryObj<typeof StatCardFrame>;

export const Cyan: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <StatCardFrame accent="cyan">
        <div style={{ padding: 16 }}>
          <StatCardValue accent="cyan">247</StatCardValue>
        </div>
      </StatCardFrame>
    </div>
  ),
};

export const Red: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <StatCardFrame accent="red">
        <div style={{ padding: 16 }}>
          <StatCardValue accent="red">86.4</StatCardValue>
        </div>
      </StatCardFrame>
    </div>
  ),
};

export const AllAccents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['cyan', 'purple', 'amber', 'green', 'red'] as const).map((accent) => (
        <div key={accent} style={{ width: 140 }}>
          <StatCardFrame accent={accent}>
            <div style={{ padding: 16 }}>
              <StatCardValue accent={accent}>{accent}</StatCardValue>
            </div>
          </StatCardFrame>
        </div>
      ))}
    </div>
  ),
};
