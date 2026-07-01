import { Clock, Phone, PhoneMissed, TrendingUp } from 'lucide-react';
import { PageHeader, StatCard } from '../components/Layout';
import { StatusBadge } from '../components/StatusBadge';
import { agents, queues, dashboardStats } from '../data/mockData';

export function SupervisorWallboard() {
  return (
    <div className="h-full flex flex-col animate-slide-up">
      <PageHeader
        title="Supervisor Wallboard"
        subtitle="Real-time monitoring · Updated live"
        actions={
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring" />
            Live
          </span>
        }
      />

      <div className="flex-1 p-6 space-y-5 overflow-auto">
        <div className="grid grid-cols-5 gap-4">
          <StatCard label="Active Calls" value={dashboardStats.activeCalls} accent="text-blue-400" />
          <StatCard label="Calls Today" value={dashboardStats.callsToday} />
          <StatCard label="Avg Wait Time" value={dashboardStats.avgWaitTime} accent="text-amber-400" />
          <StatCard label="Service Level" value={`${dashboardStats.serviceLevel}%`} accent="text-emerald-400" />
          <StatCard label="AI Resolved" value={dashboardStats.aiResolved} sub={`${dashboardStats.aiHandoffRate}% handoff`} accent="text-brand-400" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50">
            <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Queue Status</h3>
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <div className="divide-y divide-slate-700/50">
              {queues.map((q) => (
                <div key={q.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white">{q.name}</p>
                      {q.waiting > 3 && (
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded font-medium">
                          HIGH WAIT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {q.answered} answered
                      </span>
                      <span className="flex items-center gap-1">
                        <PhoneMissed className="w-3 h-3" />
                        {q.abandoned} abandoned
                      </span>
                    </div>
                  </div>
                  <div className="text-center px-3">
                    <p className={`text-2xl font-bold ${q.waiting > 3 ? 'text-red-400' : 'text-white'}`}>
                      {q.waiting}
                    </p>
                    <p className="text-[10px] text-slate-500">waiting</p>
                  </div>
                  <div className="text-center px-3">
                    <p className="text-sm font-mono text-amber-400">{q.longestWait}</p>
                    <p className="text-[10px] text-slate-500">longest</p>
                  </div>
                  <div className="text-center px-3">
                    <p className="text-sm font-medium text-white">{q.agentsAvailable}/{q.agentsTotal}</p>
                    <p className="text-[10px] text-slate-500">agents</p>
                  </div>
                  <div className="w-16">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500">SLA</span>
                      <span className={`text-xs font-medium ${q.sla >= 95 ? 'text-emerald-400' : q.sla >= 90 ? 'text-amber-400' : 'text-red-400'}`}>
                        {q.sla}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${q.sla >= 95 ? 'bg-emerald-500' : q.sla >= 90 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${q.sla}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-700 rounded-xl border border-slate-700/50">
            <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Agent Status</h3>
              <TrendingUp className="w-4 h-4 text-slate-500" />
            </div>
            <div className="overflow-auto max-h-[340px]">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] text-slate-500 uppercase tracking-wide">
                    <th className="text-left px-5 py-2 font-medium">Agent</th>
                    <th className="text-left px-3 py-2 font-medium">Ext</th>
                    <th className="text-left px-3 py-2 font-medium">Queue</th>
                    <th className="text-left px-3 py-2 font-medium">Status</th>
                    <th className="text-right px-5 py-2 font-medium">Calls</th>
                    <th className="text-right px-5 py-2 font-medium">AHT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-surface-600/30 transition-colors">
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-[10px] font-bold text-brand-300">
                            {agent.avatar}
                          </div>
                          <span className="text-sm text-white">{agent.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-sm text-slate-400 font-mono">{agent.extension}</td>
                      <td className="px-3 py-2.5 text-sm text-slate-400">{agent.queue}</td>
                      <td className="px-3 py-2.5"><StatusBadge status={agent.status} /></td>
                      <td className="px-5 py-2.5 text-sm text-white text-right">{agent.callsToday}</td>
                      <td className="px-5 py-2.5 text-sm text-slate-400 text-right font-mono">{agent.avgHandleTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
