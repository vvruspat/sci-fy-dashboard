import { useState } from 'react';
import { Search, Bell, RefreshCw, Clock, Wifi } from 'lucide-react';
import { Input } from '../../atoms/Input';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import styles from './TopBar.module.css';

export function TopBar() {
  const [time] = useState(() => new Date().toLocaleTimeString('en', { hour12: false }));

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.breadcrumb}>
          <span className={styles.bcRoot}>HOME</span>
          <span className={styles.bcSep}>/</span>
          <span className={styles.bcCurrent}>DASHBOARD</span>
        </div>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>DASHBOARD</h1>
          <Badge variant="green" dot>Live</Badge>
        </div>
      </div>

      <div className={styles.center}>
        <Input
          icon={<Search size={14} />}
          placeholder="Search nodes, services..."
          style={{ width: 280 }}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.stat}>
          <Wifi size={12} />
          <span className={styles.statVal}>98.7%</span>
          <span className={styles.statLabel}>Uptime</span>
        </div>
        <div className={styles.stat}>
          <Clock size={12} />
          <span className={styles.statVal}>{time}</span>
          <span className={styles.statLabel}>UTC+0</span>
        </div>
        <Button variant="ghost" size="sm" icon={<RefreshCw size={12} />} />
        <div className={styles.notifBtn}>
          <Button variant="ghost" size="sm" icon={<Bell size={12} />} />
          <span className={styles.notifDot} />
        </div>
      </div>
    </header>
  );
}
