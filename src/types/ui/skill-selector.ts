import type { ProfileFormApi, ProfilePath } from '@/types/form-types';
import type { Skill } from '@/types/profile';

export type SkillSelectorProps = {
  form: ProfileFormApi;
  name: ProfilePath;
  label: string;
};

export type SkillSelectorTagProps = {
  skillName: string;
  skillData?: Skill;
  onRemove: (skillName: string) => void;
};

export type SkillSelectorDropdownProps = {
  isOpen: boolean;
  query: string;
  setQuery: (query: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  filteredSkills: Skill[];
  onToggleSkill: (skillName: string) => void;
};
