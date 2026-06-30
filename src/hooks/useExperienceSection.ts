import { useCallback } from 'react';
import type { ProfileFormApi } from '@/types/form-types';
import { removeWithUndo } from '@/lib/utils/undo-utils';

type UseExperienceSectionProperties = {
  form: ProfileFormApi;
  sectionPath: 'experience';
};

export function useExperienceSection({ form, sectionPath }: UseExperienceSectionProperties) {
  const handleAddExperience = useCallback(() => {
    form.insertFieldValue(sectionPath, 0, {
      company: '',
      role: { es: '', en: '' },
      location: { es: '', en: '' },
      start: '',
      end: '',
      description: { es: '', en: '' },
      skills: [] as string[],
    } as never);
  }, [form, sectionPath]);

  const handleRemoveExperience = useCallback(
    (index: number) => {
      removeWithUndo({
        label: 'Experience',
        onRemove: () => form.removeFieldValue(sectionPath, index),
      });
    },
    [form, sectionPath],
  );

  return {
    handleAddExperience,
    handleRemoveExperience,
  };
}
