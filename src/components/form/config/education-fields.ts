import { FormFieldConfig } from '@/types/form-types';

export const educationFields: FormFieldConfig[] = [
  {
    name: 'institution',
    label: 'Institution',
    placeholder: 'event.g., University of Technology',
  },
  {
    name: 'degree',
    label: 'Degree',
    placeholder: 'event.g., B.S. in Computer Science',
    localized: true,
    type: 'autosize',
  },
  {
    group: 'dates',
    fields: [
      {
        name: 'start',
        label: 'Start Year',
        placeholder: 'event.g., 2018',
      },
      {
        name: 'end',
        label: 'End Year',
        placeholder: 'event.g., 2022',
      },
    ],
  },
];
