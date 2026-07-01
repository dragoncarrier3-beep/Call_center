export type AgentStatus = 'available' | 'on-call' | 'wrap-up' | 'break' | 'offline';

export interface Agent {
  id: string;
  name: string;
  extension: string;
  status: AgentStatus;
  queue: string;
  callsToday: number;
  avgHandleTime: string;
  avatar: string;
}

export interface Queue {
  id: string;
  name: string;
  waiting: number;
  longestWait: string;
  agentsAvailable: number;
  agentsTotal: number;
  sla: number;
  answered: number;
  abandoned: number;
}

export interface CallRecord {
  id: string;
  caller: string;
  callerName: string;
  agent: string;
  queue: string;
  duration: string;
  status: 'completed' | 'missed' | 'transferred' | 'ai-handled';
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  aiAssisted: boolean;
}

export interface Extension {
  id: string;
  number: string;
  name: string;
  type: 'agent' | 'queue' | 'ivr' | 'ring-group';
  status: 'online' | 'offline' | 'busy';
  sipRegistered: boolean;
}

export interface SipTrunk {
  id: string;
  name: string;
  provider: string;
  status: 'connected' | 'degraded' | 'down';
  channels: { used: number; max: number };
  latency: string;
  country: string;
}

export interface TranscriptLine {
  speaker: 'caller' | 'ai' | 'agent';
  text: string;
  time: string;
}

export const agents: Agent[] = [
  { id: '1', name: 'Sarah Mitchell', extension: '101', status: 'on-call', queue: 'Sales', callsToday: 24, avgHandleTime: '4:12', avatar: 'SM' },
  { id: '2', name: 'James Wilson', extension: '102', status: 'available', queue: 'Sales', callsToday: 18, avgHandleTime: '3:45', avatar: 'JW' },
  { id: '3', name: 'Aisha Rahman', extension: '103', status: 'on-call', queue: 'Support', callsToday: 31, avgHandleTime: '5:02', avatar: 'AR' },
  { id: '4', name: 'Marco Rossi', extension: '104', status: 'wrap-up', queue: 'Support', callsToday: 22, avgHandleTime: '4:38', avatar: 'MR' },
  { id: '5', name: 'Emily Chen', extension: '105', status: 'break', queue: 'Billing', callsToday: 15, avgHandleTime: '3:20', avatar: 'EC' },
  { id: '6', name: 'David Okonkwo', extension: '106', status: 'available', queue: 'Billing', callsToday: 19, avgHandleTime: '3:55', avatar: 'DO' },
  { id: '7', name: 'Fatima Al-Hassan', extension: '107', status: 'available', queue: 'Sales', callsToday: 27, avgHandleTime: '4:01', avatar: 'FA' },
  { id: '8', name: 'Liam O\'Brien', extension: '108', status: 'offline', queue: 'Support', callsToday: 0, avgHandleTime: '—', avatar: 'LO' },
];

export const queues: Queue[] = [
  { id: '1', name: 'Sales', waiting: 3, longestWait: '1:42', agentsAvailable: 3, agentsTotal: 4, sla: 94, answered: 156, abandoned: 8 },
  { id: '2', name: 'Support', waiting: 5, longestWait: '3:18', agentsAvailable: 1, agentsTotal: 4, sla: 87, answered: 203, abandoned: 14 },
  { id: '3', name: 'Billing', waiting: 1, longestWait: '0:45', agentsAvailable: 2, agentsTotal: 2, sla: 98, answered: 89, abandoned: 2 },
  { id: '4', name: 'VIP Line', waiting: 0, longestWait: '—', agentsAvailable: 2, agentsTotal: 2, sla: 100, answered: 42, abandoned: 0 },
];

