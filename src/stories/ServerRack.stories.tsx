import type { Meta, StoryObj } from '@storybook/react';
import { ServerRack } from '../organisms/ServerRack';

const meta: Meta<typeof ServerRack> = {
  title: 'Organisms/ServerRack',
  component: ServerRack,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ServerRack>;

export const Default: Story = { args: { rackId: 'RACK-A', title: 'Server Rack — Alpha' } };
export const BetaRack: Story = { args: { rackId: 'RACK-B', title: 'Server Rack — Beta' } };
