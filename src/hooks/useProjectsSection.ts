import { useCallback } from 'react';
import type { ProfileFormApi } from '@/types/form-types';
import { removeWithUndo } from '@/lib/utils/undo-utils';

type UseProjectsSectionProperties = {
  form: ProfileFormApi;
  sectionPath: 'projects';
};

export function useProjectsSection({ form, sectionPath }: UseProjectsSectionProperties) {
  const handleAddProject = useCallback(() => {
    form.insertFieldValue(sectionPath, 0, {
      url: '',
      repoUrl: '',
      tags: [],
      name: { es: '', en: '' },
      description: { es: '', en: '' },
      key_description: { es: '', en: '' },
    } as never);
  }, [form, sectionPath]);

  const handleRemoveProject = useCallback(
    (index: number) => {
      removeWithUndo({
        label: 'Project',
        onRemove: () => form.removeFieldValue(sectionPath, index),
      });
    },
    [form, sectionPath],
  );

  return {
    handleAddProject,
    handleRemoveProject,
  };
}
