import { Settings as SettingsIcon, Database, LayoutPanelLeft, Check, Key } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export function Settings() {
  const [activeTab, setActiveTab] = useState('workspace');
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText('ws_9872jf920');
    addToast('Workspace ID copied to clipboard', 'success');
  };

  const handleSave = () => {
    addToast('Settings saved successfully', 'success');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border-subtle)] pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('workspace')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'workspace' 
                ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)] border border-transparent cursor-pointer'
            }`}
          >
            <LayoutPanelLeft className={`w-4 h-4 ${activeTab === 'workspace' ? 'text-[var(--color-accent-primary)]' : ''}`} /> Workspace
          </button>
          <button 
            onClick={() => setActiveTab('keys')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'keys' 
                ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)] border border-transparent cursor-pointer'
            }`}
          >
            <Key className={`w-4 h-4 ${activeTab === 'keys' ? 'text-[var(--color-accent-primary)]' : ''}`} /> Keys & Access
          </button>
          <button 
            onClick={() => setActiveTab('models')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'models' 
                ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)] border border-transparent cursor-pointer'
            }`}
          >
            <Database className={`w-4 h-4 ${activeTab === 'models' ? 'text-[var(--color-accent-primary)]' : ''}`} /> Agent Models
          </button>
          <button 
            onClick={() => setActiveTab('preferences')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'preferences' 
                ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)] border border-transparent cursor-pointer'
            }`}
          >
            <SettingsIcon className={`w-4 h-4 ${activeTab === 'preferences' ? 'text-[var(--color-accent-primary)]' : ''}`} /> Preferences
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          {/* Workspace Section */}
          {activeTab === 'workspace' && (
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl overflow-hidden shadow-sm animate-fade-in">
              <div className="px-6 py-5 border-b border-[var(--color-border-subtle)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Workspace Profile</h2>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Manage your team's workspace details.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Workspace Name</label>
                    <input 
                      type="text" 
                      defaultValue="Acme Corp Research" 
                      className="w-full bg-[var(--color-surface-base)] border border-[var(--color-border-default)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Plan</label>
                    <div className="relative">
                      <select className="w-full bg-[var(--color-surface-base)] border border-[var(--color-border-default)] rounded-lg px-4 py-2.5 text-sm appearance-none cursor-pointer text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] font-medium transition-colors">
                        <option>Pro — $99/mo</option>
                        <option>Starter — $29/mo</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Workspace ID</label>
                  <div className="flex items-center gap-3 w-full md:w-1/2">
                    <input 
                      type="text" 
                      defaultValue="ws_9872jf920" 
                      readOnly
                      className="flex-1 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-muted)] font-mono outline-none"
                    />
                    <button 
                      onClick={handleCopy}
                      className="px-4 py-2.5 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-lg text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Copy ID
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Keys Section */}
          {activeTab === 'keys' && (
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl overflow-hidden shadow-sm animate-fade-in">
              <div className="px-6 py-5 border-b border-[var(--color-border-subtle)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Keys & Access</h2>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Configure external data sources and LLM providers.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">SEC EDGAR User Agent</label>
                    <input 
                      type="text" 
                      defaultValue="JcurveIQ acme.inc contact@acme.inc" 
                      className="w-full bg-[var(--color-surface-base)] border border-[var(--color-border-default)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">OpenAI API Key</label>
                    <input 
                      type="password" 
                      defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxx3f92" 
                      className="w-full bg-[var(--color-surface-base)] border border-[var(--color-border-default)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] font-mono focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Models Section */}
          {activeTab === 'models' && (
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl overflow-hidden shadow-sm animate-fade-in">
              <div className="px-6 py-5 border-b border-[var(--color-border-subtle)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Agent Models</h2>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Configure LLM endpoints and fine-tuning parameters.</p>
              </div>
              <div className="p-6 text-[var(--color-text-muted)] text-sm">
                No custom models configured yet.
              </div>
            </div>
          )}

          {/* Preferences Section */}
          {activeTab === 'preferences' && (
            <div className="bg-[var(--color-surface-card)] border border-[var(--color-border-default)] rounded-xl overflow-hidden shadow-sm animate-fade-in">
              <div className="px-6 py-5 border-b border-[var(--color-border-subtle)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Agent Preferences</h2>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Control default behaviors for new research runs.</p>
              </div>
              <div className="p-6 space-y-5">
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 border-b border-[var(--color-border-subtle)] pb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Enable live market data</h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Adds ~200ms to runs that require real-time pricing queries.</p>
                  </div>
                  {/* Custom Toggle Switch (On) */}
                  <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none">
                    <span className="absolute mx-auto h-5 w-9 rounded-full bg-[var(--color-accent-primary)] transition-colors duration-200 ease-in-out"></span>
                    <span className="absolute left-0 inline-block h-4 w-4 translate-x-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out"></span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 border-b border-[var(--color-border-subtle)] pb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Auto-retry transient failures</h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Automatically attempt to recover from rate limits and network timeouts.</p>
                  </div>
                  {/* Custom Toggle Switch (On) */}
                  <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none">
                    <span className="absolute mx-auto h-5 w-9 rounded-full bg-[var(--color-accent-primary)] transition-colors duration-200 ease-in-out"></span>
                    <span className="absolute left-0 inline-block h-4 w-4 translate-x-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out"></span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 border-b border-[var(--color-border-subtle)] pb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Strict Dependency Checking</h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Halt parallel groups immediately if a critical dependency fails.</p>
                  </div>
                  {/* Custom Toggle Switch (Off) */}
                  <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none">
                    <span className="absolute mx-auto h-5 w-9 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-strong)] transition-colors duration-200 ease-in-out"></span>
                    <span className="absolute left-0 inline-block h-4 w-4 translate-x-[2px] transform rounded-full bg-[var(--color-text-muted)] shadow-sm transition duration-200 ease-in-out"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Data Residency</h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">Geographic region for stored outputs and agent thoughts.</p>
                  </div>
                  <select className="bg-[var(--color-surface-base)] border border-[var(--color-border-default)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] font-medium outline-none focus:border-[var(--color-accent-primary)] min-w-[150px] cursor-pointer">
                    <option>US East (N. Virginia)</option>
                    <option>EU (Frankfurt)</option>
                  </select>
                </div>

              </div>
            </div>
          )}
          
          {/* Save Action */}
          <div className="flex justify-end gap-3 mt-6 pt-2">
            <button className="px-5 py-2.5 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-card)] text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-secondary)] text-white text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(78,167,255,0.2)]"
            >
              <Check className="w-4 h-4" /> Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}