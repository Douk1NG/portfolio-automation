import React, { ReactNode } from 'react';
import { RemoveButton } from '@/components/form/SectionButtons';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type SectionItemProps = {
  children: ReactNode;
  label: string;
  index: number;
  onRemove: () => void;
  accentColor?: string;
  removeIcon?: LucideIcon;
  showSeparator?: boolean;
};

export const SectionItem: React.FC<SectionItemProps> = ({
  children,
  label,
  index,
  onRemove,
  removeIcon,
}) => {
  return (
    <div className="relative group animate-in fade-in slide-in-from-top-4 duration-500 bg-white/1.5 border border-white-[0.03] p-6 lg:p-8 rounded-2xl transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
          <span
            className={cn('text-[11px] font-black uppercase tracking-[0.2em] px-2 text-primary')}
          >
            {label} #{index + 1}
          </span>
          <RemoveButton onClick={onRemove} icon={removeIcon} />
        </div>

        <div className="pl-2">{children}</div>
      </div>
    </div>
  );
};
