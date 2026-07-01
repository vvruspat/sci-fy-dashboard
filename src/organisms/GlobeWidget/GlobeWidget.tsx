import { useState } from 'react';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import { ChartLegend } from '../../molecules/ChartLegend';
import { Globe3D, type GlobeDatacenter, type GlobeLink } from '../../atoms/data-display/Globe3D';
import { Indicator } from '../../atoms/feedback/Indicator';
import { Badge } from '../../atoms/feedback/Badge';
import { ProgressBar } from '../../atoms/feedback/ProgressBar';
import { MetricRow } from '../../atoms/data-display/MetricRow';
import { WidgetSubtitle } from '../../atoms/typography/WidgetSubtitle';
import { Box } from '../../atoms/layout/Box';
import { Stack } from '../../atoms/layout/Stack';
import { Cluster } from '../../atoms/layout/Cluster';
import { Grid } from '../../atoms/layout/Grid';
import { Divider } from '../../atoms/layout/Divider';

interface DatacenterInfo extends GlobeDatacenter {
  city: string;
  country: string;
  load: number;
  latency: number;
}

interface LinkInfo extends GlobeLink {
  bandwidth: string;
  latency: number;
}

const DATACENTERS: DatacenterInfo[] = [
  { id: 'use1', name: 'US-EAST-1', city: 'Ashburn', country: 'USA', lat: 39.04, lng: -77.49, status: 'online', load: 74, latency: 4 },
  { id: 'usw1', name: 'US-WEST-1', city: 'San Jose', country: 'USA', lat: 37.34, lng: -121.89, status: 'online', load: 58, latency: 6 },
  { id: 'euw1', name: 'EU-WEST-1', city: 'London', country: 'UK', lat: 51.51, lng: -0.13, status: 'warning', load: 91, latency: 12 },
  { id: 'euc1', name: 'EU-CENTRAL-1', city: 'Frankfurt', country: 'Germany', lat: 50.11, lng: 8.68, status: 'online', load: 63, latency: 9 },
  { id: 'apne1', name: 'AP-NORTHEAST-1', city: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, status: 'online', load: 69, latency: 18 },
  { id: 'apse1', name: 'AP-SOUTHEAST-1', city: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, status: 'critical', load: 96, latency: 22 },
  { id: 'sae1', name: 'SA-EAST-1', city: 'São Paulo', country: 'Brazil', lat: -23.55, lng: -46.63, status: 'online', load: 47, latency: 15 },
  { id: 'apse2', name: 'AU-SOUTHEAST-1', city: 'Sydney', country: 'Australia', lat: -33.87, lng: 151.21, status: 'online', load: 55, latency: 24 },
];

const LINKS: LinkInfo[] = [
  { id: 'l1', from: 'use1', to: 'usw1', status: 'active', bandwidth: '100 Gbps', latency: 35 },
  { id: 'l2', from: 'use1', to: 'euw1', status: 'active', bandwidth: '100 Gbps', latency: 72 },
  { id: 'l3', from: 'use1', to: 'sae1', status: 'active', bandwidth: '40 Gbps', latency: 108 },
  { id: 'l4', from: 'usw1', to: 'apne1', status: 'active', bandwidth: '100 Gbps', latency: 98 },
  { id: 'l5', from: 'usw1', to: 'apse2', status: 'degraded', bandwidth: '40 Gbps', latency: 138 },
  { id: 'l6', from: 'euw1', to: 'euc1', status: 'active', bandwidth: '100 Gbps', latency: 8 },
  { id: 'l7', from: 'euc1', to: 'apse1', status: 'active', bandwidth: '40 Gbps', latency: 158 },
  { id: 'l8', from: 'apne1', to: 'apse1', status: 'active', bandwidth: '100 Gbps', latency: 68 },
  { id: 'l9', from: 'apse1', to: 'apse2', status: 'degraded', bandwidth: '40 Gbps', latency: 92 },
  { id: 'l10', from: 'euw1', to: 'usw1', status: 'active', bandwidth: '40 Gbps', latency: 140 },
];

export function GlobeWidget() {
  const [selectedId, setSelectedId] = useState(DATACENTERS[0].id);
  const selected = DATACENTERS.find((d) => d.id === selectedId) ?? DATACENTERS[0];
  const selectedLinks = LINKS.filter((l) => l.from === selectedId || l.to === selectedId);
  const onlineCount = DATACENTERS.filter((d) => d.status === 'online').length;

  return (
    <WidgetPanel
      title="Global Network"
      subtitle="Datacenter topology & connections"
      actions={<Badge variant="cyan" dot>{onlineCount}/{DATACENTERS.length} Sites</Badge>}
      mode="invisible"
    >
      <Cluster align="start" gap={20} wrap="nowrap">
        <Box flexShrink={0}>
          <Globe3D
            datacenters={DATACENTERS}
            links={LINKS}
            selectedId={selectedId}
            onSelect={setSelectedId}
            size={340}
          />
        </Box>

        <Stack gap={10} flex={1} minWidth={0}>
          <Stack gap={2} overflowY="auto" style={{ maxHeight: 170 }}>
            {DATACENTERS.map((d) => (
              <Cluster
                key={d.id}
                justify="between"
                gap={8}
                paddingY={4}
                paddingX={6}
                cursor="pointer"
                style={{
                  background: d.id === selectedId ? 'var(--bg-active)' : 'transparent',
                  borderLeft: `2px solid ${d.id === selectedId ? 'var(--teal-300)' : 'transparent'}`,
                }}
                onClick={() => setSelectedId(d.id)}
              >
                <Cluster gap={6}>
                  <Indicator status={d.status} size="sm" label="" />
                  <Box as="span" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>
                    {d.name}
                  </Box>
                </Cluster>
                <Box as="span" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>
                  {d.load}%
                </Box>
              </Cluster>
            ))}
          </Stack>

          <Divider />

          <Stack gap={8}>
            <WidgetSubtitle>{selected.name} · {selected.city}, {selected.country}</WidgetSubtitle>
            <ProgressBar value={selected.load} label="Load" size="sm" />
            <Grid columns={2} rowGap={6} columnGap={16}>
              <MetricRow label="Latency" value={`${selected.latency}ms`} />
              <MetricRow label="Links" value={selectedLinks.length} />
            </Grid>
          </Stack>

          <ChartLegend
            items={[
              { color: 'var(--teal-400)', label: 'Active Link' },
              { color: 'var(--amber-400)', label: 'Degraded' },
            ]}
          />
        </Stack>
      </Cluster>
    </WidgetPanel>
  );
}
