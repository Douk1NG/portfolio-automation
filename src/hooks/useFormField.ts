import { useFormFieldState } from '@/hooks/useFormFieldState';
import type { ProfileFormApi, ProfilePath } from '@/types/form-types';

type UseFormFieldParameters = {
  form: ProfileFormApi;
  name: ProfilePath;
};

export const useFormField = ({ form, name }: UseFormFieldParameters) => {
  const { displayValue, hasErrors, errorMessage, field } = useFormFieldState({ form, name });

  return {
    displayValue,
    hasErrors,
    errorMessage,
    field,
  };
};
