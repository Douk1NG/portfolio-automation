import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useFormFieldState } from '@/hooks/useFormFieldState';
import type { FormFieldControlProps } from '@/types/ui/form-field';

export const FormFieldControl: React.FC<FormFieldControlProps> = ({
  form,
  name,
  type = 'input',
  placeholder,
  className,
  rows,
  hasIcon,
}) => {
  const { displayValue, field } = useFormFieldState({ form, name });

  if (type === 'input') {
    return (
      <Input
        id={field.name}
        value={displayValue}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value as never)}
        placeholder={placeholder}
        className={cn(
          'bg-secondary/40 border-secondary focus:border-primary transition-all duration-300',
          hasIcon && 'pl-9',
          className,
        )}
      />
    );
  }

  if (type === 'autosize') {
    return (
      <Textarea
        id={field.name}
        value={displayValue}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value as never)}
        placeholder={placeholder}
        rows={1}
        className={cn(
          'bg-secondary/40 border-secondary focus:border-primary transition-all duration-300 min-h-9 resize-none py-1.5 wrap-anywhere',
          hasIcon && 'pl-9',
          className,
        )}
      />
    );
  }

  return (
    <Textarea
      id={field.name}
      value={displayValue}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value as never)}
      placeholder={placeholder}
      rows={rows}
      className={cn(
        'bg-secondary/40 border-secondary focus:border-primary transition-all duration-300 min-h-20 text-base',
        hasIcon && 'pl-9',
        className,
      )}
    />
  );
};
