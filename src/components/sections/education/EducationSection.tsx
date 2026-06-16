import React from 'react';
import { GraduationCap } from 'lucide-react';
import { FormSection } from '@/components/layout/FormSection';
import { AddButton } from '@/components/form/SectionButtons';
import { SectionEmptyState } from '@/components/layout/SectionEmptyState';
import type { Education } from '@/types/profile';
import { removeWithUndo } from '@/lib/utils/undo-utils';
import { EducationItem } from './EducationItem';
import type { EducationSectionProps } from '@/types/ui/education-section';

const EducationSection: React.FC<EducationSectionProps> = ({ form }) => {
  const sectionPath = 'education' as const;

  return (
    <FormSection
      title="Education"
      icon={GraduationCap}
      iconColor="text-primary"
      action={
        <form.Field name={sectionPath} mode="array">
          {(field) => (
            <AddButton
              label="Add Education"
              onClick={() =>
                field.pushValue({
                  institution: '',
                  degree: { es: '', en: '' },
                  start: '',
                  end: '',
                } as never)
              }
            />
          )}
        </form.Field>
      }
    >
      <form.Field name={sectionPath}>
        {(field) => (
          <div className="space-y-8">
            {(field.state.value as Education[]).map((_item, i: number) => (
              <EducationItem
                key={i}
                form={form}
                index={i}
                onRemove={() =>
                  removeWithUndo({
                    label: 'Education',
                    onRemove: () => form.removeFieldValue(sectionPath, i),
                  })
                }
                isLast={i === (field.state.value as Education[]).length - 1}
              />
            ))}

            {(field.state.value as Education[]).length === 0 && (
              <SectionEmptyState icon={GraduationCap} message="Add your academic background." />
            )}
          </div>
        )}
      </form.Field>
    </FormSection>
  );
};

export default EducationSection;
