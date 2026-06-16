import React from 'react';
import ProfileForm from './components/ProfileForm';
import { useProfile } from './hooks/useProfile';
import { Loader2 } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/layout/header/Header';
import Terminal from './components/terminal/Terminal';

const App: React.FC = () => {
  const { hasProfile, isLoading } = useProfile();
  if (isLoading && !hasProfile) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
          </div>
          <p className="text-muted-foreground animate-pulse font-medium tracking-tight">
            Initializing Workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col font-sans selection:bg-primary/20 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 -z-10 h-75 w-75 rounded-full bg-accent/30 blur-[120px] pointer-events-none" />

      <Toaster position="bottom-right" richColors theme="dark" />
      <Header />

      <main className="flex-1 flex flex-col md:flex-row min-h-0 p-3 md:p-6 lg:p-8 gap-4 md:gap-8 relative z-10 w-full max-w-400 mx-auto">
        <div className="flex-1 flex flex-col min-w-0 h-full drop-shadow-2xl">
          <ProfileForm />
        </div>
        <Terminal />
      </main>
    </div>
  );
};

export default App;
