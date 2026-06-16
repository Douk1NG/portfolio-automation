import type { ReactNode } from 'react';
import type { ProfileFormApi } from '@/types/form-types';
import type { Skill } from '@/types/profile';

export type SkillsSectionProps = {
  form: ProfileFormApi;
};

export type SkillCardProps = {
  skill: Skill;
  onDelete: () => void;
  onUpdate: (skill: Skill) => void;
};

export type CategoryColumnProps = {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onDrop: (itemId: string, categoryId: string) => void;
};

export type AddSkillFormProps = {
  newSkillTitle: string;
  setNewSkillTitle: (title: string) => void;
  newSkillIconType: 'lucide' | 'svg';
  setNewSkillIconType: (type: 'lucide' | 'svg') => void;
  newSkillIconValue: string;
  setNewSkillIconValue: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleAddSkill: (
    event: React.ChangeEvent<HTMLFormElement>,
    pushValue: (value: never) => void,
  ) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  pushValue: (value: never) => void;
};

export type SkillCardEditProps = {
  editedName: string;
  setEditedName: (val: string) => void;
  editedCategory: string;
  setEditedCategory: (val: string) => void;
  iconType: 'lucide' | 'svg';
  setIconType: (val: 'lucide' | 'svg') => void;
  iconValue: string;
  setIconValue: (val: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

export type SkillCardDisplayProps = {
  skill: Skill;
  onEditStart: () => void;
  onDelete: () => void;
};
