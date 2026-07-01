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

// --- Milestone 2 & 3 additions ---

export type LifecycleStage = 'new' | 'prospect' | 'active' | 'vip' | 'churned';
export type CallOutcome = 'sale' | 'follow-up' | 'no-answer' | 'not-interested' | 'callback' | 'resolved';
export type InteractionType = 'call' | 'whatsapp' | 'note' | 'booking' | 'lead';

export interface WhatsAppConversation {
  id: string;
  customerName: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'open' | 'pending' | 'resolved';
  assignedAgent: string;
  avatar: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  time: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  source: 'call' | 'whatsapp' | 'website' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  value: number;
  assignedAgent: string;
  createdAt: string;
  lifecycle: LifecycleStage;
}

export interface Booking {
  id: string;
  customerName: string;
  title: string;
  date: string;
  time: string;
  agent: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'demo' | 'consultation' | 'follow-up' | 'onboarding';
}

export interface Interaction {
  id: string;
  type: InteractionType;
  title: string;
  description: string;
  agent: string;
  timestamp: string;
  outcome?: CallOutcome;
}

export interface AgentPerformance {
  agent: string;
  avatar: string;
  callsHandled: number;
  avgHandleTime: string;
  conversionRate: number;
  leadsWon: number;
  satisfaction: number;
}

export const lifecycleStages: { id: LifecycleStage; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: 'bg-slate-500/20 text-slate-300' },
  { id: 'prospect', label: 'Prospect', color: 'bg-blue-500/20 text-blue-400' },
  { id: 'active', label: 'Active', color: 'bg-emerald-500/20 text-emerald-400' },
  { id: 'vip', label: 'VIP', color: 'bg-amber-500/20 text-amber-400' },
  { id: 'churned', label: 'Churned', color: 'bg-red-500/20 text-red-400' },
];

export const callOutcomes: { id: CallOutcome; label: string }[] = [
  { id: 'sale', label: 'Sale Closed' },
  { id: 'follow-up', label: 'Follow-up Required' },
  { id: 'callback', label: 'Callback Scheduled' },
  { id: 'resolved', label: 'Issue Resolved' },
  { id: 'no-answer', label: 'No Answer' },
  { id: 'not-interested', label: 'Not Interested' },
];

export const whatsappConversations: WhatsAppConversation[] = [
  { id: 'WA-101', customerName: 'Ahmed Al-Rashid', phone: '+966 50 123 4567', lastMessage: 'Can you send me the Enterprise plan pricing?', timestamp: '14:45', unread: 2, status: 'open', assignedAgent: 'Fatima Al-Hassan', avatar: 'AR' },
  { id: 'WA-102', customerName: 'Klaus Weber', phone: '+49 170 1234567', lastMessage: 'Thank you, the SIP trunk is working perfectly now.', timestamp: '13:20', unread: 0, status: 'resolved', assignedAgent: 'Aisha Rahman', avatar: 'KW' },
  { id: 'WA-103', customerName: 'Layla Hassan', phone: '+966 55 987 6543', lastMessage: 'I need to reschedule my demo for next Tuesday.', timestamp: '12:05', unread: 1, status: 'pending', assignedAgent: 'Sarah Mitchell', avatar: 'LH' },
  { id: 'WA-104', customerName: 'Maria Garcia', phone: '+1 555 234 5678', lastMessage: 'Is WhatsApp integration included in the Professional plan?', timestamp: '11:30', unread: 0, status: 'open', assignedAgent: 'James Wilson', avatar: 'MG' },
  { id: 'WA-105', customerName: 'John Patterson', phone: '+44 7700 900123', lastMessage: 'Great call earlier — please send the proposal.', timestamp: '14:35', unread: 0, status: 'open', assignedAgent: 'Sarah Mitchell', avatar: 'JP' },
];

export const whatsappMessages: WhatsAppMessage[] = [
  { id: '1', sender: 'customer', text: 'Hi, I saw your ad about call center solutions for Saudi businesses.', time: '14:20' },
  { id: '2', sender: 'agent', text: 'Hello Ahmed! Thank you for reaching out. I\'d be happy to help. Are you looking for a full call center setup or SIP trunking only?', time: '14:22' },
  { id: '3', sender: 'customer', text: 'We need both — call center with AI voice and SIP for our Riyadh office.', time: '14:28' },
  { id: '4', sender: 'agent', text: 'Perfect. Our Enterprise plan covers multi-region SIP (UK, Saudi, Germany) plus AI voice assistant. Would you like a demo call?', time: '14:35' },
  { id: '5', sender: 'customer', text: 'Can you send me the Enterprise plan pricing?', time: '14:45' },
];

