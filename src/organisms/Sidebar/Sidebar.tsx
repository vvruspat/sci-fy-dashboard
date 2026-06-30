import { useState } from 'react';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Server, Globe, Cpu, Database, Shield,
  Settings, Bell, ChevronDown, ChevronRight, Wifi, AlertCircle,
} from 'lucide-react';
import { Indicator } from '../../atoms/Indicator';
import { Badge } from '../../atoms/Badge';
import { Avatar } from '../../atoms/Avatar';
import styles from './Sidebar.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'cyan' | 'amber' | 'red';
  children?: { id: string; label: string; status?: 'online' | 'offline' | 'warning'; }[];
}

const NAV: NavItem[] = [
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
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
            <line x1="2" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1" />
            <line x1="19" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div>
          <div className={styles.logoName}>ORION</div>
          <div className={styles.logoSub}>DATACENTER OS</div>
        </div>
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        <Indicator status="online" label="All systems" size="sm" />
        <Badge variant="cyan">v4.2.1</Badge>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Main</span>
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
        </div>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Operations</span>
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
        </div>
      </nav>

      {/* Bottom */}
      <div className={styles.bottom}>
        <button className={styles.bottomBtn}>
          <Bell size={14} />
          <span>Alerts</span>
          <Badge variant="red">12</Badge>
        </button>
        <button className={styles.bottomBtn}>
          <Settings size={14} />
          <span>Settings</span>
        </button>
        <div className={styles.userCard}>
          <Avatar initials="BC" online size="md" />
          <div className={styles.userInfo}>
            <div className={styles.userName}>Bradley Cooper</div>
            <div className={styles.userRole}>SysAdmin · Earth</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface NavRowProps {
  item: NavItem;
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
      <button
        className={clsx(styles.navItem, isActive && styles.navActive)}
        onClick={() => {
          onSelect(item.id);
          if (item.children) onToggle(item.id);
        }}
      >
        <span className={styles.navIcon}>{item.icon}</span>
        <span className={styles.navLabel}>{item.label}</span>
        {item.badge !== undefined && (
          <Badge variant={item.badgeVariant ?? 'cyan'} className={styles.navBadge}>
            {item.badge}
          </Badge>
        )}
        {item.children && (
          <span className={styles.chevron}>
            {isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
          </span>
        )}
      </button>
      {item.children && isExpanded && (
        <div className={styles.subItems}>
          {item.children.map(child => (
            <button
              key={child.id}
              className={clsx(styles.subItem, active === child.id && styles.navActive)}
              onClick={() => onSelect(child.id)}
            >
              {child.status && <Indicator status={child.status} size="sm" label="" />}
              <span>{child.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
