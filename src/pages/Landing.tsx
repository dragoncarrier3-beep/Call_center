import { Link } from 'react-router-dom';
import {
  Headphones, LayoutDashboard, Settings, PhoneCall,
  Bot, Globe, Shield, Zap, ArrowRight,
} from 'lucide-react';

const features = [
  { icon: PhoneCall, title: 'SIP Trunking', desc: 'Multi-region SIP with UK, Saudi, Germany support' },
  { icon: Bot, title: 'AI Voice Agent', desc: 'Intelligent IVR with seamless human handoff' },
  { icon: Headphones, title: 'Agent Desktop', desc: 'Full softphone with CRM, notes, and transfers' },
  { icon: LayoutDashboard, title: 'Supervisor Wallboard', desc: 'Real-time queues, SLA, and agent monitoring' },
  { icon: Globe, title: 'WhatsApp Integration', desc: 'Unified inbox for voice and messaging' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Role-based access, encryption, audit logs' },
];

const demos = [
  { to: '/agent', icon: Headphones, label: 'Agent Desktop', color: 'bg-blue-600' },
  { to: '/supervisor', icon: LayoutDashboard, label: 'Supervisor Wallboard', color: 'bg-emerald-600' },
  { to: '/admin', icon: Settings, label: 'Admin / PBX Console', color: 'bg-violet-600' },
  { to: '/calls', icon: PhoneCall, label: 'Call History & CRM', color: 'bg-amber-600' },
];

export function Landing() {
  return (
    <div className="min-h-full bg-surface-900">
      <header className="border-b border-slate-700/50 bg-surface-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/10 border border-brand-500/20 rounded-full text-xs text-brand-400 font-medium mb-6">
          <Zap className="w-3 h-3" />
          Production-ready base platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Next-generation call center<br />
          <span className="text-brand-400">with AI voice built in</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Enterprise-grade VoIP platform with SIP trunking, intelligent AI assistants,
          agent dashboards, and multi-region support — built for scale.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16">
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
          CallCenter Pro Demo · Built by Tran Nam · VoIP + AI Voice Platform
        </p>
      </footer>
    </div>
  );
}
