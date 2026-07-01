import { Box, type BoxProps } from '../Box';

export type GridProps = Omit<BoxProps, 'display'> & {
  /** Number of equal-width columns, or a raw grid-template-columns string. */
  columns?: number | string;
  /** Number of equal-height rows, or a raw grid-template-rows string. */
  rows?: number | string;
};

function toTemplate(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `repeat(${value}, 1fr)` : value;
}

/** CSS grid container driven entirely by props. */
export function Grid({ columns, rows, ...rest }: GridProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={toTemplate(columns)}
      gridTemplateRows={toTemplate(rows)}
      {...rest}
    />
  );
}
