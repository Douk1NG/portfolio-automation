import React from 'react';
import { Code2 } from 'lucide-react';
import type { Skill } from '@/types/profile';
import type { SkillsSectionProps } from '@/types/ui/skills-section';
import { FormSection } from '@/components/layout/FormSection';
import { useSkillsSection } from '@/hooks/useSkillsSection';
import { SkillModal } from './SkillModal';
import { useSkillsSectionActions } from '@/hooks/useSkillsSectionActions';
import { NewCategoryInput } from './NewCategoryInput';
import { EmptySkillsBoard } from './EmptySkillsBoard';
import { SkillsBoardActions } from './SkillsBoardActions';
import { SkillCategoryList } from './SkillCategoryList';

const SkillsSection: React.FC<SkillsSectionProps> = ({ form }) => {
  const {
    sectionPath,
    skillModal,
    categoryEditor,
    deriveCategories,
    getSkillsByCategory,
    getAccentColor,
    handleSaveSkill,
    handleDeleteSkill,
  } = useSkillsSection();

  const {
    isAddingCategory,
    newCategoryName,
    setNewCategoryName,
    startAddingCategory,
    cancelAddingCategory,
  } = useSkillsSectionActions();

  return (
    <FormSection
      title="Skills Board"
      icon={Code2}
      iconColor="text-primary"
      action={
        <SkillsBoardActions
          form={form}
          sectionPath={sectionPath}
          deriveCategories={deriveCategories}
          openAddModal={skillModal.openAddModal}
          startAddingCategory={startAddingCategory}
        />
      }
    >
      <form.Field name={sectionPath} mode="array">
        {(field) => {
          const allSkills = (field.state.value as Skill[]) || [];
          const categories = deriveCategories(allSkills);

          return (
            <div className="space-y-6">
              <SkillCategoryList
                categories={categories}
                allSkills={allSkills}
                categoryEditor={categoryEditor}
                getSkillsByCategory={getSkillsByCategory}
                getAccentColor={getAccentColor}
                openAddModal={skillModal.openAddModal}
                openEditModal={skillModal.openEditModal}
                handleDeleteSkill={handleDeleteSkill}
                setValue={field.setValue as (value: never) => void}
              />

              {isAddingCategory && (
                <NewCategoryInput
                  newCategoryName={newCategoryName}
                  setNewCategoryName={setNewCategoryName}
                  categoryEditor={categoryEditor}
                  allSkills={allSkills}
                  insertValue={field.insertValue as (index: number, value: never) => void}
                  cancelAddingCategory={cancelAddingCategory}
                />
              )}

              {categories.length === 0 && !isAddingCategory && <EmptySkillsBoard />}

              <SkillModal
                isOpen={skillModal.isOpen}
                mode={skillModal.mode}
                categories={categories.length > 0 ? categories : ['General']}
                initialSkill={skillModal.editingSkill}
                preselectedCategory={skillModal.preselectedCategory}
                onSave={(skill) =>
                  handleSaveSkill(
                    skill,
                    allSkills,
                    field.setValue as (value: never) => void,
                    field.insertValue as (index: number, value: never) => void,
                  )
                }
                onClose={skillModal.closeModal}
              />
            </div>
          );
        }}
      </form.Field>
    </FormSection>
  );
};

export default SkillsSection;
