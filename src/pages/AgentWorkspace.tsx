import { useState } from 'react';
import { Bot, UserCheck, ArrowRightLeft } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { Softphone } from '../components/Softphone';
import { useDemoToast } from '../components/DemoToast';
import { liveTranscript, customerProfile, callOutcomes, lifecycleStages } from '../data/mockData';

export function AgentWorkspace() {
  const [outcome, setOutcome] = useState('');
  const { show, Toast } = useDemoToast();

  return (
    <div className="h-full flex flex-col animate-slide-up">
      {Toast}
      <PageHeader
        title="Agent Desktop"
        subtitle="Sarah Mitchell · Ext. 101 · Sales Queue"
        actions={
          <select className="bg-surface-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none">
            <option>Available</option>
            <option>On Break</option>
            <option>Do Not Disturb</option>
          </select>
        }
      />

      <div className="flex-1 p-6 grid grid-cols-12 gap-5 overflow-auto">
        <div className="col-span-3">
          <Softphone
            callerName="John Patterson"
            callerNumber="+44 7700 900123"
            duration="02:34"
            isActive
          />
        </div>

        <div className="col-span-5 space-y-4">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Customer 360° Profile</h3>
              <span className="px-2 py-0.5 bg-brand-600/20 text-brand-400 text-xs rounded-full">CRM</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-sm font-bold text-brand-300">
                JP
              </div>
              <div>
                <p className="font-semibold text-white">{customerProfile.name}</p>
                <p className="text-sm text-slate-400">{customerProfile.company}</p>
                <p className="text-xs text-slate-500 mt-1">{customerProfile.phone}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Plan</p>
                <p className="text-sm font-medium text-white">{customerProfile.plan}</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Customer Since</p>
                <p className="text-sm font-medium text-white">{customerProfile.since}</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Total Calls</p>
                <p className="text-sm font-medium text-white">{customerProfile.totalCalls}</p>
              </div>
              <div className="bg-surface-600 rounded-lg p-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Last Contact</p>
                <p className="text-sm font-medium text-white">{customerProfile.lastContact}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1.5">Lifecycle Stage</p>
                <select
                  defaultValue="prospect"
                  onChange={() => show('Lifecycle stage updated')}
                  className="w-full bg-surface-600 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {lifecycleStages.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1.5">Call Outcome</p>
                <select
                  value={outcome}
                  onChange={(e) => {
                    setOutcome(e.target.value);
                    if (e.target.value) show('Outcome saved');
                  }}
                  className="w-full bg-surface-600 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="">Select outcome...</option>
                  {callOutcomes.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {customerProfile.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-surface-600 text-slate-300 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Notes</p>
              <p className="text-sm text-slate-300 leading-relaxed">{customerProfile.notes}</p>
            </div>
          </div>

          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Call Notes</h3>
            <textarea
              className="w-full h-24 bg-surface-600 border border-slate-600 rounded-lg p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 resize-none"
              placeholder="Add notes about this call..."
              defaultValue="Customer expanding to Saudi Arabia. Needs Enterprise plan + SIP trunking for Riyadh office."
            />
            <button
              onClick={() => show('Notes saved')}
              className="mt-2 px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors"
            >
              Save Notes
            </button>
          </div>
        </div>

        <div className="col-span-4 space-y-4">
          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-brand-400" />
                <h3 className="text-sm font-semibold text-white">AI Voice — Live Transcript</h3>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
                Live
              </span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {liveTranscript.map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-[10px] text-slate-500 font-mono mt-1 shrink-0">{line.time}</span>
                  <div>
                    <span className={`text-[10px] font-medium uppercase tracking-wide ${
                      line.speaker === 'ai' ? 'text-brand-400' :
                      line.speaker === 'agent' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {line.speaker === 'ai' ? 'AI Assistant' : line.speaker === 'agent' ? 'You' : 'Caller'}
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">{line.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-600/50">
              <button
                onClick={() => show('Agent took over from AI')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-600/20 text-emerald-400 text-xs font-medium rounded-lg hover:bg-emerald-600/30 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Take Over from AI
              </button>
              <button
                onClick={() => show('Returned to AI assistant')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-surface-600 text-slate-300 text-xs font-medium rounded-lg hover:bg-surface-500 transition-colors"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                Return to AI
              </button>
            </div>
          </div>

          <div className="bg-surface-700 rounded-xl border border-slate-700/50 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Schedule Callback', msg: 'Callback scheduled' },
                { label: 'Send WhatsApp', msg: 'WhatsApp composer opened' },
                { label: 'Create Lead', msg: 'Lead created' },
                { label: 'Book Meeting', msg: 'Booking form opened' },
              ].map(({ label, msg }) => (
                <button
                  key={label}
                  onClick={() => show(msg)}
                  className="px-3 py-2 bg-surface-600 hover:bg-surface-500 text-slate-300 text-xs rounded-lg transition-colors text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
