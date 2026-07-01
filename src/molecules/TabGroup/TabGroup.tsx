import { useState, type ReactNode } from 'react';
import { Badge } from '../../atoms/feedback/Badge';
import { TabButton, TabButtonIcon } from '../../atoms/feedback/TabButton';
import { Cluster } from '../../atoms/layout/Cluster';

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
    <Cluster gap={0} wrap="nowrap" className={className} style={{ borderBottom: '1px solid var(--border-dim)' }}>
      {tabs.map((tab) => (
        <TabButton key={tab.id} active={active === tab.id} onClick={() => handleClick(tab.id)}>
          {tab.icon && <TabButtonIcon>{tab.icon}</TabButtonIcon>}
          <span>{tab.label}</span>
          {tab.badge !== undefined && (
            <Badge variant={active === tab.id ? 'cyan' : 'dim'}>{tab.badge}</Badge>
          )}
        </TabButton>
      ))}
    </Cluster>
  );
}
