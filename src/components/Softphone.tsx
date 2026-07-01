import { useState } from 'react';
import {
  Phone, PhoneOff, Pause, Mic, MicOff, Volume2,
  ArrowRightLeft, Users, Grid3X3, Hash,
} from 'lucide-react';

interface SoftphoneProps {
  callerName?: string;
  callerNumber?: string;
  duration?: string;
  isActive?: boolean;
}

export function Softphone({
  callerName = 'John Patterson',
  callerNumber = '+44 7700 900123',
  duration = '02:34',
  isActive = true,
}: SoftphoneProps) {
  const [muted, setMuted] = useState(false);
  const [onHold, setOnHold] = useState(false);
  const [dialPadOpen, setDialPadOpen] = useState(false);
  const [dialed, setDialed] = useState('');

  const dialKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <div className="bg-surface-700 rounded-xl border border-slate-700/50 overflow-hidden">
      {isActive ? (
        <div className="p-5">
          <div className="text-center mb-5">
            <div className="w-16 h-16 rounded-full bg-brand-600/20 border-2 border-brand-500 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-7 h-7 text-brand-400" />
            </div>
            <p className="text-lg font-semibold text-white">{callerName}</p>
            <p className="text-sm text-slate-400">{callerNumber}</p>
            <p className="text-2xl font-mono font-bold text-brand-400 mt-2">{duration}</p>
            {onHold && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                On Hold
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setMuted(!muted)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                muted ? 'bg-red-500/20 text-red-400' : 'bg-surface-600 hover:bg-surface-500 text-slate-300'
              }`}
            >
              {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span className="text-[10px]">{muted ? 'Unmute' : 'Mute'}</span>
            </button>
            <button
              onClick={() => setOnHold(!onHold)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                onHold ? 'bg-amber-500/20 text-amber-400' : 'bg-surface-600 hover:bg-surface-500 text-slate-300'
              }`}
            >
              <Pause className="w-5 h-5" />
              <span className="text-[10px]">Hold</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-3 rounded-lg bg-surface-600 hover:bg-surface-500 text-slate-300 transition-colors">
              <ArrowRightLeft className="w-5 h-5" />
              <span className="text-[10px]">Transfer</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-3 rounded-lg bg-surface-600 hover:bg-surface-500 text-slate-300 transition-colors">
              <Users className="w-5 h-5" />
              <span className="text-[10px]">Conference</span>
            </button>
            <button
              onClick={() => setDialPadOpen(!dialPadOpen)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-surface-600 hover:bg-surface-500 text-slate-300 transition-colors"
            >
              <Grid3X3 className="w-5 h-5" />
              <span className="text-[10px]">Keypad</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-3 rounded-lg bg-surface-600 hover:bg-surface-500 text-slate-300 transition-colors">
              <Volume2 className="w-5 h-5" />
              <span className="text-[10px]">Volume</span>
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors">
            <PhoneOff className="w-5 h-5" />
            End Call
          </button>
        </div>
      ) : (
        <div className="p-5">
          <p className="text-sm text-slate-400 mb-3">Ready to dial</p>
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={dialed}
              onChange={(e) => setDialed(e.target.value)}
              placeholder="Enter number or extension"
              className="flex-1 bg-surface-600 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {dialKeys.map((key) => (
              <button
                key={key}
                onClick={() => setDialed((d) => d + key)}
                className="py-3 bg-surface-600 hover:bg-surface-500 rounded-lg text-white font-medium transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors">
            <Phone className="w-5 h-5" />
            Call
          </button>
        </div>
      )}

      {dialPadOpen && isActive && (
        <div className="border-t border-slate-700/50 p-4">
          <div className="grid grid-cols-3 gap-2">
            {dialKeys.map((key) => (
              <button
                key={key}
                className="py-2 bg-surface-600 hover:bg-surface-500 rounded-lg text-white text-sm transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
