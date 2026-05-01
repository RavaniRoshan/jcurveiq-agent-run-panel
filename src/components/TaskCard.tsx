import { AlertTriangle, CheckCircle2, Info, Loader2, RefreshCcw, XCircle, Zap } from 'lucide-react';
import type { TaskState } from '../state/types';
import { AgentThought } from './AgentThought';
import { ToolCallRow } from './ToolCallRow';
import { PartialOutput } from './PartialOutput';

interface TaskCardProps {
  task: TaskState;
  compact?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  pending: {
    bg: 'var(--color-status-pending)',
    text: 'var(--color-text-muted)',
    label: 'Pending',
  },
  running: {
    bg: 'var(--color-status-running)',
    text: 'var(--color-status-running)',
    label: 'Running',
  },
  complete: {
    bg: 'var(--color-status-complete)',
    text: 'var(--color-status-complete)',
    label: 'Complete',
  },
  failed: {
    bg: 'var(--color-status-failed)',
    text: 'var(--color-status-failed)',
    label: 'Failed',
  },
  cancelled: {
    bg: 'var(--color-status-cancelled)',
    text: 'var(--color-status-cancelled)',
    label: 'Skipped',
  },
};

export function TaskCard({ task, compact = true, selected = false, onClick }: TaskCardProps) {
  const style = statusStyles[task.status] || statusStyles.pending;

  // Determine border style based on status
  const borderColor =
    task.status === 'running'
      ? 'border-[var(--color-status-running)]/30 border-l-[var(--color-status-running)] border-l-2'
      : task.status === 'failed'
        ? 'border-[var(--color-status-failed)]/30 border-l-[var(--color-status-failed)] border-l-2'
        : task.status === 'cancelled'
          ? 'border-[var(--color-status-cancelled)]/20 border-l-[var(--color-status-cancelled)] border-l-2'
          : 'border-[var(--color-border-default)] border-l-transparent border-l-2';

  const selectedRing = selected ? 'ring-1 ring-[var(--color-accent-primary)] ring-offset-1 ring-offset-[var(--color-surface-base)]' : 'hover:border-[var(--color-border-strong)]';

  return (
    <div
      onClick={onClick}
      className={`animate-fade-in rounded-xl border bg-[var(--color-surface-card)] transition-all duration-300 shadow-sm ${borderColor} ${selectedRing} ${
        compact ? 'p-3' : 'p-4'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-[var(--color-text-primary)] leading-snug ${
              compact ? 'text-xs truncate' : 'text-sm'
            }`}
          >
            {task.label}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-medium text-[var(--color-text-muted)] font-mono bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-1.5 py-0.5 rounded-md">
              {task.agent}
            </span>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          {task.status === 'running' && <Loader2 className="w-3 h-3 text-[var(--color-status-running)] animate-spin" />}
          {task.status === 'complete' && <CheckCircle2 className="w-3 h-3 text-[var(--color-status-complete)]" />}
          {task.status === 'failed' && <XCircle className="w-3 h-3 text-[var(--color-status-failed)]" />}
          {task.status === 'cancelled' && <Info className="w-3 h-3 text-[var(--color-status-cancelled)]" />}
          {task.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-pending)]" />}
          
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: style.text }}>
            {task.status === 'cancelled' && task.cancelReason === 'sufficient_data'
              ? 'Skipped'
              : style.label}
          </span>
        </div>
      </div>

      {/* Cancel message — styled as intentional, not failure */}
      {task.status === 'cancelled' && task.cancelMessage && !compact && (
        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-[var(--color-status-cancelled)]/5 border border-[var(--color-status-cancelled)]/20">
          <Info className="w-4 h-4 text-[var(--color-status-cancelled)] shrink-0" />
          <p className="text-[11px] text-[var(--color-status-cancelled)] leading-relaxed font-medium">
            {task.cancelMessage}
          </p>
        </div>
      )}

      {/* Retry and Error history */}
      {task.error && !compact && (
        <div className={`mt-3 flex items-start gap-2 p-2.5 rounded-lg border ${
          task.status === 'failed' 
            ? 'bg-[var(--color-status-failed)]/5 border-[var(--color-status-failed)]/20'
            : 'bg-[var(--color-surface-elevated)] border-[var(--color-border-subtle)]'
        }`}>
          {task.status === 'failed' ? (
             <XCircle className="w-4 h-4 text-[var(--color-status-failed)] shrink-0" />
          ) : (
             <AlertTriangle className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className={`text-[11px] leading-relaxed font-medium ${
              task.status === 'failed' ? 'text-[var(--color-status-failed)]' : 'text-[var(--color-text-muted)] line-through'
            }`}>
              {task.error}
            </p>
          </div>
        </div>
      )}
      
      {/* Recovery indication for compact view */}
      {task.retryCount > 0 && compact && (
        <div className="mt-2 flex items-center gap-1">
          {task.status !== 'failed' ? (
            <span className="text-[9px] text-[var(--color-status-complete)] font-bold tracking-wider uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Recovered ({task.retryCount})
            </span>
          ) : (
            <span className="text-[9px] text-[var(--color-status-failed)] font-bold tracking-wider uppercase flex items-center gap-1">
              <RefreshCcw className="w-3 h-3" /> Retries failed
            </span>
          )}
        </div>
      )}

      {/* Dependencies */}
      {task.dependsOn.length > 0 && !compact && (
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Waited for:</span>
          {task.dependsOn.map((dep) => (
            <span
              key={dep}
              className="text-[10px] font-mono font-medium text-[var(--color-accent-secondary)] bg-[var(--color-accent-glow)] px-1.5 py-0.5 rounded-md border border-[var(--color-accent-primary)]/20"
            >
              {dep}
            </span>
          ))}
        </div>
      )}

      {/* ─── Expanded sections (non-compact only) ─── */}
      {!compact && (
        <>
          {/* Agent thoughts */}
          <AgentThought thoughts={task.thoughts} source={task.agent} />

          {/* Tool calls */}
          <ToolCallRow toolCalls={task.toolCalls} />

          {/* Outputs */}
          <PartialOutput outputs={task.outputs} latestOutput={task.latestOutput} />
        </>
      )}

      {/* ─── Compact preview ─── */}
      {compact && (
        <>
          {/* Compact tool count */}
          {task.toolCalls.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[var(--color-accent-primary)]" />
              <span className="text-[10px] font-medium text-[var(--color-text-muted)]">
                {task.toolCalls.length} tool {task.toolCalls.length === 1 ? 'call' : 'calls'}
              </span>
            </div>
          )}

          {/* Compact output preview */}
          {task.latestOutput && (
            <p className="text-[10px] text-[var(--color-text-muted)] mt-2 line-clamp-2 leading-relaxed">
              {task.latestOutput.content}
            </p>
          )}
        </>
      )}
    </div>
  );
}
