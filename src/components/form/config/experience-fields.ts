import { FieldConfig } from '@/types/form-types';

export const experienceFields: FieldConfig[] = [
  {
    name: 'company',
    label: 'Company',
    placeholder: 'event.g., Acme Corp',
  },
  {
    name: 'role',
    label: 'Role',
    placeholder: 'event.g., Software Engineer',
    localized: true,
    type: 'autosize',
  },
  {
    name: 'location',
    label: 'Location',
    placeholder: 'event.g., Madrid, Spain',
    localized: true,
    type: 'autosize',
  },
  {
    name: 'start',
    label: 'Start Period',
    placeholder: 'event.g., JAN 2022',
    type: 'autosize',
  },
  {
    name: 'end',
    label: 'End Period',
    placeholder: 'event.g., PRESENT',
    type: 'autosize',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Key responsibilities and achievements...',
    className: 'md:col-span-2',
    localized: true,
  },
  {
    name: 'skills',
    label: 'Skills Used',
    placeholder: 'event.g., React, Tailwind, TypeScript (comma separated)',
    className: 'md:col-span-2',
  },
];
