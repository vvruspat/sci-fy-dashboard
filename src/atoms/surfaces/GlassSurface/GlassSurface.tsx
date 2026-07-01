import { type ElementType } from 'react';
import { clsx } from 'clsx';
import { Box, type BoxProps } from '../../layout/Box';
import { Divider } from '../../layout/Divider';
import styles from './GlassSurface.module.css';

export type GlassSurfaceEdge = 'right' | 'bottom';

export interface GlassSurfaceProps extends BoxProps {
  as?: ElementType;
  /** Renders a decorative fading gradient line along one edge (e.g. sidebar's right edge, topbar's bottom edge). */
  edge?: GlassSurfaceEdge;
  edgeColor?: string;
  edgeColorEnd?: string;
  edgeColorStop?: number;
  edgeColorEndStop?: number;
  edgeOpacity?: number;
}

/**
 * Glass background (blur + saturate) with a hairline border, usable as a fixed/sticky
 * shell (sidebar, topbar) since it forwards all Box layout/position props.
 */
export function GlassSurface({
  as = 'div',
  edge,
  edgeColor = 'var(--teal-700)',
  edgeColorEnd,
  edgeColorStop,
  edgeColorEndStop,
  edgeOpacity = 0.4,
  className,
  children,
  ...rest
}: GlassSurfaceProps) {
  return (
    <Box as={as} className={clsx(styles.surface, className)} {...rest}>
      {children}
      {edge && (
        <Divider
          orientation={edge === 'right' ? 'vertical' : 'horizontal'}
          variant="fade"
          color={edgeColor}
          colorEnd={edgeColorEnd}
          colorStop={edgeColorStop}
          colorEndStop={edgeColorEndStop}
          opacity={edgeOpacity}
          className={clsx(styles.edge, styles[`edge_${edge}`])}
        />
      )}
    </Box>
  );
}
