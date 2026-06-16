import React from 'react';
import { SectionItem } from '@/components/layout/SectionItem';
import { DynamicFieldList } from '@/components/form/DynamicFieldList';
import { SkillSelector } from '@/components/form/SkillSelector';
import { experienceFields } from '@/components/form/config/experience-fields';
import type { ProfilePath } from '@/types/form-types';
import type { ExperienceItemProps } from '@/types/ui/experience-section';

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  form,
  index,
  onRemove,
  isLast,
}) => {
  const sectionPath = 'experience';

  return (
    <SectionItem
      label="Experience"
      index={index}
      onRemove={onRemove}
      accentColor="bg-primary"
      showSeparator={!isLast}
    >
      <DynamicFieldList
        form={form}
        fields={experienceFields}
        basePath={`${sectionPath}[${index}]`}
        exclude={['skills']}
      >
        <div className="md:col-span-2">
          <SkillSelector
            form={form}
            name={`${sectionPath}[${index}].skills` as ProfilePath}
            label="Skills Used"
          />
        </div>
      </DynamicFieldList>
    </SectionItem>
  );
};
