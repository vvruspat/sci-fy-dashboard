import { useState } from 'react';
import { Search, Bell, RefreshCw, Clock, Wifi } from 'lucide-react';
import { Box } from '../../atoms/layout/Box';
import { Stack } from '../../atoms/layout/Stack';
import { Cluster } from '../../atoms/layout/Cluster';
import { Input } from '../../atoms/form/Input';
import { Badge } from '../../atoms/feedback/Badge';
import { Button } from '../../atoms/form/Button';
import { NotificationDot } from '../../atoms/feedback/NotificationDot';
import { StatChip } from '../../atoms/data-display/StatChip';
import { GlassSurface } from '../../atoms/surfaces/GlassSurface';

export function TopBar() {
  const [time] = useState(() => new Date().toLocaleTimeString('en', { hour12: false }));

  return (
    <GlassSurface
      as="header"
      edge="bottom"
      edgeColor="var(--teal-700)"
      edgeColorEnd="var(--teal-600)"
      edgeColorStop={30}
      edgeColorEndStop={60}
      edgeOpacity={0.35}
      display="flex"
      align="center"
      justify="between"
      gap={20}
      paddingX={24}
      height="var(--topbar-height)"
      position="sticky"
      top={0}
      zIndex={50}
      style={{ borderBottom: '1px solid var(--border-dim)' }}
    >
      <Stack gap={1} justify="center">
        <Cluster
          gap={4}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
          }}
        >
          <span>HOME</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ color: 'var(--text-dim)' }}>DASHBOARD</span>
        </Cluster>
        <Cluster gap={8}>
          <Box
            as="h1"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.18em',
              lineHeight: 1,
            }}
          >
            DASHBOARD
          </Box>
          <Badge variant="green" dot>Live</Badge>
        </Cluster>
      </Stack>

      <Box flex={1} style={{ maxWidth: 380 }}>
        <Input
          icon={<Search size={14} />}
          placeholder="Search nodes, services..."
          style={{ width: 280 }}
        />
      </Box>

      <Cluster gap={16}>
        <StatChip icon={<Wifi size={12} />} value="98.7%" label="Uptime" />
        <StatChip icon={<Clock size={12} />} value={time} label="UTC+0" />
        <Button variant="ghost" size="sm" icon={<RefreshCw size={12} />} />
        <Box position="relative">
          <Button variant="ghost" size="sm" icon={<Bell size={12} />} />
          <NotificationDot color="red" size="sm" pulse style={{ position: 'absolute', top: 4, right: 4 }} />
        </Box>
      </Cluster>
    </GlassSurface>
  );
}
