import { clsx } from 'clsx';
import { Box } from '../../layout/Box';
import { Cluster } from '../../layout/Cluster';
import { Stack } from '../../layout/Stack';
import styles from './LegendMeter.module.css';

interface LegendMeterProps {
  /** Swatch / accent color — drives the left border, dot glow, value color and fill bar. */
  color: string;
  name: string;
  /** 0-100 value driving both the displayed percentage and the fill bar width. */
  value: number;
  onMouseEnter?: () => void;
  className?: string;
}

/** A single legend row: colored dot, then a name/value line, then a proportional fill bar.
 * Used for chart legends that double as a mini bar-meter (e.g. pie/allocation breakdowns). */
export function LegendMeter({ color, name, value, onMouseEnter, className }: LegendMeterProps) {
  return (
    <Stack
      gap={3}
      paddingLeft={7}
      cursor="pointer"
      className={clsx(styles.item, className)}
      style={{ borderLeft: `2px solid ${color}` }}
      onMouseEnter={onMouseEnter}
    >
      <Box
        width={6}
        height={6}
        style={{ borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <Cluster gap={0} justify="between">
        <span className={styles.name}>{name}</span>
        <span className={styles.value} style={{ color }}>{value}%</span>
      </Cluster>
      <Box height={2} className={styles.track}>
        <Box height="100%" className={styles.fill} style={{ width: `${value}%`, background: color }} />
      </Box>
    </Stack>
  );
}
