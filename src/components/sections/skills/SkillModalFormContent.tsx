import React from 'react';
import type { Skill } from '@/types/profile';
import { useSkillModalForm } from '@/hooks/useSkillModalForm';
import { SkillNameInput } from './SkillNameInput';
import { SkillCategorySelect } from './SkillCategorySelect';
import { SkillIconSelect } from './SkillIconSelect';
import { SkillModalFormActions } from './SkillModalFormActions';

type SkillModalFormContentProps = {
  mode: 'add' | 'edit';
  categories: readonly string[];
  initialSkill: Skill | null;
  preselectedCategory?: string;
  onSave: (skill: Skill) => void;
  onClose: () => void;
}

export const SkillModalFormContent: React.FC<SkillModalFormContentProps> = ({
  mode,
  categories,
  initialSkill,
  preselectedCategory,
  onSave,
  onClose,
}) => {
  const {
    name,
    setName,
    category,
    setCategory,
    iconType,
    setIconType,
    iconValue,
    setIconValue,
    handleSubmit,
  } = useSkillModalForm({ mode, initialSkill, preselectedCategory: preselectedCategory ?? '', onSave, onClose });

  const submitLabel = mode === 'add' ? 'Add Skill' : 'Save Changes';
  const hasValidName = name.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-5">
      <SkillNameInput name={name} setName={setName} />
      <SkillCategorySelect category={category} setCategory={setCategory} categories={categories} />
      <SkillIconSelect iconType={iconType} setIconType={setIconType} iconValue={iconValue} setIconValue={setIconValue} />
      <SkillModalFormActions onClose={onClose} hasValidName={hasValidName} submitLabel={submitLabel} />
    </form>
  );
};
