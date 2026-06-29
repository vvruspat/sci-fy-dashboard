import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine,
} from 'recharts';
import { TabGroup } from '../../molecules/TabGroup';
import { useState } from 'react';
import { theme } from '../../theme';
import styles from './LineChartWidget.module.css';

const TABS = [
  { id: '1h', label: '1H' },
  { id: '6h', label: '6H' },
  { id: '24h', label: '24H' },
  { id: '7d', label: '7D' },
];

function generateData(points: number, base = 60, variance = 20) {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => ({
    t: new Date(now - (points - i) * 60000).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }),
    network: Math.max(10, Math.min(95, base + (Math.random() - 0.5) * variance)),
    cpu: Math.max(5, Math.min(90, base * 0.8 + (Math.random() - 0.5) * variance * 1.2)),
  }));
}

const DATA: Record<string, ReturnType<typeof generateData>> = {
  '1h': generateData(30, 58, 22),
  '6h': generateData(36, 62, 25),
  '24h': generateData(48, 55, 30),
  '7d': generateData(56, 60, 28),
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipTime}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: p.color }} />
          <span className={styles.tooltipKey}>{p.dataKey}</span>
          <span className={styles.tooltipVal}>{p.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

const GlowDot = (props: any) => {
  const { cx, cy, stroke } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill={stroke} opacity={0.2} />
      <circle cx={cx} cy={cy} r={2} fill={stroke} />
    </g>
  );
};

interface LineChartWidgetProps {
  title?: string;
}

export function LineChartWidget({ title = 'Network Traffic' }: LineChartWidgetProps) {
  const [range, setRange] = useState('1h');
  const data = DATA[range];

  return (
    <div className={`${styles.widget} glass-panel`}>
      <div className={`${styles.header} drag-handle`}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>Bandwidth utilization over time</div>
        </div>
        <TabGroup tabs={TABS} defaultTab="1h" onChange={setRange} />
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: theme.accent }} />Network I/O</span>
        <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: theme.accentDim }} />CPU Load</span>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTeal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={theme.accent} stopOpacity={0.30} />
                <stop offset="60%"  stopColor={theme.accent} stopOpacity={0.06} />
                <stop offset="100%" stopColor={theme.accent} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradTealDim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={theme.accentMid} stopOpacity={0.18} />
                <stop offset="100%" stopColor={theme.accentMid} stopOpacity={0} />
              </linearGradient>
              <filter id="glowTeal">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="1 8" stroke={theme.grid} vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fill: theme.axis, fontSize: 9, fontFamily: 'Share Tech Mono' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: theme.axis, fontSize: 9, fontFamily: 'Share Tech Mono' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={80} stroke="rgba(232,160,84,0.25)" strokeDasharray="2 4" label={{ value: 'WARN', fill: theme.warning, fontSize: 8, fontFamily: 'Share Tech Mono' }} />
            <Area
              type="monotone"
              dataKey="cpu"
              stroke={theme.accentDim}
              strokeWidth={1.5}
              fill="url(#gradTealDim)"
              dot={false}
              activeDot={<GlowDot stroke={theme.accentDim} />}
            />
            <Area
              type="monotone"
              dataKey="network"
              stroke={theme.accent}
              strokeWidth={2}
              fill="url(#gradTeal)"
              dot={false}
              activeDot={<GlowDot stroke={theme.accent} />}
              filter="url(#glowTeal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
