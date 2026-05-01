import type { RunState } from '../state/types';
import { selectRunMetrics } from '../state/selectors';

interface FinalOutputProps {
  state: RunState;
}

export function FinalOutput({ state }: FinalOutputProps) {
  if (!state.finalOutput) return null;
  const metrics = selectRunMetrics(state);

  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Output card */}
      <div className="rounded-xl border border-[var(--color-status-complete)]/20 bg-gradient-to-b from-[var(--color-status-complete)]/5 to-[var(--color-surface-card)] p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border-subtle)] pb-4">
          <div className="w-6 h-6 rounded-full bg-[var(--color-status-complete)]/20 flex items-center justify-center shrink-0">
            <span className="text-[var(--color-status-complete)] text-xs">✓</span>
          </div>
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Synthesized Analysis
          </h2>
          {state.durationMs && (
            <span className="text-[10px] text-[var(--color-text-muted)] font-mono ml-auto shrink-0 bg-[var(--color-surface-base)] px-2 py-1 rounded">
              {(state.durationMs / 1000).toFixed(1)}s total
            </span>
          )}
        </div>

        {/* Summary text */}
        <p className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">
          {state.finalOutput.summary}
        </p>

        {/* Trust Signals Footer */}
        <div className="mt-6 pt-4 flex flex-wrap items-center gap-3 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] px-2 py-1 rounded shadow-sm">
            <span className="text-[var(--color-accent-primary)]">📚</span>
            {state.finalOutput.citations.length} sources used
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] px-2 py-1 rounded shadow-sm">
            <span className="text-[var(--color-status-complete)]">✓</span>
            {metrics.recoveredCount} recovered {metrics.recoveredCount === 1 ? 'issue' : 'issues'}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] px-2 py-1 rounded shadow-sm">
            <span className="text-[var(--color-status-cancelled)]">ℹ</span>
            {metrics.skippedCount} intentionally skipped
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] px-2 py-1 rounded shadow-sm">
            <span className="text-[var(--color-text-muted)]">⚡</span>
            {metrics.totalTasks} tasks processed
          </div>
        </div>

        {/* Citations */}
        {state.finalOutput.citations.length > 0 && (
          <div className="mt-4 pt-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 block">
              Sources
            </span>
            <div className="flex flex-wrap gap-2">
              {state.finalOutput.citations.map((c) => (
                <span
                  key={c.refId}
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-text-secondary)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-2 py-1 rounded hover:border-[var(--color-border-default)] transition-colors cursor-pointer"
                >
                  <span className="text-[var(--color-accent-primary)]">[{c.refId}]</span>
                  {c.title}
                  <span className="text-[var(--color-text-muted)]">· {c.source} p.{c.page}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
