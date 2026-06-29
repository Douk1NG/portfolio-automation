import React from 'react';
import { Send } from 'lucide-react';
import { HeaderActionButton } from './HeaderActionButton';
import { OpenGenerateModalButton } from './generate/OpenModalButton';

type HeaderActionsProps = {
  handleAction: (action: string, label: string) => void;
  isLoading: boolean;
  hasProfile: boolean;
  saveProfile: () => Promise<boolean>;
};

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  handleAction,
  isLoading,
  hasProfile,
  saveProfile,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5 shadow-inner">
      <OpenGenerateModalButton isLoading={isLoading} hasProfile={hasProfile} />

      <HeaderActionButton
        variant="outline"
        onClick={() => {
          saveProfile().then((success) => {
            if (success) {
              import('sonner').then(({ toast }) => toast.success('Profile saved manually!'));
            } else {
              import('sonner').then(({ toast }) => toast.error('Save failed.'));
            }
          });
        }}
        className="ml-2"
        disabled={!hasProfile || isLoading}
      >
        Save
      </HeaderActionButton>

      <HeaderActionButton
        variant="default"
        onClick={() => handleAction('publish', 'Publishing')}
        className="ml-2 tracking-widest bg-primary text-primary-foreground hover:bg-primary/80 shadow-[0_0_15px_-3px_rgba(124,58,237,0.5)]"
      >
        <Send className="w-3.5 h-3.5" /> Deploy
      </HeaderActionButton>
    </div>
  );
};
