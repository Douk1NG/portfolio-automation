import React from 'react';
import { X } from 'lucide-react';
import { SkillIcon } from '@/components/SkillIcon';
import type { SkillSelectorTagProps } from '@/types/ui/skill-selector';

export const SkillSelectorTag: React.FC<SkillSelectorTagProps> = ({
  skillName,
  skillData,
  onRemove,
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 bg-orange-400/5 text-orange-400 border border-orange-400/20 px-2.5 py-1 rounded-xl text-xs font-semibold animate-in zoom-in-95">
      <SkillIcon icon={skillData?.icon} svg={skillData?.svg} className="h-3.5 w-3.5" />
      {skillName}
      <button
        type="button"
        onClick={() => onRemove(skillName)}
        className="hover:bg-destructive/10 hover:text-destructive rounded-full p-0.5 transition-all"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
};
