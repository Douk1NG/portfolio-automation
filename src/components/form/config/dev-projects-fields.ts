import type { FieldConfig } from '@/types/form-types';

export const devProjectsFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Section Title',
    placeholder: 'event.g., Fullstack dev - Proyectos personales',
    localized: true,
    type: 'autosize',
    className: 'md:col-span-2',
  },
  {
    name: 'date',
    label: 'Period',
    placeholder: 'event.g., DIC 2024 - ACTUALIDAD',
    localized: true,
    type: 'autosize',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Describe your personal development projects...',
    className: 'md:col-span-2',
    localized: true,
  },
];
