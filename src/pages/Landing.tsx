import { 
  ArrowRight, 
  Check,
  X,
  Plus,
  Play
} from 'lucide-react';
import { useState } from 'react';

interface LandingProps {
  onEnterDashboard: () => void;
}

export function Landing({ onEnterDashboard }: LandingProps) {
  const [pricingSlider, setPricingSlider] = useState(10);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fakeBarHeights = [24, 76, 43, 85, 31, 59, 92, 38, 65, 88, 21, 55, 79, 41, 68, 97, 25, 48, 83, 50];

  const faqs = [
    { q: "How do you trace multi-agent workflows?", a: "We inject lightweight context tracking at the prompt level, maintaining a continuous trace id across sub-agent executions without modifying your core orchestration code." },
    { q: "Is there a latency overhead?", a: "Trace emission is fully asynchronous. You will observe sub-10ms overhead for standard REST payloads, completely decoupled from agent response times." },
    { q: "Can I export audit logs?", a: "Yes, all trace logs and citations can be exported via our REST API or directly pushed to your S3 bucket or Snowflake instance." },
    { q: "Do you store the PII in agent prompts?", a: "By default, our SDKs support local redaction of PII before trace data ever hits our ingestion servers." },
    { q: "How is pricing calculated?", a: "Pricing is based on successful traced agent runs per month. A run is defined as a single root query and all its associated sub-agent invocations." },
    { q: "Do you offer enterprise SLAs?", a: "Yes, our Enterprise plan includes guaranteed 99.99% uptime, VPC peering, and dedicated support channels." }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface-base)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white overflow-hidden relative">
      
      {/* ─── Navigation ─── */}
      <div className="fixed top-6 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left Floating Card (Logo) */}
          <div className="pointer-events-auto flex items-center gap-3 bg-[var(--color-surface-card)]/70 backdrop-blur-xl border border-[var(--color-border-subtle)] px-4 py-3 rounded-2xl shadow-lg">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-primary)] flex items-center justify-center text-white font-bold font-mono shadow-[0_0_15px_rgba(78,167,255,0.4)]">
              J
            </div>
            <span className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)] pr-2">JcurveIQ</span>
          </div>

          {/* Right Floating Card (CTA) */}
          <div className="pointer-events-auto bg-[var(--color-surface-card)]/70 backdrop-blur-xl border border-[var(--color-border-subtle)] p-1.5 rounded-2xl shadow-lg">
            <button 
              onClick={onEnterDashboard}
              className="group flex items-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-surface-base)] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-[var(--color-text-secondary)] active:scale-95 cursor-pointer"
            >
              View Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <main className="relative pt-16 pb-20">
        
        {/* Background glow similar to reference */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[var(--color-accent-primary)]/10 to-transparent blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Pill Banner */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-accent-primary)]/30 bg-[var(--color-accent-primary)]/10 text-xs font-semibold text-[var(--color-accent-primary)] mb-6 cursor-pointer hover:bg-[var(--color-accent-primary)]/20 transition-colors">
            <span className="bg-[var(--color-accent-primary)] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>
            Multi-agent orchestration engine v2.0 is live
            <ArrowRight className="w-3 h-3 ml-1" />
          </div>

          {/* Hero Content */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.05] mb-6">
            AI research runs you<br />can actually audit.
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-10">
            Execute multi-agent market research with live trace visibility, parallel fetch streams, and cited synthesis. Stop guessing how your AI arrived at the answer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-12">
            <button 
              onClick={onEnterDashboard}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-secondary)] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(78,167,255,0.3)] cursor-pointer"
            >
              Start your free trial
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold transition-all hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer">
              <Play className="w-4 h-4 fill-black" />
              View demo
            </button>
          </div>

          {/* Sub Nav Tab Row */}
          <div className="flex items-center justify-center gap-8 text-sm font-medium text-[var(--color-text-secondary)] border-b border-[var(--color-border-subtle)] px-8 mb-16 overflow-x-auto w-full max-w-2xl">
            <button className="pb-4 border-b-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] cursor-pointer">Overview</button>
            <button className="pb-4 border-b-2 border-transparent hover:text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer">Traceability</button>
            <button className="pb-4 border-b-2 border-transparent hover:text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer">Parallel Fetch</button>
            <button className="pb-4 border-b-2 border-transparent hover:text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer">Synthesize</button>
            <button className="pb-4 border-b-2 border-transparent hover:text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer">Pricing</button>
          </div>

          {/* Hero Dashboard Image Placeholder */}
          <div className="w-full max-w-5xl bg-[var(--color-surface-card)] rounded-2xl border border-[var(--color-border-default)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-4 overflow-hidden relative text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            
            {/* Fake Dashboard UI */}
            <div className="grid grid-cols-12 gap-4">
              {/* Sidebar */}
              <div className="col-span-3 border-r border-[var(--color-border-subtle)] pr-4 flex flex-col gap-3">
                <div className="h-8 bg-[var(--color-surface-elevated)] rounded-md w-full" />
                <div className="h-8 bg-[var(--color-surface-elevated)] rounded-md w-3/4" />
                <div className="h-8 bg-[var(--color-surface-elevated)] rounded-md w-5/6" />
                <div className="h-8 bg-[var(--color-surface-elevated)] rounded-md w-4/5" />
              </div>
              {/* Main Area */}
              <div className="col-span-9 flex flex-col gap-4">
                {/* Header Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 bg-[var(--color-surface-elevated)] rounded-xl flex flex-col justify-center px-4">
                      <div className="h-3 bg-[var(--color-text-muted)] rounded w-1/2 mb-2" />
                      <div className="h-5 bg-[var(--color-text-primary)] rounded w-3/4" />
                    </div>
                  ))}
                </div>
                {/* Chart Area */}
                <div className="h-64 bg-[var(--color-surface-elevated)] rounded-xl relative overflow-hidden flex items-end px-4 gap-2 pb-4">
                  {/* Fake wave/chart lines */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full stroke-[var(--color-accent-primary)] fill-transparent stroke-2">
                       <path d="M0,150 Q100,50 200,100 T400,150 T600,80 T800,120 T1000,40" />
                     </svg>
                  </div>
                  {/* Fake Bars */}
                  {fakeBarHeights.map((h, i) => (
                    <div key={i} className="w-full bg-[var(--color-accent-primary)]/20 rounded-t-sm" style={{ height: `${h}%` }}>
                      <div className="w-full bg-[var(--color-accent-primary)] rounded-t-sm" style={{ height: '2px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bottom Floating Stats */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-[var(--color-surface-base)]/90 backdrop-blur border border-[var(--color-border-subtle)] rounded-full px-8 py-3 shadow-xl">
               <div className="flex flex-col items-center">
                 <span className="text-xs text-[var(--color-text-muted)]">Active Agents</span>
                 <span className="text-sm font-bold text-white">142</span>
               </div>
               <div className="w-px h-8 bg-[var(--color-border-subtle)]" />
               <div className="flex flex-col items-center">
                 <span className="text-xs text-[var(--color-text-muted)]">Avg Trace Time</span>
                 <span className="text-sm font-bold text-[var(--color-status-complete)]">1.2s</span>
               </div>
               <div className="w-px h-8 bg-[var(--color-border-subtle)]" />
               <div className="flex flex-col items-center">
                 <span className="text-xs text-[var(--color-text-muted)]">Citations</span>
                 <span className="text-sm font-bold text-[var(--color-status-running)]">8,492</span>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Logo Strip ─── */}
      <section className="py-12 border-y border-[var(--color-border-subtle)] bg-[var(--color-surface-shell)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-[var(--color-text-secondary)] mb-8">Trusted by leading AI research teams including</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            {['OpenAI', 'Anthropic', 'Google DeepMind', 'Scale AI', 'Cohere'].map(logo => (
              <div key={logo} className="text-xl font-bold font-mono tracking-tighter text-white">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest block mb-4">Features</span>
            <h2 className="text-4xl font-bold mb-4">Complete observability for<br/>multi-agent workflows</h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Everything you need to trace, debug, and optimize complex parallel agent architectures in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Agent Activity */}
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-3xl p-8 flex flex-col min-h-[400px] h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Agent Activity</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6">Monitor parallel execution states and bandwidth consumption across your swarm.</p>
              
              <div className="flex-1 bg-[var(--color-surface-base)] rounded-xl border border-[var(--color-border-subtle)] p-4 flex flex-col gap-4 overflow-hidden">
                {[
                  { name: 'Coordinator', val: 95, color: 'bg-green-500' },
                  { name: 'Web Scraper', val: 70, color: 'bg-blue-500' },
                  { name: 'Summarizer', val: 45, color: 'bg-purple-500' },
                  { name: 'QA Critic', val: 30, color: 'bg-yellow-500' },
                  { name: 'Format Output', val: 15, color: 'bg-red-500' },
                ].map(item => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-[var(--color-text-muted)] truncate">{item.name}</span>
                    <div className="flex-1 h-2 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                    </div>
                    <span className="w-8 text-right text-xs font-mono text-white">{item.val}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Distributed Nodes */}
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-3xl p-8 flex flex-col min-h-[400px] h-full overflow-hidden relative">
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Distributed Fetch Nodes</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6 relative z-10">Visualize global request routing and edge-deployed worker proximity.</p>
              
              {/* Fake Map Graphic */}
              <div className="absolute -bottom-20 -right-20 w-[400px] min-h-[400px] h-full rounded-full border-[1px] border-[var(--color-border-strong)] opacity-30 pointer-events-none flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full border-[1px] border-[var(--color-border-strong)] flex items-center justify-center">
                  <div className="w-[200px] h-[200px] rounded-full border-[1px] border-[var(--color-border-strong)]" />
                </div>
                {/* Dots */}
                <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-[var(--color-accent-primary)] rounded-full shadow-[0_0_10px_#4ea7ff]" />
                <div className="absolute top-[50%] left-[60%] w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_purple]" />
                <div className="absolute top-[70%] left-[40%] w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_green]" />
              </div>
            </div>

            {/* Card 3: Model Utilization */}
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-3xl p-8 flex flex-col min-h-[400px] h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Model Utilization</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6">Track token distribution across different foundation models in your workflow.</p>
              
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 -mr-2">
                {[
                  { name: 'GPT-4 Turbo', desc: 'Heavy reasoning', val: '45%', color: 'bg-green-500' },
                  { name: 'Claude 3 Opus', desc: 'Creative synthesis', val: '30%', color: 'bg-purple-500' },
                  { name: 'Gemini 1.5 Pro', desc: 'Context retrieval', val: '15%', color: 'bg-blue-500' },
                  { name: 'Llama 3 70B', desc: 'Local fallback', val: '10%', color: 'bg-orange-500' },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--color-surface-elevated)] border border-transparent hover:border-[var(--color-border-subtle)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <div>
                        <div className="text-sm font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{item.desc}</div>
                      </div>
                    </div>
                    <div className="font-mono text-sm font-bold text-white">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Trace Coverage */}
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-3xl p-8 flex flex-col min-h-[400px] h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Trace Coverage</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6">Percentage of generated facts successfully linked back to primary source citations.</p>
              
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-48 h-48">
                  {/* Fake Donut Chart */}
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" className="stroke-[var(--color-surface-elevated)]" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" className="stroke-[var(--color-status-complete)]" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="45" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">82%</span>
                    <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">Accurate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Workflow Steps ─── */}
      <section className="py-24 bg-[var(--color-surface-shell)] border-y border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest block mb-4">Workflow</span>
            <h2 className="text-4xl font-bold mb-4">Transparent Execution Pipeline</h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Instrument your agents with two lines of code and get immediate visibility into every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'Decompose Query', desc: 'Complex inputs are broken down by the coordinator agent into parallel sub-tasks.', color: 'text-pink-500 bg-pink-500/10' },
              { num: 2, title: 'Parallel Fetch', desc: 'Worker agents concurrently fetch data from APIs, databases, or live websites.', color: 'text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10' },
              { num: 3, title: 'Synthesize Output', desc: 'All traces and context are aggregated into a final, fully cited answer.', color: 'text-purple-500 bg-purple-500/10' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-2xl relative">
                {/* Connector line for desktop */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-[var(--color-border-strong)] border-dashed z-0" />
                )}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-6 relative z-10 ${step.color}`}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest block mb-4">Compare</span>
            <h2 className="text-4xl font-bold">How JcurveIQ compares</h2>
            <p className="text-[var(--color-text-secondary)] mt-4">See why engineering teams are migrating their agent ops.</p>
          </div>

          <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-6">
              <div className="col-span-1 font-bold text-[var(--color-text-secondary)] flex items-center">Feature</div>
              <div className="col-span-1 font-bold text-center text-[var(--color-accent-primary)] flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-primary)] text-white flex items-center justify-center font-mono">J</div>
                JcurveIQ
              </div>
              <div className="col-span-1 font-bold text-center flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
                <div className="w-8 h-8 rounded-lg bg-gray-700 text-white flex items-center justify-center">B</div>
                Black-box AI
              </div>
              <div className="col-span-1 font-bold text-center flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
                <div className="w-8 h-8 rounded-lg bg-gray-800 text-white flex items-center justify-center">L</div>
                Standard LLMs
              </div>
            </div>
            
            {[
              { label: 'Live Trace Visualization', ours: true, comp1: false, comp2: false },
              { label: 'Token Utilization Analytics', ours: true, comp1: true, comp2: false },
              { label: 'Sub-agent Step Debugging', ours: true, comp1: false, comp2: false },
              { label: 'Automatic Citations', ours: true, comp1: false, comp2: false },
              { label: 'Parallel Run Orchestration', ours: true, comp1: false, comp2: false },
              { label: 'Basic Logging', ours: true, comp1: true, comp2: true },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-4 p-6 border-b border-[var(--color-border-subtle)] last:border-0 hover:bg-[var(--color-surface-elevated)]/50 transition-colors`}>
                <div className="col-span-1 font-medium flex items-center">{row.label}</div>
                <div className="col-span-1 flex justify-center text-[var(--color-accent-primary)]"><Check className="w-6 h-6" /></div>
                <div className="col-span-1 flex justify-center text-[var(--color-text-muted)]">{row.comp1 ? <Check className="w-6 h-6" /> : <X className="w-6 h-6 opacity-30" />}</div>
                <div className="col-span-1 flex justify-center text-[var(--color-text-muted)]">{row.comp2 ? <Check className="w-6 h-6" /> : <X className="w-6 h-6 opacity-30" />}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Section ─── */}
      <section id="pricing" className="py-24 bg-[var(--color-surface-shell)] border-y border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest block mb-4">Pricing</span>
            <h2 className="text-4xl font-bold">Simplified pricing</h2>
            <p className="text-[var(--color-text-secondary)] mt-4">Predictable scaling based on successful agent runs. No hidden token fees.</p>
          </div>

          <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-3xl p-10 flex flex-col md:flex-row gap-12 relative overflow-hidden max-w-4xl mx-auto">
            {/* Left Content */}
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">Startup Plan</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">Perfect for small teams building initial agent workflows.</p>
              
              <div className="flex items-center gap-4 mb-8">
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={pricingSlider} 
                  onChange={(e) => setPricingSlider(Number(e.target.value))}
                  className="flex-1 h-2 bg-[var(--color-surface-elevated)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[var(--color-accent-primary)] [&::-webkit-slider-thumb]:rounded-full"
                />
                <div className="w-16 text-right font-mono font-bold text-xl text-white">{pricingSlider}K</div>
              </div>

              <div className="flex items-end gap-2 mb-8">
                <span className="text-6xl font-extrabold tracking-tighter text-white">${Math.floor(pricingSlider * 1.9)}</span>
                <span className="text-[var(--color-text-secondary)] mb-2">/ month</span>
              </div>

              <button className="w-full py-4 rounded-xl bg-[var(--color-accent-primary)] text-white font-bold mb-8 hover:bg-[var(--color-accent-secondary)] transition-colors cursor-pointer">
                Start free trial
              </button>

              <div className="space-y-4">
                {[
                  '100% Data Ownership',
                  'Export Traces Anytime',
                  'Unlimited Seats',
                  'No Credit Card Required'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] font-medium">
                    <Check className="w-4 h-4 text-[var(--color-status-complete)]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Placeholder */}
            <div className="hidden md:flex flex-1 relative border-l border-[var(--color-border-subtle)] pl-12 items-center justify-center">
              <div className="w-[300px] h-[300px] rounded-full border border-[var(--color-border-strong)] relative flex items-center justify-center">
                {/* Mock globe representation */}
                <div className="w-[200px] h-[200px] rounded-full border border-[var(--color-border-strong)] absolute" />
                <div className="w-[100px] h-[100px] rounded-full border border-[var(--color-border-strong)] absolute" />
                <div className="w-full h-full rounded-full border border-[var(--color-border-strong)] absolute rotate-45" />
                <div className="w-full h-full rounded-full border border-[var(--color-border-strong)] absolute -rotate-45" />
                
                {/* Active node */}
                <div className="w-4 h-4 bg-[var(--color-accent-primary)] rounded-full shadow-[0_0_20px_#4ea7ff] z-10 absolute right-12 top-1/3" />
                
                <div className="absolute -bottom-4 bg-[var(--color-surface-elevated)] px-4 py-2 rounded-lg border border-[var(--color-border-subtle)] text-xs font-mono text-[var(--color-text-primary)]">
                  us-east-1 connected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest block mb-4">FAQ</span>
            <h2 className="text-4xl font-bold">Frequently asked questions</h2>
          </div>

          <div className="border-t border-[var(--color-border-subtle)]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--color-border-subtle)]">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left cursor-pointer hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <Plus className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-45 text-[var(--color-accent-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-[var(--color-text-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section className="py-24 relative overflow-hidden">
        {/* Background rounded shape at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[300px] bg-[var(--color-surface-shell)] rounded-t-[100%] border-t border-[var(--color-border-subtle)] -z-10" />
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[100%] h-[300px] bg-[var(--color-surface-elevated)] rounded-t-[100%] border-t border-[var(--color-border-subtle)] -z-10" />

        <div className="max-w-3xl mx-auto px-6 text-center bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-3xl p-12 md:p-16 shadow-2xl relative z-10">
          <h2 className="text-4xl font-bold mb-6">Start auditing your AI runs today</h2>
          <p className="text-[var(--color-text-secondary)] mb-10 text-lg">Join 10,000+ teams shipping reliable agentic workflows.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onEnterDashboard}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-secondary)] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(78,167,255,0.3)] cursor-pointer"
            >
              Start free trial
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold transition-all hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer">
              <Play className="w-4 h-4 fill-black" />
              View demo
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="pt-12 pb-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-base)] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          {/* Logo Column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <div className="w-6 h-6 rounded bg-[var(--color-accent-primary)] flex items-center justify-center text-white font-bold font-mono text-xs">
                J
              </div>
              <span className="font-bold tracking-tight text-white">JcurveIQ</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              The observability platform that focuses on your bottom line. Stop guessing, start growing.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-status-complete)] bg-[var(--color-status-complete)]/10 px-3 py-1.5 rounded-full inline-flex border border-[var(--color-status-complete)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--color-status-complete)] animate-[pulse-dot_1.5s_infinite]" />
              All systems operational
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Documentation', 'Changelog'] },
              { title: 'Resources', links: ['Blog', 'Case Studies', 'Community', 'Help Center'] },
              { title: 'Company', links: ['About', 'Careers', 'Contact', 'Partners'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Status'] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold mb-4 text-sm text-white">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
