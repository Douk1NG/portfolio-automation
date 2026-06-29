import React from 'react';
import { HeaderLogo } from '@/components/layout/header/HeaderLogo';
import { HeaderActions } from '@/components/layout/header/actions/HeaderActions';
import { CvGenerationModal } from '@/components/layout/header/modal/CvGenerationModal';
import { useHeader } from '@/hooks/useHeader';

export const Header: React.FC = () => {
  const { handleAction, hasProfile, isLoading, saveProfile } = useHeader();

  return (
    <header className="h-auto md:h-20 py-4 md:py-0 border-b border-white/5 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 gap-4 md:gap-0 bg-background/60 backdrop-blur-2xl z-50 relative top-0 shadow-xl shadow-black/40">
      <HeaderLogo />

      <HeaderActions handleAction={handleAction} isLoading={isLoading} hasProfile={hasProfile} saveProfile={saveProfile} />

      <CvGenerationModal />
    </header>
  );
};
