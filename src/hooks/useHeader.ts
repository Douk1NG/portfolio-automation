import { usePortfolioActions } from '@/hooks/usePortfolioActions';
import { useLatexCv } from '@/hooks/useLatexCV';
import { useProfileStore } from '@/store/useProfileStore';

export const useHeader = () => {
  const { handleAction } = usePortfolioActions();
  const hasProfile = useProfileStore((state) => state.profile !== null);
  const saveProfile = useProfileStore((state) => state.saveProfile);
  const { generate, isLoading } = useLatexCv();

  return {
    handleAction,
    hasProfile,
    saveProfile,
    generate,
    isLoading,
  };
};
