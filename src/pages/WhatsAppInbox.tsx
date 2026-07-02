import { useState } from 'react';
import { MessageCircle, Search, Send, Paperclip, Phone, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { useDemoToast } from '../components/DemoToast';
import { whatsappConversations, whatsappMessages } from '../data/mockData';

const statusStyles = {
  open: 'bg-emerald-500/20 text-emerald-400',
  pending: 'bg-amber-500/20 text-amber-400',
  resolved: 'bg-slate-500/20 text-slate-400',
};

export function WhatsAppInbox() {
  const [selected, setSelected] = useState(whatsappConversations[0]);
  const [reply, setReply] = useState('');
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const { show, Toast } = useDemoToast();

  const selectConversation = (conv: typeof whatsappConversations[0]) => {
    setSelected(conv);
    setMobileChatOpen(true);
  };

  return (
    <div className="h-full flex flex-col animate-slide-up min-h-0">
      {Toast}
      <PageHeader
        title="WhatsApp Business Inbox"
        subtitle="Unified messaging · Linked to Customer 360°"
        actions={
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <MessageCircle className="w-3.5 h-3.5" />
            {whatsappConversations.filter((c) => c.unread > 0).length} unread
          </span>
        }
      />

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div
          className={`${
            mobileChatOpen ? 'hidden md:flex' : 'flex'
          } w-full md:w-80 border-r border-slate-700/50 flex-col bg-surface-800/30 shrink-0`}
        >
          <div className="p-3 border-b border-slate-700/50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-surface-700 border border-slate-600 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {whatsappConversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => selectConversation(conv)}
                className={`w-full text-left px-4 py-3 border-b border-slate-700/30 hover:bg-surface-700/50 transition-colors ${
                  selected.id === conv.id ? 'bg-brand-600/10 border-l-2 border-l-brand-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-300 shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5 gap-2">
                      <p className="text-sm font-medium text-white truncate">{conv.customerName}</p>
                      <span className="text-[10px] text-slate-500 shrink-0">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusStyles[conv.status]}`}>
                        {conv.status}
                      </span>
                      {conv.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`${
            mobileChatOpen ? 'flex' : 'hidden md:flex'
          } flex-1 flex-col min-w-0`}
        >
          <div className="px-4 sm:px-5 py-3 border-b border-slate-700/50 bg-surface-800/50 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileChatOpen(false)}
                className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-surface-700 shrink-0"
                aria-label="Back to conversations"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-300 shrink-0">
                {selected.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{selected.customerName}</p>
                <p className="text-xs text-slate-400 truncate">{selected.phone} · {selected.assignedAgent}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => show('Opening customer profile...')}
                className="hidden sm:block px-3 py-1.5 bg-surface-700 border border-slate-600 text-slate-300 text-xs rounded-lg hover:bg-surface-600 transition-colors"
              >
                View Customer 360°
              </button>
              <button
                type="button"
                onClick={() => show('Initiating call...')}
                className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#0a1628]">
            {whatsappMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'agent'
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : msg.sender === 'system'
                        ? 'bg-surface-600 text-slate-400 text-xs italic mx-auto'
                        : 'bg-surface-700 text-slate-200 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                  <p className={`text-[10px] mt-1 ${msg.sender === 'agent' ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 sm:p-4 border-t border-slate-700/50 bg-surface-800/50">
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 text-slate-400 hover:text-slate-200 transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 min-w-0 bg-surface-700 border border-slate-600 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && reply.trim()) {
                    show('Message sent');
                    setReply('');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (reply.trim()) {
                    show('Message sent');
                    setReply('');
                  }
                }}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-colors shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
