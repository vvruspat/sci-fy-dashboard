export type SpaceValue = number | string;

export function toCssLength(value?: SpaceValue): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}
