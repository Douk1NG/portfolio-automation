import { http, HttpResponse } from 'msw';
import type { Profile } from '@/types/profile';

const mockProfile: Profile = {
  name: 'Test ES',
  surname: 'User',
  email: 'test@test.com',
  phone: '',
  linkedin: '',
  github: '',
  title: { es: 'Desarrollador', en: 'Developer' },
  location: { es: 'Madrid', en: 'Madrid' },
  bio: { es: 'Bio en español', en: 'Bio in English' },
  portfolioUrl: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  devProjects: {
    title: { es: '', en: '' },
    date: { es: '', en: '' },
    description: { es: '', en: '' },
  },
};

export const handlers = [
  http.get('/api/profile', () => {
    return HttpResponse.json(mockProfile);
  }),
  http.post('/api/save-profile', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('/api/sync', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('/api/extract', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('/api/update-portfolio', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('/api/generate-cv', () => {
    return HttpResponse.json({ success: true });
  }),
  http.post('/api/publish', () => {
    return HttpResponse.json({ success: true });
  }),
];
