import { useProfileStore } from '@/store/useProfileStore';
import { useUIStore } from '@/store/useUIStore';
import PersonalSection from './sections/personal/PersonalSection';
import ExperienceSection from './sections/experience/ExperienceSection';
import ProjectsSection from './sections/projects/ProjectsSection';
import DevProjectsSection from './sections/devprojects/DevProjectsSection';
import SkillsSection from './sections/skills/SkillsSection';
import EducationSection from './sections/education/EducationSection';
import LanguagesSection from './sections/languages/LanguagesSection';
import { ProfileSidebar } from './layout/ProfileSidebar';
import { useProfileForm } from '@/hooks/useProfileForm';
import type { ProfileSectionId } from '@/types/ui/profile-sidebar';
import type { ProfileFormApi } from '@/types/form-types';

const SECTION_COMPONENTS: Record<string, React.ComponentType<{ form: ProfileFormApi }>> = {
  personal: PersonalSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  devProjects: DevProjectsSection,
  skills: SkillsSection,
  education: EducationSection,
  languages: LanguagesSection,
};

type SectionKey = keyof typeof SECTION_COMPONENTS;

const ProfileForm: React.FC = () => {
  const activeSection = useUIStore((state) => state.activeSection);
  const setActiveSection = useUIStore((state) => state.setActiveSection);
  const hasProfile = useProfileStore((state) => state.profile !== null);
  const { form } = useProfileForm();

  const Section = SECTION_COMPONENTS[activeSection as SectionKey];
  const sectionContent = Section ? <Section form={form} /> : null;

  if (!hasProfile) return null;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-700 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <ProfileSidebar
        activeSection={activeSection as ProfileSectionId}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-black/20">
        <div className="p-2 h-full">{sectionContent}</div>
      </div>
    </div>
  );
};

export default ProfileForm;