export const leads: Lead[] = [
  { id: 'L-201', name: 'John Patterson', company: 'Patterson Logistics Ltd', phone: '+44 7700 900123', email: 'john.p@patterson-logistics.co.uk', source: 'call', status: 'proposal', value: 12000, assignedAgent: 'Sarah Mitchell', createdAt: 'Jul 1', lifecycle: 'prospect' },
  { id: 'L-202', name: 'Ahmed Al-Rashid', company: 'Al-Rashid Trading Co.', phone: '+966 50 123 4567', email: 'ahmed@alrashid.sa', source: 'whatsapp', status: 'qualified', value: 8500, assignedAgent: 'Fatima Al-Hassan', createdAt: 'Jun 30', lifecycle: 'prospect' },
  { id: 'L-203', name: 'Klaus Weber', company: 'Weber GmbH', phone: '+49 170 1234567', email: 'k.weber@weber-gmbh.de', source: 'referral', status: 'won', value: 6200, assignedAgent: 'Aisha Rahman', createdAt: 'Jun 28', lifecycle: 'active' },
  { id: 'L-204', name: 'Maria Garcia', company: 'Garcia Solutions', phone: '+1 555 234 5678', email: 'maria@garcia-sol.com', source: 'website', status: 'contacted', value: 4500, assignedAgent: 'James Wilson', createdAt: 'Jun 29', lifecycle: 'new' },
  { id: 'L-205', name: 'Layla Hassan', company: 'Hassan Enterprises', phone: '+966 55 987 6543', email: 'layla@hassan-ent.sa', source: 'call', status: 'new', value: 9800, assignedAgent: 'Sarah Mitchell', createdAt: 'Jul 1', lifecycle: 'new' },
];

export const bookings: Booking[] = [
  { id: 'B-301', customerName: 'Ahmed Al-Rashid', title: 'Enterprise Plan Demo', date: 'Jul 3', time: '10:00 AM', agent: 'Fatima Al-Hassan', status: 'scheduled', type: 'demo' },
  { id: 'B-302', customerName: 'John Patterson', title: 'Proposal Review Call', date: 'Jul 2', time: '2:00 PM', agent: 'Sarah Mitchell', status: 'scheduled', type: 'follow-up' },
  { id: 'B-303', customerName: 'Klaus Weber', title: 'SIP Trunk Onboarding', date: 'Jul 1', time: '11:00 AM', agent: 'Aisha Rahman', status: 'completed', type: 'onboarding' },
  { id: 'B-304', customerName: 'Layla Hassan', title: 'Product Consultation', date: 'Jul 4', time: '3:30 PM', agent: 'Sarah Mitchell', status: 'scheduled', type: 'consultation' },
  { id: 'B-305', customerName: 'Maria Garcia', title: 'WhatsApp Integration Demo', date: 'Jun 30', time: '4:00 PM', agent: 'James Wilson', status: 'no-show', type: 'demo' },
];

export const interactionTimeline: Interaction[] = [
  { id: 'I-1', type: 'call', title: 'Inbound call — Sales', description: 'Discussed Enterprise plan upgrade for Saudi expansion. AI handled first 48s.', agent: 'Sarah Mitchell', timestamp: 'Today, 14:32', outcome: 'follow-up' },
  { id: 'I-2', type: 'whatsapp', title: 'WhatsApp message', description: '"Great call earlier — please send the proposal."', agent: 'Sarah Mitchell', timestamp: 'Today, 14:35' },
  { id: 'I-3', type: 'note', title: 'Agent note added', description: 'Decision maker. Budget approved for Q3. Send proposal by EOD.', agent: 'Sarah Mitchell', timestamp: 'Today, 14:38' },
  { id: 'I-4', type: 'booking', title: 'Proposal Review Call scheduled', description: 'Jul 2 at 2:00 PM with Sarah Mitchell', agent: 'Sarah Mitchell', timestamp: 'Today, 14:40' },
  { id: 'I-5', type: 'lead', title: 'Lead status updated', description: 'Status changed: Qualified → Proposal', agent: 'Sarah Mitchell', timestamp: 'Today, 14:41' },
  { id: 'I-6', type: 'call', title: 'Outbound call — Follow-up', description: 'Previous call about billing issue. Resolved successfully.', agent: 'Aisha Rahman', timestamp: 'Yesterday, 16:15', outcome: 'resolved' },
  { id: 'I-7', type: 'whatsapp', title: 'WhatsApp conversation', description: 'Customer confirmed SIP trunk working. Sent satisfaction survey.', agent: 'Aisha Rahman', timestamp: 'Yesterday, 13:20', outcome: 'resolved' },
];

export const agentPerformance: AgentPerformance[] = [
  { agent: 'Sarah Mitchell', avatar: 'SM', callsHandled: 24, avgHandleTime: '4:12', conversionRate: 32, leadsWon: 5, satisfaction: 4.8 },
  { agent: 'Fatima Al-Hassan', avatar: 'FA', callsHandled: 27, avgHandleTime: '4:01', conversionRate: 28, leadsWon: 4, satisfaction: 4.7 },
  { agent: 'Aisha Rahman', avatar: 'AR', callsHandled: 31, avgHandleTime: '5:02', conversionRate: 35, leadsWon: 6, satisfaction: 4.9 },
  { agent: 'James Wilson', avatar: 'JW', callsHandled: 18, avgHandleTime: '3:45', conversionRate: 22, leadsWon: 3, satisfaction: 4.5 },
  { agent: 'Marco Rossi', avatar: 'MR', callsHandled: 22, avgHandleTime: '4:38', conversionRate: 25, leadsWon: 3, satisfaction: 4.6 },
];

export const customerReports = {
  newCustomers: 18,
  returningCustomers: 42,
  churned: 3,
  lifecycleDistribution: [
    { stage: 'New', count: 12, pct: 15 },
    { stage: 'Prospect', count: 28, pct: 35 },
    { stage: 'Active', count: 32, pct: 40 },
    { stage: 'VIP', count: 8, pct: 10 },
  ],
};
