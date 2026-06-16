import type { LucideIcon } from 'lucide-react';
import type { ProfileFormApi, ProfilePath } from '@/types/form-types';

export type FormFieldType = 'input' | 'textarea' | 'autosize';

export type FormFieldProps = {
  form: ProfileFormApi;
  name: ProfilePath;
  label?: string;
  placeholder?: string;
  type?: FormFieldType;
  className?: string;
  rows?: number;
  leftIcon?: LucideIcon;
};

export type FormFieldControlProps = {
  form: ProfileFormApi;
  name: ProfilePath;
  type?: FormFieldType;
  placeholder?: string;
  className?: string;
  rows?: number;
  hasIcon?: boolean;
};

export type FormFieldErrorProps = {
  form: ProfileFormApi;
  name: ProfilePath;
};
