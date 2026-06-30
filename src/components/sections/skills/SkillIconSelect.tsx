import React from 'react';
import { SkillIcon } from '@/components/SkillIcon';

interface SkillIconSelectProps {
  iconType: 'lucide' | 'svg';
  setIconType: (type: 'lucide' | 'svg') => void;
  iconValue: string;
  setIconValue: (value: string) => void;
}

export const SkillIconSelect: React.FC<SkillIconSelectProps> = ({
  iconType,
  setIconType,
  iconValue,
  setIconValue,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
        Icon
      </label>
      <div className="flex gap-2">
        <select
          value={iconType}
          onChange={(event) => {
            setIconType(event.target.value as 'lucide' | 'svg');
            setIconValue('');
          }}
          aria-label="Icon type"
          className="rounded-xl border border-white/8 bg-input px-3 py-3 text-xs text-foreground
            focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
        >
          <option value="lucide" className="bg-card text-foreground">Lucide</option>
          <option value="svg" className="bg-card text-foreground">SVG Icon</option>
        </select>
        <input
          value={iconValue}
          onChange={(event) => setIconValue(event.target.value)}
          placeholder={iconType === 'lucide' ? 'Icon name...' : 'SVG name...'}
          className="flex-1 rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-foreground
            placeholder:text-muted-foreground/30
            focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30
            transition-all"
        />
      </div>

      {iconValue.trim() && (
        <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-bold">
            Preview
          </span>
          <SkillIcon
            icon={iconType === 'lucide' ? iconValue.trim() : undefined}
            svg={iconType === 'svg' ? iconValue.trim() : undefined}
            className="h-5 w-5 text-foreground/70"
          />
        </div>
      )}
    </div>
  );
};
