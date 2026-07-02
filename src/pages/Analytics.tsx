import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { PageHeader, StatCard } from '../components/Layout';
import { useDemoToast } from '../components/DemoToast';
import { queues, dashboardStats, agentPerformance, customerReports } from '../data/mockData';

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
  const { show, Toast } = useDemoToast();

  return (
    <div className="h-full flex flex-col animate-slide-up">
      {Toast}
      <PageHeader
        title="Analytics & Reporting"
        subtitle="Today's performance overview"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => show('CSV report exported')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-700 border border-slate-600 text-slate-300 text-sm rounded-lg hover:bg-surface-600 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={() => show('PDF report generated')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>
        }
      />

      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total Calls" value={dashboardStats.callsToday} />
          <StatCard label="Service Level" value={`${dashboardStats.serviceLevel}%`} accent="text-emerald-400" />
          <StatCard label="AI Resolution Rate" value="68%" accent="text-brand-400" sub="34 of 50 AI-handled" />
          <StatCard label="Avg Handle Time" value="4:18" accent="text-amber-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
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

        <div className="bg-surface-700 rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Agent Performance</h3>
            <button
              onClick={() => show('Agent report exported')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
            >
              <FileText className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-[10px] text-slate-500 uppercase tracking-wide border-b border-slate-700/50">
                <th className="text-left px-5 py-2.5 font-medium">Agent</th>
                <th className="text-right px-3 py-2.5 font-medium">Calls</th>
                <th className="text-right px-3 py-2.5 font-medium">AHT</th>
                <th className="text-right px-3 py-2.5 font-medium">Conversion</th>
                <th className="text-right px-3 py-2.5 font-medium">Leads Won</th>
                <th className="text-right px-5 py-2.5 font-medium">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {agentPerformance.map((a) => (
                <tr key={a.agent} className="hover:bg-surface-600/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-[10px] font-bold text-brand-300">
                        {a.avatar}
                      </div>
                      <span className="text-sm text-white">{a.agent}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-white text-right">{a.callsHandled}</td>
                  <td className="px-3 py-3 text-sm text-slate-400 text-right font-mono">{a.avgHandleTime}</td>
                  <td className="px-3 py-3 text-sm text-emerald-400 text-right">{a.conversionRate}%</td>
                  <td className="px-3 py-3 text-sm text-white text-right">{a.leadsWon}</td>
                  <td className="px-5 py-3 text-sm text-amber-400 text-right">{a.satisfaction}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Regional Call Distribution</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
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

          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Customer Reports</h3>
              <button
                onClick={() => show('Customer report exported')}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
              >
                <FileText className="w-3.5 h-3.5" /> Export
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              <div className="bg-surface-600 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">{customerReports.newCustomers}</p>
                <p className="text-[10px] text-slate-500">New</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-brand-400">{customerReports.returningCustomers}</p>
                <p className="text-[10px] text-slate-500">Returning</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-400">{customerReports.churned}</p>
                <p className="text-[10px] text-slate-500">Churned</p>
              </div>
            </div>
            <h4 className="text-xs text-slate-400 mb-2">Lifecycle Distribution</h4>
            <div className="space-y-2">
              {customerReports.lifecycleDistribution.map((item) => (
                <div key={item.stage} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-16">{item.stage}</span>
                  <div className="flex-1 h-2 bg-surface-600 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="text-xs text-slate-500 w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
