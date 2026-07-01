import { Box, type BoxProps } from '../Box';

export type ClusterProps = Omit<BoxProps, 'display' | 'direction'> & {
  reverse?: boolean;
};

/** Horizontal flex row that wraps, for grouping inline items with a gap. */
export function Cluster({ reverse, align = 'center', wrap = 'wrap', ...rest }: ClusterProps) {
  return <Box display="flex" direction={reverse ? 'row-reverse' : 'row'} align={align} wrap={wrap} {...rest} />;
}
