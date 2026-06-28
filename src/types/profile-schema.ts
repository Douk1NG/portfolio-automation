import { z } from 'zod';

const LocalizedStringSchema = z.object({
  es: z.string(),
  en: z.string(),
});

export const ExperienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  role: LocalizedStringSchema,
  location: LocalizedStringSchema,
  start: z.string().min(1, 'Start date is required'),
  end: z.string().min(1, 'End date is required'),
  description: LocalizedStringSchema,
  skills: z.array(z.string()),
});

export const EducationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: LocalizedStringSchema,
  start: z.string().min(1, 'Start date is required'),
  end: z.string().min(1, 'End date is required'),
});

export const LanguageSchema = z.object({
  name: LocalizedStringSchema,
  level: z.string().min(1, 'Level is required'),
});

export const ProjectSchema = z.object({
  url: z.string().url('Invalid URL').or(z.literal('')),
  repoUrl: z.string().url('Invalid URL').or(z.literal('')),
  tags: z.array(z.string()),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  key_description: LocalizedStringSchema,
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().optional(),
  svg: z.string().optional(),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  title: LocalizedStringSchema,
  email: z.string().email('Invalid email address'),
  phone: z.string(),
  location: LocalizedStringSchema,
  linkedin: z.string().url('Invalid LinkedIn URL').or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').or(z.literal('')),
  bio: LocalizedStringSchema,
  portfolioUrl: z.string().url('Invalid portfolio URL').or(z.literal('')),
  skills: z.array(SkillSchema),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  education: z.array(EducationSchema),
  languages: z.array(LanguageSchema),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
