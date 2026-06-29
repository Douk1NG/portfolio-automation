import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { FormFieldControlProps } from '@/types/ui/form-field';

const FormFieldInput: React.FC<FormFieldControlProps> = ({
  field,
  displayValue,
  placeholder,
  className,
  hasIcon,
}) => {
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
};

const FormFieldTextarea: React.FC<FormFieldControlProps & { autosize: boolean }> = ({
  field,
  displayValue,
  placeholder,
  className,
  hasIcon,
  rows,
  autosize
}) => {

  const conditions = {
    rows: autosize ? 1 : rows,
    class: autosize ?
      'min-h-9 resize-none py-1.5 wrap-anywhere' :
      'min-h-20 text-base'
  }

  return (
    <Textarea
      id={field.name}
      value={displayValue}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value as never)}
      placeholder={placeholder}
      rows={conditions.rows}
      className={cn(
        'bg-secondary/40 border-secondary focus:border-primary transition-all duration-300',
        conditions.class,
        hasIcon && 'pl-9',
        className,
      )}
    />
  );
};

export const FormFieldControl: React.FC<FormFieldControlProps> = ({
  displayValue,
  field,
  type = 'input',
  placeholder,
  className,
  rows,
  hasIcon,
}) => {

  if (type === 'input') {
    return (
      <FormFieldInput
        field={field}
        displayValue={displayValue}
        placeholder={placeholder}
        className={className}
        hasIcon={hasIcon}
      />
    );
  }

  if (type === 'autosize') {
    return (
      <FormFieldTextarea
        field={field}
        displayValue={displayValue}
        placeholder={placeholder}
        className={className}
        hasIcon={hasIcon}
        rows={rows}
        autosize={true}
      />
    );
  }

  return (
    <FormFieldTextarea
      field={field}
      displayValue={displayValue}
      placeholder={placeholder}
      className={className}
      hasIcon={hasIcon}
      rows={rows}
      autosize={false}
    />
  );
};
