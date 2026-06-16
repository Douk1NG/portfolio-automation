import React from 'react';
import { LanguageCheckbox } from '@/components/layout/header/modal/LanguageCheckbox';

export const LanguageSelection: React.FC = () => {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white">Languages</h4>
      <div className="flex items-center space-x-4">
        <LanguageCheckbox language="en" label="English" />
        <LanguageCheckbox language="es" label="Spanish" />
      </div>
    </div>
  );
};
