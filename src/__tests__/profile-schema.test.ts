import { describe, it, expect } from 'vitest';
import { ProfileSchema } from '@/types/profile-schema';

describe('ProfileSchema', () => {
  const validProfile = {
    name: 'John',
    surname: 'Doe',
    title: { es: 'Desarrollador', en: 'Developer' },
    email: 'john@example.com',
    phone: '123',
    location: { es: 'NY', en: 'NY' },
    linkedin: 'https://linkedin.com/in/john',
    github: 'https://github.com/john',
    bio: { es: 'Hola', en: 'Hello' },
    portfolioUrl: 'https://portfolio.com',
    skills: [
      { id: '1', name: 'React', category: 'Frontend' },
      { id: '2', name: 'Node', category: 'Backend', icon: 'server', svg: 'Node' },
    ],
    experience: [
      {
        company: 'Acme',
        role: { es: 'Dev', en: 'Dev' },
        location: { es: 'Remote', en: 'Remote' },
        start: 'JAN 2020',
        end: 'DEC 2020',
        description: { es: 'Desc', en: 'Desc' },
        skills: ['React'],
      },
    ],
    projects: [
      {
        url: 'https://project.com',
        repoUrl: 'https://github.com/project',
        tags: ['React'],
        name: { es: 'Proj', en: 'Proj' },
        description: { es: 'Desc', en: 'Desc' },
        key_description: { es: 'Key', en: 'Key' },
      },
    ],
    education: [
      {
        institution: 'University',
        degree: { es: 'Degree', en: 'Degree' },
        start: '2015',
        end: '2019',
      },
    ],
    languages: [{ name: { es: 'Inglés', en: 'English' }, level: 'C1' }],
  };

  it('validates a complete valid profile', () => {
    const result = ProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const invalidProfile = { ...validProfile, name: '' };
    const result = ProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Name is required');
    }
  });

  it('rejects invalid email formats', () => {
    const invalidProfile = { ...validProfile, email: 'not-an-email' };
    const result = ProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid email');
    }
  });

  it('allows empty strings for URL fields', () => {
    const profileWithEmptyUrls = {
      ...validProfile,
      linkedin: '',
      github: '',
      portfolioUrl: '',
      projects: [{ ...validProfile.projects[0], url: '', repoUrl: '' }],
    };
    const result = ProfileSchema.safeParse(profileWithEmptyUrls);
    expect(result.success).toBe(true);
  });

  it('validates skills with optional icon/svg', () => {
    const profileWithIcon = {
      ...validProfile,
      skills: [{ id: '1', name: 'Skill', category: 'Cat', icon: 'icon-name' }],
    };
    const result = ProfileSchema.safeParse(profileWithIcon);
    expect(result.success).toBe(true);
  });
});
