import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from '../atoms/Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'Atoms/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'range', min: 40, max: 200, step: 8 } },
    height: { control: { type: 'range', min: 12, max: 60, step: 4 } },
  },
};
export default meta;
type Story = StoryObj<typeof Sparkline>;

const CPU_DATA = [55, 60, 58, 72, 68, 75, 70, 82, 78, 85, 80, 87];
const NET_DATA = [30, 45, 38, 62, 55, 70, 65, 80, 72, 68, 74, 78];
const FLAT_DATA = [50, 51, 49, 50, 52, 50, 51, 49, 50, 51, 50, 50];

export const Default: Story = {
  args: { data: CPU_DATA, width: 80, height: 24 },
  decorators: [(Story) => <div style={{ color: 'var(--teal-400)' }}><Story /></div>],
};

export const Wide: Story = {
  args: { data: NET_DATA, width: 120, height: 32 },
  decorators: [(Story) => <div style={{ color: 'var(--teal-300)' }}><Story /></div>],
};

export const Flat: Story = {
  args: { data: FLAT_DATA, width: 80, height: 24 },
  decorators: [(Story) => <div style={{ color: 'var(--text-dim)' }}><Story /></div>],
};

export const MultipleInstances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { label: 'CPU', data: CPU_DATA, color: 'var(--teal-400)' },
        { label: 'Network', data: NET_DATA, color: 'var(--amber-400)' },
        { label: 'Stable', data: FLAT_DATA, color: 'var(--text-dim)' },
      ].map(({ label, data, color }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '10px', fontFamily: 'var(--font-mono)', width: 52 }}>{label}</span>
          <div style={{ color }}><Sparkline data={data} width={80} height={20} /></div>
        </div>
      ))}
    </div>
  ),
};
