import React from 'react';
import { Plus } from 'lucide-react';
import type { Skill } from '@/types/profile';
import type { ProfileFormApi } from '@/types/form-types';

type SkillsBoardActionsProps = {
  form: ProfileFormApi;
  sectionPath: string;
  deriveCategories: (skills: ReadonlyArray<Skill>) => ReadonlyArray<string>;
  openAddModal: (category: string) => void;
  startAddingCategory: () => void;
};

export const SkillsBoardActions: React.FC<SkillsBoardActionsProps> = ({
  form,
  sectionPath,
  deriveCategories,
  openAddModal,
  startAddingCategory,
}) => {
  const handleAddSkillClick = () => {
    const formValues = form.store.state.values;
    const allSkills = (formValues[sectionPath as keyof typeof formValues] as Skill[]) ?? [];
    const categories = deriveCategories(allSkills);
    const firstCategory = categories.length > 0 ? categories[0] : 'General';
    openAddModal(firstCategory);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleAddSkillClick}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
          bg-primary/10 text-primary border border-primary/20
          hover:bg-primary/20 hover:border-primary/30
          transition-all duration-200"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Skill
      </button>
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
