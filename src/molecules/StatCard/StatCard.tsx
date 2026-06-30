import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sparkline } from '../../atoms/Sparkline';
import { Badge } from '../../atoms/Badge';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon?: ReactNode;
  accent?: 'cyan' | 'purple' | 'amber' | 'green' | 'red';
  sublabel?: string;
  sparkline?: number[];
  className?: string;
}

export function StatCard({ label, value, unit, trend, icon, accent = 'cyan', sublabel, sparkline, className }: StatCardProps) {
  const trendDir = trend === undefined ? null : trend > 0 ? 'up' : trend < 0 ? 'down' : 'flat';
  const TrendIcon = trendDir === 'up' ? TrendingUp : trendDir === 'down' ? TrendingDown : Minus;
  const trendVariant = trendDir === 'up' ? 'green' : trendDir === 'down' ? 'red' : 'dim';

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
        {sparkline && (
          <div className={clsx(styles.sparkWrap, styles[accent])}>
            <Sparkline data={sparkline} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
        {trendDir !== null && (
          <Badge variant={trendVariant} className={styles.trendBadge}>
            <TrendIcon size={9} />
            {Math.abs(trend!).toFixed(1)}%
          </Badge>
        )}
      </div>
    </div>
  );
}
