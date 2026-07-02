import { useState } from 'react';
import { Plus, Calendar, DollarSign, Filter } from 'lucide-react';
import { PageHeader, StatCard } from '../components/Layout';
import { useDemoToast } from '../components/DemoToast';
import { leads, bookings, lifecycleStages } from '../data/mockData';

const leadStatusStyles: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-slate-500/20 text-slate-300',
  qualified: 'bg-amber-500/20 text-amber-400',
  proposal: 'bg-violet-500/20 text-violet-400',
  won: 'bg-emerald-500/20 text-emerald-400',
  lost: 'bg-red-500/20 text-red-400',
};

const bookingStatusStyles: Record<string, string> = {
  scheduled: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
  'no-show': 'bg-amber-500/20 text-amber-400',
};

const sourceLabels: Record<string, string> = {
  call: 'Phone Call',
  whatsapp: 'WhatsApp',
  website: 'Website',
  referral: 'Referral',
};

export function LeadsBookings() {
  const [tab, setTab] = useState<'leads' | 'bookings'>('leads');
  const { show, Toast } = useDemoToast();

  const pipelineValue = leads.reduce((sum, l) => sum + l.value, 0);
  const wonValue = leads.filter((l) => l.status === 'won').reduce((sum, l) => sum + l.value, 0);

  return (
    <div className="h-full flex flex-col animate-slide-up">
      {Toast}
      <PageHeader
        title="Leads & Bookings"
        subtitle="Pipeline management · Scheduling"
        actions={
          <button
            onClick={() => show(tab === 'leads' ? 'New lead form opened' : 'New booking form opened')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            {tab === 'leads' ? 'Add Lead' : 'New Booking'}
          </button>
        }
      />

      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Active Leads" value={leads.length} />
          <StatCard label="Pipeline Value" value={`$${(pipelineValue / 1000).toFixed(1)}k`} accent="text-brand-400" />
          <StatCard label="Won This Month" value={`$${(wonValue / 1000).toFixed(1)}k`} accent="text-emerald-400" />
          <StatCard label="Upcoming Bookings" value={bookings.filter((b) => b.status === 'scheduled').length} accent="text-amber-400" />
        </div>

        <div className="flex items-center gap-1 bg-surface-800 rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab('leads')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'leads' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Leads Pipeline
          </button>
          <button
            onClick={() => setTab('bookings')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'bookings' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bookings Calendar
          </button>
        </div>

        {tab === 'leads' ? (
          <div className="bg-surface-700 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Lead Pipeline</h3>
              <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="text-[10px] text-slate-500 uppercase tracking-wide border-b border-slate-700/50">
                  <th className="text-left px-5 py-2.5 font-medium">Lead</th>
                  <th className="text-left px-3 py-2.5 font-medium">Source</th>
                  <th className="text-left px-3 py-2.5 font-medium">Status</th>
                  <th className="text-left px-3 py-2.5 font-medium">Lifecycle</th>
                  <th className="text-left px-3 py-2.5 font-medium">Agent</th>
                  <th className="text-right px-3 py-2.5 font-medium">Value</th>
                  <th className="text-right px-5 py-2.5 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {leads.map((lead) => {
                  const lifecycle = lifecycleStages.find((s) => s.id === lead.lifecycle);
                  return (
                    <tr key={lead.id} className="hover:bg-surface-600/30 transition-colors cursor-pointer">
                      <td className="px-5 py-3">
                        <p className="text-sm text-white font-medium">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.company}</p>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-400">{sourceLabels[lead.source]}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${leadStatusStyles[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        {lifecycle && (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${lifecycle.color}`}>
                            {lifecycle.label}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-300">{lead.assignedAgent}</td>
                      <td className="px-3 py-3 text-sm text-white text-right font-medium">
                        <span className="inline-flex items-center gap-0.5">
                          <DollarSign className="w-3 h-3 text-emerald-400" />
                          {lead.value.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-400 text-right">{lead.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-surface-700 rounded-xl border border-slate-700/50 p-5 hover:border-brand-500/20 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{booking.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{booking.customerName}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${bookingStatusStyles[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-400" />
                    {booking.date} · {booking.time}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600/50">
                  <span className="text-xs text-slate-500 capitalize">{booking.type}</span>
                  <span className="text-xs text-slate-400">{booking.agent}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
