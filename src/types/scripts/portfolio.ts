import type { SvgIconName } from 'portfolio-svg-icon-provider';
export type { SvgIconName };
import type { IconName } from 'lucide-react/dynamic';

export type Language = 'en' | 'es';

export type SkillEntry = {
  name: string;
  svg?: SvgIconName;
  icon?: string;
};

export type ExperienceEntry = {
  title: string;
  company: string;
  location: string;
  description: string;
  period: string;
  skills: SkillEntry[];
  duration: {
    short: string;
    long: string;
  };
};

export type ProjectEntry = {
  title: string;
  description: string;
  key_description: string;
  tech: SkillEntry[];
  github: string;
  demo: string;
};

export type SkillGroup = {
  category: string;
  skills: SkillEntry[];
};

export type InfoTag = {
  icon?: IconName;
  svg?: SvgIconName;
  titleKey: string;
  href?: string;
  hrefByLanguage?: Record<Language, string>;
};
