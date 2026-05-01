# JcurveIQ Agent Run Panel — Decisions

This document outlines the design decisions made for the 5 ambiguous requirements identified in the take-home assessment, aligned with the implemented premium research console.

## 1. Agent Thoughts Display
**Decision:** Task-level agent thoughts are moved to the right-hand `RunInspector` panel and collapsed by default, while the Coordinator's high-level orchestrating thoughts remain visible at the top of the timeline.
**Why:** The target persona is a non-technical financial analyst. Raw system prompts and step-by-step reasoning traces reduce the signal-to-noise ratio in the main execution timeline. By placing task thoughts in the inspector, analysts who *want* to audit the process can select a task and read the reasoning, while the default view remains clean and output-focused. The Coordinator summary is kept visible to immediately explain the *plan*.
**When to reconsider:** If user testing shows analysts distrust the final output because they can't immediately see the "why" for individual tasks, we could surface a one-line summary of the final thought directly on the timeline card.

## 2. Parallel Group Visual
**Decision:** Parallel groups are rendered as horizontal concurrency lanes within a distinct visual band, anchored by a group-level summary.
**Why:** Strict vertical lists imply sequential execution, which is misleading for a `parallel_group`. By placing sibling tasks in horizontal lanes that scroll on overflow, it visually communicates simultaneous execution and saves vertical space. The left-hand rail anchors them back to the main sequential flow of the run.
**When to reconsider:** If we frequently spawn an extremely large number of tasks where horizontal scrolling becomes tedious, a more compact data-grid or mini-table for the group might scale better.

## 3. Partial Outputs
**Decision:** Only the *latest* output is shown prominently in the inspector. Previous partial versions are tucked into a "Show earlier versions" collapsible history.
**Why:** Showing every partial string inline causes massive layout shift and scroll fatigue as text is appended. The current implementation lets analysts inspect the latest state without being overwhelmed by deprecated drafts. When `is_final: true` is emitted, the UI locks the output with a green "Final Output" badge and displays the quality score.
**When to reconsider:** If agents stream character-by-character (like a standard LLM delta stream) rather than chunk-by-chunk, this approach would cause too many React re-renders. We'd need to switch to a raw text-append implementation.

## 4. Cancelled Status (`sufficient_data`)
**Decision:** A cancelled task with the reason `sufficient_data` is styled positively with a neutral language: **"Skipped"**. The coordinator's `cancelMessage` is displayed inside an intentional info box.
**Why:** Analysts see red or "Cancelled" and assume failure. If the system was smart enough to stop a redundant task because it already had what it needed, that is a *feature*, not a bug. Styling it neutrally builds trust in the agent's autonomy.
**When to reconsider:** If `sufficient_data` is ever used as a fallback for actual fatal errors (e.g., "we crashed but we'll try to synthesize anyway"), this positive styling would be misleading.

## 5. Dependencies
**Decision:** Dependencies are displayed as small, unobtrusive "Waited for: [taskId]" chips inside the task card. For synthesis tasks (multiple dependencies), a visual reconnection line is drawn to the main timeline.
**Why:** The UI must faithfully represent the state machine without hallucinating causality. By explicitly tying the chips to the `depends_on` array, we show exact prerequisites. The visual reconnection for the synthesis task reinforces the concept of parallel streams coming back together to form the final answer.
**When to reconsider:** If the dependency graph gets deeper than one layer (e.g., A → B → C → D), simple text chips won't explain the critical path. We would need to introduce a visual node graph (like a DAG viewer) instead of a linear timeline.
