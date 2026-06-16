import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 font-mono text-sm">
          <div className="max-w-3xl w-full bg-destructive/10 border border-destructive/20 rounded-xl p-6 shadow-2xl">
            <h1 className="text-destructive font-bold text-xl mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Something went wrong
            </h1>
            <div className="bg-black/50 p-4 rounded-lg overflow-x-auto mb-4">
              <h2 className="text-white/90 font-semibold mb-2">Error:</h2>
              <pre className="text-red-400 whitespace-pre-wrap break-all">
                {this.state.error && this.state.error.toString()}
              </pre>
            </div>
            {this.state.errorInfo && (
              <div className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                <h2 className="text-white/90 font-semibold mb-2">Component Stack:</h2>
                <pre className="text-white/60 whitespace-pre-wrap text-xs">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
