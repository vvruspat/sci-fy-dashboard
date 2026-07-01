import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Sparkline } from '../../atoms/data-display/Sparkline';
import { Badge } from '../../atoms/feedback/Badge';
import {
  StatCardFrame,
  StatCardValue,
  StatCardSparkWrap,
  statCardTrendBadgeClassName,
  statCardIconClassName,
} from '../../atoms/surfaces/StatCardFrame';
import { Box } from '../../atoms/layout/Box';
import { Cluster } from '../../atoms/layout/Cluster';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon?: ReactNode;
  accent?: 'cyan' | 'purple' | 'amber' | 'green' | 'red';
  sublabel?: string;
  sparkline?: number[];
  className?: string;
}

export function StatCard({ label, value, unit, trend, icon, accent = 'cyan', sublabel, sparkline, className }: StatCardProps) {
  const trendDir = trend === undefined ? null : trend > 0 ? 'up' : trend < 0 ? 'down' : 'flat';
  const TrendIcon = trendDir === 'up' ? TrendingUp : trendDir === 'down' ? TrendingDown : Minus;
  const trendVariant = trendDir === 'up' ? 'green' : trendDir === 'down' ? 'red' : 'dim';

  return (
    <StatCardFrame accent={accent} className={className}>
      <Box padding={16}>
        <Cluster justify="between" marginBottom={10}>
          <Box
            as="span"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.13em',
            }}
          >
            {label}
          </Box>
          {icon && (
            <Box as="span" className={statCardIconClassName} style={{ color: 'var(--text-muted)' }}>
              {icon}
            </Box>
          )}
        </Cluster>
        <Cluster justify="between" align="end" gap={8} marginBottom={8}>
          <Cluster align="baseline" gap={4}>
            <StatCardValue accent={accent}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </StatCardValue>
            {unit && (
              <Box as="span" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginBottom: 2 }}>
                {unit}
              </Box>
            )}
          </Cluster>
          {sparkline && (
            <StatCardSparkWrap accent={accent}>
              <Sparkline data={sparkline} />
            </StatCardSparkWrap>
          )}
        </Cluster>
        <Cluster justify="between">
          {sublabel && (
            <Box as="span" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)' }}>
              {sublabel}
            </Box>
          )}
          {trendDir !== null && (
            <Badge variant={trendVariant} className={statCardTrendBadgeClassName}>
              <TrendIcon size={9} />
              {Math.abs(trend!).toFixed(1)}%
            </Badge>
          )}
        </Cluster>
      </Box>
    </StatCardFrame>
  );
}
