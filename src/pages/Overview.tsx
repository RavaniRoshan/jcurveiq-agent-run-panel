import { Activity, ArrowRight, TrendingUp, TrendingDown, Clock, CheckCircle2 } from 'lucide-react';

interface OverviewProps {
  onNavigate: (page: string) => void;
  onOpenRun: (runId: string) => void;
}

export function Overview({ onNavigate, onOpenRun }: OverviewProps) {
  const kpis = [
    { label: 'Total Runs (7d)', value: '1,492', change: '+12.4%', positive: true, icon: Activity },
    { label: 'Success Rate', value: '98.2%', change: '+0.5%', positive: true, icon: CheckCircle2 },
    { label: 'Avg Duration', value: '4.2s', change: '-1.1s', positive: true, icon: Clock },
    { label: 'API Latency', value: '240ms', change: '+45ms', positive: false, icon: TrendingDown },
  ];

  const recentRuns = [
    { id: 'run_1042', query: 'Analyze AAPL Q3 earnings', agent: 'Financial Analyst', status: 'var(--color-status-complete)', time: '2m ago' },
    { id: 'run_1041', query: 'Compare TSLA and F margins', agent: 'Market Researcher', status: 'var(--color-status-complete)', time: '15m ago' },
    { id: 'run_1040', query: 'Summarize FOMC meeting notes', agent: 'Macro Economist', status: 'var(--color-status-running)', time: '1h ago' },
    { id: 'run_1039', query: 'Find trending AI startups', agent: 'Venture Scout', status: 'var(--color-status-failed)', time: '3h ago' },
    { id: 'run_1038', query: 'Evaluate NVDA supply chain', agent: 'Supply Chain Pro', status: 'var(--color-status-complete)', time: '5h ago' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">Research Operations</h2>
          <p className="text-sm font-medium text-[var(--color-text-muted)] mt-1">Live metrics and recent execution history.</p>
        </div>
      </div>

      {/* Row 1: KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] p-5 rounded-xl shadow-sm hover:border-[var(--color-border-strong)] transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{kpi.label}</h3>
              <kpi.icon className="w-4 h-4 text-[var(--color-text-muted)]" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{kpi.value}</span>
              <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md ${kpi.positive ? 'text-[var(--color-status-complete)] bg-[var(--color-status-complete)]/10' : 'text-[var(--color-status-failed)] bg-[var(--color-status-failed)]/10'}`}>
                {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Primary Chart */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Run Volume (7 Days)</h3>
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest border border-[var(--color-border-subtle)] px-2.5 py-1 rounded-lg bg-[var(--color-surface-elevated)] font-semibold">Daily</span>
        </div>
        <div className="h-48 w-full relative">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            {/* Grid lines */}
            <line x1="0" y1="50" x2="800" y2="50" stroke="var(--color-border-subtle)" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="var(--color-border-subtle)" strokeDasharray="4 4" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="var(--color-border-subtle)" strokeDasharray="4 4" />
            
            {/* Area Fill */}
            <polygon 
              points="0,200 0,140 100,120 200,160 300,90 400,110 500,60 600,80 700,30 800,50 800,200" 
              fill="var(--color-accent-primary)" 
              fillOpacity="0.1" 
            />
            {/* Line */}
            <polyline 
              points="0,140 100,120 200,160 300,90 400,110 500,60 600,80 700,30 800,50" 
              fill="none" 
              stroke="var(--color-accent-primary)" 
              strokeWidth="2.5" 
              strokeLinejoin="round"
            />
            {/* Data points */}
            <circle cx="100" cy="120" r="4" fill="var(--color-surface-card)" stroke="var(--color-accent-primary)" strokeWidth="2" />
            <circle cx="300" cy="90" r="4" fill="var(--color-surface-card)" stroke="var(--color-accent-primary)" strokeWidth="2" />
            <circle cx="500" cy="60" r="4" fill="var(--color-surface-card)" stroke="var(--color-accent-primary)" strokeWidth="2" />
            <circle cx="700" cy="30" r="4" fill="var(--color-surface-card)" stroke="var(--color-accent-primary)" strokeWidth="2" />
          </svg>
          <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-[10px] font-mono text-[var(--color-text-muted)] -ml-8 py-2">
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
        </div>
      </div>

      {/* Row 3: Secondary Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Agent Utilization Bar Chart */}
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] p-6 rounded-xl shadow-sm lg:col-span-1">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-6">Agent Utilization</h3>
          <div className="h-64 w-full flex items-end justify-between gap-3">
            <div className="w-full flex flex-col items-center gap-3 group">
              <div className="w-full bg-[var(--color-accent-primary)] h-[80%] rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[10px] font-medium text-[var(--color-text-muted)] truncate max-w-full">Fin</span>
            </div>
            <div className="w-full flex flex-col items-center gap-3 group">
              <div className="w-full bg-[var(--color-accent-primary)] h-[45%] rounded-t-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[10px] font-medium text-[var(--color-text-muted)] truncate max-w-full">Rsch</span>
            </div>
            <div className="w-full flex flex-col items-center gap-3 group">
              <div className="w-full bg-[var(--color-accent-primary)] h-[60%] rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[10px] font-medium text-[var(--color-text-muted)] truncate max-w-full">Mac</span>
            </div>
            <div className="w-full flex flex-col items-center gap-3 group">
              <div className="w-full bg-[var(--color-accent-primary)] h-[30%] rounded-t-md opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[10px] font-medium text-[var(--color-text-muted)] truncate max-w-full">Ven</span>
            </div>
            <div className="w-full flex flex-col items-center gap-3 group">
              <div className="w-full bg-[var(--color-accent-primary)] h-[15%] rounded-t-md opacity-20 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-[10px] font-medium text-[var(--color-text-muted)] truncate max-w-full">Sup</span>
            </div>
          </div>
        </div>

        {/* Recent Runs Table */}
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl shadow-sm overflow-hidden lg:col-span-2 flex flex-col">
          <div className="px-6 py-5 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Recent Runs</h3>
            <button 
              onClick={() => onNavigate('runs')}
              className="text-xs text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] font-medium cursor-pointer flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-[var(--color-surface-elevated)] text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)]">
                  <th className="px-6 py-3.5 font-semibold">Query</th>
                  <th className="px-6 py-3.5 font-semibold">Agent</th>
                  <th className="px-6 py-3.5 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {recentRuns.map((run) => (
                  <tr 
                    key={run.id} 
                    className="hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer group"
                    onClick={() => onOpenRun(run.id)}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      {run.status === 'var(--color-status-running)' ? (
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: run.status }} />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: run.status }} />
                      )}
                      <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">{run.query}</span>
                    </td>
                    <td className="px-6 py-4 text-[var(--color-text-secondary)] font-medium">{run.agent}</td>
                    <td className="px-6 py-4 text-[var(--color-text-muted)] text-xs text-right font-medium">{run.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
