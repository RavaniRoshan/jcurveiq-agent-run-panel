import React, { useState } from 'react';
import { CommandMenu } from './CommandMenu';
import { 
  LayoutDashboard, 
  Workflow, 
  Radar, 
  Database, 
  Settings, 
  Search,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { useToast } from '../contexts/ToastContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  headerActions?: React.ReactNode;
}

export function DashboardLayout({ children, activePage, onNavigate, headerActions }: DashboardLayoutProps) {
  const { addToast } = useToast();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, section: 'Monitor' },
    { id: 'runs', label: 'Runs', icon: Workflow, section: 'Monitor' },
    { id: 'radar', label: 'Radar', icon: Radar, section: 'Monitor' },
    { id: 'datasets', label: 'Datasets', icon: Database, section: 'Data' },
    { id: 'settings', label: 'Settings', icon: Settings, section: 'Admin' },
  ];

  const getPageTitle = () => {
    if (activePage === 'run_detail') return 'Agent Run Panel';
    const item = navItems.find(i => i.id === activePage);
    return item ? item.label : 'Dashboard';
  };

  // Group nav items
  const monitorItems = navItems.filter(i => i.section === 'Monitor');
  const dataItems = navItems.filter(i => i.section === 'Data');
  const adminItems = navItems.filter(i => i.section === 'Admin');

  return (
    <div className="flex h-screen bg-[var(--color-surface-shell)] text-[var(--color-text-primary)] font-sans overflow-hidden">
      <CommandMenu onNavigate={onNavigate} />

      {/* Sidebar */}
      <aside className={`flex-shrink-0 flex flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-shell)] z-20 transition-[width] duration-300 ${isSidebarCollapsed ? 'w-[72px]' : 'w-[248px]'}`}>
        {/* Logo Area */}
        <div className={`py-6 mb-2 flex flex-col ${isSidebarCollapsed ? 'px-2 items-center' : 'px-6'}`}>
          <div className={`flex items-center w-full ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-primary)] flex items-center justify-center text-white font-bold font-mono shadow-[0_0_10px_rgba(78,167,255,0.3)] text-sm shrink-0">
                J
              </div>
              {!isSidebarCollapsed && <span className="text-base font-semibold tracking-tight whitespace-nowrap animate-fade-in">JcurveIQ</span>}
            </div>
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer ${isSidebarCollapsed ? 'hidden' : 'block animate-fade-in'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          
          {isSidebarCollapsed && (
            <button 
              onClick={() => setIsSidebarCollapsed(false)}
              className="mt-6 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer animate-fade-in"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {!isSidebarCollapsed && (
            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] animate-fade-in">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-complete)] animate-pulse-dot shrink-0" />
               <span className="text-[11px] font-medium text-[var(--color-text-secondary)] whitespace-nowrap">Acme Workspace</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-6 overflow-y-auto custom-scrollbar ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
          <div>
            {!isSidebarCollapsed && <h3 className="px-2 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 animate-fade-in">Monitor</h3>}
            {isSidebarCollapsed && <div className="h-px bg-[var(--color-border-subtle)] mx-2 mb-2 mt-4 first:hidden animate-fade-in" />}
            <div className="space-y-1">
              {monitorItems.map((item) => {
                const isActive = activePage === item.id || (activePage === 'run_detail' && item.id === 'runs');
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-subtle)]'
                        : 'text-[var(--color-text-secondary)] border border-transparent hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--color-accent-primary)]' : ''}`} />
                    {!isSidebarCollapsed && <span className="whitespace-nowrap animate-fade-in">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {!isSidebarCollapsed && <h3 className="px-2 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 animate-fade-in">Data</h3>}
            {isSidebarCollapsed && <div className="h-px bg-[var(--color-border-subtle)] mx-2 mb-2 mt-4 first:hidden animate-fade-in" />}
            <div className="space-y-1">
              {dataItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-subtle)]'
                        : 'text-[var(--color-text-secondary)] border border-transparent hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--color-accent-primary)]' : ''}`} />
                    {!isSidebarCollapsed && <span className="whitespace-nowrap animate-fade-in">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {!isSidebarCollapsed && <h3 className="px-2 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 animate-fade-in">Admin</h3>}
            {isSidebarCollapsed && <div className="h-px bg-[var(--color-border-subtle)] mx-2 mb-2 mt-4 first:hidden animate-fade-in" />}
            <div className="space-y-1">
              {adminItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-subtle)]'
                        : 'text-[var(--color-text-secondary)] border border-transparent hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--color-accent-primary)]' : ''}`} />
                    {!isSidebarCollapsed && <span className="whitespace-nowrap animate-fade-in">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
        
        {/* Footer Hint */}
        <div className={`p-4 mt-auto ${isSidebarCollapsed ? 'px-2' : ''}`}>
          <div 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer`}
            title={isSidebarCollapsed ? 'Search (Ctrl+K)' : undefined}
          >
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} text-[var(--color-text-muted)]`}>
              <Search className="w-3.5 h-3.5 shrink-0" />
              {!isSidebarCollapsed && <span className="text-xs font-medium whitespace-nowrap animate-fade-in">Search</span>}
            </div>
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-1 shrink-0 animate-fade-in">
                <kbd className="font-mono text-[9px] bg-[var(--color-surface-elevated)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">Ctrl</kbd>
                <kbd className="font-mono text-[9px] bg-[var(--color-surface-elevated)] px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)]">K</kbd>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[var(--color-surface-base)] relative rounded-tl-2xl border-t border-l border-[var(--color-border-subtle)] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-base)]/80 backdrop-blur-md flex-shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            {activePage === 'run_detail' ? (
               <div className="flex items-center gap-2 text-sm">
                 <button onClick={() => onNavigate('runs')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer font-medium">Runs</button>
                 <span className="text-[var(--color-border-strong)]">/</span>
                 <span className="font-semibold text-[var(--color-text-primary)]">{getPageTitle()}</span>
               </div>
            ) : (
              <h1 className="text-lg font-semibold tracking-tight">{getPageTitle()}</h1>
            )}
          </div>
          
          <div className="flex items-center gap-5">
            {headerActions && <div>{headerActions}</div>}
            
            <button 
              onClick={() => addToast('No new notifications', 'info')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            
            <div className="w-px h-5 bg-[var(--color-border-subtle)] mx-1" />
            
            <div 
              onClick={() => addToast('Opened user profile menu', 'info')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-xs font-semibold leading-tight text-[var(--color-text-primary)]">Alex Kim</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                AK
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}