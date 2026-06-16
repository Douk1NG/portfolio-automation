import { FieldConfig } from '@/types/form-types';

export const languageFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Language Name',
    placeholder: 'event.g., English',
    localized: true,
  },
  {
    name: 'level',
    label: 'Proficiency Level',
    placeholder: 'event.g., Native, C1, Professional',
  },
];
