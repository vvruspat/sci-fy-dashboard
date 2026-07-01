import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ServerRackScene, type RackServerUnit } from '../atoms/data-display/ServerRackScene';

const SERVERS: RackServerUnit[] = [
  { id: 'sw1', name: 'CORE-SW-01', type: 'network', status: 'online', cpu: 12, temp: 35, units: 1 },
  { id: 'fw1', name: 'FW-PRIMARY', type: 'network', status: 'online', cpu: 34, temp: 42, units: 2 },
  { id: 'c1', name: 'COMPUTE-01', type: 'compute', status: 'online', cpu: 87, temp: 68, units: 2 },
  { id: 'c2', name: 'COMPUTE-02', type: 'compute', status: 'warning', cpu: 92, temp: 74, units: 2 },
  { id: 'c3', name: 'COMPUTE-03', type: 'compute', status: 'online', cpu: 54, temp: 55, units: 2 },
  { id: 's1', name: 'STOR-NAS-01', type: 'storage', status: 'online', cpu: 21, temp: 38, units: 2 },
  { id: 'empty1', name: '', type: 'empty', status: 'offline', cpu: 0, temp: 0, units: 1 },
  { id: 'pdu1', name: 'PDU-01', type: 'power', status: 'online', cpu: 0, temp: 28, units: 1 },
];

const TYPE_COLOR: Record<RackServerUnit['type'], string> = {
  compute: 'var(--teal-300)',
  storage: 'var(--amber-400)',
  network: 'var(--teal-500)',
  power: 'var(--teal-700)',
  empty: 'transparent',
};

const meta: Meta<typeof ServerRackScene> = {
  title: 'Atoms/Data Display/ServerRackScene',
  component: ServerRackScene,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ServerRackScene>;

function Interactive() {
  const [selected, setSelected] = useState<string | null>('c1');
  return (
    <ServerRackScene servers={SERVERS} selectedId={selected} onSelect={setSelected} typeColor={TYPE_COLOR} />
  );
}

export const Default: Story = {
  render: () => <Interactive />,
};
