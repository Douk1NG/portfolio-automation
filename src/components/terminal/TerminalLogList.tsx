import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TerminalLogListProps } from '@/types/ui/terminal';

export const TerminalLogList: React.FC<TerminalLogListProps> = ({ logs }) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-5 text-[11px] leading-relaxed select-text bg-[#0A0A0E]/50">
      <div className="space-y-2.5 pb-6 font-mono selection:bg-primary/30">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex gap-3 animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            <span className="text-white/20 select-none">[{index.toString().padStart(2, '0')}]</span>
            <span
              className={cn(
                'break-all text-white/70',
                log.includes('ERROR') &&
                  'text-destructive font-bold drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]',
                log.includes('Successfully') &&
                  'text-emerald-400 font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]',
                log.includes('Profile saved') &&
                  'text-primary/90 italic drop-shadow-[0_0_5px_rgba(124,58,237,0.4)]',
              )}
            >
              {log}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-white/20 italic p-6 text-center border border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center gap-2">
            <TerminalIcon className="w-6 h-6 opacity-30" />
            Awaiting connection...
          </div>
        )}
      </div>
    </div>
  );
};
