import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Headphones, LayoutDashboard, Settings,
  PhoneCall, BarChart3, Bot, Bell,
  MessageCircle, Target, Users,
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

export function Layout() {
  return (
    <div className="flex h-full">
      <aside className="w-60 bg-surface-800 border-r border-slate-700/50 flex flex-col shrink-0">
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

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-600/15 text-brand-400 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-surface-700'
                }`
              }
            >
              <Icon className="w-4 h-4" />
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
              TN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Tran Nam</p>
              <p className="text-[10px] text-slate-500">Ext. 101 · Admin</p>
            </div>
            <button className="relative p-1 text-slate-400 hover:text-slate-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
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
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-surface-800/50">
      <div>
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
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
      <p className={`text-2xl font-bold ${accent || 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
