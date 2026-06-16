import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { SectionSelection } from '@/components/layout/header/modal/SectionSelection';
import { LinkSelection } from '@/components/layout/header/modal/LinkSelection';
import { LanguageSelection } from '@/components/layout/header/modal/LanguageSelection';
import { SaveOptions } from '@/components/layout/header/modal/SaveOptions';
import { useModalStore } from '@/store/useModalStore';
import { useLatexCv } from '@/hooks/useLatexCV';
import { useCvGenerationStore } from '@/store/useCvGenerationStore';

export const CvGenerationModal: React.FC = () => {
  const { isGenerateModalOpen, closeGenerateModal } = useModalStore();

  const { generate, isLoading } = useLatexCv();

  const hasSelectedLanguages = useCvGenerationStore((state) => state.selectedLanguages.length > 0);

  const handleGenerate = () => {
    const { selectedLanguages, options } = useCvGenerationStore.getState();
    generate(selectedLanguages, options);
    closeGenerateModal();
  };

  return (
    <Dialog
      modal={'trap-focus'}
      open={isGenerateModalOpen}
      onOpenChange={(open) => !open && closeGenerateModal()}
    >
      <DialogContent className="sm:max-w-125 bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            Generate CV
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select the sections and links you want to include in the generated CV. Empty data will
            be automatically omitted.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <SectionSelection />
          <LinkSelection />
          <LanguageSelection />
          <SaveOptions />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={closeGenerateModal}>
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !hasSelectedLanguages}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isLoading ? 'Generating...' : 'Generate PDFs'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
