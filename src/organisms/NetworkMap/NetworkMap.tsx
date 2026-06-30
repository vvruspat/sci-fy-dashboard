import { useEffect, useState } from 'react';
import { theme } from '../../theme';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import { ChartLegend } from '../../molecules/ChartLegend';
import styles from './NetworkMap.module.css';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'core' | 'switch' | 'server' | 'external';
  status: 'online' | 'warning' | 'offline';
}

interface Edge {
  from: string;
  to: string;
  active: boolean;
  bandwidth: number; // 0-100
}

const NODES: Node[] = [
  { id: 'internet', label: 'INTERNET', x: 50, y: 15, type: 'external', status: 'online' },
  { id: 'fw', label: 'FIREWALL', x: 50, y: 30, type: 'core', status: 'online' },
  { id: 'core-sw', label: 'CORE-SW', x: 50, y: 50, type: 'core', status: 'online' },
  { id: 'sw-a', label: 'SW-A', x: 25, y: 68, type: 'switch', status: 'online' },
  { id: 'sw-b', label: 'SW-B', x: 75, y: 68, type: 'switch', status: 'warning' },
  { id: 'srv1', label: 'SRV-01', x: 12, y: 85, type: 'server', status: 'online' },
  { id: 'srv2', label: 'SRV-02', x: 28, y: 85, type: 'server', status: 'online' },
  { id: 'srv3', label: 'SRV-03', x: 62, y: 85, type: 'server', status: 'online' },
  { id: 'srv4', label: 'SRV-04', x: 78, y: 85, type: 'server', status: 'offline' },
  { id: 'nas', label: 'NAS-01', x: 50, y: 70, type: 'server', status: 'online' },
];

const EDGES: Edge[] = [
  { from: 'internet', to: 'fw', active: true, bandwidth: 45 },
  { from: 'fw', to: 'core-sw', active: true, bandwidth: 38 },
  { from: 'core-sw', to: 'sw-a', active: true, bandwidth: 72 },
  { from: 'core-sw', to: 'sw-b', active: true, bandwidth: 55 },
  { from: 'core-sw', to: 'nas', active: true, bandwidth: 60 },
  { from: 'sw-a', to: 'srv1', active: true, bandwidth: 40 },
  { from: 'sw-a', to: 'srv2', active: true, bandwidth: 85 },
  { from: 'sw-b', to: 'srv3', active: true, bandwidth: 30 },
  { from: 'sw-b', to: 'srv4', active: false, bandwidth: 0 },
];

const STATUS_COLOR: Record<string, string> = {
  online:  theme.accent,
  warning: theme.warning,
  offline: theme.accentDark,
};

const TYPE_SIZE: Record<string, number> = {
  core: 14,
  switch: 10,
  server: 8,
  external: 12,
};

function getNode(id: string): Node {
  return NODES.find(n => n.id === id)!;
}

function getBandwidthColor(bw: number): string {
  if (bw >= 80) return theme.danger;
  if (bw >= 60) return theme.warning;
  return theme.accent;
}

export function NetworkMap() {
  const [packet, setPacket] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Animate data packets along edges
  useEffect(() => {
    const id = setInterval(() => setPacket(p => (p + 1) % 100), 50);
    return () => clearInterval(id);
  }, []);

  return (
    <WidgetPanel title="Network Topology" subtitle="Live traffic visualization" className={styles.widget}>
      <div className={styles.mapWrap}>
        <svg viewBox="0 0 100 100" className={styles.svg} preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {EDGES.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              return (
                <linearGradient key={i} id={`edgeGrad${i}`} x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={getBandwidthColor(edge.bandwidth)} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={getBandwidthColor(edge.bandwidth)} stopOpacity={0.2} />
                </linearGradient>
              );
            })}
          </defs>

          {/* Edges */}
          {EDGES.map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const color = edge.active ? getBandwidthColor(edge.bandwidth) : '#1e2d4a';
            const px = from.x + (to.x - from.x) * (packet / 100);
            const py = from.y + (to.y - from.y) * (packet / 100);

            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={color}
                  strokeWidth={edge.bandwidth > 70 ? 0.5 : 0.3}
                  strokeOpacity={edge.active ? 0.4 : 0.15}
                  strokeDasharray={edge.active ? 'none' : '1,2'}
                />
                {/* Packet animation */}
                {edge.active && (
                  <circle
                    cx={px}
                    cy={py}
                    r={0.8}
                    fill={color}
                    opacity={0.9}
                    filter="url(#nodeGlow)"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const size = TYPE_SIZE[node.type];
            const color = STATUS_COLOR[node.status];
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Glow ring */}
                {node.status !== 'offline' && (
                  <circle r={size / 2 + 3} fill={color} opacity={0.08} />
                )}

                {/* Node shape */}
                {node.type === 'core' || node.type === 'external' ? (
                  <rect
                    x={-size / 2}
                    y={-size / 3}
                    width={size}
                    height={size * 0.67}
                    fill={theme.fillLow}
                    stroke={theme.accent}
                    strokeWidth={0.5}
                    filter={isHovered ? 'url(#nodeGlow)' : undefined}
                  />
                ) : (
                  <circle
                    r={size / 2}
                    fill={theme.fillLow}
                    stroke={color}
                    strokeWidth={0.4}
                    filter={isHovered ? 'url(#nodeGlow)' : undefined}
                  />
                )}

                {/* Status dot */}
                <circle
                  cx={size / 2 - 1}
                  cy={-size / 3}
                  r={1.2}
                  fill={color}
                />

                {/* Label */}
                <text
                  y={size / 2 + 3.5}
                  textAnchor="middle"
                  fontSize={2.5}
                  fill={theme.axis}
                  fontFamily="Share Tech Mono"
                  letterSpacing={0.3}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <ChartLegend
          className={styles.legend}
          items={[
            { color: theme.accent,  label: 'Low BW'    },
            { color: theme.warning, label: 'High BW'   },
            { color: theme.danger,  label: 'Saturated' },
          ]}
        />
      </div>
    </WidgetPanel>
  );
}
