import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Globe3D, type GlobeDatacenter, type GlobeLink } from '../atoms/data-display/Globe3D';

const DATACENTERS: GlobeDatacenter[] = [
  { id: 'use1', name: 'US-EAST-1', lat: 39.04, lng: -77.49, status: 'online' },
  { id: 'usw1', name: 'US-WEST-1', lat: 37.34, lng: -121.89, status: 'online' },
  { id: 'euw1', name: 'EU-WEST-1', lat: 51.51, lng: -0.13, status: 'warning' },
  { id: 'apse1', name: 'AP-SOUTHEAST-1', lat: 1.35, lng: 103.82, status: 'critical' },
];

const LINKS: GlobeLink[] = [
  { id: 'l1', from: 'use1', to: 'usw1', status: 'active' },
  { id: 'l2', from: 'use1', to: 'euw1', status: 'active' },
  { id: 'l3', from: 'usw1', to: 'apse1', status: 'degraded' },
];

const meta: Meta<typeof Globe3D> = {
  title: 'Atoms/Data Display/Globe3D',
  component: Globe3D,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Globe3D>;

export const Default: Story = {
  args: { datacenters: DATACENTERS, links: LINKS, size: 260 },
};

function Interactive() {
  const [selected, setSelected] = useState('use1');
  return (
    <Globe3D
      datacenters={DATACENTERS}
      links={LINKS}
      selectedId={selected}
      onSelect={setSelected}
      size={280}
    />
  );
}

export const SelectableMarkers: Story = {
  render: () => <Interactive />,
};

export const FastRotate: Story = {
  args: { datacenters: DATACENTERS, links: LINKS, size: 260, autoRotateSpeed: 30 },
};
