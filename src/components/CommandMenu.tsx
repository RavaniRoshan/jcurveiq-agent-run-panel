import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Route, LayoutDashboard, Radar, Database, Settings, Workflow, Plus, RefreshCw } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface CommandMenuProps {
  onNavigate: (page: string) => void;
}

export function CommandMenu({ onNavigate }: CommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const navigationItems = [
    { id: 'run_detail', label: 'View Run Console', icon: Route },
    { id: 'runs', label: 'All Runs', icon: Workflow },
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'radar', label: 'Finance Radar', icon: Radar },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const actionItems = [
    { id: 'new_run', label: 'Start New Agent Run', icon: Plus, action: () => { onNavigate('run_detail'); addToast('Starting new agent run...', 'success'); } },
    { id: 'sync_sec', label: 'Sync SEC Filings', icon: RefreshCw, action: () => addToast('Syncing SEC EDGAR filings in background...', 'info') },
  ];

  const allItems = [...navigationItems, ...actionItems];

  const filteredItems = allItems.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof navigationItems[0] | typeof actionItems[0]) => {
    if ('action' in item) {
      item.action();
    } else {
      onNavigate(item.id);
    }
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full max-w-[620px] bg-[var(--color-surface-card)] border border-[var(--color-border-strong)] rounded-[18px] shadow-2xl overflow-hidden relative z-10 flex flex-col"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--color-border-subtle)]">
              <Search className="w-5 h-5 text-[var(--color-text-muted)]" />
              <input 
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, runs, or settings..."
                className="flex-1 bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-[15px]"
              />
              <kbd className="font-mono text-[10px] text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-2 py-0.5 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-8 text-center text-[var(--color-text-muted)] text-sm">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  {/* We just show them all in a flat list for simplicity, but grouped conceptually */}
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] text-[var(--color-text-secondary)] text-sm font-medium transition-colors text-left cursor-pointer"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
              <span>Use <kbd className="font-mono bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-1 rounded">↑</kbd> <kbd className="font-mono bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-1 rounded">↓</kbd> to navigate</span>
              <span><kbd className="font-mono bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-1 rounded">Enter</kbd> to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
