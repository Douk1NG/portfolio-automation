import React from 'react';
import { User } from 'lucide-react';
import { FormSection } from '@/components/layout/FormSection';
import { DynamicFieldList } from '@/components/form/DynamicFieldList';
import { personalFields } from '@/components/form/config/personal-fields';
import type { ProfileFormApi } from '@/types/form-types';

type PersonalSectionProps = {
  form: ProfileFormApi;
};

const PersonalSection: React.FC<PersonalSectionProps> = ({ form }) => {
  return (
    <FormSection title="Personal Information" icon={User}>
      <DynamicFieldList form={form} fields={personalFields} />
    </FormSection>
  );
};

export default PersonalSection;
