import React from 'react';
import { FilePenLine } from 'lucide-react';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-primary to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_-3px_rgba(124,58,237,0.5)] transition-transform duration-500 shrink-0">
        <FilePenLine className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-black uppercase tracking-[0.2em] leading-none bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 text-center md:text-left">
          Portfolio / CV updater
        </h1>
      </div>
    </div>
  );
};
