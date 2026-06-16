import { create } from 'zustand';
import type { Langs, CvGenerationOptions } from '@/types/profile';
import { enviromentClient } from '@/configuration/enviroment-client';

type CvGenerationStore = {
  options: CvGenerationOptions;
  selectedLanguages: Langs[];
  toggleOption: (key: keyof CvGenerationOptions) => void;
  updateOption: <K extends keyof CvGenerationOptions>(
    key: K,
    value: CvGenerationOptions[K],
  ) => void;
  toggleLanguage: (language: Langs) => void;
};

const DEFAULT_OPTIONS: CvGenerationOptions = {
  includeBio: true,
  includeExperience: true,
  includeEducation: true,
  includeSkills: true,
  includeLanguages: true,
  includeProjects: true,
  includeDevProjects: true,
  includeLinkedin: true,
  includeGithub: true,
  includePortfolio: true,
};

const getInitialOptions = (): CvGenerationOptions => {
  const savedPath = typeof window !== 'undefined' ? localStorage.getItem('cvSavePath') : null;
  return {
    ...DEFAULT_OPTIONS,
    savePath: savedPath || enviromentClient.downloadsPath || '',
  };
};

export const useCvGenerationStore = create<CvGenerationStore>((set) => ({
  options: getInitialOptions(),
  selectedLanguages: ['en', 'es'],
  toggleOption: (key) =>
    set((state) => ({
      options: { ...state.options, [key]: !state.options[key] },
    })),
  updateOption: (key, value) => {
    set((state) => ({
      options: { ...state.options, [key]: value },
    }));
    if (key === 'savePath' && typeof window !== 'undefined') {
      localStorage.setItem('cvSavePath', value as string);
    }
  },
  toggleLanguage: (language) =>
    set((state) => {
      const prev = state.selectedLanguages;
      if (prev.includes(language)) {
        if (prev.length === 1) return state;
        return { selectedLanguages: prev.filter((l) => l !== language) };
      }
      return { selectedLanguages: [...prev, language] };
    }),
}));
