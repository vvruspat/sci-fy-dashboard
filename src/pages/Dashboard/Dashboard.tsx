import { useState, useCallback } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout/legacy';
import type { Layout, LayoutItem } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Grid = WidthProvider(GridLayout);
import { Server, Cpu, HardDrive, Wifi, Zap, Activity, RotateCcw } from 'lucide-react';
import { StatCard } from '../../molecules/StatCard';
import { LineChartWidget } from '../../organisms/LineChart';
import { BarChartWidget } from '../../organisms/BarChart';
import { PieChartWidget } from '../../organisms/PieChart';
import { ServerRack } from '../../organisms/ServerRack';
import { AlertsPanel } from '../../organisms/AlertsPanel';
import { NetworkMap } from '../../organisms/NetworkMap';
import styles from './Dashboard.module.css';

const STORAGE_KEY = 'orion-dashboard-layout-v1';

const DEFAULT_LAYOUT: LayoutItem[] = [
  { i: 'stat-0',      x: 0,  y: 0,  w: 2, h: 3,  minW: 2, minH: 2  },
  { i: 'stat-1',      x: 2,  y: 0,  w: 2, h: 3,  minW: 2, minH: 2  },
  { i: 'stat-2',      x: 4,  y: 0,  w: 2, h: 3,  minW: 2, minH: 2  },
  { i: 'stat-3',      x: 6,  y: 0,  w: 2, h: 3,  minW: 2, minH: 2  },
  { i: 'stat-4',      x: 8,  y: 0,  w: 2, h: 3,  minW: 2, minH: 2  },
  { i: 'stat-5',      x: 10, y: 0,  w: 2, h: 3,  minW: 2, minH: 2  },
  { i: 'lineChart',   x: 0,  y: 3,  w: 7, h: 8,  minW: 3, minH: 5  },
  { i: 'barChart',    x: 0,  y: 11, w: 7, h: 7,  minW: 3, minH: 5  },
  { i: 'serverRack',  x: 7,  y: 3,  w: 3, h: 9,  minW: 2, minH: 6  },
  { i: 'networkMap',  x: 7,  y: 12, w: 3, h: 6,  minW: 2, minH: 4  },
  { i: 'pieChart',    x: 10, y: 3,  w: 2, h: 7,  minW: 2, minH: 5  },
  { i: 'alertsPanel', x: 10, y: 10, w: 2, h: 8,  minW: 2, minH: 4  },
];

function getSavedLayout(): LayoutItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_LAYOUT;
    const parsed = JSON.parse(saved) as LayoutItem[];
    // merge with defaults to pick up any new widgets
    const ids = new Set(parsed.map(l => l.i));
    const missing = DEFAULT_LAYOUT.filter(l => !ids.has(l.i));
    return [...parsed, ...missing];
  } catch {
    return DEFAULT_LAYOUT;
  }
}

const SPARK_NET  = [30, 45, 38, 62, 55, 70, 65, 80, 72, 68, 74, 78];
const SPARK_CPU  = [55, 60, 58, 72, 68, 75, 70, 82, 78, 85, 80, 87];
const SPARK_STOR = [40, 41, 42, 41, 43, 44, 43, 45, 44, 46, 45, 47];
const SPARK_PW   = [82, 84, 83, 85, 86, 84, 87, 85, 88, 86, 89, 87];

export function Dashboard() {
  const [layout, setLayout] = useState<LayoutItem[]>(getSavedLayout);

  const handleLayoutChange = useCallback((newLayout: Layout) => {
    setLayout([...newLayout]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
  }, []);

  const resetLayout = useCallback(() => {
    setLayout(DEFAULT_LAYOUT);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <div className={styles.dashboard}>
      <button className={styles.resetBtn} onClick={resetLayout} title="Reset layout">
        <RotateCcw size={12} />
        Reset layout
      </button>

      <Grid
        layout={layout}
        cols={12}
        rowHeight={60}
        margin={[12, 12]}
        containerPadding={[12, 8]}
        draggableHandle=".drag-handle"
        resizeHandles={['se']}
        onLayoutChange={handleLayoutChange}
        className={styles.grid}
      >
        {/* ── Stat cards — full card is drag handle since no interactive children ── */}
        <div key="stat-0" className={styles.gridItem}>
          <StatCard label="Nodes Online" value={247} unit="/ 256" trend={1.2}
            icon={<Server size={14} />} accent="cyan" sublabel="96.5% capacity"
            sparkline={[230,238,242,240,245,243,247,245,248,246,247,247]}
            className="drag-handle" />
        </div>
        <div key="stat-1" className={styles.gridItem}>
          <StatCard label="CPU Aggregate" value="68.4" unit="%" trend={-3.1}
            icon={<Cpu size={14} />} accent="purple" sublabel="Avg across all cores"
            sparkline={SPARK_CPU} className="drag-handle" />
        </div>
        <div key="stat-2" className={styles.gridItem}>
          <StatCard label="Network I/O" value="9.3" unit="Gbps" trend={12.4}
            icon={<Wifi size={14} />} accent="cyan" sublabel="Peak: 12.1 Gbps"
            sparkline={SPARK_NET} className="drag-handle" />
        </div>
        <div key="stat-3" className={styles.gridItem}>
          <StatCard label="Storage Used" value="47.2" unit="TB" trend={0.8}
            icon={<HardDrive size={14} />} accent="amber" sublabel="of 128 TB allocated"
            sparkline={SPARK_STOR} className="drag-handle" />
        </div>
        <div key="stat-4" className={styles.gridItem}>
          <StatCard label="Power Draw" value="86.4" unit="kW" trend={-1.3}
            icon={<Zap size={14} />} accent="red" sublabel="PUE: 1.42"
            sparkline={SPARK_PW} className="drag-handle" />
        </div>
        <div key="stat-5" className={styles.gridItem}>
          <StatCard label="Active Jobs" value={1843} trend={5.7}
            icon={<Activity size={14} />} accent="green" sublabel="Batch + realtime"
            sparkline={[1200,1400,1550,1620,1700,1750,1780,1800,1820,1840,1843,1843]}
            className="drag-handle" />
        </div>

        {/* ── Charts ── */}
        <div key="lineChart"   className={styles.gridItem}><LineChartWidget title="Network Traffic" /></div>
        <div key="barChart"    className={styles.gridItem}><BarChartWidget title="Rack Load Distribution" /></div>
        <div key="serverRack"  className={styles.gridItem}><ServerRack rackId="RACK-A" title="Server Rack — Alpha" /></div>
        <div key="networkMap"  className={styles.gridItem}><NetworkMap /></div>
        <div key="pieChart"    className={styles.gridItem}><PieChartWidget title="Resource Allocation" /></div>
        <div key="alertsPanel" className={styles.gridItem}><AlertsPanel /></div>
      </Grid>
    </div>
  );
}
