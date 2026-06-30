import { useState, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Badge } from '../../atoms/Badge';
import styles from './TabGroup.module.css';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

interface TabGroupProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function TabGroup({ tabs, defaultTab, onChange, className }: TabGroupProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className={clsx(styles.group, className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={clsx(styles.tab, active === tab.id && styles.active)}
          onClick={() => handleClick(tab.id)}
        >
          {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
          <span className={styles.label}>{tab.label}</span>
          {tab.badge !== undefined && (
            <Badge variant={active === tab.id ? 'cyan' : 'dim'}>{tab.badge}</Badge>
          )}
        </button>
      ))}
    </div>
  );
}
