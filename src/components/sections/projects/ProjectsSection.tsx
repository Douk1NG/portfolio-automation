import React from 'react';
import { Code2 } from 'lucide-react';
import { FormSection } from '@/components/layout/FormSection';
import { AddButton } from '@/components/form/SectionButtons';
import { SectionEmptyState } from '@/components/layout/SectionEmptyState';
import { ProjectItem } from './ProjectItem';
import { useProjectsSection } from '@/hooks/useProjectsSection';
import type { ProjectsSectionProps } from '@/types/ui/projects-section';
import type { Project } from '@/types/profile';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ form }) => {
  const sectionPath = 'projects' as const;
  const { handleAddProject, handleRemoveProject } = useProjectsSection({
    form,
    sectionPath,
  });

  return (
    <FormSection
      title="Projects"
      icon={Code2}
      iconColor="text-primary"
      action={<AddButton label="Add Project" onClick={handleAddProject} />}
    >
      <form.Field name={sectionPath} mode="array">
        {(field) => {
          const projects = (field.state.value as Project[]) || [];

          return (
            <div className="space-y-8">
              {projects.map((item, index: number) => (
                <ProjectItem
                  key={item.url || item.repoUrl || item.name?.en || index}
                  form={form}
                  index={index}
                  onRemove={() => handleRemoveProject(index)}
                  isLast={index === projects.length - 1}
                />
              ))}

              {projects.length === 0 && (
                <SectionEmptyState icon={Code2} message="No projects added yet." />
              )}
            </div>
          );
        }}
      </form.Field>
    </FormSection>
  );
};

export default ProjectsSection;
