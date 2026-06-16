import React from 'react';
import { GripVertical, X, Edit2 } from 'lucide-react';
import type { SkillCardDisplayProps } from '@/types/ui/skills-section';
import { subcategories } from './constant/skills-constants';
import { SkillIcon } from '@/components/SkillIcon';

export const SkillCardDisplay: React.FC<SkillCardDisplayProps> = ({
  skill,
  onEditStart,
  onDelete,
}) => {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', skill.id);
        event.currentTarget.classList.add('opacity-50');
      }}
      onDragEnd={(event) => {
        event.currentTarget.classList.remove('opacity-50');
      }}
      className="group flex cursor-grab items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 transition-all hover:border-muted-foreground/30 hover:bg-secondary active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      <SkillIcon
        icon={skill.icon}
        svg={skill.svg}
        className="h-4 w-4 shrink-0 text-foreground/80"
      />
      <div className="flex-1 flex flex-col min-w-0">
        <span className="text-sm text-foreground truncate">{skill.name}</span>
        {skill.category && (
          <span className="text-[10px] text-muted-foreground truncate">
            {subcategories.find((s) => s.id === skill.category)?.label || skill.category}
          </span>
        )}
      </div>
      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onEditStart();
          }}
          className="rounded p-1 hover:bg-muted transition-colors"
          aria-label={`Edit ${skill.name}`}
        >
          <Edit2 className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
          className="rounded p-1 hover:bg-muted transition-colors"
          aria-label={`Delete ${skill.name}`}
        >
          <X className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>
  );
};
