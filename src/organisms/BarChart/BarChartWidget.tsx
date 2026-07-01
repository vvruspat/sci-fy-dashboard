import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { WidgetPanel } from '../../molecules/WidgetPanel';
import { ChartLegend } from '../../molecules/ChartLegend';
import { ChartTooltip, ChartTooltipRow } from '../../atoms/data-display/ChartTooltip';
import { Box } from '../../atoms/layout/Box';
import { theme } from '../../theme';

const DATA = [
  { name: 'Rack A', load: 87, temp: 42 },
  { name: 'Rack B', load: 54, temp: 38 },
  { name: 'Rack C', load: 92, temp: 51 },
  { name: 'Rack D', load: 31, temp: 33 },
  { name: 'Rack E', load: 75, temp: 44 },
  { name: 'Rack F', load: 68, temp: 40 },
  { name: 'Rack G', load: 45, temp: 36 },
  { name: 'Rack H', load: 88, temp: 48 },
];

function getBarColor(value: number) {
  if (value >= 90) return theme.danger;
  if (value >= 75) return theme.warning;
  return theme.accent;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <ChartTooltip heading={label} headingVariant="title">
      {payload.map((p: any) => (
        <ChartTooltipRow
          key={p.dataKey}
          label={p.dataKey === 'load' ? 'CPU Load' : 'Temp'}
          value={`${p.value}${p.dataKey === 'temp' ? '°C' : '%'}`}
          valueColor={p.fill}
          keyColor="var(--text-dim)"
          gap={10}
        />
      ))}
    </ChartTooltip>
  );
};

const CustomBar = (props: any) => {
  const { x, y, width, height, value } = props;
  const color = getBarColor(value);
  return (
    <g>
      <defs>
        <linearGradient id={`barGrad_${value}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.85} />
          <stop offset="100%" stopColor={color} stopOpacity={0.12} />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={width} height={height} fill={`url(#barGrad_${value})`} rx={1} />
      <rect x={x} y={y} width={width} height={2} fill={color} opacity={0.8} />
    </g>
  );
};

interface BarChartWidgetProps {
  title?: string;
}

export function BarChartWidget({ title = 'Rack Load Distribution' }: BarChartWidgetProps) {
  return (
    <WidgetPanel
      title={title}
      actions={<ChartLegend items={[
        { color: theme.accent,   label: 'Normal'   },
        { color: theme.warning,  label: 'High'     },
        { color: theme.danger,   label: 'Critical' },
      ]} />}
    >
      <Box height={200}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="1 8" stroke={theme.grid} horizontal vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: theme.axis, fontSize: 9, fontFamily: 'Share Tech Mono' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: theme.axis, fontSize: 9, fontFamily: 'Share Tech Mono' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: theme.cursor }} />
            <Bar dataKey="load" shape={<CustomBar />} maxBarSize={32}>
              {DATA.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.load)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </WidgetPanel>
  );
}
