import { Sidebar } from './organisms/Sidebar';
import { TopBar } from './organisms/TopBar';
import { Dashboard } from './pages/Dashboard';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar />
        <main className={styles.content}>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
