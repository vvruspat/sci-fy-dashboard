import { clsx } from 'clsx';
import styles from './ChartLegend.module.css';

export interface ChartLegendItem {
  color: string;
  label: string;
}

interface ChartLegendProps {
  items: ChartLegendItem[];
  className?: string;
}

export function ChartLegend({ items, className }: ChartLegendProps) {
  return (
    <div className={clsx(styles.legend, className)}>
      {items.map((item) => (
        <span key={item.label} className={styles.item}>
          <span className={styles.swatch} style={{ color: item.color }}>■</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}
