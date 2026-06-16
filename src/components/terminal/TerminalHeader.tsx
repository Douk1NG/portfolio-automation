import React from 'react';
import { Terminal as TerminalIcon, ChevronUp, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TerminalHeaderProps } from '@/types/ui/terminal';

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  isOpen,
  onToggleOpen,
  onClose,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggleOpen}
      onKeyDown={(event) => event.key === 'Enter' && onToggleOpen()}
      className="px-4 py-2.5 border-b border-white/5 bg-white/2 flex items-center justify-between w-full shrink-0 cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-widest text-muted-foreground transition-colors overflow-hidden">
        <TerminalIcon className="w-3.5 h-3.5 shrink-0" />
        <span className={cn('transition-all truncate', isOpen && 'text-white')}>System Log</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-destructive/80 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.8)] animate-pulse" />
        </div>

        {isOpen ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              className="p-1 rounded hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          </>
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-white/50" />
        )}
      </div>
    </div>
  );
};
