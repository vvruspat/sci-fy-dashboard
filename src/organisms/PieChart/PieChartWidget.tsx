import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { PieChart, Pie as PieBase, Cell, ResponsiveContainer, Sector } from 'recharts';
const Pie = PieBase as any;
import { HUE } from '../../theme';
import styles from './PieChartWidget.module.css';

const DATA = [
  { name: 'Compute', value: 38, color: `hsl(${HUE} 100% 43%)`, glow: `hsla(${HUE} 100% 43% / 0.4)` },
  { name: 'Memory',  value: 24, color: `hsl(${HUE} 85% 36%)`,  glow: `hsla(${HUE} 85% 36% / 0.4)`  },
  { name: 'Storage', value: 21, color: `hsl(${HUE} 74% 22%)`,  glow: `hsla(${HUE} 74% 22% / 0.4)`  },
  { name: 'Network', value: 11, color: `hsl(${HUE} 76% 15%)`,  glow: `hsla(${HUE} 76% 15% / 0.4)`  },
  { name: 'Cooling', value: 6,  color: 'hsl(352 100% 62%)',     glow: 'hsla(352 100% 62% / 0.4)'     },
];

const ActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  return (
    <g>
      <text x={cx} y={cy - 14} textAnchor="middle" fill="#e0f2fe" fontFamily="Orbitron" fontSize={18} fontWeight={700}>
        {(percent * 100).toFixed(0)}%
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#475569" fontFamily="Share Tech Mono" fontSize={10} letterSpacing={2}>
        {payload.name.toUpperCase()}
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.15}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.6}
      />
    </g>
  );
};

interface PieChartWidgetProps {
  title?: string;
}

export function PieChartWidget({ title = 'Resource Allocation' }: PieChartWidgetProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div className={`${styles.widget} glass-panel`}>
      <div className={`${styles.header} drag-handle`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>Total: {total} TW allocated</div>
      </div>

      <div className={styles.body}>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {DATA.map((_d, i) => (
                  <filter key={i} id={`glow${i}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                ))}
              </defs>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={62}
                paddingAngle={3}
                dataKey="value"
                activeIndex={activeIndex}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                activeShape={(props: any) => <ActiveShape {...props} />}
                onMouseEnter={(_: unknown, index: number) => setActiveIndex(index)}
              >
                {DATA.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.color}
                    opacity={i === activeIndex ? 1 : 0.6}
                    stroke={i === activeIndex ? d.color : 'transparent'}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.legend}>
          {DATA.map((d, i) => (
            <div
              key={d.name}
              className={styles.legendItem}
              style={{ borderLeftColor: d.color }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className={styles.legendDot} style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
              <div className={styles.legendBody}>
                <span className={styles.legendName}>{d.name}</span>
                <span className={styles.legendVal} style={{ color: d.color }}>{d.value}%</span>
              </div>
              <div className={styles.legendBar}>
                <div className={styles.legendFill} style={{ width: `${d.value}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
