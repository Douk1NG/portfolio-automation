import { Code2, Wrench, Users } from 'lucide-react';

export const mainColumns = [
  {
    id: 'Web Development',
    title: 'Web Development',
    icon: <Code2 className="h-4 w-4 text-primary" />,
  },
  {
    id: 'Dev Tools',
    title: 'Dev Tools',
    icon: <Wrench className="h-4 w-4 text-primary" />,
  },
  {
    id: 'Soft Skills',
    title: 'Soft Skills',
    icon: <Users className="h-4 w-4 text-primary" />,
  },
];

export const subcategories = [
  { id: 'Frontend Development', label: 'Frontend', columnId: 'Web Development' },
  { id: 'Backend Development', label: 'Backend', columnId: 'Web Development' },
  { id: 'Testing & Workflow', label: 'Testing & Workflow', columnId: 'Dev Tools' },
  { id: 'Soft Skills', label: 'Soft Skills', columnId: 'Soft Skills' },
];
