import React from 'react';
import { useFormFieldState } from '@/hooks/useFormFieldState';
import type { FormFieldErrorProps } from '@/types/ui/form-field';

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ form, name }) => {
  const { hasErrors, errorMessage } = useFormFieldState({ form, name });

  if (!hasErrors || !errorMessage) return null;

  return <p className="text-destructive text-[10px] font-medium italic">{errorMessage}</p>;
};
