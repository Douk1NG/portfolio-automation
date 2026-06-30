import React from 'react';
import { SectionItem } from '@/components/layout/SectionItem';
import { DynamicFieldList } from '@/components/form/DynamicFieldList';
import { SkillSelector } from '@/components/form/SkillSelector';
import { projectFields } from '@/components/form/config/project-fields';
import type { ProfilePath } from '@/types/form-types';
import type { ProjectItemProps } from '@/types/ui/projects-section';

const ProjectItemContent: React.FC<ProjectItemProps> = ({
  form,
  index,
  onRemove,
  isLast,
}) => {
  const sectionPath = 'projects';

  return (
    <SectionItem
      label="Project"
      index={index}
      onRemove={() => onRemove(index)}
      accentColor="bg-primary"
      showSeparator={!isLast}
    >
      <DynamicFieldList
        form={form}
        fields={projectFields}
        basePath={`${sectionPath}[${index}]`}
        exclude={['tags']}
      >
        <div className="md:col-span-2">
          <SkillSelector
            form={form}
            name={`${sectionPath}[${index}].tags` as ProfilePath}
            label="Technology Tags"
          />
        </div>
      </DynamicFieldList>
    </SectionItem>
  );
};

export const ProjectItem = React.memo(ProjectItemContent);
