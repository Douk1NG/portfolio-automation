import { describe, it, expect, beforeEach } from 'vitest';
import { useProfileStore } from '@/store/useProfileStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import type { Profile } from '@/types/profile';
import { http, HttpResponse } from 'msw';
import { server } from '@root/vitest.setup';

const mockProfile: Profile = {
  name: 'Juan',
  surname: 'Perez',
  title: { es: 'Desarrollador', en: 'Developer' },
  email: '',
  phone: '',
  location: { es: '', en: '' },
  linkedin: '',
  github: '',
  bio: { es: '', en: '' },
  portfolioUrl: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
};

describe('ProfileStore History', () => {
  beforeEach(() => {
    const store = useProfileStore.getState();
    store.setProfile(JSON.parse(JSON.stringify(mockProfile)));
  });

  it('should take a snapshot and undo changes', () => {
    const store = useProfileStore.getState();

    expect(store.profile?.name).toBe('Juan');

    // Update data
    store.updateProfileData({ name: 'Juan Editado' });

    expect(useProfileStore.getState().profile?.name).toBe('Juan Editado');
    expect(useHistoryStore.getState().undoStack.length).toBe(1);
    expect(useHistoryStore.getState().undoStack[0].name).toBe('Juan');

    // Undo
    useHistoryStore.getState().undo();
    expect(useProfileStore.getState().profile?.name).toBe('Juan');
    expect(useHistoryStore.getState().redoStack.length).toBe(1);
    expect(useHistoryStore.getState().redoStack[0].name).toBe('Juan Editado');
  });

  it('should redo an undone change', () => {
    const store = useProfileStore.getState();

    store.updateProfileData({ name: 'Juan Editado' });
    useHistoryStore.getState().undo();
    expect(useProfileStore.getState().profile?.name).toBe('Juan');

    useHistoryStore.getState().redo();
    expect(useProfileStore.getState().profile?.name).toBe('Juan Editado');
    expect(useHistoryStore.getState().undoStack.length).toBe(1);
    expect(useHistoryStore.getState().undoStack[0].name).toBe('Juan');
  });

  it('should limit the undo stack size', () => {
    const store = useProfileStore.getState();

    // Push many unique changes using immediate to bypass debounce
    for (let i = 0; i < 60; i++) {
      store.updateProfileData({ name: `Name ${i}` }, true);
    }

    const state = useHistoryStore.getState();
    expect(state.undoStack.length).toBe(50);
  });
});

describe('ProfileStore fetchProfile migration', () => {
  it('migrates old education institution format to string', async () => {
    server.use(
      http.get('/api/profile', () => {
        return HttpResponse.json({
          ...mockProfile,
          education: [
            {
              institution: {
                en: 'MIT',
                es: 'MIT',
              },
              start: '2020',
              end: '2021',
              degree: { en: 'BSc', es: 'BSc' },
            },
          ],
        });
      }),
    );

    await useProfileStore.getState().fetchProfile();
    const profile = useProfileStore.getState().profile;
    expect(profile?.education[0].institution).toBe('MIT');
  });

  it('migrates old languages level format to string', async () => {
    server.use(
      http.get('/api/profile', () => {
        return HttpResponse.json({
          ...mockProfile,
          languages: [
            { name: { en: 'English', es: 'Inglés' }, level: { en: 'Native', es: 'Nativo' } },
          ],
        });
      }),
    );

    await useProfileStore.getState().fetchProfile();
    const profile = useProfileStore.getState().profile;
    expect(profile?.languages[0].level).toBe('Native');
  });

  it('preserves valid new formats', async () => {
    server.use(
      http.get('/api/profile', () => {
        return HttpResponse.json({
          ...mockProfile,
          education: [
            {
              institution: 'Harvard',
              start: '2020',
              end: '2021',
              degree: { en: 'BSc', es: 'BSc' },
            },
          ],
          languages: [{ name: { en: 'English', es: 'Inglés' }, level: 'C2' }],
        });
      }),
    );

    await useProfileStore.getState().fetchProfile();
    const profile = useProfileStore.getState().profile;
    expect(profile?.education[0].institution).toBe('Harvard');
    expect(profile?.languages[0].level).toBe('C2');
  });
});
