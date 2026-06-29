import { useEffect, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
import { useProfileStore } from '@/store/useProfileStore';
import { ProfileSchema } from '@/types/profile-schema';
import type { Profile } from '@/types/profile';
import { useHistoryKeys } from '@/hooks/useHistoryKeys';

const FORM_SYNC_DELAY_MS = 400;

let formSyncTimeout: ReturnType<typeof setTimeout> | null = null;

export const useProfileForm = () => {
  const profileRevision = useProfileStore((state) => state.profileRevision);
  const syncProfileFromForm = useProfileStore((state) => state.syncProfileFromForm);
  const registerFormCommit = useProfileStore((state) => state.registerFormCommit);
  const lastSyncedRevision = useRef(-1);
  const lastSyncedValuesJson = useRef<string | null>(null);

  useHistoryKeys();

  const form = useForm({
    defaultValues: useProfileStore.getState().profile || ({} as Profile),
    validators: {
      onBlur: ProfileSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submission:', value);
    },
  });

  useEffect(() => {
    registerFormCommit(() => form.state.values as Profile);
    return () => registerFormCommit(null);
  }, [form, registerFormCommit]);

  // Reset form only on external store changes (load, undo, redo, sync)
  useEffect(() => {
    const profile = useProfileStore.getState().profile;
    if (!profile || profileRevision === lastSyncedRevision.current) return;

    lastSyncedRevision.current = profileRevision;
    form.reset(profile);
    lastSyncedValuesJson.current = JSON.stringify(profile);
  }, [profileRevision, form]);

  // Debounced form -> store sync
  useEffect(() => {
    const subscription = form.store.subscribe(() => {
      if (!form.state.isDirty) return;

      if (formSyncTimeout) clearTimeout(formSyncTimeout);

      formSyncTimeout = setTimeout(() => {
        formSyncTimeout = null;
        const { values, isDirty } = form.state;
        if (!isDirty) return;

        const currentJson = JSON.stringify(values);
        if (currentJson === lastSyncedValuesJson.current) return;
        lastSyncedValuesJson.current = currentJson;

        // Sync to store without stringify lag
        syncProfileFromForm(values as Profile);
      }, FORM_SYNC_DELAY_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (formSyncTimeout) clearTimeout(formSyncTimeout);
    };
  }, [form, syncProfileFromForm]);

  return { form };
};

export type ProfileFormApi = ReturnType<typeof useProfileForm>['form'];
