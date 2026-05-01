// ─── UI State Types ───
// Derived state consumed by React components.
// runReducer produces RunState; selectors derive TaskNode[] for rendering.

export type ToastType = 'success' | 'error' | 'info';

export type RunStatus = 'idle' | 'running' | 'complete' | 'error';
export type TaskStatus = 'pending' | 'running' | 'complete' | 'failed' | 'cancelled';

export interface ToolCall {
  tool: string;
  inputSummary: string;
  outputSummary: string | null;
  timestamp: number;
}

export interface AgentThought {
  thought: string;
  timestamp: number;
}

export interface TaskOutput {
  content: string;
  isFinal: boolean;
  qualityScore: number | null;
  timestamp: number;
}

export interface TaskState {
  taskId: string;
  label: string;
  agent: string;
  spawnedBy: string;
  parallelGroup: string | null;
  dependsOn: string[];
  status: TaskStatus;
  toolCalls: ToolCall[];
  thoughts: AgentThought[];
  outputs: TaskOutput[];
  latestOutput: TaskOutput | null;
  error: string | null;
  cancelReason: string | null;
  cancelMessage: string | null;
  spawnedAt: number;
  retryCount: number;
}

export interface RunState {
  runId: string | null;
  query: string | null;
  status: RunStatus;
  startedAt: number | null;
  completedAt: number | null;
  durationMs: number | null;
  taskCount: number | null;
  tasks: Record<string, TaskState>;
  taskOrder: string[]; // insertion order
  coordinatorThoughts: AgentThought[];
  finalOutput: {
    summary: string;
    citations: Array<{
      refId: string;
      title: string;
      source: string;
      page: number;
    }>;
  } | null;
  errorMessage: string | null;
  lastEventTimestamp: number | null;
}

// For rendering: either a single task or a parallel group of tasks
export type TaskNode =
  | { type: 'single'; task: TaskState }
  | { type: 'parallel_group'; groupId: string; tasks: TaskState[] };
