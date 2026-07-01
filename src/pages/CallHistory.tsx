import { Bot, Search, Filter } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { SentimentBadge } from '../components/StatusBadge';
import { callHistory } from '../data/mockData';

const statusStyles: Record<string, string> = {
  completed: 'text-emerald-400 bg-emerald-400/10',
  missed: 'text-red-400 bg-red-400/10',
  transferred: 'text-amber-400 bg-amber-400/10',
  'ai-handled': 'text-brand-400 bg-brand-400/10',
};

export function CallHistoryPage() {
  return (
    <div className="h-full flex flex-col animate-slide-up">
      <PageHeader
        title="Call History & CRM"
        subtitle="Single customer view · All interactions"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search calls, numbers, agents..."
                className="pl-9 pr-3 py-1.5 bg-surface-700 border border-slate-600 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 w-64"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-700 border border-slate-600 text-slate-300 text-sm rounded-lg hover:bg-surface-600 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-surface-700 rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-slate-500 uppercase tracking-wide border-b border-slate-700/50 bg-surface-800/50">
                <th className="text-left px-5 py-3 font-medium">Call ID</th>
                <th className="text-left px-3 py-3 font-medium">Caller</th>
                <th className="text-left px-3 py-3 font-medium">Agent</th>
                <th className="text-left px-3 py-3 font-medium">Queue</th>
                <th className="text-left px-3 py-3 font-medium">Duration</th>
                <th className="text-left px-3 py-3 font-medium">Status</th>
                <th className="text-left px-3 py-3 font-medium">Sentiment</th>
                <th className="text-left px-3 py-3 font-medium">AI</th>
                <th className="text-right px-5 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {callHistory.map((call) => (
                <tr key={call.id} className="hover:bg-surface-600/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3 text-sm font-mono text-brand-400">{call.id}</td>
                  <td className="px-3 py-3">
                    <p className="text-sm text-white">{call.callerName}</p>
                    <p className="text-xs text-slate-500">{call.caller}</p>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-300">{call.agent}</td>
                  <td className="px-3 py-3 text-sm text-slate-400">{call.queue}</td>
                  <td className="px-3 py-3 text-sm font-mono text-slate-300">{call.duration}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${statusStyles[call.status]}`}>
                      {call.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-3 py-3"><SentimentBadge sentiment={call.sentiment} /></td>
                  <td className="px-3 py-3">
                    {call.aiAssisted ? (
                      <Bot className="w-4 h-4 text-brand-400" />
                    ) : (
                      <span className="text-xs text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-400 text-right">{call.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
