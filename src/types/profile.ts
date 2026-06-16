export type LocalizedString = {
  es: string;
  en: string;
};

export type Langs = 'es' | 'en';

export type Experience = {
  company: string;
  role: LocalizedString;
  location: LocalizedString;
  start: string;
  end: string;
  description: LocalizedString;
  skills: string[];
};

export type Education = {
  institution: string;
  degree: LocalizedString;
  start: string;
  end: string;
};

export type Language = {
  name: LocalizedString;
  level: string;
};

export type Project = {
  name: LocalizedString;
  description: LocalizedString;
  key_description: LocalizedString;
  url: string;
  repoUrl: string;
  tags: string[];
};

export type DevProjects = {
  title: LocalizedString;
  date: LocalizedString;
  description: LocalizedString;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  icon?: string;
  svg?: string;
};

export type ProfileData = {
  name: string;
  surname: string;
  title: LocalizedString;
  email: string;
  phone: string;
  location: LocalizedString;
  linkedin: string;
  github: string;
  bio: LocalizedString;
  portfolioUrl: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  devProjects: DevProjects;
};

export type Profile = ProfileData;

export type CvGenerationOptions = {
  includeBio: boolean;
  includeExperience: boolean;
  includeEducation: boolean;
  includeSkills: boolean;
  includeLanguages: boolean;
  includeProjects: boolean;
  includeDevProjects: boolean;
  includeLinkedin: boolean;
  includeGithub: boolean;
  includePortfolio: boolean;
  savePath?: string;
};
