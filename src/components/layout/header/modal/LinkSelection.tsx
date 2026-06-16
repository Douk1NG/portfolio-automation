import React from 'react';
import { OptionCheckbox } from '@/components/layout/header/modal/OptionCheckbox';

export const LinkSelection: React.FC = () => {
  const links = [
    { key: 'includeLinkedin', label: 'LinkedIn' },
    { key: 'includeGithub', label: 'GitHub' },
    { key: 'includePortfolio', label: 'Portfolio' },
  ] as const;

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white">Links</h4>
      <div className="grid grid-cols-3 gap-3">
        {links.map(({ key, label }) => (
          <OptionCheckbox key={key} optionKey={key} label={label} />
        ))}
      </div>
    </div>
  );
};
