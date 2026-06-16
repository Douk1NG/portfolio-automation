import type { Profile, Experience, Project, Skill } from '@/types/profile';
import type {
  Language,
  SkillEntry,
  InfoTag,
  ExperienceEntry,
  ProjectEntry,
  SkillGroup,
} from '@/types/scripts/portfolio';
import { calculateDuration } from '@/scripts/update-portfolio/utils/date';
import {
  skillNamesToEntries,
  profileSkillToEntry,
} from '@/scripts/update-portfolio/utils/skill-entry';

export const generateHeroTranslationObject = (
  profile: Profile,
  lang: Language,
): Record<string, string> => {
  return {
    'hero.name': profile.name,
    'hero.surname': profile.surname,
    'hero.description': profile.bio[lang],
    'hero.role': profile.title[lang],
    'hero.location': profile.location[lang],
  };
};

export const generateExperienceTranslationObject = (
  profile: Profile,
  lang: Language,
): Record<string, string> => {
  const translations: Record<string, string> = {};
  profile.experience.forEach((experience: Experience, index: number) => {
    const id = index + 1;
    const duration = calculateDuration(experience.start, experience.end, lang);

    translations[`exp.job${id}.title`] = experience.role[lang];
    translations[`exp.job${id}.period`] = `${experience.start} - ${experience.end}`;
    translations[`exp.job${id}.loc`] = experience.location[lang];
    translations[`exp.job${id}.desc`] = experience.description[lang];
    translations[`exp.job${id}.duration`] = duration.long;
    translations[`exp.job${id}.duration_short`] = duration.short;
  });
  return translations;
};

export const generateProjectsTranslationObject = (
  profile: Profile,
  lang: Language,
): Record<string, string> => {
  const translations: Record<string, string> = {};
  profile.projects.forEach((project: Project, index: number) => {
    const id = index + 1;
    translations[`project${id}.title`] = project.name[lang];
    translations[`project${id}.desc`] = project.description[lang];
    translations[`project${id}.key_description`] = project.key_description[lang] || 'Project';
  });
  return translations;
};

export const mapExperienceData = (profile: Profile): ExperienceEntry[] => {
  return [...profile.experience]
    .reverse()
    .map((experience: Experience, index: number, array: Experience[]) => {
      const originalIndex = array.length - index;
      return {
        title: `exp.job${originalIndex}.title`,
        company: experience.company,
        location: `exp.job${originalIndex}.loc`,
        description: `exp.job${originalIndex}.desc`,
        period: `exp.job${originalIndex}.period`,
        skills: skillNamesToEntries(
          Array.isArray(experience.skills) ? experience.skills : [experience.skills],
          profile.skills,
        ),
        duration: {
          short: `exp.job${originalIndex}.duration_short`,
          long: `exp.job${originalIndex}.duration`,
        },
      };
    });
};

export const mapProjectsData = (profile: Profile): ProjectEntry[] => {
  return profile.projects.map((project: Project, index: number) => {
    const id = index + 1;
    return {
      title: `project${id}.title`,
      description: `project${id}.desc`,
      key_description: `project${id}.key_description`,
      tech: skillNamesToEntries(project.tags || [], profile.skills),
      github: project.repoUrl,
      demo: project.url,
    };
  });
};

export const mapSkillsData = (profile: Profile): SkillGroup[] => {
  const groups: Record<string, SkillEntry[]> = {};

  profile.skills.forEach((skill: Skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }
    groups[skill.category].push(profileSkillToEntry(skill));
  });

  return Object.entries(groups).map(([category, skills]) => ({
    category,
    skills,
  }));
};

export const mapInfoTagsData = (
  profile: Profile,
  cvUrls?: { es: string; en: string },
): InfoTag[] => {
  return [
    {
      icon: 'code-2',
      titleKey: 'hero.role',
    },
    {
      icon: 'map-pin',
      titleKey: 'hero.location',
    },
    {
      svg: 'Github',
      titleKey: 'hero.github',
      href: profile.github,
    },
    {
      svg: 'Linkedin',
      titleKey: 'hero.linkedin',
      href: profile.linkedin,
    },
    {
      icon: 'mail',
      titleKey: 'hero.email',
      href: `mailto:${profile.email}`,
    },
    {
      icon: 'download',
      titleKey: 'hero.cv',
      hrefByLanguage: {
        es: cvUrls?.es || `/cv-${profile.name.toLowerCase()}-es.pdf`,
        en: cvUrls?.en || `/cv-${profile.name.toLowerCase()}-en.pdf`,
      },
    },
  ];
};

export const mapProfileToPortfolioData = (
  profile: Profile,
  cvUrls?: { es: string; en: string },
) => {
  return {
    translations: {
      hero: {
        en: generateHeroTranslationObject(profile, 'en'),
        es: generateHeroTranslationObject(profile, 'es'),
      },
      experience: {
        en: generateExperienceTranslationObject(profile, 'en'),
        es: generateExperienceTranslationObject(profile, 'es'),
      },
      projects: {
        en: generateProjectsTranslationObject(profile, 'en'),
        es: generateProjectsTranslationObject(profile, 'es'),
      },
    },
    experience: mapExperienceData(profile),
    projects: mapProjectsData(profile),
    skills: mapSkillsData(profile),
    info: mapInfoTagsData(profile, cvUrls),
  };
};
