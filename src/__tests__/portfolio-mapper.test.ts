import { describe, it, expect } from 'vitest';
import type { Profile } from '@/types/profile';
import {
  generateHeroTranslationObject,
  generateExperienceTranslationObject,
  generateProjectsTranslationObject,
  mapExperienceData,
  mapProjectsData,
  mapSkillsData,
  mapInfoTagsData,
  mapProfileToPortfolioData,
} from '@/scripts/update-portfolio/utils/portfolio-mapper';

const mockProfile = {
  name: 'John',
  surname: 'Doe',
  bio: { en: "English bio with 'single quotes'", es: "Bio con 'comillas simples'" },
  title: { en: 'Software Engineer', es: 'Ingeniero' },
  location: { en: 'Cali', es: 'Cali' },
  portfolioUrl: 'https://portfolio.com',
  github: 'https://github.com/user',
  linkedin: 'https://linkedin.com/user',
  email: 'user@example.com',
  experience: [
    {
      company: 'Company A',
      role: { en: 'Developer', es: 'Desarrollador' },
      location: { en: 'Remote', es: 'Remoto' },
      start: 'JAN 2020',
      end: 'DEC 2020',
      description: { en: "Worked on 'React' projects", es: "Trabajé en proyectos 'React'" },
      skills: ['React'],
    },
  ],
  projects: [
    {
      name: { en: 'Project 1', es: 'Proyecto 1' },
      description: { en: "Description with 'quotes'", es: "Descripción con 'comillas'" },
      key_description: { en: 'Key desc', es: 'Desc clave' },
      tags: ['TypeScript'],
      url: 'https://project1.com',
      repoUrl: 'https://github.com/project1',
    },
  ],
  skills: [{ name: 'React', category: 'Frontend' }],
} as Profile;

describe('Portfolio Mapper', () => {
  describe('Translations', () => {
    it('maps hero translations correctly', () => {
      const heroEn = generateHeroTranslationObject(mockProfile, 'en');
      expect(heroEn['hero.description']).toBe("English bio with 'single quotes'");
    });

    it('maps experience translations correctly', () => {
      const expEs = generateExperienceTranslationObject(mockProfile, 'es');
      expect(expEs['exp.job1.desc']).toBe("Trabajé en proyectos 'React'");
    });

    it('maps project translations correctly', () => {
      const projEs = generateProjectsTranslationObject(mockProfile, 'es');
      expect(projEs['project1.desc']).toBe("Descripción con 'comillas'");
    });
  });

  describe('Data Mapping', () => {
    it('maps experience data correctly', () => {
      const expData = mapExperienceData(mockProfile);
      expect(expData[0].title).toBe('exp.job1.title');
      expect(expData[0].duration.short).toBe('exp.job1.duration_short');
    });

    it('maps projects data correctly', () => {
      const projData = mapProjectsData(mockProfile);
      expect(projData[0].tech).toBeInstanceOf(Array);
      expect(projData[0].title).toBe('project1.title');
    });

    it('maps info tags correctly', () => {
      const infoData = mapInfoTagsData(mockProfile);
      const githubTag = infoData.find((t) => t.titleKey === 'hero.github');
      expect(githubTag?.href).toBe('https://github.com/user');
    });

    it('maps skills data correctly with categories', () => {
      const profileWithSvg = {
        ...mockProfile,
        skills: [{ id: '1', name: 'React', category: 'Frontend', svg: 'React' }],
      } as Profile;
      const skillsData = mapSkillsData(profileWithSvg);
      expect(skillsData[0].category).toBe('Frontend');
      expect(skillsData[0].skills[0].name).toBe('React');
      expect(skillsData[0].skills[0].svg).toBe('React');
    });
  });

  describe('Full Portfolio Data', () => {
    it('combines all data into portfolio schema correctly', () => {
      const data = mapProfileToPortfolioData(mockProfile);
      expect(data.translations.hero.en['hero.name']).toBe('John');
      expect(data.translations.experience.es['exp.job1.title']).toBe('Desarrollador');
      expect(data.experience.length).toBe(1);
      expect(data.projects.length).toBe(1);
      expect(data.info.length).toBe(6);
    });
  });
});
