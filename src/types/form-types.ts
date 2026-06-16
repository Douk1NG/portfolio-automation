import type { useProfileForm } from '@/hooks/useProfileForm';
import type { LucideIcon } from 'lucide-react';
import type { ProfileSchemaType } from '@/types/profile-schema';
import type { DeepKeys } from '@tanstack/react-form';

export type ProfileFormApi = ReturnType<typeof useProfileForm>['form'];

export type ProfilePath = DeepKeys<ProfileSchemaType>;

export type FieldConfig = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'input' | 'textarea' | 'autosize';
  leftIcon?: LucideIcon;
  className?: string;
  localized?: boolean;
};

export type GroupedFieldConfig = {
  group: string;
  fields: FieldConfig[];
};

export type FormFieldConfig = FieldConfig | GroupedFieldConfig;
