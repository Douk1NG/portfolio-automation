import { create } from 'zustand';

type ModalState = {
  isGenerateModalOpen: boolean;
  openGenerateModal: () => void;
  closeGenerateModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isGenerateModalOpen: false,
  openGenerateModal: () => set({ isGenerateModalOpen: true }),
  closeGenerateModal: () => set({ isGenerateModalOpen: false }),
}));
