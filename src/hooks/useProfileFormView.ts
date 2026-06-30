import React, { useCallback } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { useUIStore } from '@/store/useUIStore';
import { useProfileForm } from '@/hooks/useProfileForm';
import PersonalSection from '@/components/sections/personal/PersonalSection';
import ExperienceSection from '@/components/sections/experience/ExperienceSection';
import ProjectsSection from '@/components/sections/projects/ProjectsSection';
import SkillsSection from '@/components/sections/skills/SkillsSection';
import EducationSection from '@/components/sections/education/EducationSection';
import LanguagesSection from '@/components/sections/languages/LanguagesSection';
import type { ProfileFormApi } from '@/types/form-types';

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ form: ProfileFormApi }>> = {
  personal: PersonalSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  education: EducationSection,
  languages: LanguagesSection,
};

type SectionKey = keyof typeof SECTION_COMPONENTS;

export const useProfileFormView = () => {
  const activeSection = useUIStore((state) => state.activeSection);
  const setActiveSection = useUIStore((state) => state.setActiveSection);
  const hasProfile = useProfileStore((state) => state.profile !== null);
  const saveProfile = useProfileStore((state) => state.saveProfile);
  const { form } = useProfileForm();

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      if (form.state.isDirty) {
        saveProfile().then((success) => {
          if (success) {
            form.reset(form.state.values);
          } else {
            import('sonner').then(({ toast }) =>
              toast.error('Failed to save profile on tab switch.'),
            );
          }
        });
      }
    },
    [setActiveSection, saveProfile, form],
  );

  const SectionComponent = SECTION_COMPONENTS[activeSection as SectionKey] || null;

  return {
    activeSection,
    hasProfile,
    handleSectionChange,
    form,
    SectionComponent,
  };
};
