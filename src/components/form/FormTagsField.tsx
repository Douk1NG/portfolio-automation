import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tag } from 'lucide-react';
import type { ProfileFormApi, ProfilePath } from '@/types/form-types';

type FormTagsFieldProps = {
  form: ProfileFormApi;
  name: ProfilePath;
  label?: string;
  placeholder?: string;
  className?: string;
};

export const FormTagsField: React.FC<FormTagsFieldProps> = ({
  form,
  name,
  label = 'Tags (comma separated)',
  placeholder = 'React, TypeScript, Tailwind...',
  className = 'bg-secondary/40 border-secondary focus:border-emerald-500 transition-all duration-300 h-9',
}) => {
  return (
    <form.Field name={name}>
      {(childField) => (
        <div className="space-y-2">
          <Label
            htmlFor={childField.name}
            className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] tracking-widest font-bold"
          >
            <Tag className="w-3 h-3" /> {label}
          </Label>
          <Input
            id={childField.name}
            value={
              Array.isArray(childField.state.value)
                ? (childField.state.value as string[]).join(', ')
                : ''
            }
            onBlur={childField.handleBlur}
            onChange={(event) =>
              childField.handleChange(
                event.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean) as never,
              )
            }
            placeholder={placeholder}
            className={className}
          />
        </div>
      )}
    </form.Field>
  );
};
