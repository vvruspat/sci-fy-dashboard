import type { Meta, StoryObj } from '@storybook/react';
import { NetworkMap } from '../organisms/NetworkMap';

const meta: Meta<typeof NetworkMap> = {
  title: 'Organisms/NetworkMap',
  component: NetworkMap,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};
export default meta;
type Story = StoryObj<typeof NetworkMap>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '420px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
