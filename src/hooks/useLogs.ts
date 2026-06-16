import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { LogService } from '@/services/log-service';

export const useLogs = () => {
  const logs = useUIStore((state) => state.logs);
  const addLog = useUIStore((state) => state.addLog);

  useEffect(() => {
    const unsubscribe = LogService.subscribe((message: string) => {
      addLog(message);
    });
    return unsubscribe;
  }, [addLog]);

  return { logs };
};
