import type { Meta, StoryObj } from '@storybook/react';
import { GlobeWidget } from '../organisms/GlobeWidget';

const meta: Meta<typeof GlobeWidget> = {
  title: 'Organisms/GlobeWidget',
  component: GlobeWidget,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof GlobeWidget>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <GlobeWidget />
    </div>
  ),
};
