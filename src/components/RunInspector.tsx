import { AlertTriangle, Info } from 'lucide-react';
import type { RunState } from '../state/types';
import { AgentThought } from './AgentThought';
import { ToolCallRow } from './ToolCallRow';
import { PartialOutput } from './PartialOutput';
import { FinalOutput } from './FinalOutput';

interface RunInspectorProps {
  state: RunState;
  selectedTaskId: string | null;
}

export function RunInspector({ state, selectedTaskId }: RunInspectorProps) {
  let taskToShow = null;
  let showFinalOutput = false;

  if (selectedTaskId) {
    taskToShow = state.tasks[selectedTaskId];
  } else if (state.status === 'complete' && state.finalOutput) {
    showFinalOutput = true;
  } else {
    // Show active task
    const reversedOrder = [...state.taskOrder].reverse();
    const activeTaskId = reversedOrder.find(id => state.tasks[id].status === 'running') || reversedOrder[0];
    if (activeTaskId) {
      taskToShow = state.tasks[activeTaskId];
    }
  }

  if (showFinalOutput) {
    return (
      <div className="h-full flex flex-col bg-[var(--color-surface-base)] overflow-y-auto">
        <div className="p-6">
          <FinalOutput state={state} />
        </div>
      </div>
    );
  }

  if (!taskToShow) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--color-surface-base)] text-[var(--color-text-muted)] text-sm font-medium">
        Select a task to inspect
      </div>
    );
  }

  const task = taskToShow;

  return (
    <div className="h-full flex flex-col bg-[var(--color-surface-base)] overflow-y-auto relative">
      <div className="p-6 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] sticky top-0 z-10 shadow-sm">
        <h2 className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">{task.label}</h2>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[11px] font-mono font-medium text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-2 py-1 rounded-md">
            {task.agent}
          </span>
          <span className="text-[11px] uppercase tracking-wider font-bold" style={{ color: task.status === 'failed' ? 'var(--color-status-failed)' : task.status === 'running' ? 'var(--color-status-running)' : 'var(--color-text-muted)' }}>
            {task.status === 'cancelled' && task.cancelReason === 'sufficient_data' ? 'Skipped' : task.status}
          </span>
          {task.retryCount > 0 && (
            <span className="text-[11px] text-[var(--color-status-complete)] font-bold tracking-wider uppercase">
              Recovered ({task.retryCount})
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Error / Cancel Message */}
        {task.error && (
          <div className="p-3 rounded-lg border bg-[var(--color-status-failed)]/5 border-[var(--color-status-failed)]/20">
            <span className="text-[10px] text-[var(--color-status-failed)] mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Error</span>
            <p className="text-[11px] font-medium text-[var(--color-status-failed)] leading-relaxed">
              {task.error}
            </p>
          </div>
        )}
        {task.cancelMessage && (
          <div className="p-3 rounded-lg border bg-[var(--color-status-cancelled)]/5 border-[var(--color-status-cancelled)]/20">
            <span className="text-[10px] text-[var(--color-status-cancelled)] mb-1.5 font-bold uppercase tracking-wider flex items-center gap-1"><Info className="w-3 h-3" /> Cancel Reason</span>
            <p className="text-[11px] font-medium text-[var(--color-status-cancelled)] leading-relaxed">
              {task.cancelMessage}
            </p>
          </div>
        )}

        {/* Agent thoughts */}
        {task.thoughts.length > 0 && (
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Agent Thoughts</h3>
            <AgentThought thoughts={task.thoughts} source={task.agent} defaultOpen={true} />
          </section>
        )}

        {/* Tool calls */}
        {task.toolCalls.length > 0 && (
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Tool Calls</h3>
            <ToolCallRow toolCalls={task.toolCalls} />
          </section>
        )}

        {/* Outputs */}
        {task.outputs.length > 0 && (
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Outputs</h3>
            <PartialOutput outputs={task.outputs} latestOutput={task.latestOutput} />
          </section>
        )}
      </div>
    </div>
  );
}
