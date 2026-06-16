import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCvGenerationStore } from '@/store/useCvGenerationStore';
import type { CvGenerationOptions } from '@/types/profile';

type OptionCheckboxProps = {
  optionKey: keyof CvGenerationOptions;
  label: string;
};

export const OptionCheckbox: React.FC<OptionCheckboxProps> = ({ optionKey, label }) => {
  const isChecked = useCvGenerationStore((state) => state.options[optionKey] as boolean);
  const toggleOption = useCvGenerationStore((state) => state.toggleOption);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={optionKey}
        checked={isChecked}
        onCheckedChange={() => toggleOption(optionKey)}
      />
      <Label
        htmlFor={optionKey}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
};
