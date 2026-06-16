// src/ui/components/form/LocalizedFormField.tsx
import React from 'react';
import type { ProfileFormApi, ProfilePath } from '@/types/form-types';
import { FormField } from './FormField';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

type LocalizedFormFieldProps = {
  form: ProfileFormApi;
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'input' | 'textarea' | 'autosize';
  className?: string;
  leftIcon?: LucideIcon;
};

const Header: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-3">
      <Globe className="w-4 h-4 text-primary/80" />
      <span className="text-[11px] font-black uppercase tracking-widest text-primary/80">
        {label} (Translatable)
      </span>
    </div>
  );
};

export const LocalizedFormField: React.FC<LocalizedFormFieldProps> = ({
  form,
  name,
  label = '',
  placeholder,
  type = 'input',
  className,
  leftIcon,
}) => {
  return (
    <div
      className={cn(
        'bg-black/40 border border-white/10 rounded-2xl p-5 space-y-5 shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative flex flex-col',
        className,
      )}
    >
      <Header label={label} />

      <div className="grid md:grid-cols-2 gap-6">
        {/* English Input */}
        <div className="relative">
          <div className="absolute right-3 top-0 bottom-0 flex items-center pointer-events-none z-10 pt-5.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#1F2937]/90 border border-white/10 shadow-sm px-2 py-0.5 rounded-md backdrop-blur-md">
              EN
            </span>
          </div>
          <FormField
            form={form}
            name={`${name}.en` as ProfilePath}
            label={`${label}`}
            placeholder={placeholder ? `${placeholder} (EN)` : undefined}
            type={type}
            leftIcon={leftIcon}
            className={cn('pr-14', type === 'textarea' ? 'pb-8' : '')}
          />
        </div>

        {/* Spanish Input */}
        <div className="relative">
          <div className="absolute right-3 top-0 bottom-0 flex items-center pointer-events-none z-10 pt-5.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#1F2937]/90 border border-white/10 shadow-sm px-2 py-0.5 rounded-md backdrop-blur-md">
              ES
            </span>
          </div>
          <FormField
            form={form}
            name={`${name}.es` as ProfilePath}
            label={`${label}`}
            placeholder={placeholder ? `${placeholder} (ES)` : undefined}
            type={type}
            leftIcon={leftIcon}
            className={cn('pr-14', type === 'textarea' ? 'pb-8' : '')}
          />
        </div>
      </div>
    </div>
  );
};

export default LocalizedFormField;
