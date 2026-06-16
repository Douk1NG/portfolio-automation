import React from 'react';
import { OptionCheckbox } from '@/components/layout/header/modal/OptionCheckbox';

export const SectionSelection: React.FC = () => {
  const sections = [
    { key: 'includeBio', label: 'Profile (Bio)' },
    { key: 'includeExperience', label: 'Experience' },
    { key: 'includeProjects', label: 'Projects' },
    { key: 'includeDevProjects', label: 'Dev Projects' },
    { key: 'includeSkills', label: 'Skills' },
    { key: 'includeEducation', label: 'Education' },
    { key: 'includeLanguages', label: 'Languages' },
  ] as const;

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white">Sections</h4>
      <div className="grid grid-cols-2 gap-3">
        {sections.map(({ key, label }) => (
          <OptionCheckbox key={key} optionKey={key} label={label} />
        ))}
      </div>
    </div>
  );
};
