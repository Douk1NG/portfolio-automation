import { FieldConfig } from '@/types/form-types';

export const personalFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'event.g., John',
    type: 'autosize',
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'event.g., Doe',
    type: 'autosize',
  },
  {
    name: 'title',
    label: 'Professional Title',
    placeholder: 'event.g., Senior Full Stack Developer',
    localized: true,
    type: 'autosize',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'your.email@example.com',
    type: 'autosize',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'event.g., +34 600 000 000',
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
    name: 'linkedin',
    label: 'LinkedIn URL',
    placeholder: 'https://linkedin.com/in/...',
    type: 'autosize',
  },
  {
    name: 'github',
    label: 'GitHub URL',
    placeholder: 'https://github.com/...',
    type: 'autosize',
  },
  {
    name: 'portfolioUrl',
    label: 'Portfolio URL',
    placeholder: 'https://your-portfolio.com',
    type: 'autosize',
  },
  {
    name: 'bio',
    label: 'Professional Bio',
    type: 'textarea',
    placeholder: 'Brief summary about your professional path...',
    className: 'md:col-span-2 min-h-[120px]',
    localized: true,
  },
];
