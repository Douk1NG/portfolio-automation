import { useState } from 'react';
import { useLogs } from '@/hooks/useLogs';

export const useTerminal = () => {
  const { logs } = useLogs();
  const [isOpen, setIsOpen] = useState(false);

  const openTerminal = () => setIsOpen(true);
  const toggleOpen = () => setIsOpen((previous) => !previous);
  const close = () => setIsOpen(false);

  return { logs, isOpen, openTerminal, toggleOpen, close };
};
