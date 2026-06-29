import { createContext, useContext } from 'react';
import type { ProfileFormApi } from '@/types/form-types';

export const ProfileFormContext = createContext<ProfileFormApi | null>(null);

export const useProfileFormContext = (): ProfileFormApi => {
  const form = useContext(ProfileFormContext);
  if (!form) {
    throw new Error('useProfileFormContext must be used within a ProfileFormProvider');
  }
  return form;
};
