import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine,
} from 'recharts';
import { TabGroup } from '../../molecules/TabGroup';
import { ChartLegend } from '../../molecules/ChartLegend';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import { ChartTooltip, ChartTooltipRow } from '../../atoms/data-display/ChartTooltip';
import { Box } from '../../atoms/layout/Box';
import { useState } from 'react';
import { theme } from '../../theme';

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
    <ChartTooltip heading={label} headingVariant="time">
      {payload.map((p: any) => (
        <ChartTooltipRow
          key={p.dataKey}
          label={p.dataKey}
          value={`${p.value.toFixed(1)}%`}
          dotColor={p.color}
          gap={6}
        />
      ))}
    </ChartTooltip>
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
    <WidgetPanel
      title={title}
      subtitle="Bandwidth utilization over time"
      actions={<TabGroup tabs={TABS} defaultTab="1h" onChange={setRange} />}
    >
      <ChartLegend items={[
        { color: theme.accent,    label: 'Network I/O' },
        { color: theme.accentDim, label: 'CPU Load'    },
      ]} />

      <Box height={200}>
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
      </Box>
    </WidgetPanel>
  );
}
