import { Cluster } from '../../atoms/layout/Cluster';
import { Box } from '../../atoms/layout/Box';

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
    <Cluster gap={12} wrap="nowrap" className={className}>
      {items.map((item) => (
        <Cluster key={item.label} as="span" gap={4}>
          <span style={{ lineHeight: 1, color: item.color }}>■</span>
          <Box
            as="span"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}
          >
            {item.label}
          </Box>
        </Cluster>
      ))}
    </Cluster>
  );
}
