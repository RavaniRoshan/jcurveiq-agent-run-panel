import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import type { TaskOutput } from '../state/types';

interface PartialOutputProps {
  outputs: TaskOutput[];
  latestOutput: TaskOutput | null;
}

function QualityBadge({ score }: { score: number }) {
  // Map 0-1 score to a color and label
  const pct = Math.round(score * 100);
  let color = 'var(--color-status-complete)';
  if (score < 0.7) color = 'var(--color-status-cancelled)';
  if (score < 0.5) color = 'var(--color-status-failed)';

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
      {pct}% quality
    </span>
  );
}

export function PartialOutput({ outputs, latestOutput }: PartialOutputProps) {
  const [showHistory, setShowHistory] = useState(false);

  if (!latestOutput) return null;

  // Previous partials (non-final, excluding the latest)
  const previousPartials = outputs.filter(
    (o) => !o.isFinal && o !== latestOutput
  );

  const hasPrevious = previousPartials.length > 0;

  return (
    <div className="mt-3">
      {/* Latest output */}
      <div
        className={`rounded-lg border text-xs leading-relaxed transition-all duration-300 shadow-sm ${
          latestOutput.isFinal
            ? 'border-[var(--color-status-complete)]/20 bg-[var(--color-status-complete)]/5 p-3'
            : 'border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-3'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2.5">
          {latestOutput.isFinal ? (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--color-status-complete)] bg-[var(--color-status-complete)]/10 px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Final Output
            </span>
          ) : (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-surface-hover)] border border-[var(--color-border-subtle)] px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin text-[var(--color-status-running)]" />
              Streaming
            </span>
          )}

          {latestOutput.isFinal && latestOutput.qualityScore !== null && (
            <QualityBadge score={latestOutput.qualityScore} />
          )}
        </div>

        {/* Content */}
        <p className={`text-[var(--color-text-primary)] ${latestOutput.isFinal ? '' : 'text-[var(--color-text-secondary)]'}`}>
          {latestOutput.content}
        </p>
      </div>

      {/* Previous partials toggle */}
      {hasPrevious && (
        <div className="mt-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {showHistory ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            {showHistory
              ? `Hide ${previousPartials.length} earlier ${previousPartials.length === 1 ? 'version' : 'versions'}`
              : `Show ${previousPartials.length} earlier ${previousPartials.length === 1 ? 'version' : 'versions'}`}
          </button>

          {showHistory && (
            <div className="mt-2 space-y-1.5 animate-fade-in pl-1 border-l border-[var(--color-border-subtle)] ml-1.5">
              {previousPartials.map((output, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] p-2.5 opacity-60 ml-2"
                >
                  <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
                    {output.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
