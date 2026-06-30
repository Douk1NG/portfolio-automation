import React from 'react';
import type { Skill } from '@/types/profile';
import { CategoryEditor } from './CategoryEditor';
import { SkillCategoryGroup } from './SkillCategoryGroup';
import type { UseCategoryEditorReturn } from '@/hooks/useCategoryEditor';

type SkillCategoryListProps = {
  categories: ReadonlyArray<string>;
  allSkills: ReadonlyArray<Skill>;
  categoryEditor: UseCategoryEditorReturn;
  getSkillsByCategory: (skills: ReadonlyArray<Skill>, category: string) => ReadonlyArray<Skill>;
  getAccentColor: (index: number) => string;
  openAddModal: (category: string) => void;
  openEditModal: (skill: Skill) => void;
  handleDeleteSkill: (skill: Skill, allSkills: ReadonlyArray<Skill>, setValue: (value: never) => void) => void;
  setValue: (value: never) => void;
};

const SkillCategoryListContent: React.FC<SkillCategoryListProps> = ({
  categories,
  allSkills,
  categoryEditor,
  getSkillsByCategory,
  getAccentColor,
  openAddModal,
  openEditModal,
  handleDeleteSkill,
  setValue,
}) => {
  return (
    <>
      {categories.map((categoryName, categoryIndex) => {
        const categorySkills = getSkillsByCategory(allSkills, categoryName);
        const accentColor = getAccentColor(categoryIndex);
        const isRenaming = categoryEditor.renamingCategory === categoryName;

        return (
          <div key={categoryName}>
            {isRenaming ? (
              <CategoryEditor
                categoryName={categoryName}
                onConfirm={(newName) =>
                  categoryEditor.confirmRename(newName, allSkills, setValue)
                }
                onCancel={categoryEditor.cancelRename}
              />
            ) : (
              <SkillCategoryGroup
                categoryName={categoryName}
                skills={categorySkills}
                accentColor={accentColor}
                onAddSkill={() => openAddModal(categoryName)}
                onEditSkill={(skill) => openEditModal(skill)}
                onDeleteSkill={(skill) => handleDeleteSkill(skill, allSkills, setValue)}
                onRenameCategory={() => categoryEditor.startRename(categoryName)}
                onDeleteCategory={() =>
                  categoryEditor.deleteCategory(categoryName, allSkills, setValue)
                }
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export const SkillCategoryList = React.memo(SkillCategoryListContent);
