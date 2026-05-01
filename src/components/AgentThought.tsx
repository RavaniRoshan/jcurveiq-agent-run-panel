import { useState } from 'react';
import { ChevronRight, ChevronDown, BrainCircuit } from 'lucide-react';
import type { AgentThought as AgentThoughtType } from '../state/types';

interface AgentThoughtProps {
  thoughts: AgentThoughtType[];
  source: string; // "Coordinator" or agent name
  defaultOpen?: boolean;
}

export function AgentThought({ thoughts, source, defaultOpen = false }: AgentThoughtProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (thoughts.length === 0) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer group"
      >
        {isOpen ? (
          <ChevronDown className="w-3 h-3 text-[var(--color-text-muted)]" />
        ) : (
          <ChevronRight className="w-3 h-3 text-[var(--color-text-muted)]" />
        )}
        <BrainCircuit className="w-3.5 h-3.5 text-[var(--color-accent-primary)] opacity-70 group-hover:opacity-100 transition-opacity" />
        <span>
          {source} reasoning ({thoughts.length})
        </span>
      </button>

      {isOpen && (
        <div className="mt-1.5 ml-4 pl-3 border-l border-[var(--color-border-subtle)] space-y-1 animate-fade-in">
          {thoughts.map((t, i) => (
            <p
              key={i}
              className="text-[11px] text-[var(--color-text-muted)] italic leading-relaxed"
            >
              "{t.thought}"
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
