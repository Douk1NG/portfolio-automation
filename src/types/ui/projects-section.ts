import type { ProfileFormApi } from '@/types/form-types';

export type ProjectsSectionProps = {
  form: ProfileFormApi;
};

export type ProjectItemProps = {
  form: ProfileFormApi;
  index: number;
  onRemove: (index: number) => void;
  isLast: boolean;
};
