import React from 'react';
import { FormField } from '@/components/form/FormField';
import LocalizedFormField from '@/components/form/LocalizedFormField';
import type { ProfileFormApi, ProfilePath, FormFieldConfig, FieldConfig } from '@/types/form-types';

type DynamicFieldListProps = {
  form: ProfileFormApi;
  fields: FormFieldConfig[];
  basePath?: string;
  exclude?: string[];
  children?: React.ReactNode;
};

export const DynamicFieldList: React.FC<DynamicFieldListProps> = ({
  form,
  fields,
  basePath = '',
  exclude = [],
  children,
}) => {
  const renderField = (fieldConfig: FieldConfig) => {
    if (exclude.includes(fieldConfig.name)) return null;

    const fieldName = basePath ? `${basePath}.${fieldConfig.name}` : fieldConfig.name;

    if (fieldConfig.localized) {
      return (
        <LocalizedFormField
          key={fieldConfig.name}
          form={form}
          name={fieldName}
          label={fieldConfig.label}
          placeholder={fieldConfig.placeholder}
          type={fieldConfig.type}
          leftIcon={fieldConfig.leftIcon}
          className={fieldConfig.className}
        />
      );
    }

    return (
      <FormField
        key={fieldConfig.name}
        form={form}
        name={fieldName as ProfilePath}
        label={fieldConfig.label}
        placeholder={fieldConfig.placeholder}
        type={fieldConfig.type}
        leftIcon={fieldConfig.leftIcon}
        className={fieldConfig.className}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.map((config) => {
        if ('group' in config) {
          return (
            <div key={config.group} className="grid grid-cols-2 justify-between gap-4">
              {config.fields.map(renderField)}
            </div>
          );
        }
        return renderField(config);
      })}
      {children}
    </div>
  );
};
