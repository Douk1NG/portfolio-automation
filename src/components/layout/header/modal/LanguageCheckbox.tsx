import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCvGenerationStore } from '@/store/useCvGenerationStore';
import type { Langs } from '@/types/profile';

type LanguageCheckboxProps = {
  language: Langs;
  label: string;
};

export const LanguageCheckbox: React.FC<LanguageCheckboxProps> = ({ language, label }) => {
  const isChecked = useCvGenerationStore((state) => state.selectedLanguages.includes(language));
  const toggleLanguage = useCvGenerationStore((state) => state.toggleLanguage);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`lang-${language}`}
        checked={isChecked}
        onCheckedChange={() => toggleLanguage(language)}
      />
      <Label htmlFor={`lang-${language}`} className="cursor-pointer">
        {label}
      </Label>
    </div>
  );
};
