import { Phone, MessageCircle, FileText, Calendar, Target, Tag } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { useDemoToast } from '../components/DemoToast';
import {
  customerProfile, interactionTimeline, callOutcomes,
  lifecycleStages, leads,
} from '../data/mockData';

const typeIcons = {
  call: Phone,
  whatsapp: MessageCircle,
  note: FileText,
  booking: Calendar,
  lead: Target,
};

const typeColors = {
  call: 'text-blue-400 bg-blue-400/10',
  whatsapp: 'text-emerald-400 bg-emerald-400/10',
  note: 'text-slate-400 bg-slate-400/10',
  booking: 'text-amber-400 bg-amber-400/10',
  lead: 'text-violet-400 bg-violet-400/10',
};

export function Customer360() {
  const { show, Toast } = useDemoToast();
  const lead = leads.find((l) => l.name === customerProfile.name);

  return (
    <div className="h-full flex flex-col animate-slide-up">
      {Toast}
      <PageHeader
        title="Customer 360°"
        subtitle="Unified profile · All interactions in one view"
      />

      <div className="flex-1 p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 overflow-auto">
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-brand-600/20 border-2 border-brand-500/30 flex items-center justify-center text-lg font-bold text-brand-300">
                JP
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{customerProfile.name}</p>
                <p className="text-sm text-slate-400">{customerProfile.company}</p>
                <p className="text-xs text-slate-500 mt-1">{customerProfile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase">Phone</p>
                <p className="text-sm text-white">{customerProfile.phone}</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase">Plan</p>
                <p className="text-sm text-white">{customerProfile.plan}</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase">Since</p>
                <p className="text-sm text-white">{customerProfile.since}</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase">Total Interactions</p>
                <p className="text-sm text-white">{interactionTimeline.length}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Lifecycle Stage
              </p>
              <select
                defaultValue={lead?.lifecycle || 'prospect'}
                onChange={() => show('Lifecycle stage updated')}
                className="w-full bg-surface-600 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
              >
                {lifecycleStages.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {customerProfile.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-surface-600 text-slate-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => show('Add tag dialog opened')}
                  className="px-2 py-0.5 border border-dashed border-slate-600 text-slate-500 text-xs rounded-full hover:border-brand-500 hover:text-brand-400 transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Notes</p>
              <p className="text-sm text-slate-300 leading-relaxed">{customerProfile.notes}</p>
            </div>
          </div>

          {lead && (
            <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Linked Lead</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{lead.id}</p>
                  <p className="text-xs text-slate-400 capitalize">{lead.status} · ${lead.value.toLocaleString()}</p>
                </div>
                <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded capitalize">{lead.status}</span>
              </div>
            </div>
          )}
        </div>

        <div className="xl:col-span-8">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50">
            <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Interaction Timeline</h3>
              <span className="text-xs text-slate-500">Calls · WhatsApp · Notes · Bookings · Leads</span>
            </div>
            <div className="p-5 space-y-0">
              {interactionTimeline.map((item, i) => {
                const Icon = typeIcons[item.type];
                return (
                  <div key={item.id} className="flex gap-4 relative">
                    {i < interactionTimeline.length - 1 && (
                      <div className="absolute left-[17px] top-10 bottom-0 w-px bg-slate-700" />
                    )}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${typeColors[item.type]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <span className="text-xs text-slate-500">{item.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-slate-500">{item.agent}</span>
                        {item.outcome && (
                          <span className="px-2 py-0.5 bg-surface-600 text-slate-300 text-[10px] rounded capitalize">
                            {callOutcomes.find((o) => o.id === item.outcome)?.label || item.outcome}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
