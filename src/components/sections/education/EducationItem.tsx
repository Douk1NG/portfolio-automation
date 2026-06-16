import React from 'react';
import { SectionItem } from '@/components/layout/SectionItem';
import { DynamicFieldList } from '@/components/form/DynamicFieldList';
import { educationFields } from '@/components/form/config/education-fields';
import type { EducationItemProps } from '@/types/ui/education-section';

export const EducationItem: React.FC<EducationItemProps> = ({ form, index, onRemove, isLast }) => {
  const sectionPath = 'education';

  return (
    <SectionItem
      label="Education"
      index={index}
      onRemove={onRemove}
      accentColor="bg-primary"
      showSeparator={!isLast}
    >
      <DynamicFieldList
        form={form}
        fields={educationFields}
        basePath={`${sectionPath}[${index}]`}
      />
    </SectionItem>
  );
};
