import { useUIStore } from '@/store/useUIStore';
import { toast } from 'sonner';
import { buildCvTex } from '@/templates/latex-cv-template';
import { generatePdfFromLatex, downloadPdf } from '@/services/latex-service';

import type { Langs, CvGenerationOptions } from '@/types/profile';
import { useProfileStore } from '@/store/useProfileStore';

export const useLatexCv = () => {
  const status = useUIStore((state) => state.cvGenerationStatus);
  const error = useUIStore((state) => state.cvGenerationError);
  const setStatus = useUIStore((state) => state.setCvGenerationStatus);
  const setError = useUIStore((state) => state.setCvGenerationError);

  const generate = async (langs: Langs[] = ['en', 'es'], options?: CvGenerationOptions) => {
    const profile = useProfileStore.getState().profile;
    if (!profile) return;

    setStatus('loading');
    setError(null);

    for (const lang of langs) {
      try {
        const tex = buildCvTex(profile, lang, options);
        const filename = `cv-${profile.name.toLowerCase()}-${lang}.pdf`;

        if (options?.savePath) {
          await generatePdfFromLatex(tex, { savePath: options.savePath, filename });
          toast.success(`Saved ${filename} to ${options.savePath}`);
        } else {
          const blob = await generatePdfFromLatex(tex);
          downloadPdf(blob as Blob, filename);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('error');
        return;
      }
    }

    setStatus('idle');
  };

  return { generate, isLoading: status === 'loading', error };
};
