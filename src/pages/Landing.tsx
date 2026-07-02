import { Link } from 'react-router-dom';
import {
  Headphones, LayoutDashboard, Settings, PhoneCall,
  Bot, Shield, Zap, ArrowRight, MessageCircle,
  Users, Target, BarChart3,
} from 'lucide-react';

const features = [
  { icon: PhoneCall, title: 'SIP Trunking', desc: 'Multi-region SIP with UK, Saudi, Germany support' },
  { icon: Bot, title: 'AI Voice Agent', desc: 'Intelligent IVR with seamless human handoff' },
  { icon: Headphones, title: 'Agent Desktop', desc: 'Full softphone with CRM, notes, and transfers' },
  { icon: MessageCircle, title: 'WhatsApp Business', desc: 'Unified inbox linked to Customer 360°' },
  { icon: Users, title: 'Customer 360°', desc: 'Unified profile with calls, messages, and timeline' },
  { icon: Target, title: 'Leads & Bookings', desc: 'Pipeline management and scheduling' },
  { icon: LayoutDashboard, title: 'Supervisor Wallboard', desc: 'Real-time queues, SLA, and agent monitoring' },
  { icon: BarChart3, title: 'Analytics & Reports', desc: 'Agent performance, customer reports, CSV/PDF export' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Role-based access, encryption, audit logs' },
];

const demos = [
  { to: '/agent', icon: Headphones, label: 'Agent Desktop', color: 'bg-blue-600' },
  { to: '/supervisor', icon: LayoutDashboard, label: 'Supervisor', color: 'bg-emerald-600' },
  { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp Inbox', color: 'bg-green-600' },
  { to: '/customers', icon: Users, label: 'Customer 360°', color: 'bg-cyan-600' },
  { to: '/leads', icon: Target, label: 'Leads & Bookings', color: 'bg-orange-600' },
  { to: '/admin', icon: Settings, label: 'Admin / PBX', color: 'bg-violet-600' },
  { to: '/calls', icon: PhoneCall, label: 'Call History', color: 'bg-amber-600' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', color: 'bg-pink-600' },
];

const milestones = [
  { m: 'M1', title: 'Infrastructure', items: 'Server, DB, Auth, SIP, WhatsApp' },
  { m: 'M2', title: 'Customer 360°', items: 'Profile, history, outcomes, tagging' },
  { m: 'M3', title: 'Agent Ops', items: 'Dashboard, calls, leads, bookings' },
  { m: 'M4', title: 'Analytics', items: 'Reports, agent perf, exports' },
  { m: 'M5', title: 'Go-Live', items: 'Testing, optimization, deployment' },
];

export function Landing() {
  return (
    <div className="min-h-full bg-surface-900">
      <header className="border-b border-slate-700/50 bg-surface-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-white">CallCenter Pro</p>
              <p className="text-[10px] text-slate-500">Enterprise VoIP + AI Platform</p>
            </div>
          </div>
          <Link
            to="/agent"
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Enter Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/10 border border-brand-500/20 rounded-full text-xs text-brand-400 font-medium mb-6">
          <Zap className="w-3 h-3" />
          Production-ready base platform
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Next-generation call center<br />
          <span className="text-brand-400">with AI voice built in</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Enterprise-grade VoIP platform with SIP trunking, WhatsApp Business,
          Customer 360°, lead management, and multi-region support.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16">
          {demos.map(({ to, icon: Icon, label, color }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-3 p-5 bg-surface-800 border border-slate-700/50 rounded-xl hover:border-brand-500/30 hover:bg-surface-700 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-xl font-semibold text-white text-center mb-6">Project Milestones</h2>
        <div className="grid md:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {milestones.map(({ m, title, items }) => (
            <div key={m} className="p-4 bg-surface-800 border border-slate-700/50 rounded-xl text-center">
              <span className="inline-block px-2 py-0.5 bg-brand-600/20 text-brand-400 text-xs font-bold rounded mb-2">{m}</span>
              <p className="text-sm font-semibold text-white mb-1">{title}</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">{items}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold text-white text-center mb-8">Platform Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 bg-surface-800 border border-slate-700/50 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-brand-600/15 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-brand-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-700/50 py-6 text-center">
        <p className="text-xs text-slate-500">
          CallCenter Pro Demo · Enterprise VoIP + AI Voice Platform
        </p>
      </footer>
    </div>
  );
}
