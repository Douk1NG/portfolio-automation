import { useCallback, useMemo } from 'react';
import type { Skill } from '@/types/profile';
import { useSkillModal } from './useSkillModal';
import { useCategoryEditor } from './useCategoryEditor';
import { removeWithUndo } from '@/lib/utils/undo-utils';

const CATEGORY_ACCENT_COLORS = [
  'hsl(265 89% 65%)',
  'hsl(340 82% 60%)',
  'hsl(195 85% 55%)',
  'hsl(160 70% 50%)',
  'hsl(35 92% 60%)',
  'hsl(280 60% 55%)',
  'hsl(15 85% 58%)',
  'hsl(210 75% 60%)',
];

function extractUniqueCategories(allSkills: ReadonlyArray<Skill>): ReadonlyArray<string> {
  const categorySet = new Set<string>();
  for (const skill of allSkills) {
    if (skill.category.trim() !== '') {
      categorySet.add(skill.category);
    }
  }
  return Array.from(categorySet);
}

function filterSkillsByCategory(
  allSkills: ReadonlyArray<Skill>,
  categoryName: string,
): ReadonlyArray<Skill> {
  return allSkills.filter(
    (skill) => skill.category === categoryName && skill.name.trim() !== '',
  );
}

function resolveAccentColor(categoryIndex: number): string {
  return CATEGORY_ACCENT_COLORS[categoryIndex % CATEGORY_ACCENT_COLORS.length];
}

export function useSkillsSection() {
  const sectionPath = 'skills' as const;
  const skillModal = useSkillModal();
  const categoryEditor = useCategoryEditor();

  const { mode: skillModalMode, editingSkill, closeModal: closeSkillModal } = skillModal;

  const deriveCategories = useMemo(() => extractUniqueCategories, []);
  const getSkillsByCategory = useMemo(() => filterSkillsByCategory, []);
  const getAccentColor = useMemo(() => resolveAccentColor, []);

  const handleSaveSkill = useCallback(
    (
      savedSkill: Skill,
      allSkills: ReadonlyArray<Skill>,
      setValue: (value: never) => void,
      insertValue: (index: number, value: never) => void,
    ) => {
      if (skillModalMode === 'edit' && editingSkill) {
        const updatedSkills = allSkills.map((skill) =>
          skill.id === editingSkill.id ? savedSkill : skill,
        );
        setValue(updatedSkills as never);
      } else {
        insertValue(0, savedSkill as never);
      }
      closeSkillModal();
    },
    [skillModalMode, editingSkill, closeSkillModal],
  );

  const handleDeleteSkill = useCallback(
    (
      targetSkill: Skill,
      allSkills: ReadonlyArray<Skill>,
      setValue: (value: never) => void,
    ) => {
      removeWithUndo({
        label: `Skill: ${targetSkill.name}`,
        onRemove: () => {
          const filteredSkills = allSkills.filter(
            (skill) => skill.id !== targetSkill.id,
          );
          setValue(filteredSkills as never);
        },
      });
    },
    [],
  );

  return {
    sectionPath,
    skillModal,
    categoryEditor,
    deriveCategories,
    getSkillsByCategory,
    getAccentColor,
    handleSaveSkill,
    handleDeleteSkill,
  };
}
