import React from 'react';
import { Label } from '@/components/ui/label';
import { formatLabel } from '../../lib/utils/form-utils';
import type { FormFieldProps } from '@/types/ui/form-field';
import { FormFieldControl } from './FormFieldControl';
import { FormFieldError } from './FormFieldError';

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
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={name}
        className="text-muted-foreground uppercase text-[10px] tracking-widest font-bold"
      >
        {label || formatLabel(name.split('.').pop() || '')}
      </Label>

      <div className="relative">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 top-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        )}
        <FormFieldControl
          form={form}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
          rows={rows}
          hasIcon={!!LeftIcon}
        />
      </div>

      <FormFieldError form={form} name={name} />
    </div>
  );
};

export default FormField;