export const callHistory: CallRecord[] = [
  { id: 'C-4821', caller: '+44 7700 900123', callerName: 'John Patterson', agent: 'Sarah Mitchell', queue: 'Sales', duration: '6:24', status: 'completed', timestamp: '14:32', sentiment: 'positive', aiAssisted: true },
  { id: 'C-4820', caller: '+966 50 123 4567', callerName: 'Ahmed Al-Rashid', agent: 'AI Assistant', queue: 'Support', duration: '2:15', status: 'ai-handled', timestamp: '14:28', sentiment: 'neutral', aiAssisted: true },
  { id: 'C-4819', caller: '+49 170 1234567', callerName: 'Klaus Weber', agent: 'Aisha Rahman', queue: 'Support', duration: '8:01', status: 'completed', timestamp: '14:15', sentiment: 'positive', aiAssisted: false },
  { id: 'C-4818', caller: '+1 555 234 5678', callerName: 'Maria Garcia', agent: 'James Wilson', queue: 'Sales', duration: '4:33', status: 'transferred', timestamp: '14:02', sentiment: 'neutral', aiAssisted: true },
  { id: 'C-4817', caller: '+44 7911 123456', callerName: 'Unknown', agent: '—', queue: 'Sales', duration: '0:00', status: 'missed', timestamp: '13:58', sentiment: 'neutral', aiAssisted: false },
  { id: 'C-4816', caller: '+966 55 987 6543', callerName: 'Layla Hassan', agent: 'Fatima Al-Hassan', queue: 'Sales', duration: '5:47', status: 'completed', timestamp: '13:45', sentiment: 'positive', aiAssisted: true },
];

export const extensions: Extension[] = [
  { id: '1', number: '100', name: 'Main Reception', type: 'ring-group', status: 'online', sipRegistered: true },
  { id: '2', number: '101', name: 'Sarah Mitchell', type: 'agent', status: 'busy', sipRegistered: true },
  { id: '3', number: '102', name: 'James Wilson', type: 'agent', status: 'online', sipRegistered: true },
  { id: '4', number: '200', name: 'Sales Queue', type: 'queue', status: 'online', sipRegistered: true },
  { id: '5', number: '300', name: 'Main IVR', type: 'ivr', status: 'online', sipRegistered: true },
  { id: '6', number: '108', name: 'Liam O\'Brien', type: 'agent', status: 'offline', sipRegistered: false },
];

export const sipTrunks: SipTrunk[] = [
  { id: '1', name: 'UK Primary', provider: 'Twilio', status: 'connected', channels: { used: 12, max: 50 }, latency: '42ms', country: 'UK' },
  { id: '2', name: 'Saudi Arabia', provider: 'STC Business', status: 'connected', channels: { used: 8, max: 30 }, latency: '68ms', country: 'SA' },
  { id: '3', name: 'Germany', provider: 'Sipgate', status: 'connected', channels: { used: 5, max: 25 }, latency: '55ms', country: 'DE' },
  { id: '4', name: 'US Backup', provider: 'Bandwidth', status: 'degraded', channels: { used: 3, max: 20 }, latency: '120ms', country: 'US' },
];

export const liveTranscript: TranscriptLine[] = [
  { speaker: 'ai', text: 'Hello, thank you for calling Acme Solutions. I\'m your AI assistant. How can I help you today?', time: '00:03' },
  { speaker: 'caller', text: 'Hi, I\'d like to upgrade my business plan. We\'re expanding to Saudi Arabia.', time: '00:12' },
  { speaker: 'ai', text: 'Congratulations on your expansion! I can help with that. You\'re currently on the Professional plan. Would you like details on our Enterprise plan with multi-region support?', time: '00:18' },
  { speaker: 'caller', text: 'Yes, and I also need SIP trunking for our Riyadh office.', time: '00:28' },
  { speaker: 'ai', text: 'Perfect. Our Enterprise plan includes SIP trunking for UK, Germany, and Saudi Arabia. Let me connect you with a sales specialist who can set this up.', time: '00:35' },
  { speaker: 'agent', text: 'Hi John, this is Sarah. I have your account pulled up. I can see you\'re interested in the Enterprise plan with Saudi SIP trunking.', time: '00:48' },
];

export const customerProfile = {
  name: 'John Patterson',
  company: 'Patterson Logistics Ltd',
  phone: '+44 7700 900123',
  email: 'john.p@patterson-logistics.co.uk',
  plan: 'Professional',
  since: 'Mar 2024',
  totalCalls: 12,
  lastContact: 'Today, 14:32',
  tags: ['Enterprise Prospect', 'UK', 'Multi-region'],
  notes: 'Expanding to Saudi Arabia. Interested in Enterprise plan + SIP trunking. Decision maker.',
};

export const dashboardStats = {
  activeCalls: 7,
  callsToday: 490,
  avgWaitTime: '1:24',
  serviceLevel: 92,
  aiResolved: 34,
  aiHandoffRate: 18,
};
