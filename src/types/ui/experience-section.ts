import type { ProfileFormApi } from '@/types/form-types';

export type ExperienceSectionProps = {
  form: ProfileFormApi;
};

export type ExperienceItemProps = {
  form: ProfileFormApi;
  index: number;
  onRemove: () => void;
  isLast: boolean;
};
