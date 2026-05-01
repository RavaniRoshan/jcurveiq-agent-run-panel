import { Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

interface RunsProps {
  onNewRun: () => void;
  onOpenRun: (runId: string) => void;
}

export function Runs({ onNewRun, onOpenRun }: RunsProps) {
  const { addToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');

  const mockRuns = [
    { id: '1', status: 'Running', query: 'Analyse Apple R&D spend efficiency vs MSFT, GOOGL, META (2019-2024)', duration: '21.4s', tasks: '3/5', created: '2 min ago', dot: 'var(--color-status-running)' },
    { id: '2', status: 'Complete', query: 'Find peers for NVDA using 10-K business descriptions', duration: '12.1s', tasks: '4/4', created: '8 min ago', dot: 'var(--color-status-complete)' },
    { id: '3', status: 'Complete', query: 'Summarize TSLA Q4 2024 earnings call sentiment', duration: '9.4s', tasks: '2/2', created: '24 min ago', dot: 'var(--color-status-complete)' },
    { id: '4', status: 'Failed', query: 'Compare gross margins AAPL vs hardware peers 2019-24', duration: '—', tasks: '1/4', created: '1h ago', dot: 'var(--color-status-failed)' },
    { id: '5', status: 'Complete', query: 'Extract risk factors from META 10-K 2024', duration: '6.7s', tasks: '3/3', created: '3h ago', dot: 'var(--color-status-complete)' },
    { id: '6', status: 'Cancelled', query: 'Build peer group for AMD semiconductor competitors', duration: '4.2s', tasks: '2/5', created: '5h ago', dot: 'var(--color-status-cancelled)' },
    { id: '7', status: 'Complete', query: 'Fetch AAPL 10-K filings 2020-2024 and parse R&D', duration: '14.8s', tasks: '5/5', created: 'Yesterday', dot: 'var(--color-status-complete)' },
    { id: '8', status: 'Complete', query: 'Identify cloud revenue segments for MSFT, AMZN, GOOGL', duration: '19.2s', tasks: '6/6', created: 'Yesterday', dot: 'var(--color-status-complete)' },
    { id: '9', status: 'Complete', query: 'Calculate R&D as % of revenue for FAANG 2019-2024', duration: '22.6s', tasks: '4/4', created: '2d ago', dot: 'var(--color-status-complete)' },
    { id: '10', status: 'Complete', query: 'Summarize regulatory risks from financial services 10-Ks', duration: '11.3s', tasks: '3/3', created: '3d ago', dot: 'var(--color-status-complete)' },
  ];

  const filteredRuns = mockRuns.filter(run => {
    if (statusFilter !== 'All statuses' && run.status !== statusFilter) return false;
    if (search && !run.query.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleNewRun = () => {
    addToast('Starting new agent run...', 'success');
    onNewRun();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">All Runs</h1>
        <button
          onClick={handleNewRun}
          className="bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-secondary)] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_0_15px_rgba(78,167,255,0.2)] hover:shadow-[0_0_20px_rgba(78,167,255,0.4)] cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Run
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] text-sm rounded-xl pl-4 pr-10 py-2.5 appearance-none cursor-pointer text-[var(--color-text-primary)] font-medium transition-colors outline-none focus:border-[var(--color-accent-primary)]"
          >
            <option>All statuses</option>
            <option>Complete</option>
            <option>Running</option>
            <option>Failed</option>
            <option>Cancelled</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search queries..."
          className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] text-sm rounded-xl px-4 py-2.5 w-64 placeholder-[var(--color-text-muted)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors font-medium"
        />
      </div>

      {/* Table */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                <th className="px-6 py-4 font-semibold w-32">Status</th>
                <th className="px-6 py-4 font-semibold">Query</th>
                <th className="px-6 py-4 font-semibold w-24">Duration</th>
                <th className="px-6 py-4 font-semibold w-24">Tasks</th>
                <th className="px-6 py-4 font-semibold w-32">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {filteredRuns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">
                    No runs found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRuns.map((run) => (
                  <tr 
                    key={run.id} 
                    className="hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer group"
                    onClick={() => onOpenRun(run.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[11px] font-semibold text-[var(--color-text-primary)] shadow-sm">
                        {run.status === 'Running' ? (
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: run.dot }} />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: run.dot }} />
                        )}
                        {run.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[var(--color-text-primary)] truncate max-w-xl group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {run.query}
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-secondary)] font-mono text-xs">
                      {run.duration}
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-secondary)] font-mono text-xs">
                      {run.tasks}
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-secondary)] text-xs font-medium">
                      {run.created}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[var(--color-border-default)] flex items-center justify-between text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-base)]">
          <span className="font-medium">Showing {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, filteredRuns.length)} of {filteredRuns.length} runs</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1 font-medium bg-[var(--color-surface-card)]"
            >
              <ChevronLeft className="w-3 h-3" /> Previous
            </button>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-1 font-medium bg-[var(--color-surface-card)] cursor-pointer"
            >
              Next <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
