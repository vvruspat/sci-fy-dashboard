import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number; // percentage change, positive = up
  icon?: ReactNode;
  accent?: 'cyan' | 'purple' | 'amber' | 'green' | 'red';
  sublabel?: string;
  sparkline?: number[]; // mini sparkline values
  className?: string;
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,${h} ${points} ${w},${h}`;

  return (
    <svg width={w} height={h} className={styles.spark}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sparkGrad)" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCard({ label, value, unit, trend, icon, accent = 'cyan', sublabel, sparkline, className }: StatCardProps) {
  const trendDir = trend === undefined ? null : trend > 0 ? 'up' : trend < 0 ? 'down' : 'flat';
  const TrendIcon = trendDir === 'up' ? TrendingUp : trendDir === 'down' ? TrendingDown : Minus;

  return (
    <div className={clsx(styles.card, styles[accent], 'glass-panel', className)}>
      <div className={styles.topLine} />
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.valueRow}>
        <div className={styles.valueWrap}>
          <span className={styles.value}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>
        {sparkline && <div className={clsx(styles.sparkWrap, styles[accent])}><Sparkline data={sparkline} /></div>}
      </div>
      <div className={styles.footer}>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
        {trendDir !== null && (
          <span className={clsx(styles.trend, styles[`trend_${trendDir}`])}>
            <TrendIcon size={10} />
            {Math.abs(trend!).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}
