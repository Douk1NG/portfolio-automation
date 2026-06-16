import { create } from 'zustand';
import type { Langs } from '../types/profile';

export type UIStore = {
  activeLang: Langs;
  activeSection: string;
  logs: string[];
  isLoading: boolean;
  cvGenerationStatus: 'idle' | 'loading' | 'error';
  cvGenerationError: string | null;

  setActiveLang: (lang: Langs) => void;
  setActiveSection: (section: string) => void;
  addLog: (message: string) => void;
  setLoading: (loading: boolean) => void;
  setCvGenerationStatus: (status: 'idle' | 'loading' | 'error') => void;
  setCvGenerationError: (error: string | null) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  activeLang: 'es',
  activeSection: 'personal',
  logs: [],
  isLoading: true,
  cvGenerationStatus: 'idle',
  cvGenerationError: null,

  setActiveLang: (activeLang) => set({ activeLang }),
  setActiveSection: (activeSection) => set({ activeSection }),

  addLog: (message) =>
    set((state) => ({
      logs: [...state.logs.slice(-49), `${new Date().toLocaleTimeString()}: ${message}`],
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setCvGenerationStatus: (cvGenerationStatus) => set({ cvGenerationStatus }),
  setCvGenerationError: (cvGenerationError) => set({ cvGenerationError }),
}));
