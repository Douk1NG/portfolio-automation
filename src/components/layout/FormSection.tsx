import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormSectionProps = {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon: Icon,
  iconColor = 'text-primary',
  action,
  children,
  className,
}) => {
  return (
    <Card className={cn('border-none bg-transparent shadow-none p-4', className)}>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-0 px-0 pb-8 gap-4">
        <div>
          <CardTitle className="text-3xl font-black flex items-center gap-3 tracking-wide">
            <div className="p-2.5 rounded-xl bg-white/3 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.03)]">
              <Icon className={cn('w-7 h-7 drop-shadow-[0_0_8px_currentColor]', iconColor)} />
            </div>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
              {title}
            </span>
          </CardTitle>
        </div>
        {action && <div className="animate-in fade-in zoom-in duration-500">{action}</div>}
      </CardHeader>
      <CardContent className="space-y-10 px-0">{children}</CardContent>
    </Card>
  );
};

export default FormSection;
