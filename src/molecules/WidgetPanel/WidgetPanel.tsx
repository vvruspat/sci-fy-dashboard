import { type ReactNode } from 'react';
import { GlassPanel } from '../../atoms/surfaces/GlassPanel';
import { WidgetTitle } from '../../atoms/typography/WidgetTitle';
import { WidgetSubtitle } from '../../atoms/typography/WidgetSubtitle';
import { Stack } from '../../atoms/layout/Stack';
import { Cluster } from '../../atoms/layout/Cluster';
import { buildBoxStyle } from '../../atoms/layout/Box';

interface WidgetPanelProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Gap between the header and the body content. Defaults to 12px. */
  gap?: number;
  /** Top accent-line color, forwarded to GlassPanel. */
  shimmerColor?: string;
}

export function WidgetPanel({ title, subtitle, actions, children, className, gap = 12, shimmerColor }: WidgetPanelProps) {
  return (
    <GlassPanel
      className={className}
      shimmerColor={shimmerColor}
      style={buildBoxStyle({ display: 'flex', direction: 'column', gap, padding: 20, height: '100%' })}
    >
      <Cluster className="drag-handle" align="start" justify="between" gap={12}>
        <Stack gap={3}>
          <WidgetTitle>{title}</WidgetTitle>
          {subtitle && <WidgetSubtitle>{subtitle}</WidgetSubtitle>}
        </Stack>
        {actions && (
          <Cluster gap={8} flexShrink={0}>
            {actions}
          </Cluster>
        )}
      </Cluster>
      {children}
    </GlassPanel>
  );
}
