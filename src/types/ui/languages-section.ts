import type { ProfileFormApi } from '@/types/form-types';

export type LanguagesSectionProps = {
  form: ProfileFormApi;
};

export type LanguageItemProps = {
  form: ProfileFormApi;
  index: number;
  onRemove: (index: number) => void;
  isLast: boolean;
};
