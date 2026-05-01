import { Database, Plus, RefreshCw, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export function Datasets() {
  const { addToast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    addToast('Syncing SEC EDGAR filings...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      addToast('SEC sync complete. 12 new filings fetched.', 'success');
    }, 2000);
  };

  const filings = [
    { ticker: 'AAPL', company: 'Apple Inc.', filings: 47, updated: '2 hours ago', size: '1.2 GB' },
    { ticker: 'MSFT', company: 'Microsoft Corporation', filings: 43, updated: '3 hours ago', size: '1.1 GB' },
    { ticker: 'GOOGL', company: 'Alphabet Inc.', filings: 41, updated: '5 hours ago', size: '987 MB' },
    { ticker: 'META', company: 'Meta Platforms Inc.', filings: 38, updated: '6 hours ago', size: '856 MB' },
    { ticker: 'NVDA', company: 'NVIDIA Corporation', filings: 35, updated: 'Yesterday', size: '743 MB' },
  ];

  const earnings = [
    { company: 'Apple Inc.', details: 'AAPL · Q4 2024', date: 'Oct 31, 2024', time: '48 min', stats: '12,400 words · sentiment positive', status: 'var(--color-status-complete)' },
    { company: 'Microsoft', details: 'MSFT · Q1 2025', date: 'Oct 30, 2024', time: '52 min', stats: '14,100 words · sentiment positive', status: 'var(--color-status-complete)' },
    { company: 'Alphabet', details: 'GOOGL · Q3 2024', date: 'Oct 29, 2024', time: '45 min', stats: '11,800 words · sentiment neutral', status: 'var(--color-status-complete)' },
    { company: 'Meta Platforms', details: 'META · Q3 2024', date: 'Oct 30, 2024', time: '41 min', stats: '10,900 words · sentiment positive', status: 'var(--color-status-complete)' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">Datasets</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSyncing ? <Loader2 className="w-4 h-4 animate-spin text-[var(--color-accent-primary)]" /> : <RefreshCw className="w-4 h-4" />}
            {isSyncing ? 'Syncing...' : 'Sync SEC'}
          </button>
          <button className="bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-secondary)] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(78,167,255,0.2)] hover:shadow-[0_0_20px_rgba(78,167,255,0.4)]">
            <Plus className="w-4 h-4" /> Add Source
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl overflow-hidden shadow-sm mb-10">
        <div className="px-6 py-5 border-b border-[var(--color-border-subtle)] flex items-center gap-2">
          <Database className="w-4 h-4 text-[var(--color-text-muted)]" />
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">SEC Filings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                <th className="px-6 py-4 font-semibold w-24">Ticker</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold w-24">Filings</th>
                <th className="px-6 py-4 font-semibold w-32">Last Updated</th>
                <th className="px-6 py-4 font-semibold w-24">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {filings.map((f) => (
                <tr key={f.ticker} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                  <td className="px-6 py-4 font-bold font-mono text-[var(--color-text-primary)]">{f.ticker}</td>
                  <td className="px-6 py-4 font-medium text-[var(--color-text-secondary)]">{f.company}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[var(--color-text-primary)]">{f.filings}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)] text-xs font-medium">{f.updated}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)] font-mono text-xs">{f.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--color-text-muted)]" />
          <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">Earnings Calls</h2>
        </div>
        <span className="text-[10px] font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] px-2.5 py-1 rounded-lg border border-[var(--color-border-subtle)]">
          1,429 transcripts
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {earnings.map((e) => (
          <div key={e.company} className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] p-5 rounded-xl hover:border-[var(--color-border-strong)] transition-all cursor-pointer relative group shadow-sm">
            <div className="absolute top-5 right-5 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-status-complete)]" />
            </div>
            <h3 className="font-semibold text-sm mb-1 text-[var(--color-text-primary)]">{e.company}</h3>
            <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-4 bg-[var(--color-surface-elevated)] inline-block px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">{e.details}</p>
            <div className="text-xs font-medium text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
              <span>{e.date}</span>
              <span className="text-[10px] text-[var(--color-border-strong)]">•</span>
              <span>{e.time}</span>
            </div>
            <p className="text-[10px] font-medium text-[var(--color-text-muted)]">{e.stats}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
