import type { ProfileFormApi } from '@/types/form-types';
import type { Skill } from '@/types/profile';

export type SkillsSectionProps = {
  form: ProfileFormApi;
};

export type SkillChipProps = {
  skill: Skill;
  accentColor: string;
  onEdit: () => void;
  onDelete: () => void;
};

export type SkillCategoryGroupProps = {
  categoryName: string;
  skills: ReadonlyArray<Skill>;
  accentColor: string;
  onAddSkill: () => void;
  onEditSkill: (skill: Skill) => void;
  onDeleteSkill: (skill: Skill) => void;
  onRenameCategory: () => void;
  onDeleteCategory: () => void;
};

export type SkillModalMode = 'add' | 'edit';

export type SkillModalProps = {
  isOpen: boolean;
  mode: SkillModalMode;
  categories: ReadonlyArray<string>;
  initialSkill: Skill | null;
  preselectedCategory: string;
  onSave: (skill: Skill) => void;
  onClose: () => void;
};

export type CategoryEditorProps = {
  categoryName: string;
  onConfirm: (newName: string) => void;
  onCancel: () => void;
};
