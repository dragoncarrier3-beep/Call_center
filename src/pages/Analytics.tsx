import { PageHeader, StatCard } from '../components/Layout';
import { queues, dashboardStats } from '../data/mockData';

const hourlyData = [
  { hour: '08', calls: 32, ai: 8 },
  { hour: '09', calls: 58, ai: 14 },
  { hour: '10', calls: 72, ai: 18 },
  { hour: '11', calls: 65, ai: 16 },
  { hour: '12', calls: 48, ai: 12 },
  { hour: '13', calls: 55, ai: 15 },
  { hour: '14', calls: 68, ai: 20 },
];

const maxCalls = Math.max(...hourlyData.map((d) => d.calls));

export function AnalyticsPage() {
  return (
    <div className="h-full flex flex-col animate-slide-up">
      <PageHeader
        title="Analytics & Reporting"
        subtitle="Today's performance overview"
      />

      <div className="flex-1 p-6 space-y-5 overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Calls" value={dashboardStats.callsToday} />
          <StatCard label="Service Level" value={`${dashboardStats.serviceLevel}%`} accent="text-emerald-400" />
          <StatCard label="AI Resolution Rate" value="68%" accent="text-brand-400" sub="34 of 50 AI-handled" />
          <StatCard label="Avg Handle Time" value="4:18" accent="text-amber-400" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Call Volume by Hour</h3>
            <div className="flex items-end gap-2 h-48">
              {hourlyData.map((d) => (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center justify-end h-40 gap-0.5">
                    <div
                      className="w-full bg-brand-600/60 rounded-t"
                      style={{ height: `${(d.calls / maxCalls) * 100}%` }}
                      title={`${d.calls} calls`}
                    />
                    <div
                      className="w-full bg-brand-400/40 rounded-t"
                      style={{ height: `${(d.ai / maxCalls) * 100}%` }}
                      title={`${d.ai} AI`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500">{d.hour}:00</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-600/60" /> Total calls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-400/40" /> AI handled
              </span>
            </div>
          </div>

          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Queue Performance</h3>
            <div className="space-y-4">
              {queues.map((q) => (
                <div key={q.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white">{q.name}</span>
                    <span className="text-xs text-slate-400">{q.answered} calls · SLA {q.sla}%</span>
                  </div>
                  <div className="h-2 bg-surface-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${q.sla >= 95 ? 'bg-emerald-500' : q.sla >= 90 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${q.sla}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Regional Call Distribution</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { region: 'United Kingdom', calls: 186, pct: 38 },
              { region: 'Saudi Arabia', calls: 142, pct: 29 },
              { region: 'Germany', calls: 98, pct: 20 },
              { region: 'Other', calls: 64, pct: 13 },
            ].map((r) => (
              <div key={r.region} className="bg-surface-600 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">{r.region}</p>
                <p className="text-xl font-bold text-white">{r.calls}</p>
                <p className="text-xs text-slate-500">{r.pct}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
