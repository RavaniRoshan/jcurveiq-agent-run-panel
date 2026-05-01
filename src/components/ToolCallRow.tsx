import { useState } from 'react';
import { ChevronRight, ChevronDown, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import type { ToolCall } from '../state/types';

interface ToolCallRowProps {
  toolCalls: ToolCall[];
}

export function ToolCallRow({ toolCalls }: ToolCallRowProps) {
  const [expanded, setExpanded] = useState(false);

  if (toolCalls.length === 0) return null;

  const completedCount = toolCalls.filter((tc) => tc.outputSummary !== null).length;
  const allComplete = completedCount === toolCalls.length;

  return (
    <div className="mt-3">
      {/* Compact summary row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left group cursor-pointer"
      >
        {expanded ? (
          <ChevronDown className="w-3 h-3 text-[var(--color-text-muted)]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[var(--color-text-muted)]" />
        )}
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-accent-primary)]">
          <Zap className="w-3 h-3" />
          {toolCalls.length} tool {toolCalls.length === 1 ? 'call' : 'calls'}
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)]">
          {allComplete
            ? `${completedCount}/${toolCalls.length} complete`
            : `${completedCount}/${toolCalls.length} returned`}
        </span>
        {allComplete && (
          <CheckCircle2 className="w-3 h-3 text-[var(--color-status-complete)]" />
        )}
        {!allComplete && completedCount < toolCalls.length && (
          <Loader2 className="w-3 h-3 text-[var(--color-status-running)] animate-spin" />
        )}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="mt-2 ml-4 space-y-2 animate-fade-in">
          {toolCalls.map((tc, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-2.5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-semibold text-[var(--color-accent-primary)]">
                  {tc.tool}
                </span>
                {tc.outputSummary ? (
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--color-status-complete)] bg-[var(--color-status-complete)]/10 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Done
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--color-status-running)] bg-[var(--color-status-running)]/10 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    Running
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] font-mono leading-relaxed">
                <span className="text-[var(--color-border-strong)]">→</span> {tc.inputSummary}
              </p>
              {tc.outputSummary && (
                <p className="text-[10px] text-[var(--color-text-secondary)] font-mono leading-relaxed mt-1">
                  <span className="text-[var(--color-border-strong)]">←</span> {tc.outputSummary}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
