import React from 'react';
import { Languages } from 'lucide-react';
import { FormSection } from '@/components/layout/FormSection';
import { AddButton } from '@/components/form/SectionButtons';
import { SectionEmptyState } from '@/components/layout/SectionEmptyState';
import type { Language } from '@/types/profile';
import { removeWithUndo } from '@/lib/utils/undo-utils';
import { LanguageItem } from './LanguageItem';
import type { LanguagesSectionProps } from '@/types/ui/languages-section';

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ form }) => {
  const sectionPath = 'languages' as const;

  return (
    <FormSection
      title="Languages"
      icon={Languages}
      iconColor="text-purple-400"
      action={
        <form.Field name={sectionPath} mode="array">
          {(field) => (
            <AddButton
              label="Add Language"
              onClick={() => field.insertValue(0, { name: { es: '', en: '' }, level: '' } as never)}
            />
          )}
        </form.Field>
      }
    >
      <form.Field name={sectionPath} mode="array">
        {(field) => (
          <div className="space-y-6">
            {(field.state.value as Language[]).map((item, i: number) => (
              <LanguageItem
                key={item.name?.en || item.level || i}
                form={form}
                index={i}
                onRemove={() =>
                  removeWithUndo({
                    label: 'Language',
                    onRemove: () => form.removeFieldValue(sectionPath, i),
                  })
                }
                isLast={i === (field.state.value as Language[]).length - 1}
              />
            ))}

            {(field.state.value as Language[]).length === 0 && (
              <SectionEmptyState icon={Languages} message="Add your languages." />
            )}
          </div>
        )}
      </form.Field>
    </FormSection>
  );
};

export default LanguagesSection;
