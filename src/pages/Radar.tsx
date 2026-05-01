import { Radar as RadarIcon, Activity, Flame, Plus, Bell } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export function Radar() {
  const { addToast } = useToast();

  const watchlist = [
    { ticker: 'NVDA', price: '$124.50', change: '+2.4%', alert: 'Near ATH' },
    { ticker: 'TSLA', price: '$178.20', change: '-1.2%', alert: 'Earnings tomorrow' },
    { ticker: 'COIN', price: '$240.10', change: '+5.6%', alert: 'High volume' },
    { ticker: 'AAPL', price: '$190.05', change: '+0.8%', alert: 'None' },
  ];

  const hotScans = [
    { topic: 'Quantum Computing Breakthrough', mentions: 12500, sentiment: 'Highly Positive' },
    { topic: 'EU AI Act Regulatory Impact', mentions: 8400, sentiment: 'Mixed' },
    { topic: 'Solid State Battery Rumors', mentions: 5200, sentiment: 'Positive' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">Finance Radar</h2>
          <p className="text-sm font-medium text-[var(--color-text-muted)] mt-1">Powered by Yahoo Finance & Agentic Scoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 8-Dimension Scoring */}
          <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <RadarIcon className="w-5 h-5 text-[var(--color-accent-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                Agentic 8-Dimension Score: <span className="font-mono text-[var(--color-accent-primary)] bg-[var(--color-accent-glow)] px-1.5 py-0.5 rounded">MSFT</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Valuation', score: 65, color: 'bg-[var(--color-status-cancelled)]' }, // yellow-ish
                { label: 'Growth', score: 85, color: 'bg-[var(--color-status-complete)]' },
                { label: 'Profitability', score: 95, color: 'bg-[var(--color-status-complete)]' },
                { label: 'Momentum', score: 70, color: 'bg-[var(--color-status-cancelled)]' },
                { label: 'Risk', score: 40, color: 'bg-[var(--color-status-failed)]' },
                { label: 'Sentiment', score: 80, color: 'bg-[var(--color-status-complete)]' },
                { label: 'Technicals', score: 60, color: 'bg-[var(--color-status-cancelled)]' },
                { label: 'Dividends', score: 50, color: 'bg-[var(--color-status-cancelled)]' },
              ].map(dim => (
                <div key={dim.label} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-4 rounded-xl flex flex-col items-center shadow-sm">
                  <span className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">{dim.label}</span>
                  <div className="text-xl font-bold font-mono text-[var(--color-text-primary)] mb-3">{dim.score}</div>
                  <div className="w-full bg-[var(--color-surface-base)] h-1.5 rounded-full overflow-hidden border border-[var(--color-border-subtle)]">
                    <div className={`h-full ${dim.color}`} style={{ width: `${dim.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Scanner */}
          <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[var(--color-status-failed)]" />
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Hot Scanner (Viral Trends)</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[var(--color-status-failed)] animate-pulse-dot shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {hotScans.map(scan => (
                  <div key={scan.topic} className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-semibold text-[var(--color-text-primary)]">{scan.topic}</h4>
                      <div className="text-xs font-medium text-[var(--color-text-muted)] mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {scan.mentions.toLocaleString()} mentions/hr</span>
                        <span className="text-[var(--color-border-strong)]">•</span>
                        <span className={scan.sentiment.includes('Positive') ? 'text-[var(--color-status-complete)]' : 'text-[var(--color-status-cancelled)]'}>{scan.sentiment}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => addToast(`Starting analysis for ${scan.topic}...`, 'success')}
                      className="px-3 py-1.5 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-lg hover:bg-[var(--color-surface-hover)] text-xs font-semibold transition-colors cursor-pointer text-[var(--color-text-primary)]"
                    >
                      Analyze
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Watchlist */}
          <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[var(--color-border-subtle)] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[var(--color-text-muted)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Watchlist & Alerts</h3>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {watchlist.map(item => (
                <div key={item.ticker} className="p-4 hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-[var(--color-text-primary)]">{item.ticker}</span>
                    <span className="font-mono text-sm font-semibold text-[var(--color-text-secondary)]">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium mt-2">
                    <span className="text-[var(--color-text-muted)] truncate max-w-[120px] bg-[var(--color-surface-elevated)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">Alert: {item.alert}</span>
                    <span className={item.change.startsWith('+') ? 'text-[var(--color-status-complete)]' : 'text-[var(--color-status-failed)]'}>{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]/50">
              <button className="w-full py-2.5 border border-dashed border-[var(--color-border-strong)] rounded-lg text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors cursor-pointer flex items-center justify-center gap-2">
                <Plus className="w-3.5 h-3.5" /> Add Ticker
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
