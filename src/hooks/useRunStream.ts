// ─── useRunStream Hook ───
// Connects MockRunEmitter to React via useReducer.
// Uses a key-based remount pattern for clean state reset.

import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { MockRunEmitter } from '../mock/emitter';
import { runReducer, initialRunState } from '../state/runReducer';
import type { AgentEvent } from '../mock/types';
import type { RunState } from '../state/types';

import successFixture from '../mock/fixtures/run_success.json';
import errorFixture from '../mock/fixtures/run_error.json';

const fixtures: Record<string, AgentEvent[]> = {
  success: successFixture as AgentEvent[],
  error: errorFixture as AgentEvent[],
};

export type FixtureKey = 'success' | 'error';

interface UseRunStreamReturn {
  state: RunState;
  activeFixture: FixtureKey;
  resetKey: number;
  switchFixture: (key: FixtureKey) => void;
  restart: () => void;
}

export function useRunStream(initialFixture: FixtureKey = 'success'): UseRunStreamReturn {
  const [activeFixture, setActiveFixture] = useState<FixtureKey>(initialFixture);
  const [resetKey, setResetKey] = useState(0);

  const switchFixture = useCallback((key: FixtureKey) => {
    setActiveFixture(key);
    setResetKey((k) => k + 1);
  }, []);

  const restart = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return { state: initialRunState, activeFixture, resetKey, switchFixture, restart };
}

/**
 * Inner hook that runs the actual emitter for a specific fixture.
 * Must be used inside a component that remounts (via key) when fixture/resetKey changes.
 */
export function useRunEmitter(fixtureKey: FixtureKey): RunState {
  const [state, dispatch] = useReducer(runReducer, initialRunState);
  const emitterRef = useRef<MockRunEmitter | null>(null);

  useEffect(() => {
    const events = fixtures[fixtureKey];
    const emitter = new MockRunEmitter(events, 0.4);
    emitterRef.current = emitter;

    emitter.on((event) => {
      dispatch(event);
    });

    emitter.start();

    return () => {
      emitter.stop();
    };
  }, [fixtureKey]);

  return state;
}
