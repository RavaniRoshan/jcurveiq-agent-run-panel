// ─── Selectors ───
// Derive rendering-ready structures from flat RunState.

import type { RunState, TaskNode } from './types';

/**
 * Groups tasks into TaskNodes for rendering.
 * Sequential tasks become { type: 'single' }.
 * Tasks sharing a parallel_group are merged into { type: 'parallel_group' }.
 * Insertion order is preserved; the group appears at the position of its first member.
 */
export function selectTaskNodes(state: RunState): TaskNode[] {
  const nodes: TaskNode[] = [];
  const seenGroups = new Set<string>();

  for (const taskId of state.taskOrder) {
    const task = state.tasks[taskId];
    if (!task) continue;

    if (task.parallelGroup) {
      if (seenGroups.has(task.parallelGroup)) continue;
      seenGroups.add(task.parallelGroup);

      // Collect all tasks in this group
      const groupTasks = state.taskOrder
        .map((id) => state.tasks[id])
        .filter((t) => t && t.parallelGroup === task.parallelGroup) as typeof task[];

      nodes.push({
        type: 'parallel_group',
        groupId: task.parallelGroup,
        tasks: groupTasks,
      });
    } else {
      nodes.push({ type: 'single', task });
    }
  }

  return nodes;
}

/**
 * Calculate elapsed time in ms from run start to now or completion.
 */
export function selectElapsedMs(state: RunState, now: number): number {
  if (!state.startedAt) return 0;
  if (state.completedAt) return state.completedAt - state.startedAt;
  return now - state.startedAt;
}

/**
 * Format milliseconds as "Xs" or "X.Xs" for display.
 */
export function formatElapsed(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 10) return `${seconds.toFixed(1)}s`;
  return `${Math.round(seconds)}s`;
}

export interface RunMetrics {
  totalTasks: number;
  completeCount: number;
  runningCount: number;
  failedCount: number;
  skippedCount: number;
  recoveredCount: number;
  toolCallCount: number;
  citationCount: number;
}

/**
 * Calculates various run metrics for display in the header.
 */
export function selectRunMetrics(state: RunState): RunMetrics {
  const metrics: RunMetrics = {
    totalTasks: state.taskOrder.length,
    completeCount: 0,
    runningCount: 0,
    failedCount: 0,
    skippedCount: 0,
    recoveredCount: 0,
    toolCallCount: 0,
    citationCount: state.finalOutput?.citations.length || 0,
  };

  for (const taskId of state.taskOrder) {
    const task = state.tasks[taskId];
    if (!task) continue;

    metrics.toolCallCount += task.toolCalls.length;

    switch (task.status) {
      case 'complete':
        metrics.completeCount++;
        break;
      case 'running':
        metrics.runningCount++;
        break;
      case 'failed':
        metrics.failedCount++;
        break;
      case 'cancelled':
        if (task.cancelReason === 'sufficient_data') {
          metrics.skippedCount++;
        }
        break;
    }

    if (task.retryCount > 0 && (task.status === 'running' || task.status === 'complete' || task.status === 'cancelled')) {
      metrics.recoveredCount++;
    }
  }

  return metrics;
}

