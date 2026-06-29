import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from '../pages/Dashboard';
import { Sidebar } from '../organisms/Sidebar';
import { TopBar } from '../organisms/TopBar';

const meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'void' },
  },
};
export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '220px', display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <main style={{ flex: 1 }}>
          <Dashboard />
        </main>
      </div>
    </div>
  ),
};
