import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCvGenerationStore } from '@/store/useCvGenerationStore';

export const SaveOptions: React.FC = () => {
  const savePath = useCvGenerationStore((state) => state.options.savePath);
  const updateOption = useCvGenerationStore((state) => state.updateOption);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="savePath" className="text-white text-sm font-medium">
          Local Save Path (Optional)
        </Label>
        <Input
          id="savePath"
          type="text"
          placeholder="e.g. C:\Users\YourName\Documents\CVs"
          value={savePath || ''}
          onChange={(e) => updateOption('savePath', e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-primary/50"
        />
        <p className="text-xs text-muted-foreground">
          If provided, generated PDFs will be saved directly to this folder on your computer instead
          of using the browser download prompt. You can copy the path from your File Explorer and
          paste it here.
        </p>
      </div>
    </div>
  );
};
