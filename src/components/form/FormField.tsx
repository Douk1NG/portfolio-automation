import React from 'react';
import { Label } from '@/components/ui/label';
import { formatLabel } from '../../lib/utils/form-utils';
import type { FormFieldProps } from '@/types/ui/form-field';
import { FormFieldControl } from './FormFieldControl';
import { FormFieldError } from './FormFieldError';
import { useFormField } from '@/hooks/useFormField';

export const FormLabel: React.FC<{ name: string; label?: string }> = ({ name, label }) => {
  return (
    <Label
      htmlFor={name}
      className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold"
    >
      {label || formatLabel(name.split('.').pop() || '')}
    </Label>
  );
};

export const FormIcon: React.FC<{ icon?: React.ComponentType<{ className?: string }> }> = ({ icon }) => {
  const Icon = icon;
  if (!Icon) return null;
  return (
    <Icon className="absolute left-3 top-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
  );
};

export const FormField: React.FC<FormFieldProps> = ({
  form,
  name,
  label,
  placeholder,
  type = 'input',
  className,
  rows,
  leftIcon: LeftIcon,
}) => {
  const { displayValue, hasErrors, errorMessage, field } = useFormField({ form, name });

  return (
    <div className="flex flex-col gap-2">
      <FormLabel name={name} label={label} />
      <div className="relative">
        <FormIcon icon={LeftIcon} />
        <FormFieldControl
          displayValue={displayValue}
          field={field}
          type={type}
          placeholder={placeholder}
          className={className}
          rows={rows}
          hasIcon={!!LeftIcon}
        />
      </div>

      <FormFieldError hasErrors={hasErrors} errorMessage={errorMessage} />
    </div>
  );
};

export default FormField;
