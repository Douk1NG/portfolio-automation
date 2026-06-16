import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useProfileStore } from '@/store/useProfileStore';
import { LogService } from '@/services/log-service';

export const useLogs = () => {
  const logs = useUIStore((state) => state.logs);
  const addLog = useUIStore((state) => state.addLog);
  const isBackendAvailable = useProfileStore((state) => state.isBackendAvailable);

  useEffect(() => {
    if (!isBackendAvailable) return;

    const unsubscribe = LogService.subscribe((message: string) => {
      addLog(message);
    });
    return unsubscribe;
  }, [addLog, isBackendAvailable]);

  return { logs };
};
