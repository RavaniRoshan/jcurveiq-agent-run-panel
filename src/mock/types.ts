// ─── Event Schema Types (mirrors assignment PDF exactly) ───

export type AgentEvent =
  | RunStartedEvent
  | AgentThoughtEvent
  | TaskSpawnedEvent
  | ToolCallEvent
  | ToolResultEvent
  | PartialOutputEvent
  | TaskUpdateEvent
  | RunCompleteEvent
  | RunErrorEvent;

export interface RunStartedEvent {
  type: 'run_started';
  run_id: string;
  query: string;
  timestamp: number;
}

export interface AgentThoughtEvent {
  type: 'agent_thought';
  task_id: string | null; // "coordinator" or task ID or null
  thought: string;
  timestamp: number;
}

export interface TaskSpawnedEvent {
  type: 'task_spawned';
  task_id: string;
  label: string;
  agent: string;
  spawned_by: string; // "coordinator" or another task_id
  parallel_group: string | null;
  depends_on: string[];
  timestamp: number;
}

export interface ToolCallEvent {
  type: 'tool_call';
  task_id: string;
  tool: string;
  input_summary: string;
  timestamp: number;
}

export interface ToolResultEvent {
  type: 'tool_result';
  task_id: string;
  tool: string;
  output_summary: string;
  timestamp: number;
}

export interface PartialOutputEvent {
  type: 'partial_output';
  task_id: string;
  content: string;
  is_final: boolean;
  quality_score: number | null;
  timestamp: number;
}

export interface TaskUpdateEvent {
  type: 'task_update';
  task_id: string;
  status: 'running' | 'complete' | 'failed' | 'cancelled';
  error: string | null;
  reason: string | null;
  message: string | null;
  timestamp: number;
}

export interface RunCompleteEvent {
  type: 'run_complete';
  run_id: string;
  status: 'complete';
  duration_ms: number;
  task_count: number;
  output: {
    summary: string;
    citations: Array<{
      ref_id: string;
      title: string;
      source: string;
      page: number;
    }>;
  };
  timestamp: number;
}

export interface RunErrorEvent {
  type: 'run_error';
  run_id: string;
  message: string;
  timestamp: number;
}
