import type { RunState } from '../state/types';
import { selectElapsedMs, formatElapsed, selectRunMetrics } from '../state/selectors';

interface RunHeaderProps {
  state: RunState;
  now: number;
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  idle: { label: 'Idle', color: 'var(--color-text-muted)', dot: 'var(--color-status-pending)' },
  running: { label: 'Running', color: 'var(--color-status-running)', dot: 'var(--color-status-running)' },
  complete: { label: 'Complete', color: 'var(--color-status-complete)', dot: 'var(--color-status-complete)' },
  error: { label: 'Error', color: 'var(--color-status-failed)', dot: 'var(--color-status-failed)' },
};

export function RunHeader({ state, now }: RunHeaderProps) {
  const config = statusConfig[state.status] || statusConfig.idle;
  const elapsed = selectElapsedMs(state, now);
  const metrics = selectRunMetrics(state);

  return (
    <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] p-5 animate-fade-in">
      {/* Status row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${state.status === 'running' ? 'animate-pulse-dot' : ''}`}
            style={{ backgroundColor: config.dot }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: config.color }}
          >
            {config.label}
          </span>
          <span className="text-[var(--color-border-subtle)] px-2">|</span>
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <span className="font-mono text-[var(--color-text-primary)]">{formatElapsed(elapsed)}</span>
            <span>{metrics.completeCount}/{metrics.totalTasks} complete</span>
            {metrics.runningCount > 0 && <span>{metrics.runningCount} active</span>}
            {metrics.recoveredCount > 0 && <span className="text-[var(--color-status-complete)]">{metrics.recoveredCount} recovered</span>}
            {metrics.skippedCount > 0 && <span>{metrics.skippedCount} skipped</span>}
            {metrics.citationCount > 0 && <span>{metrics.citationCount} citations</span>}
          </div>
        </div>

        {state.startedAt && (
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <span>{state.taskCount !== null ? `${state.taskCount} tasks` : ''}</span>
          </div>
        )}
      </div>

      {/* Query */}
      {state.query ? (
        <h1 className="text-lg font-semibold text-[var(--color-text-primary)] leading-snug">
          {state.query}
        </h1>
      ) : (
        <h1 className="text-lg font-semibold text-[var(--color-text-muted)] leading-snug">
          No active query
        </h1>
      )}

      {/* Run ID */}
      {state.runId && (
        <p className="text-xs text-[var(--color-text-muted)] mt-2 font-mono">
          {state.runId}
        </p>
      )}
    </div>
  );
}
