import React from 'react';
import type { Skill } from '@/types/profile';
import type { UseCategoryEditorReturn } from '@/hooks/useCategoryEditor';

type NewCategoryInputProps = {
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  categoryEditor: UseCategoryEditorReturn;
  allSkills: Skill[];
  insertValue: (index: number, value: never) => void;
  cancelAddingCategory: () => void;
}

export const NewCategoryInput: React.FC<NewCategoryInputProps> = ({
  newCategoryName,
  setNewCategoryName,
  categoryEditor,
  allSkills,
  insertValue,
  cancelAddingCategory,
}) => {
  return (
    <div className="flex items-center gap-3 px-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
      <input
        value={newCategoryName}
        onChange={(event) => setNewCategoryName(event.target.value)}
        placeholder="Category name..."
        autoFocus
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            categoryEditor.addCategory(
              newCategoryName,
              allSkills,
              insertValue,
            );
            cancelAddingCategory();
          }
          if (event.key === 'Escape') {
            cancelAddingCategory();
          }
        }}
        onBlur={() => {
          if (newCategoryName.trim()) {
            categoryEditor.addCategory(
              newCategoryName,
              allSkills,
              insertValue,
            );
          }
          cancelAddingCategory();
        }}
        className="bg-transparent border-b border-white/20 focus:border-primary outline-none
          text-sm font-bold uppercase tracking-widest text-foreground/80
          px-1 py-0.5 w-48 transition-colors"
      />
    </div>
  );
};
