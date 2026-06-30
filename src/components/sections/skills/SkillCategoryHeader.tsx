import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';

interface SkillCategoryHeaderProps {
  categoryName: string;
  skillCount: number;
  accentColor: string;
  onAddSkill: () => void;
  onRenameCategory: () => void;
  onDeleteCategory: () => void;
}

export const SkillCategoryHeader: React.FC<SkillCategoryHeaderProps> = ({
  categoryName,
  skillCount,
  accentColor,
  onAddSkill,
  onRenameCategory,
  onDeleteCategory,
}) => {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex items-center gap-3">
        <div
          className="h-3 w-3 rounded-full shrink-0"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}40` }}
        />
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/60">
          {categoryName}
        </h3>
        <span className="text-[10px] font-semibold text-muted-foreground/40 bg-white/4 px-2 py-0.5 rounded-full">
          {skillCount}
        </span>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover/category:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={onAddSkill}
          className="p-1.5 rounded-lg hover:bg-white/6 transition-colors"
          aria-label={`Add skill to ${categoryName}`}
        >
          <Plus className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-foreground" />
        </button>
        <button
          type="button"
          onClick={onRenameCategory}
          className="p-1.5 rounded-lg hover:bg-white/6 transition-colors"
          aria-label={`Rename ${categoryName}`}
        >
          <Edit3 className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-foreground" />
        </button>
        <button
          type="button"
          onClick={onDeleteCategory}
          className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
          aria-label={`Delete ${categoryName}`}
        >
          <Trash2 className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-destructive" />
        </button>
      </div>
    </div>
  );
};
