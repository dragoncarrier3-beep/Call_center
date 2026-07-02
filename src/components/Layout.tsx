import { useState, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Headphones, LayoutDashboard, Settings,
  PhoneCall, BarChart3, Bot, Bell,
  MessageCircle, Target, Users, Menu, X,
} from 'lucide-react';
import { dashboardStats } from '../data/mockData';

const navItems = [
  { to: '/agent', icon: Headphones, label: 'Agent Desktop' },
  { to: '/supervisor', icon: LayoutDashboard, label: 'Supervisor' },
  { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp Inbox' },
  { to: '/customers', icon: Users, label: 'Customer 360°' },
  { to: '/leads', icon: Target, label: 'Leads & Bookings' },
  { to: '/calls', icon: PhoneCall, label: 'Call History' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin', icon: Settings, label: 'Admin / PBX' },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <PhoneCall className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">CallCenter Pro</p>
            <p className="text-[10px] text-slate-500">Enterprise Edition</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-brand-600/15 text-brand-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-700'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700/50">
        <div className="bg-surface-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-medium text-slate-300">AI Assistant</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <p className="text-[10px] text-slate-500">
            {dashboardStats.aiResolved} calls resolved today · {dashboardStats.aiHandoffRate}% handoff rate
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-slate-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-600/30 border border-brand-500/50 flex items-center justify-center text-xs font-bold text-brand-300">
            SM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Sarah Mitchell</p>
            <p className="text-[10px] text-slate-500">Ext. 101 · Agent</p>
          </div>
          <button type="button" className="relative p-1 text-slate-400 hover:text-slate-200">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </>
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex h-full min-h-0">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 bg-surface-800 border-r border-slate-700/50 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-surface-800 border-r border-slate-700/50 flex flex-col transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end p-3 border-b border-slate-700/50">
          <button
            type="button"
            onClick={closeMobile}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-surface-700"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent onNavigate={closeMobile} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 bg-surface-800 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-surface-700"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm font-semibold text-white truncate">
              {navItems.find((item) => item.to === location.pathname)?.label || 'CallCenter Pro'}
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-slate-700/50 bg-surface-800/50">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5 truncate">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0 flex-wrap">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-xl sm:text-2xl font-bold ${accent || 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
