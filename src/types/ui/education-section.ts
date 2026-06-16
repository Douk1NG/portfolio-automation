import type { ProfileFormApi } from '@/types/form-types';

export type EducationSectionProps = {
  form: ProfileFormApi;
};

export type EducationItemProps = {
  form: ProfileFormApi;
  index: number;
  onRemove: () => void;
  isLast: boolean;
};
