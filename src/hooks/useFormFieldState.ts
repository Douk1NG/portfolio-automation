import { useField } from '@tanstack/react-form';
import type { ProfileFormApi, ProfilePath } from '@/types/form-types';

export type UseFormFieldStateProps = {
  form: ProfileFormApi;
  name: ProfilePath;
};

export function useFormFieldState({ form, name }: UseFormFieldStateProps) {
  const field = useField({ form, name });

  const rawValue = field.state.value;
  const isTouched = field.state.meta.isTouched;
  const errors = field.state.meta.errors;

  const displayValue =
    typeof rawValue === 'object' && rawValue !== null
      ? (rawValue as Record<string, string>).en || (rawValue as Record<string, string>).es || ''
      : String(rawValue || '');

  const hasErrors = isTouched && errors.length > 0;

  const errorMessage = hasErrors
    ? errors
        .map((error) =>
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : String(error),
        )
        .join(', ')
    : '';

  return {
    displayValue,
    hasErrors,
    errorMessage,
    field,
  };
}
