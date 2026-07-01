import { useState } from 'react';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Server, Globe, Cpu, Database, Shield,
  Settings, Bell, ChevronDown, ChevronRight, Wifi, AlertCircle,
} from 'lucide-react';
import { Box } from '../../atoms/layout/Box';
import { Cluster } from '../../atoms/layout/Cluster';
import { Indicator } from '../../atoms/feedback/Indicator';
import { Badge } from '../../atoms/feedback/Badge';
import { NavItem } from '../../atoms/feedback/NavItem';
import { Avatar } from '../../atoms/data-display/Avatar';
import { LogoMark } from '../../atoms/typography/LogoMark';
import { GlassSurface } from '../../atoms/surfaces/GlassSurface';

interface NavItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'cyan' | 'amber' | 'red';
  children?: { id: string; label: string; status?: 'online' | 'offline' | 'warning'; }[];
}

const NAV: NavItemData[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
  {
    id: 'servers', label: 'Servers', icon: <Server size={15} />, badge: 24,
    children: [
      { id: 'rack-a', label: 'Rack Alpha', status: 'online' },
      { id: 'rack-b', label: 'Rack Beta', status: 'online' },
      { id: 'rack-c', label: 'Rack Gamma', status: 'warning' },
    ]
  },
  { id: 'network', label: 'Network', icon: <Globe size={15} />, badge: 3, badgeVariant: 'amber' },
  { id: 'compute', label: 'Compute', icon: <Cpu size={15} /> },
  { id: 'storage', label: 'Storage', icon: <Database size={15} /> },
  { id: 'security', label: 'Security', icon: <Shield size={15} />, badge: 2, badgeVariant: 'red' },
  { id: 'monitoring', label: 'Monitoring', icon: <Wifi size={15} /> },
  { id: 'incidents', label: 'Incidents', icon: <AlertCircle size={15} />, badge: 5, badgeVariant: 'red' },
];

export function Sidebar() {
  const [active, setActive] = useState('dashboard');
  const [expanded, setExpanded] = useState<string[]>(['servers']);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <GlassSurface
      as="aside"
      edge="right"
      edgeColor="var(--teal-700)"
      edgeColorEnd="var(--teal-800)"
      edgeOpacity={0.4}
      display="flex"
      direction="column"
      width="var(--sidebar-width)"
      height="100vh"
      position="fixed"
      top={0}
      left={0}
      zIndex={100}
      overflow="hidden"
      style={{ borderRight: '1px solid var(--border-dim)' }}
    >
      {/* Logo */}
      <Cluster
        gap={10}
        paddingTop={16}
        paddingX={16}
        paddingBottom={12}
        flexShrink={0}
        style={{ borderBottom: '1px solid var(--border-dim)' }}
      >
        <LogoMark>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
            <line x1="2" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1" />
            <line x1="19" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" />
          </svg>
        </LogoMark>
        <Box>
          <Box
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 800,
              color: 'var(--teal-300)',
              letterSpacing: '0.22em',
              textShadow: '0 0 20px rgba(0,232,187,0.4)',
            }}
          >
            ORION
          </Box>
          <Box
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              color: 'var(--text-dim)',
              letterSpacing: '0.14em',
            }}
          >
            DATACENTER OS
          </Box>
        </Box>
      </Cluster>

      {/* Status bar */}
      <Cluster
        justify="between"
        paddingX={16}
        paddingY={7}
        flexShrink={0}
        style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--border-dim)' }}
      >
        <Indicator status="online" label="All systems" size="sm" />
        <Badge variant="cyan">v4.2.1</Badge>
      </Cluster>

      {/* Navigation */}
      <Box as="nav" flex={1} overflowY="auto" paddingY={6}>
        <Box paddingY={6}>
          <SectionLabel>Main</SectionLabel>
          {NAV.slice(0, 5).map(item => (
            <NavRow
              key={item.id}
              item={item}
              active={active}
              expanded={expanded}
              onSelect={setActive}
              onToggle={toggleExpand}
            />
          ))}
        </Box>
        <Box paddingY={6}>
          <SectionLabel>Operations</SectionLabel>
          {NAV.slice(5).map(item => (
            <NavRow
              key={item.id}
              item={item}
              active={active}
              expanded={expanded}
              onSelect={setActive}
              onToggle={toggleExpand}
            />
          ))}
        </Box>
      </Box>

      {/* Bottom */}
      <Box paddingY={6} flexShrink={0} style={{ borderTop: '1px solid var(--border-dim)' }}>
        <NavItem icon={<Bell size={14} />} onClick={() => {}}>
          Alerts
          <Badge variant="red">12</Badge>
        </NavItem>
        <NavItem icon={<Settings size={14} />} onClick={() => {}}>
          Settings
        </NavItem>
        <Cluster
          gap={10}
          paddingTop={10}
          paddingX={16}
          paddingBottom={6}
          marginTop={4}
          style={{ borderTop: '1px solid var(--border-dim)' }}
        >
          <Avatar initials="BC" online size="md" />
          <Box style={{ minWidth: 0 }}>
            <Box
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Bradley Cooper
            </Box>
            <Box style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-muted)' }}>
              SysAdmin · Earth
            </Box>
          </Box>
        </Cluster>
      </Box>
    </GlassSurface>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      display="block"
      paddingTop={4}
      paddingX={16}
      paddingBottom={4}
      marginBottom={1}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 8,
        color: 'var(--text-muted)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Box>
  );
}

interface NavRowProps {
  item: NavItemData;
  active: string;
  expanded: string[];
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

function NavRow({ item, active, expanded, onSelect, onToggle }: NavRowProps) {
  const isExpanded = expanded.includes(item.id);
  const isActive = active === item.id;

  return (
    <>
      <NavItem
        icon={item.icon}
        active={isActive}
        onClick={() => {
          onSelect(item.id);
          if (item.children) onToggle(item.id);
        }}
        trailing={
          <>
            {item.badge !== undefined && (
              <Badge variant={item.badgeVariant ?? 'cyan'} className={clsx('nav-badge')}>
                {item.badge}
              </Badge>
            )}
            {item.children && (
              <Box display="flex" align="center" style={{ color: 'var(--text-muted)' }}>
                {isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              </Box>
            )}
          </>
        }
      >
        {item.label}
      </NavItem>
      {item.children && isExpanded && (
        <Box
          paddingLeft={14}
          marginTop={1}
          marginBottom={2}
          marginLeft={28}
          style={{ borderLeft: '1px solid var(--border-dim)' }}
        >
          {item.children.map(child => (
            <NavItem
              key={child.id}
              variant="sub"
              active={active === child.id}
              onClick={() => onSelect(child.id)}
            >
              {child.status && <Indicator status={child.status} size="sm" label="" />}
              <span>{child.label}</span>
            </NavItem>
          ))}
        </Box>
      )}
    </>
  );
}
