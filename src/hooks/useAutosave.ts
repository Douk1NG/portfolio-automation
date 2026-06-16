import { useProfileStore } from '@/store/useProfileStore';
import { toast } from 'sonner';

const AUTOSAVE_DEBOUNCE_MS = 2500;

let autosaveTimerId: ReturnType<typeof setTimeout> | null = null;

const executeSave = async () => {
  const { profile, lastSavedProfileJson, saveStatus, saveProfile, isBackendAvailable } =
    useProfileStore.getState();

  if (!isBackendAvailable) {
    return;
  }

  if (!profile) {
    return;
  }

  const currentProfileJson = JSON.stringify(profile);

  if (currentProfileJson === lastSavedProfileJson) {
    return;
  }

  if (saveStatus === 'saving') {
    return;
  }

  const success = await saveProfile();
  if (success) {
    toast.success('Profile saved!');
  } else {
    toast.error('Save failed.');
  }
};

export const initializeAutosave = () => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden' && autosaveTimerId) {
      clearTimeout(autosaveTimerId);
      autosaveTimerId = null;
      executeSave();
    }
  };

  const handleBeforeUnload = () => {
    if (autosaveTimerId) {
      clearTimeout(autosaveTimerId);
      autosaveTimerId = null;
      executeSave();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);

  const unsubscribe = useProfileStore.subscribe((state, previousState) => {
    if (!state.profile) {
      return;
    }

    if (state.profile === previousState.profile) {
      return;
    }

    if (autosaveTimerId) {
      clearTimeout(autosaveTimerId);
    }

    autosaveTimerId = setTimeout(() => {
      autosaveTimerId = null;
      executeSave();
    }, AUTOSAVE_DEBOUNCE_MS);
  });

  return () => {
    unsubscribe();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};
