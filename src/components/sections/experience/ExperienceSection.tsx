import React from 'react';
import { Briefcase } from 'lucide-react';
import { FormSection } from '@/components/layout/FormSection';
import { AddButton } from '@/components/form/SectionButtons';
import { SectionEmptyState } from '@/components/layout/SectionEmptyState';
import { ExperienceItem } from './ExperienceItem';
import { useExperienceSection } from '@/hooks/useExperienceSection';
import type { ExperienceSectionProps } from '@/types/ui/experience-section';
import type { Experience } from '@/types/profile';

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ form }) => {
  const sectionPath = 'experience' as const;
  const { handleAddExperience, handleRemoveExperience } = useExperienceSection({
    form,
    sectionPath,
  });

  return (
    <FormSection
      title="Work Experience"
      icon={Briefcase}
      iconColor="text-primary"
      action={<AddButton label="Add Experience" onClick={handleAddExperience} />}
    >
      <form.Field name={sectionPath}>
        {(field) => {
          const experiences = (field.state.value as Experience[]) || [];

          return (
            <div className="space-y-8">
              {experiences.map((_item, index: number) => (
                <ExperienceItem
                  key={index}
                  form={form}
                  index={index}
                  onRemove={() => handleRemoveExperience(index)}
                  isLast={index === experiences.length - 1}
                />
              ))}

              {experiences.length === 0 && (
                <SectionEmptyState icon={Briefcase} message="No experience added yet." />
              )}
            </div>
          );
        }}
      </form.Field>
    </FormSection>
  );
};

export default ExperienceSection;
