import { Box, type BoxProps } from '../Box';

export type CenterProps = Omit<BoxProps, 'display' | 'align' | 'justify'>;

/** Centers its children both horizontally and vertically. */
export function Center(props: CenterProps) {
  return <Box display="flex" align="center" justify="center" {...props} />;
}
