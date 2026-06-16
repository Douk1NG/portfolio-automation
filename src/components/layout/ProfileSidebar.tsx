import React from 'react';

import { cn } from '@/lib/utils';
import {
  User,
  Briefcase,
  Code2,
  Cpu,
  GraduationCap,
  Languages as LangIcon,
  FolderGit2,
} from 'lucide-react';
import type { ProfileSectionId } from '@/types/ui/profile-sidebar';

const sections = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'devProjects', label: 'Dev Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'languages', label: 'Languages', icon: LangIcon },
] as const;

type ProfileSidebarProps = {
  activeSection: ProfileSectionId;
  setActiveSection: (id: ProfileSectionId) => void;
};

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  return (
    <aside className="w-full md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-white/2 flex flex-col relative z-20">
      <div className="w-full md:flex-1 h-auto md:h-full px-4 py-4 md:py-8 overflow-x-auto md:overflow-y-auto custom-scrollbar">
        <div className="hidden md:block mb-6 px-4">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-primary/50">
            Form Sections
          </h2>
        </div>
        <nav className="flex md:flex-col gap-2 space-y-0 md:space-y-2 min-w-max md:min-w-0 pb-2 md:pb-0">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as ProfileSectionId)}
                className={cn(
                  'w-auto md:w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-500 cursor-pointer relative overflow-hidden group whitespace-nowrap',
                  isActive
                    ? 'text-white'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white',
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 bg-linear-to-r from-primary/20 to-transparent transition-opacity" />
                )}
                {isActive && (
                  <>
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-primary shadow-[0_0_12px_rgba(124,58,237,1)]" />
                    <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-t-full bg-primary shadow-[0_0_12px_rgba(124,58,237,1)]" />
                  </>
                )}
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-500 z-10 relative',
                    isActive
                      ? 'scale-110 text-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]'
                      : 'group-hover:scale-110',
                  )}
                />
                <span className="z-10 relative tracking-wide">{section.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
