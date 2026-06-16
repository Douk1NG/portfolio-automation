import React from 'react';
import { Code2 } from 'lucide-react';
import type { Skill } from '@/types/profile';
import type { SkillsSectionProps } from '@/types/ui/skills-section';
import { removeWithUndo } from '@/lib/utils/undo-utils';
import { AddButton } from '@/components/form/SectionButtons';
import { FormSection } from '@/components/layout/FormSection';
import { SkillCard } from './SkillCard';
import { CategoryColumn } from './CategoryColumn';
import { AddSkillForm } from './AddSkillForm';
import { mainColumns, subcategories } from './constant/skills-constants';
import { useSkillsSection } from '@/hooks/useSkillsSection';

const SkillsSection: React.FC<SkillsSectionProps> = ({ form }) => {
  const {
    sectionPath,
    isAdding,
    setIsAdding,
    newSkillTitle,
    setNewSkillTitle,
    newSkillIconType,
    setNewSkillIconType,
    newSkillIconValue,
    setNewSkillIconValue,
    selectedCategory,
    setSelectedCategory,
    handleAddSkill,
    handleKeyDown,
    handleCancel,
    handleDrop,
  } = useSkillsSection();

  return (
    <FormSection
      title="Skills Board"
      icon={Code2}
      iconColor="text-primary"
      action={
        <form.Field name={sectionPath} mode="array">
          {(field) => {
            return isAdding ? (
              <AddSkillForm
                newSkillTitle={newSkillTitle}
                setNewSkillTitle={setNewSkillTitle}
                newSkillIconType={newSkillIconType}
                setNewSkillIconType={setNewSkillIconType}
                newSkillIconValue={newSkillIconValue}
                setNewSkillIconValue={setNewSkillIconValue}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                handleAddSkill={handleAddSkill}
                handleKeyDown={handleKeyDown}
                handleCancel={handleCancel}
                pushValue={field.pushValue}
              />
            ) : (
              <AddButton label="Add Skill" onClick={() => setIsAdding(true)} />
            );
          }}
        </form.Field>
      }
    >
      <form.Field name={sectionPath} mode="array">
        {(field) => {
          const allSkills = (field.state.value as Skill[]) || [];

          return (
            <div className="grid gap-6 md:grid-cols-3">
              {mainColumns.map((col) => {
                const validSubcategoryIds = subcategories
                  .filter((s) => s.columnId === col.id)
                  .map((s) => s.id);

                const categorySkills = allSkills
                  .map((skill, originalIndex) => ({ ...skill, originalIndex }))
                  .filter((skill) => validSubcategoryIds.includes(skill.category));

                return (
                  <CategoryColumn
                    key={col.id}
                    id={col.id}
                    title={col.title}
                    icon={col.icon}
                    onDrop={(itemId, droppedColId) => {
                      const defaultSubcategory = subcategories.find(
                        (s) => s.columnId === droppedColId,
                      )?.id;
                      if (defaultSubcategory) {
                        handleDrop(itemId, defaultSubcategory, allSkills, field.setValue);
                      }
                    }}
                  >
                    {categorySkills.map((skill) => (
                      <SkillCard
                        key={skill.id || skill.originalIndex}
                        skill={skill}
                        onDelete={() =>
                          removeWithUndo({
                            label: `Skill: ${skill.name}`,
                            onRemove: () => form.removeFieldValue(sectionPath, skill.originalIndex),
                          })
                        }
                        onUpdate={(updatedSkill) => {
                          const updatedSkills = [...allSkills];
                          updatedSkills[skill.originalIndex] = updatedSkill;
                          field.setValue(updatedSkills as never);
                        }}
                      />
                    ))}
                  </CategoryColumn>
                );
              })}
            </div>
          );
        }}
      </form.Field>
    </FormSection>
  );
};

export default SkillsSection;
