// ─── Mock Event Emitter ───
// Replays fixture events with realistic delta-based timing.
// Uses a speed multiplier so the full ~21s run plays in ~8-10s for demo.

import type { AgentEvent } from './types';

type EventCallback = (event: AgentEvent) => void;

export class MockRunEmitter {
  private events: AgentEvent[];
  private timers: ReturnType<typeof setTimeout>[] = [];
  private listeners: EventCallback[] = [];
  private speedMultiplier: number;

  constructor(fixtureEvents: AgentEvent[], speedMultiplier = 0.4) {
    this.events = fixtureEvents;
    this.speedMultiplier = speedMultiplier;
  }

  on(callback: EventCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  start(): void {
    if (this.events.length === 0) return;

    const baseTimestamp = this.events[0].timestamp;

    this.events.forEach((event) => {
      const delay = (event.timestamp - baseTimestamp) * this.speedMultiplier;
      const timer = setTimeout(() => {
        this.emit(event);
      }, delay);
      this.timers.push(timer);
    });
  }

  stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  private emit(event: AgentEvent): void {
    this.listeners.forEach((cb) => cb(event));
  }
}
