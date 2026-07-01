import type { AgentStatus } from '../data/mockData';

const statusConfig: Record<AgentStatus, { label: string; color: string; dot: string }> = {
  available: { label: 'Available', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', dot: 'bg-emerald-400' },
  'on-call': { label: 'On Call', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', dot: 'bg-blue-400 animate-pulse-ring' },
  'wrap-up': { label: 'Wrap-up', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', dot: 'bg-amber-400' },
  break: { label: 'On Break', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', dot: 'bg-orange-400' },
  offline: { label: 'Offline', color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', dot: 'bg-slate-500' },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function TrunkStatus({ status }: { status: 'connected' | 'degraded' | 'down' }) {
  const cfg = {
    connected: { label: 'Connected', color: 'text-emerald-400', dot: 'bg-emerald-400' },
    degraded: { label: 'Degraded', color: 'text-amber-400', dot: 'bg-amber-400' },
    down: { label: 'Down', color: 'text-red-400', dot: 'bg-red-400' },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function SentimentBadge({ sentiment }: { sentiment: 'positive' | 'neutral' | 'negative' }) {
  const cfg = {
    positive: { label: 'Positive', color: 'text-emerald-400 bg-emerald-400/10' },
    neutral: { label: 'Neutral', color: 'text-slate-400 bg-slate-400/10' },
    negative: { label: 'Negative', color: 'text-red-400 bg-red-400/10' },
  }[sentiment];

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}
