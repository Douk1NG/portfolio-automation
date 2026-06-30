import React from 'react';
import { Plus } from 'lucide-react';

type SkillCategoryEmptyStateProps = {
  onAddSkill: () => void;
}

export const SkillCategoryEmptyState: React.FC<SkillCategoryEmptyStateProps> = ({
  onAddSkill,
}) => {
  return (
    <button
      type="button"
      onClick={onAddSkill}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
        border-2 border-dashed border-white/8 text-muted-foreground/40
        hover:border-white/20 hover:text-muted-foreground/60
        transition-all duration-300 text-sm"
    >
      <Plus className="h-3.5 w-3.5" />
      Add your first skill
    </button>
  );
};
