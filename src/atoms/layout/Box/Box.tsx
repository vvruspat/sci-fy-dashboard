import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { clsx } from 'clsx';
import { toCssLength, type SpaceValue } from './space';

export type BoxDisplay =
  | 'flex' | 'inline-flex'
  | 'grid' | 'inline-grid'
  | 'block' | 'inline-block' | 'inline'
  | 'contents' | 'none';
export type BoxDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type BoxAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type BoxJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type BoxWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type BoxPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type BoxOverflow = 'visible' | 'hidden' | 'auto' | 'clip' | 'scroll';

const JUSTIFY_MAP: Record<BoxJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const ALIGN_MAP: Record<BoxAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

export interface BoxOwnProps {
  display?: BoxDisplay;
  direction?: BoxDirection;
  align?: BoxAlign;
  justify?: BoxJustify;
  wrap?: BoxWrap;
  gap?: SpaceValue;
  rowGap?: SpaceValue;
  columnGap?: SpaceValue;

  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;

  padding?: SpaceValue;
  paddingX?: SpaceValue;
  paddingY?: SpaceValue;
  paddingTop?: SpaceValue;
  paddingRight?: SpaceValue;
  paddingBottom?: SpaceValue;
  paddingLeft?: SpaceValue;

  margin?: SpaceValue;
  marginX?: SpaceValue;
  marginY?: SpaceValue;
  marginTop?: SpaceValue;
  marginRight?: SpaceValue;
  marginBottom?: SpaceValue;
  marginLeft?: SpaceValue;

  position?: BoxPosition;
  inset?: SpaceValue;
  top?: SpaceValue;
  right?: SpaceValue;
  bottom?: SpaceValue;
  left?: SpaceValue;
  zIndex?: number;

  width?: SpaceValue;
  height?: SpaceValue;
  minWidth?: SpaceValue;
  minHeight?: SpaceValue;
  maxWidth?: SpaceValue;
  maxHeight?: SpaceValue;

  flex?: string | number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: SpaceValue;
  grow?: boolean;

  overflow?: BoxOverflow;
  overflowX?: BoxOverflow;
  overflowY?: BoxOverflow;

  cursor?: CSSProperties['cursor'];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type BoxProps = BoxOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof BoxOwnProps> & {
    as?: ElementType;
  };

function resolveSides(all?: SpaceValue, axisX?: SpaceValue, axisY?: SpaceValue, top?: SpaceValue, right?: SpaceValue, bottom?: SpaceValue, left?: SpaceValue) {
  return {
    Top: toCssLength(top ?? axisY ?? all),
    Right: toCssLength(right ?? axisX ?? all),
    Bottom: toCssLength(bottom ?? axisY ?? all),
    Left: toCssLength(left ?? axisX ?? all),
  };
}

export function buildBoxStyle(props: BoxOwnProps): CSSProperties {
  const {
    display, direction, align, justify, wrap, gap, rowGap, columnGap,
    gridTemplateColumns, gridTemplateRows, gridColumn, gridRow,
    padding, paddingX, paddingY, paddingTop, paddingRight, paddingBottom, paddingLeft,
    margin, marginX, marginY, marginTop, marginRight, marginBottom, marginLeft,
    position, inset, top, right, bottom, left, zIndex,
    width, height, minWidth, minHeight, maxWidth, maxHeight,
    flex, flexGrow, flexShrink, flexBasis, grow,
    overflow, overflowX, overflowY, cursor,
  } = props;

  const pad = resolveSides(padding, paddingX, paddingY, paddingTop, paddingRight, paddingBottom, paddingLeft);
  const mar = resolveSides(margin, marginX, marginY, marginTop, marginRight, marginBottom, marginLeft);
  const insetSides = resolveSides(inset, inset, inset, top, right, bottom, left);

  const isFlexish = display === 'flex' || display === 'inline-flex';
  const isGridish = display === 'grid' || display === 'inline-grid';

  const style: CSSProperties = {
    display,
    flexDirection: isFlexish ? direction : undefined,
    alignItems: align ? ALIGN_MAP[align] : undefined,
    justifyContent: justify ? JUSTIFY_MAP[justify] : undefined,
    flexWrap: isFlexish ? wrap : undefined,
    gap: toCssLength(gap),
    rowGap: toCssLength(rowGap),
    columnGap: toCssLength(columnGap),

    gridTemplateColumns: isGridish ? gridTemplateColumns : undefined,
    gridTemplateRows: isGridish ? gridTemplateRows : undefined,
    gridColumn,
    gridRow,

    paddingTop: pad.Top,
    paddingRight: pad.Right,
    paddingBottom: pad.Bottom,
    paddingLeft: pad.Left,

    marginTop: mar.Top,
    marginRight: mar.Right,
    marginBottom: mar.Bottom,
    marginLeft: mar.Left,

    position,
    top: insetSides.Top,
    right: insetSides.Right,
    bottom: insetSides.Bottom,
    left: insetSides.Left,
    zIndex,

    width: toCssLength(width),
    height: toCssLength(height),
    minWidth: toCssLength(minWidth),
    minHeight: toCssLength(minHeight),
    maxWidth: toCssLength(maxWidth),
    maxHeight: toCssLength(maxHeight),

    flex: grow ? '1 1 0%' : flex,
    flexGrow,
    flexShrink,
    flexBasis: toCssLength(flexBasis),

    overflow,
    overflowX,
    overflowY,
    cursor,
  };

  return style;
}

const BOX_OWN_PROP_KEYS = new Set<string>([
  'display', 'direction', 'align', 'justify', 'wrap', 'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow',
  'padding', 'paddingX', 'paddingY', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'margin', 'marginX', 'marginY', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'position', 'inset', 'top', 'right', 'bottom', 'left', 'zIndex',
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'grow',
  'overflow', 'overflowX', 'overflowY', 'cursor',
]);

/**
 * Universal layout primitive. Every spacing/flex/grid/position value is a prop,
 * not a CSS rule — molecules and organisms compose layout from this instead of
 * writing their own CSS modules.
 */
export function Box({
  as, className, style, children, ...rest
}: BoxProps) {
  const Tag = (as ?? 'div') as ElementType;
  const boxProps: Record<string, unknown> = {};
  const boxStyleProps: BoxOwnProps = {};

  for (const [key, value] of Object.entries(rest)) {
    if (BOX_OWN_PROP_KEYS.has(key)) {
      (boxStyleProps as Record<string, unknown>)[key] = value;
    } else {
      boxProps[key] = value;
    }
  }

  const computedStyle = { ...buildBoxStyle(boxStyleProps), ...style };

  return (
    <Tag className={clsx(className)} style={computedStyle} {...boxProps}>
      {children}
    </Tag>
  );
}
