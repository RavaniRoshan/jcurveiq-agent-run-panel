import { useState, useEffect } from 'react';
import { useRunStream, useRunEmitter } from './hooks/useRunStream';
import type { FixtureKey } from './hooks/useRunStream';
import { RunPanel } from './components/RunPanel';
import { DashboardLayout } from './components/DashboardLayout';
import { Overview } from './pages/Overview';
import { Runs } from './pages/Runs';
import { Datasets } from './pages/Datasets';
import { Settings } from './pages/Settings';
import { Radar } from './pages/Radar';
import { Landing } from './pages/Landing';

/**
 * Inner component that remounts (via key) when fixture or resetKey changes.
 * This gives us a fresh useReducer state on every switch/replay.
 */
function RunPanelContainer({
  fixtureKey,
  activeFixture,
  onSwitchFixture,
  onRestart,
}: {
  fixtureKey: FixtureKey;
  activeFixture: FixtureKey;
  onSwitchFixture: (key: FixtureKey) => void;
  onRestart: () => void;
}) {
  const state = useRunEmitter(fixtureKey);

  return (
    <RunPanel
      state={state}
      activeFixture={activeFixture}
      onSwitchFixture={onSwitchFixture}
      onRestart={onRestart}
    />
  );
}

function App() {
  // Global App Route State: '/' (landing) or '/dashboard/*'
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    // Basic hash router
    return window.location.hash === '#/dashboard' ? '/dashboard' : '/';
  });

  const { activeFixture, resetKey, switchFixture, restart } = useRunStream('success');
  const [activeDashboardPage, setActiveDashboardPage] = useState('run_detail');

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash.startsWith('#/dashboard')) {
        setCurrentRoute('/dashboard');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToDashboard = () => {
    window.location.hash = '#/dashboard';
  };

  const renderDashboardPage = () => {
    switch (activeDashboardPage) {
      case 'overview':
        return <Overview onNavigate={setActiveDashboardPage} onOpenRun={() => setActiveDashboardPage('run_detail')} />;
      case 'runs':
        return <Runs onNewRun={() => setActiveDashboardPage('run_detail')} onOpenRun={() => setActiveDashboardPage('run_detail')} />;
      case 'radar':
        return <Radar />;
      case 'run_detail':
        return (
          <RunPanelContainer
            key={`${activeFixture}-${resetKey}`}
            fixtureKey={activeFixture}
            activeFixture={activeFixture}
            onSwitchFixture={switchFixture}
            onRestart={restart}
          />
        );
      case 'datasets':
        return <Datasets />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview onNavigate={setActiveDashboardPage} onOpenRun={() => setActiveDashboardPage('run_detail')} />;
    }
  };

  const headerActions = activeDashboardPage === 'run_detail' ? (
    <div className="flex items-center gap-2">
      <div className="flex rounded-lg overflow-hidden border border-[var(--color-border-default)]">
        <button
          onClick={() => switchFixture('success')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            activeFixture === 'success'
              ? 'bg-[var(--color-accent-primary)] text-white'
              : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
          }`}
        >
          Success
        </button>
        <button
          onClick={() => switchFixture('error')}
          className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            activeFixture === 'error'
              ? 'bg-[var(--color-status-failed)] text-white'
              : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
          }`}
        >
          Error
        </button>
      </div>
      <button
        onClick={restart}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
      >
        ↻ Replay
      </button>
    </div>
  ) : null;

  if (currentRoute === '/') {
    return <Landing onEnterDashboard={navigateToDashboard} />;
  }

  return (
    <DashboardLayout activePage={activeDashboardPage} onNavigate={setActiveDashboardPage} headerActions={headerActions}>
      {renderDashboardPage()}
    </DashboardLayout>
  );
}

export default App;
