import React from 'react';
import { ProfileSidebar } from './layout/ProfileSidebar';
import { useProfileFormView } from '@/hooks/useProfileFormView';
import { ProfileFormContext } from '@/hooks/useProfileFormContext';
import type { ProfileSectionId } from '@/types/ui/profile-sidebar';

const ProfileForm: React.FC = () => {
  const { activeSection, hasProfile, handleSectionChange, form, SectionComponent } =
    useProfileFormView();

  if (!hasProfile) return null;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 duration-700 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <ProfileSidebar
        activeSection={activeSection as ProfileSectionId}
        setActiveSection={handleSectionChange}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-black/20">
        <div className="p-2 h-full">
          {SectionComponent && (
            <ProfileFormContext.Provider value={form}>
              <SectionComponent form={form} />
            </ProfileFormContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

