import { useState, useCallback } from 'react';
import type { Skill } from '@/types/profile';
import { removeWithUndo } from '@/lib/utils/undo-utils';

export type UseCategoryEditorReturn = {
  renamingCategory: string | null;
  startRename: (categoryName: string) => void;
  confirmRename: (
    newName: string,
    allSkills: ReadonlyArray<Skill>,
    setValue: (value: never) => void,
  ) => void;
  cancelRename: () => void;
  addCategory: (
    categoryName: string,
    allSkills: ReadonlyArray<Skill>,
    insertValue: (index: number, value: never) => void,
  ) => void;
  deleteCategory: (
    categoryName: string,
    allSkills: ReadonlyArray<Skill>,
    setValue: (value: never) => void,
  ) => void;
};

export function useCategoryEditor(): UseCategoryEditorReturn {
  const [renamingCategory, setRenamingCategory] = useState<string | null>(null);

  const startRename = useCallback((categoryName: string) => {
    setRenamingCategory(categoryName);
  }, []);

  const confirmRename = useCallback(
    (
      newName: string,
      allSkills: ReadonlyArray<Skill>,
      setValue: (value: never) => void,
    ) => {
      const trimmedName = newName.trim();
      if (trimmedName === '' || trimmedName === renamingCategory) {
        setRenamingCategory(null);
        return;
      }

      const updatedSkills = allSkills.map((skill) =>
        skill.category === renamingCategory
          ? { ...skill, category: trimmedName }
          : skill,
      );
      setValue(updatedSkills as never);
      setRenamingCategory(null);
    },
    [renamingCategory],
  );

  const cancelRename = useCallback(() => {
    setRenamingCategory(null);
  }, []);

  const addCategory = useCallback(
    (
      categoryName: string,
      _allSkills: ReadonlyArray<Skill>,
      insertValue: (index: number, value: never) => void,
    ) => {
      const trimmedName = categoryName.trim();
      if (trimmedName === '') return;

      const placeholderSkill: Skill = {
        id: crypto.randomUUID(),
        name: '',
        category: trimmedName,
      };
      insertValue(0, placeholderSkill as never);
    },
    [],
  );

  const deleteCategory = useCallback(
    (
      categoryName: string,
      allSkills: ReadonlyArray<Skill>,
      setValue: (value: never) => void,
    ) => {
      const skillsInCategory = allSkills.filter(
        (skill) => skill.category === categoryName,
      );
      const skillsOutsideCategory = allSkills.filter(
        (skill) => skill.category !== categoryName,
      );

      removeWithUndo({
        label: `Category: ${categoryName} (${skillsInCategory.length} skills)`,
        onRemove: () => {
          setValue(skillsOutsideCategory as never);
        },
      });
    },
    [],
  );

  return {
    renamingCategory,
    startRename,
    confirmRename,
    cancelRename,
    addCategory,
    deleteCategory,
  };
}
