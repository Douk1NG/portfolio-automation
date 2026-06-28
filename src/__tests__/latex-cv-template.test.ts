import { describe, it, expect } from 'vitest';
import { esc, groupSkills, buildCvTex } from '@/templates/latex-cv-template';
import type { Profile, Skill } from '@/types/profile';

describe('latex-cv-template', () => {
  describe('esc', () => {
    it('escapes special LaTeX characters', () => {
      expect(esc('C\\C++')).toBe('C\\textbackslash\\{\\}C++');
      expect(esc('R&D')).toBe('R\\&D');
      expect(esc('100%')).toBe('100\\%');
      expect(esc('$100')).toBe('\\$100');
      expect(esc('C#')).toBe('C\\#');
      expect(esc('my_var')).toBe('my\\_var');
      expect(esc('{curly}')).toBe('\\{curly\\}');
      expect(esc('~tilde')).toBe('\\textasciitilde{}tilde');
      expect(esc('^hat')).toBe('\\textasciicircum{}hat');
    });

    it('handles multiple special characters in one string', () => {
      expect(esc('100% & $50_1')).toBe('100\\% \\& \\$50\\_1');
    });
  });

  describe('groupSkills', () => {
    it('groups skills by category', () => {
      const skills: Skill[] = [
        { id: '1', name: 'React', category: 'Frontend' },
        { id: '2', name: 'Vue', category: 'Frontend' },
        { id: '3', name: 'Node', category: 'Backend' },
      ];

      const grouped = groupSkills(skills);
      expect(grouped).toEqual({
        Frontend: ['React', 'Vue'],
        Backend: ['Node'],
      });
    });
  });

  describe('buildCvTex', () => {
    const mockProfile: Profile = {
      name: 'John',
      surname: 'Doe',
      title: { en: 'Developer', es: 'Desarrollador' },
      email: 'john@example.com',
      phone: '123456789',
      location: { en: 'NY', es: 'NY' },
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      bio: { en: 'Hello $world', es: 'Hola mundo' },
      portfolioUrl: 'https://portfolio.com',
      experience: [
        {
          company: 'Tech & Co',
          role: { en: 'Dev', es: 'Dev' },
          location: { en: 'Remote', es: 'Remoto' },
          start: '2020',
          end: '2021',
          description: { en: 'Did 100% of the work', es: 'Hice el 100\\% del trabajo' },
          skills: ['React'],
        },
      ],
      education: [],
      skills: [],
      languages: [],
      projects: [],
    };

    it('generates valid LaTeX for English', () => {
      const tex = buildCvTex(mockProfile, 'en');
      expect(tex).toContain('\\documentclass');
      expect(tex).toContain('John Doe');
      expect(tex).toContain('Developer');
      expect(tex).toContain('Hello \\$world'); // Escaped
      expect(tex).toContain('Tech \\& Co'); // Escaped
      expect(tex).toContain('Did 100\\% of the work'); // Escaped
      expect(tex).toContain('\\section{Experience}');
    });

    it('generates valid LaTeX for Spanish', () => {
      const tex = buildCvTex(mockProfile, 'es');
      expect(tex).toContain('Desarrollador');
      expect(tex).toContain('\\section{Experiencia}');
    });

    it('handles empty arrays gracefully', () => {
      const tex = buildCvTex(mockProfile, 'en');
      // No failure with empty education, skills, projects, etc.
      expect(tex).toContain('\\begin{document}');
    });
  });
});
