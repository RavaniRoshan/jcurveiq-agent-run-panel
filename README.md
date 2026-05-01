# JcurveIQ Agent Run Panel

A standalone React-based live monitoring console for multi-agent research runs, built for non-technical financial analysts.

## Setup & Running Locally

This project requires Node.js (v18+ recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Evaluator Path

To evaluate the core assignment deliverables:
1. Start the app. You will land directly on the **Run Details** view, which is the live execution console.
2. Observe the **Success Fixture** running from idle to complete, showcasing sequential tasks, parallel groups, recoveries, and final synthesis.
3. Click on individual tasks in the center timeline to open the right-hand **RunInspector** and view detailed agent thoughts, tool calls, and partial outputs.
4. Use the global top bar to switch to the **Error** fixture and observe an unrecoverable failure state.
5. Click **↻ Replay** in the top bar to restart the current fixture and watch the lifecycle unfold again.

## Architecture

The application is structured to decouple state management from UI rendering:

- **State Management**: `src/state/runReducer.ts` is the core state machine. It processes raw mock events (spawn, update, completion, tool calls) into a coherent, queryable `RunState`. It explicitly handles retry sequences without discarding task history.
- **Selectors**: `src/state/selectors.ts` derives view-ready data structures, such as grouping tasks into `TaskNode` objects for the timeline and calculating `selectRunMetrics` for the header.
- **Data Source**: `src/mock/emitter.ts` acts as the mock backend, replaying recorded events with accurate timing deltas.
- **Components**: 
  - `RunPanel` orchestrates the three-pane layout (left nav, center timeline, right inspector).
  - `TaskCard` renders compact, high-signal timeline rows.
  - `RunInspector` provides deep-dives into selected tasks and promotes the `FinalOutput` upon completion.

## Known Gaps / Future Work

- **Virtualization**: If agent traces grow extremely long, we may need to introduce virtualized lists (`react-window`) to prevent DOM bloat in the main timeline.
- **Schema Versioning**: A server-driven schema versioning approach would ensure the UI gracefully handles breaking changes to the event protocol over time.
- **Live WebSocket Support**: The `useRunStream` hook is currently hardcoded to our `MockRunEmitter`. For production, this hook would need to handle real WebSocket backpressure, connection drops, and reconnections.
- **Accessibility**: Keyboard navigation should be enhanced to easily move focus between the center timeline and the right-hand inspector panel.

---

> Please see `DECISIONS.md` for a detailed breakdown of the UX choices made to satisfy the ambiguous requirements of the take-home assessment.
