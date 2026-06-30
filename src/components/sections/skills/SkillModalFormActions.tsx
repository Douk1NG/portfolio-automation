import React from 'react';

interface SkillModalFormActionsProps {
  onClose: () => void;
  hasValidName: boolean;
  submitLabel: string;
}

export const SkillModalFormActions: React.FC<SkillModalFormActionsProps> = ({
  onClose,
  hasValidName,
  submitLabel,
}) => {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground
          hover:text-foreground hover:bg-white/5 transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={!hasValidName}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold
          bg-primary/15 text-primary border border-primary/20
          hover:bg-primary/25 hover:border-primary/30
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200"
      >
        {submitLabel}
      </button>
    </div>
  );
};
