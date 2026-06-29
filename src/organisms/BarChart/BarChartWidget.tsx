import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { theme } from '../../theme';
import styles from './BarChartWidget.module.css';

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
    <div className={styles.tooltip}>
      <div className={styles.tooltipTitle}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className={styles.tooltipRow}>
          <span className={styles.tooltipKey}>{p.dataKey === 'load' ? 'CPU Load' : 'Temp'}</span>
          <span className={styles.tooltipVal} style={{ color: p.fill }}>
            {p.value}{p.dataKey === 'temp' ? '°C' : '%'}
          </span>
        </div>
      ))}
    </div>
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
    <div className={`${styles.widget} glass-panel`}>
      <div className={`${styles.header} drag-handle`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span style={{ color: theme.accent }}>■</span> Normal</span>
          <span className={styles.legendItem}><span style={{ color: theme.warning }}>■</span> High</span>
          <span className={styles.legendItem}><span style={{ color: theme.danger }}>■</span> Critical</span>
        </div>
      </div>
      <div className={styles.chart}>
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
      </div>
    </div>
  );
}
