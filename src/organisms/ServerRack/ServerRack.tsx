import { useState, useEffect } from 'react';
import { ProgressBar } from '../../atoms/feedback/ProgressBar';
import { Indicator } from '../../atoms/feedback/Indicator';
import { Badge } from '../../atoms/feedback/Badge';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import styles from './ServerRack.module.css';

interface ServerUnit {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'network' | 'power' | 'empty';
  status: 'online' | 'offline' | 'warning' | 'critical';
  cpu: number;
  temp: number;
  units: number; // rack units height
}

const SERVERS: ServerUnit[] = [
  { id: 'sw1', name: 'CORE-SW-01', type: 'network', status: 'online', cpu: 12, temp: 35, units: 1 },
  { id: 'fw1', name: 'FW-PRIMARY', type: 'network', status: 'online', cpu: 34, temp: 42, units: 2 },
  { id: 'c1', name: 'COMPUTE-01', type: 'compute', status: 'online', cpu: 87, temp: 68, units: 2 },
  { id: 'c2', name: 'COMPUTE-02', type: 'compute', status: 'warning', cpu: 92, temp: 74, units: 2 },
  { id: 'c3', name: 'COMPUTE-03', type: 'compute', status: 'online', cpu: 54, temp: 55, units: 2 },
  { id: 's1', name: 'STOR-NAS-01', type: 'storage', status: 'online', cpu: 21, temp: 38, units: 2 },
  { id: 'empty1', name: '', type: 'empty', status: 'offline', cpu: 0, temp: 0, units: 1 },
  { id: 'pdu1', name: 'PDU-01', type: 'power', status: 'online', cpu: 0, temp: 28, units: 1 },
];

const TYPE_COLOR: Record<ServerUnit['type'], string> = {
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
    <div className={styles.headerStats}>
      <div className={styles.headerStat}>
        <span className={styles.headerStatVal} style={{ color: 'var(--teal-300)' }}>
          {liveData.filter(s => s.status === 'online').length}/{liveData.filter(s => s.type !== 'empty').length}
        </span>
        <span className={styles.headerStatLabel}>Online</span>
      </div>
      <div className={styles.headerStat}>
        <span className={styles.headerStatVal} style={{ color: 'var(--amber-400)' }}>
          {Math.round(liveData.reduce((s, u) => s + u.temp, 0) / liveData.filter(u => u.type !== 'empty').length)}°C
        </span>
        <span className={styles.headerStatLabel}>Avg Temp</span>
      </div>
    </div>
  );

  return (
    <WidgetPanel
      title={title}
      subtitle={`${rackId} · 42U · Tier III`}
      actions={headerStats}
      className={styles.widget}
    >
      <div className={styles.body}>
        {/* 3D Rack Visual */}
        <div className={styles.rackScene}>
          <div className={styles.rackWrap}>
            <div className={styles.rack}>
              <div className={styles.rackTop} />
              <div className={styles.rackLeft} />
              <div className={styles.rackRight} />
              <div className={styles.rackSlots}>
                {liveData.map((server) => (
                  <ServerSlot
                    key={server.id}
                    server={server}
                    selected={selected === server.id}
                    onSelect={() => server.type !== 'empty' && setSelected(server.id)}
                    typeColor={TYPE_COLOR[server.type]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedServer && selectedServer.type !== 'empty' && (
          <div className={styles.detail}>
            <div className={styles.detailHeader}>
              <span className={styles.detailName}>{selectedServer.name}</span>
              <Indicator status={selectedServer.status} size="sm" />
            </div>
            <div className={styles.detailType}>
              <Badge variant="cyan">{selectedServer.type}</Badge>
            </div>

            <div className={styles.metrics}>
              <ProgressBar value={selectedServer.cpu} label="CPU Load" size="sm" />
              <ProgressBar value={selectedServer.temp} label="Temperature" variant="amber" size="sm" />
              <div className={styles.metricGrid}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Memory</span>
                  <span className={styles.metricVal} style={{ color: 'var(--teal-300)' }}>64%</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Uptime</span>
                  <span className={styles.metricVal}>47d 12h</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>IP</span>
                  <span className={styles.metricVal}>10.0.1.42</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Cores</span>
                  <span className={styles.metricVal}>32 vCPU</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WidgetPanel>
  );
}

function ServerSlot({ server, selected, onSelect, typeColor }: {
  server: ServerUnit;
  selected: boolean;
  onSelect: () => void;
  typeColor: string;
}) {
  if (server.type === 'empty') {
    return <div className={styles.emptySlot} style={{ height: `${server.units * 28}px` }} />;
  }

  return (
    <div
      className={`${styles.serverSlot} ${selected ? styles.serverSelected : ''}`}
      style={{
        height: `${server.units * 28}px`,
        borderLeftColor: typeColor,
      }}
      onClick={onSelect}
    >
      <div className={styles.slotFront}>
        {/* LED indicators */}
        <div className={styles.leds}>
          <span className={`${styles.led} ${styles[`led_${server.status}`]}`} />
          <span className={`${styles.led} ${styles.led_hdd}`} />
          <span className={`${styles.led} ${styles.led_net}`} />
        </div>

        {/* Name */}
        <span className={styles.serverName}>{server.name}</span>

        {/* Activity bars */}
        <div className={styles.activityBars}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={styles.actBar}
              style={{
                height: `${Math.random() * 100}%`,
                background: typeColor,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Temp */}
        <span className={styles.slotTemp} style={{ color: server.temp > 65 ? 'var(--red-400)' : server.temp > 50 ? 'var(--amber-400)' : 'var(--text-muted)' }}>
          {server.temp.toFixed(0)}°
        </span>
      </div>
    </div>
  );
}
