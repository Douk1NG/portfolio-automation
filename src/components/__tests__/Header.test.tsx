import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from '../layout/header/Header';
import { useProfileStore } from '@/store/useProfileStore';
import type { ProfileData } from '@/types/profile';

vi.mock('@/hooks/useLatexCV', () => ({
  useLatexCv: () => ({ generate: vi.fn(), isLoading: false }),
}));

describe('Header Component', () => {
  const stubProfile: ProfileData = {
    name: 'Test',
    surname: '',
    title: { es: '', en: '' },
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
    devProjects: {
      title: { es: '', en: '' },
      date: { es: '', en: '' },
      description: { es: '', en: '' },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useProfileStore.setState({ profile: stubProfile, saveStatus: 'saved' });
  });

  it('renders Header and actions', () => {
    render(<Header />);
    expect(screen.getByText(/Deploy/i)).toBeDefined();
  });
});
