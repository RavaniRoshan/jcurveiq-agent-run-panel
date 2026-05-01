// ─── Run Reducer ───
// Pure function: (RunState, AgentEvent) => RunState
// All complex state transitions are encapsulated here.

import type { AgentEvent } from '../mock/types';
import type { RunState, TaskState } from './types';

export const initialRunState: RunState = {
  runId: null,
  query: null,
  status: 'idle',
  startedAt: null,
  completedAt: null,
  durationMs: null,
  taskCount: null,
  tasks: {},
  taskOrder: [],
  coordinatorThoughts: [],
  finalOutput: null,
  errorMessage: null,
  lastEventTimestamp: null,
};

function createTask(
  taskId: string,
  label: string,
  agent: string,
  spawnedBy: string,
  parallelGroup: string | null,
  dependsOn: string[],
  timestamp: number
): TaskState {
  return {
    taskId,
    label,
    agent,
    spawnedBy,
    parallelGroup,
    dependsOn,
    status: 'pending',
    toolCalls: [],
    thoughts: [],
    outputs: [],
    latestOutput: null,
    error: null,
    cancelReason: null,
    cancelMessage: null,
    spawnedAt: timestamp,
    retryCount: 0,
  };
}

export function runReducer(state: RunState, event: AgentEvent): RunState {
  const base = { ...state, lastEventTimestamp: event.timestamp };

  switch (event.type) {
    case 'run_started':
      return {
        ...base,
        runId: event.run_id,
        query: event.query,
        status: 'running',
        startedAt: event.timestamp,
      };

    case 'agent_thought': {
      const thought = { thought: event.thought, timestamp: event.timestamp };

      // Coordinator-level or null task_id → run-level thought
      if (!event.task_id || event.task_id === 'coordinator') {
        return {
          ...base,
          coordinatorThoughts: [...state.coordinatorThoughts, thought],
        };
      }

      // Task-level thought
      const task = state.tasks[event.task_id];
      if (!task) return base;

      return {
        ...base,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            thoughts: [...task.thoughts, thought],
          },
        },
      };
    }

    case 'task_spawned': {
      const newTask = createTask(
        event.task_id,
        event.label,
        event.agent,
        event.spawned_by,
        event.parallel_group,
        event.depends_on,
        event.timestamp
      );
      return {
        ...base,
        tasks: { ...state.tasks, [event.task_id]: newTask },
        taskOrder: [...state.taskOrder, event.task_id],
      };
    }

    case 'tool_call': {
      const task = state.tasks[event.task_id];
      if (!task) return base;

      return {
        ...base,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            toolCalls: [
              ...task.toolCalls,
              {
                tool: event.tool,
                inputSummary: event.input_summary,
                outputSummary: null,
                timestamp: event.timestamp,
              },
            ],
          },
        },
      };
    }

    case 'tool_result': {
      const task = state.tasks[event.task_id];
      if (!task) return base;

      // Match the most recent tool call for this tool that has no result yet
      const updatedToolCalls = [...task.toolCalls];
      for (let i = updatedToolCalls.length - 1; i >= 0; i--) {
        if (updatedToolCalls[i].tool === event.tool && !updatedToolCalls[i].outputSummary) {
          updatedToolCalls[i] = {
            ...updatedToolCalls[i],
            outputSummary: event.output_summary,
          };
          break;
        }
      }

      return {
        ...base,
        tasks: {
          ...state.tasks,
          [event.task_id]: { ...task, toolCalls: updatedToolCalls },
        },
      };
    }

    case 'partial_output': {
      const task = state.tasks[event.task_id];
      if (!task) return base;

      const output = {
        content: event.content,
        isFinal: event.is_final,
        qualityScore: event.quality_score,
        timestamp: event.timestamp,
      };

      return {
        ...base,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            outputs: [...task.outputs, output],
            latestOutput: output,
          },
        },
      };
    }

    case 'task_update': {
      const task = state.tasks[event.task_id];
      if (!task) return base;

      // Track retries: if going from failed back to running
      const isRetry = task.status === 'failed' && event.status === 'running';

      return {
        ...base,
        tasks: {
          ...state.tasks,
          [event.task_id]: {
            ...task,
            status: event.status,
            error: event.status === 'failed' ? event.error : task.error,
            cancelReason: event.status === 'cancelled' ? event.reason : task.cancelReason,
            cancelMessage: event.status === 'cancelled' ? event.message : task.cancelMessage,
            retryCount: isRetry ? task.retryCount + 1 : task.retryCount,
          },
        },
      };
    }

    case 'run_complete':
      return {
        ...base,
        status: 'complete',
        completedAt: event.timestamp,
        durationMs: event.duration_ms,
        taskCount: event.task_count,
        finalOutput: {
          summary: event.output.summary,
          citations: event.output.citations.map((c) => ({
            refId: c.ref_id,
            title: c.title,
            source: c.source,
            page: c.page,
          })),
        },
      };

    case 'run_error':
      return {
        ...base,
        status: 'error',
        errorMessage: event.message,
        completedAt: event.timestamp,
      };

    default:
      return base;
  }
}
