import React from 'react';
import { X, Edit2 } from 'lucide-react';
import type { SkillChipProps } from '@/types/ui/skills-section';
import { SkillIcon } from '@/components/SkillIcon';

export const SkillChip: React.FC<SkillChipProps> = ({
  skill,
  accentColor,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-xl
        bg-white/4 border border-white/8 backdrop-blur-sm
        hover:bg-white/8 hover:border-white/15
        transition-all duration-300 animate-in zoom-in-95 fade-in"
      style={{
        borderLeftWidth: '2px',
        borderLeftColor: accentColor,
      }}
    >
      <SkillIcon
        icon={skill.icon}
        svg={skill.svg}
        className="h-4 w-4 shrink-0 text-foreground/70 group-hover:text-foreground transition-colors"
      />

      <span className="text-sm font-medium text-foreground/85 group-hover:text-foreground transition-colors whitespace-nowrap">
        {skill.name}
      </span>

      <div className="flex items-center gap-0.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={onEdit}
          className="p-1 rounded-md hover:bg-white/10 transition-colors"
          aria-label={`Edit ${skill.name}`}
        >
          <Edit2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 rounded-md hover:bg-destructive/15 transition-colors"
          aria-label={`Delete ${skill.name}`}
        >
          <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>
  );
};
