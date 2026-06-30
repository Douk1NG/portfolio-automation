import React from 'react';
import { Plus } from 'lucide-react';
import type { Skill } from '@/types/profile';

// We use any for form since it's a complex generic from TanStack Form
// and we just need the Field component from it
interface SkillsBoardActionsProps {
  form: any;
  sectionPath: string;
  deriveCategories: (skills: readonly Skill[]) => readonly string[];
  openAddModal: (category: string) => void;
  startAddingCategory: () => void;
}

export const SkillsBoardActions: React.FC<SkillsBoardActionsProps> = ({
  form,
  sectionPath,
  deriveCategories,
  openAddModal,
  startAddingCategory,
}) => {
  return (
    <div className="flex items-center gap-2">
      <form.Field name={sectionPath} mode="array">
        {(field: any) => (
          <button
            type="button"
            onClick={() => {
              const allSkills = (field.state.value as Skill[]) || [];
              const categories = deriveCategories(allSkills);
              const firstCategory = categories.length > 0 ? categories[0] : 'General';
              openAddModal(firstCategory);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              bg-primary/10 text-primary border border-primary/20
              hover:bg-primary/20 hover:border-primary/30
              transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Skill
          </button>
        )}
      </form.Field>
      <button
        type="button"
        onClick={startAddingCategory}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
          bg-white/4 text-foreground/70 border border-white/8
          hover:bg-white/8 hover:text-foreground
          transition-all duration-200"
      >
        <Plus className="h-3.5 w-3.5" />
        New Category
      </button>
    </div>
  );
};
