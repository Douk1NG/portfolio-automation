import { useCallback } from 'react';
import { ActionService } from '@/services/action-service';
import { toast } from 'sonner';

export const usePortfolioActions = () => {
  const handleAction = useCallback(async (endpoint: string, label: string) => {
    try {
      toast.info(`Starting ${label}...`);
      const { data, error } = await ActionService.runAction(endpoint);
      if (data?.success) {
        toast.success(`${label} completed!`);
      } else if (error) {
        toast.error(`${label} failed: ${error}`);
      }
    } catch {
      toast.error(`Error during ${label}`);
    }
  }, []);

  return { handleAction };
};
