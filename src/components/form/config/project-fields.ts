import { FieldConfig } from '@/types/form-types';
import { Link as LinkIcon } from 'lucide-react';

export const projectFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'event.g., Portfolio Manager',
    localized: true,
    type: 'autosize',
  },
  {
    name: 'url',
    label: 'Demo URL',
    placeholder: 'https://...',
    type: 'autosize',
    leftIcon: LinkIcon,
  },
  {
    name: 'repoUrl',
    label: 'Repo URL',
    placeholder: 'https://github.com/...',
    type: 'autosize',
    leftIcon: LinkIcon,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Briefly describe your project...',
    className: 'md:col-span-2',
    localized: true,
  },
  {
    name: 'key_description',
    label: 'Key Description',
    placeholder: 'event.g., Game tool, Personal Project',
    className: 'md:col-span-2',
    localized: true,
  },
];
