import styles from './ServerRackScene.module.css';

export interface RackServerUnit {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'network' | 'power' | 'empty';
  status: 'online' | 'offline' | 'warning' | 'critical';
  cpu: number;
  temp: number;
  units: number; // rack units height
}

interface ServerRackSceneProps {
  servers: RackServerUnit[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  typeColor: Record<RackServerUnit['type'], string>;
}

/** Bespoke 3D rack visualization — perspective/transform scene, not pure layout. */
export function ServerRackScene({ servers, selectedId, onSelect, typeColor }: ServerRackSceneProps) {
  return (
    <div className={styles.rackScene}>
      <div className={styles.rackWrap}>
        <div className={styles.rack}>
          <div className={styles.rackTop} />
          <div className={styles.rackLeft} />
          <div className={styles.rackRight} />
          <div className={styles.rackSlots}>
            {servers.map((server) => (
              <ServerSlot
                key={server.id}
                server={server}
                selected={selectedId === server.id}
                onSelect={() => server.type !== 'empty' && onSelect(server.id)}
                typeColor={typeColor[server.type]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServerSlot({ server, selected, onSelect, typeColor }: {
  server: RackServerUnit;
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
