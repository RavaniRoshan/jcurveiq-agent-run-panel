import { BrainCircuit, Loader2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { RunState } from '../state/types';
import { selectTaskNodes } from '../state/selectors';
import { RunHeader } from './RunHeader';
import { TaskCard } from './TaskCard';
import { AgentThought } from './AgentThought';
import { RunInspector } from './RunInspector';

interface RunPanelProps {
  state: RunState;
  activeFixture?: string;
  onSwitchFixture?: (key: 'success' | 'error') => void;
  onRestart?: () => void;
}

export function RunPanel({ state }: RunPanelProps) {
  const taskNodes = selectTaskNodes(state);
  const [now, setNow] = useState(Date.now);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Tick elapsed time every 100ms while running
  useEffect(() => {
    if (state.status !== 'running') return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [state.status]);

  return (
    <div className="flex h-full w-full bg-[var(--color-surface-base)]">
      {/* Center rail - timeline */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <RunHeader state={state} now={now} />

          {/* Idle state */}
          {state.status === 'idle' && (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--color-border-default)] flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-[var(--color-text-muted)] animate-spin" />
              </div>
              <p className="text-[var(--color-text-muted)] text-sm font-medium">
                Waiting for agent run to start…
              </p>
            </div>
          )}

          {/* Task trace */}
          {taskNodes.length > 0 && (
            <div className="space-y-4">
              {/* Coordinator thoughts — collapsible */}
              {state.coordinatorThoughts.length > 0 && (
                <div className="animate-fade-in rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-[var(--color-accent-primary)]" />
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                      Coordinator
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                      orchestrating research plan
                    </span>
                  </div>
                  <AgentThought
                    thoughts={state.coordinatorThoughts}
                    source="Coordinator"
                    defaultOpen={true}
                  />
                </div>
              )}

              {/* Task nodes */}
              {taskNodes.map((node) => {
                if (node.type === 'single') {
                  const isSynthesis = node.task.dependsOn.length > 1; // Simple heuristic for synthesis
                  return (
                    <div key={node.task.taskId} className="relative">
                      {/* Visual reconnection for synthesis */}
                      {isSynthesis && (
                        <div className="absolute -top-3 left-6 w-px h-3 bg-[var(--color-border-subtle)]" />
                      )}
                      {isSynthesis && (
                        <div className="absolute -top-3 left-6 w-8 h-px bg-[var(--color-border-subtle)]" />
                      )}
                      <TaskCard 
                        task={node.task} 
                        selected={selectedTaskId === node.task.taskId}
                        onClick={() => setSelectedTaskId(node.task.taskId)}
                      />
                    </div>
                  );
                }
                // Parallel group
                const completeCount = node.tasks.filter(t => t.status === 'complete').length;
                const skippedCount = node.tasks.filter(t => t.status === 'cancelled').length;
                const failedCount = node.tasks.filter(t => t.status === 'failed').length;
                
                return (
                  <div key={node.groupId} className="animate-fade-in my-6">
                    <div className="flex items-center gap-2 mb-3 ml-1">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-3 rounded-full bg-[var(--color-accent-primary)] opacity-80" />
                        <div className="w-1 h-3 rounded-full bg-[var(--color-accent-primary)] opacity-60" />
                        <div className="w-1 h-3 rounded-full bg-[var(--color-accent-primary)] opacity-40" />
                      </div>
                      <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Parallel Group: {node.groupId}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        · {node.tasks.length} tasks
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] ml-auto bg-[var(--color-surface-elevated)] px-2 py-1 rounded">
                        {completeCount} complete
                        {skippedCount > 0 && `, ${skippedCount} skipped`}
                        {failedCount > 0 && `, ${failedCount} failed`}
                      </span>
                    </div>
                    <div className="flex gap-3 pl-3 border-l-2 border-[var(--color-accent-primary)]/30 overflow-x-auto pb-2 custom-scrollbar">
                      {node.tasks.map((task) => (
                        <div key={task.taskId} className="w-72 flex-shrink-0">
                          <TaskCard 
                            task={task} 
                            compact 
                            selected={selectedTaskId === task.taskId}
                            onClick={() => setSelectedTaskId(task.taskId)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Run error banner */}
          {state.status === 'error' && state.errorMessage && (
            <div className="animate-fade-in rounded-xl border border-[var(--color-status-failed)]/30 bg-[var(--color-status-failed)]/5 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-6 h-6 rounded-full bg-[var(--color-status-failed)]/10 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-[var(--color-status-failed)]" />
                </div>
                <span className="text-sm font-semibold text-[var(--color-status-failed)]">
                  Run Failed
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-medium">
                {state.errorMessage}
              </p>
              <p className="text-[10px] font-medium text-[var(--color-text-muted)] mt-3 bg-[var(--color-surface-elevated)] inline-block px-2 py-1 rounded border border-[var(--color-border-subtle)]">
                Partial results from completed tasks may still be available above.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right rail - inspector */}
      <div className="w-1/3 min-w-[360px] max-w-[480px] flex-shrink-0 bg-[var(--color-surface-base)] border-l border-[var(--color-border-subtle)] z-20">
        <RunInspector state={state} selectedTaskId={selectedTaskId} />
      </div>
    </div>
  );
}
