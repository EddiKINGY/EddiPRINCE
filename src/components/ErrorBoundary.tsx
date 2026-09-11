import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '';
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121418] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                Resilience Guard • Archive Recovered
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100">
                An anomaly occurred in the archive graph.
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
                The interface encountered an unexpected state. In line with radical transparency, this event has been safely isolated so you can continue exploring.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-left font-mono-code text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto max-h-32">
                <span className="text-neutral-400 select-none">Error: </span>
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-xs font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 transition-all shadow-sm"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-xs font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
