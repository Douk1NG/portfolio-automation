import React from 'react';
import { cn } from '@/lib/utils';
import { useTerminal } from '@/hooks/useTerminal';
import { TerminalHeader } from '@/components/terminal/TerminalHeader';
import { TerminalLogList } from '@/components/terminal/TerminalLogList';

export const Terminal: React.FC = () => {
  const { logs, isOpen, openTerminal, toggleOpen, close } = useTerminal();

  return (
    <aside
      className={cn(
        'fixed bottom-0 right-6 z-50 flex flex-col font-mono transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
        isOpen ? 'w-md h-100 max-h-[70vh]' : 'w-70 h-10 translate-y-0 hover:-translate-y-1',
      )}
    >
      <div
        className={cn(
          'flex-1 bg-black/60 backdrop-blur-2xl border border-white/10 flex flex-col overflow-hidden transition-all duration-500',
          isOpen
            ? 'rounded-t-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)]'
            : 'rounded-t-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-black/80 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.4)]',
        )}
        onClick={() => !isOpen && openTerminal()}
      >
        <TerminalHeader isOpen={isOpen} onToggleOpen={toggleOpen} onClose={close} />
        {isOpen && <TerminalLogList logs={logs} />}
      </div>
    </aside>
  );
};

export default Terminal;
