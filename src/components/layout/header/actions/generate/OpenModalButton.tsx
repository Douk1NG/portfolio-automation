import { useModalStore } from '@/store/useModalStore';
import { HeaderActionButton } from '../HeaderActionButton';
import { Download } from 'lucide-react';

type OpenModalButtonProps = {
  isLoading: boolean;
  hasProfile: boolean;
};

export const OpenGenerateModalButton = ({ isLoading, hasProfile }: OpenModalButtonProps) => {
  const openGenerateModal = useModalStore((state) => state.openGenerateModal);
  return (
    <HeaderActionButton onClick={openGenerateModal} disabled={isLoading || !hasProfile}>
      <Download className="w-3.5 h-3.5 text-sky-400" /> Generate CV
    </HeaderActionButton>
  );
};
