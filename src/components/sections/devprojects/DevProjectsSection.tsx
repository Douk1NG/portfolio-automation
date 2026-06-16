import React from 'react';
import { FolderGit2 } from 'lucide-react';
import { FormSection } from '@/components/layout/FormSection';
import { DynamicFieldList } from '@/components/form/DynamicFieldList';
import { devProjectsFields } from '@/components/form/config/dev-projects-fields';
import type { ProfileFormApi } from '@/types/form-types';

type DevProjectsSectionProps = {
  form: ProfileFormApi;
};

const DevProjectsSection: React.FC<DevProjectsSectionProps> = ({ form }) => {
  return (
    <FormSection title="Dev Projects (CV)" icon={FolderGit2} iconColor="text-primary">
      <DynamicFieldList form={form} fields={devProjectsFields} basePath="devProjects" />
    </FormSection>
  );
};

export default DevProjectsSection;
