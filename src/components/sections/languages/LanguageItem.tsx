import React from 'react';
import { SectionItem } from '@/components/layout/SectionItem';
import { DynamicFieldList } from '@/components/form/DynamicFieldList';
import { languageFields } from '@/components/form/config/language-fields';
import type { LanguageItemProps } from '@/types/ui/languages-section';

export const LanguageItem: React.FC<LanguageItemProps> = ({ form, index, onRemove, isLast }) => {
  const sectionPath = 'languages';

  return (
    <SectionItem
      label="Language"
      index={index}
      onRemove={onRemove}
      accentColor="bg-primary"
      showSeparator={!isLast}
    >
      <DynamicFieldList form={form} fields={languageFields} basePath={`${sectionPath}[${index}]`} />
    </SectionItem>
  );
};
