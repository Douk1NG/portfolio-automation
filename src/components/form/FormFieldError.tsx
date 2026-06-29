import React from 'react';
import type { FormFieldErrorProps } from '@/types/ui/form-field';

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ hasErrors, errorMessage }) => {
  if (!hasErrors || !errorMessage) return null;

  return <p className="text-destructive text-[10px] font-medium italic">{errorMessage}</p>;
};
