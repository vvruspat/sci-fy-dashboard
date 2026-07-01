import { Box, type BoxProps } from '../Box';

export type StackProps = Omit<BoxProps, 'display' | 'direction'> & {
  reverse?: boolean;
};

/** Vertical flex stack with a gap between children. */
export function Stack({ reverse, ...rest }: StackProps) {
  return <Box display="flex" direction={reverse ? 'column-reverse' : 'column'} {...rest} />;
}
