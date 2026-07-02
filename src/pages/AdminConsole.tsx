import { Plus, RefreshCw, Server } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { TrunkStatus } from '../components/StatusBadge';
import { extensions, sipTrunks } from '../data/mockData';

const typeLabels: Record<string, string> = {
  agent: 'Agent',
  queue: 'Queue',
  ivr: 'IVR',
  'ring-group': 'Ring Group',
};

export function AdminConsole() {
  return (
    <div className="h-full flex flex-col animate-slide-up">
      <PageHeader
        title="Admin / PBX Console"
        subtitle="Extensions, SIP trunks, and system configuration"
        actions={
          <>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-700 border border-slate-600 text-slate-300 text-sm rounded-lg hover:bg-surface-600 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Extension
            </button>
          </>
        }
      />

      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-auto">
        <div className="bg-surface-700 rounded-xl border border-slate-700/50">
          <div className="px-5 py-3 border-b border-slate-700/50 flex items-center gap-2">
            <Server className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-semibold text-white">SIP Trunks</h3>
            <span className="ml-auto text-xs text-slate-500">{sipTrunks.length} trunks configured</span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-slate-700/30">
            {sipTrunks.map((trunk) => (
              <div key={trunk.id} className="bg-surface-700 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{trunk.name}</p>
                    <p className="text-xs text-slate-400">{trunk.provider} · {trunk.country}</p>
                  </div>
                  <TrunkStatus status={trunk.status} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Channels</p>
                    <p className="text-sm font-medium text-white">{trunk.channels.used}/{trunk.channels.max}</p>
                    <div className="h-1 bg-surface-600 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${(trunk.channels.used / trunk.channels.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Latency</p>
                    <p className={`text-sm font-medium ${parseInt(trunk.latency) > 100 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {trunk.latency}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Uptime</p>
                    <p className="text-sm font-medium text-emerald-400">99.9%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-700 rounded-xl border border-slate-700/50">
          <div className="px-5 py-3 border-b border-slate-700/50">
            <h3 className="text-sm font-semibold text-white">Extensions & Routing</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-[10px] text-slate-500 uppercase tracking-wide border-b border-slate-700/50">
                <th className="text-left px-5 py-2.5 font-medium">Extension</th>
                <th className="text-left px-3 py-2.5 font-medium">Name</th>
                <th className="text-left px-3 py-2.5 font-medium">Type</th>
                <th className="text-left px-3 py-2.5 font-medium">Status</th>
                <th className="text-left px-5 py-2.5 font-medium">SIP Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {extensions.map((ext) => (
                <tr key={ext.id} className="hover:bg-surface-600/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-brand-400">{ext.number}</td>
                  <td className="px-3 py-3 text-sm text-white">{ext.name}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 bg-surface-600 text-slate-300 text-xs rounded">
                      {typeLabels[ext.type]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      ext.status === 'online' ? 'text-emerald-400' :
                      ext.status === 'busy' ? 'text-blue-400' : 'text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        ext.status === 'online' ? 'bg-emerald-400' :
                        ext.status === 'busy' ? 'bg-blue-400' : 'bg-slate-500'
                      }`} />
                      {ext.status.charAt(0).toUpperCase() + ext.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {ext.sipRegistered ? (
                      <span className="text-xs text-emerald-400">Registered</span>
                    ) : (
                      <span className="text-xs text-slate-500">Not registered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'IVR Builder', desc: 'Visual drag-and-drop call flow designer', status: 'Active' },
            { title: 'Ring Groups', desc: '3 ring groups configured', status: 'Active' },
            { title: 'Call Recording', desc: 'Auto-record all queues · 30-day retention', status: 'Active' },
            { title: 'WhatsApp Business', desc: 'Unified messaging channel connected', status: 'Active' },
            { title: 'AI Voice Engine', desc: 'GPT-4o realtime · 34 calls today', status: 'Active' },
            { title: 'Billing Module', desc: 'Usage-based metering enabled', status: 'Beta' },
          ].map((item) => (
            <div key={item.title} className="bg-surface-700 rounded-xl border border-slate-700/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-white">{item.title}</h4>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
