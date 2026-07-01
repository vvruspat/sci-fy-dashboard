import { useState, useEffect } from 'react';
import { ProgressBar } from '../../atoms/feedback/ProgressBar';
import { Indicator } from '../../atoms/feedback/Indicator';
import { Badge } from '../../atoms/feedback/Badge';
import { MetricRow } from '../../atoms/data-display/MetricRow';
import { ServerRackScene, type RackServerUnit } from '../../atoms/data-display/ServerRackScene';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import { Box } from '../../atoms/layout/Box';
import { Stack } from '../../atoms/layout/Stack';
import { Cluster } from '../../atoms/layout/Cluster';
import { Grid } from '../../atoms/layout/Grid';

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

interface ServerRackProps {
  rackId?: string;
  title?: string;
}

export function ServerRack({ rackId = 'RACK-A', title = 'Server Rack — Alpha' }: ServerRackProps) {
  const [selected, setSelected] = useState<string | null>('c1');
  const [liveData, setLiveData] = useState(SERVERS);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(s => ({
        ...s,
        cpu: s.type === 'empty' ? 0 : Math.max(5, Math.min(100, s.cpu + (Math.random() - 0.5) * 8)),
        temp: s.type === 'empty' ? 0 : Math.max(25, Math.min(80, s.temp + (Math.random() - 0.5) * 3)),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const selectedServer = liveData.find(s => s.id === selected);

  const headerStats = (
    <Cluster gap={20} wrap="nowrap">
      <Stack gap={1} align="end">
        <Box as="span" style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--teal-300)' }}>
          {liveData.filter(s => s.status === 'online').length}/{liveData.filter(s => s.type !== 'empty').length}
        </Box>
        <Box as="span" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          Online
        </Box>
      </Stack>
      <Stack gap={1} align="end">
        <Box as="span" style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--amber-400)' }}>
          {Math.round(liveData.reduce((s, u) => s + u.temp, 0) / liveData.filter(u => u.type !== 'empty').length)}°C
        </Box>
        <Box as="span" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          Avg Temp
        </Box>
      </Stack>
    </Cluster>
  );

  return (
    <WidgetPanel
      title={title}
      subtitle={`${rackId} · 42U · Tier III`}
      actions={headerStats}
      gap={16}
      shimmerColor="var(--teal-500)"
    >
      <Stack gap={14}>
        {/* 3D Rack Visual */}
        <ServerRackScene
          servers={liveData}
          selectedId={selected}
          onSelect={setSelected}
          typeColor={TYPE_COLOR}
        />

        {/* Detail Panel */}
        {selectedServer && selectedServer.type !== 'empty' && (
          <Stack gap={10}>
            <Box display="flex" align="center" justify="between">
              <Box
                as="span"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--teal-300)',
                  letterSpacing: '0.1em',
                  textShadow: '0 0 16px rgba(0,200,220,0.3)',
                }}
              >
                {selectedServer.name}
              </Box>
              <Indicator status={selectedServer.status} size="sm" />
            </Box>
            <Box display="flex">
              <Badge variant="cyan">{selectedServer.type}</Badge>
            </Box>

            <Stack gap={8}>
              <ProgressBar value={selectedServer.cpu} label="CPU Load" size="sm" />
              <ProgressBar value={selectedServer.temp} label="Temperature" variant="amber" size="sm" />
              <Grid columns={2} rowGap={6} columnGap={16}>
                <MetricRow label="Memory" value="64%" valueColor="var(--teal-300)" />
                <MetricRow label="Uptime" value="47d 12h" />
                <MetricRow label="IP" value="10.0.1.42" />
                <MetricRow label="Cores" value="32 vCPU" />
              </Grid>
            </Stack>
          </Stack>
        )}
      </Stack>
    </WidgetPanel>
  );
}
