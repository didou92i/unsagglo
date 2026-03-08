import type { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  pageName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

import { Component } from "react";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-screen items-center justify-center bg-muted p-6">
          <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-8 max-w-md text-center">
            <h2 className="font-display text-2xl font-black text-secondary mb-2">
              Une erreur est survenue
            </h2>
            {this.props.pageName && (
              <p className="text-muted-foreground text-sm mb-4">
                Erreur sur la page {this.props.pageName}
              </p>
            )}
            {import.meta.env.DEV && this.state.error && (
              <p className="text-muted-foreground text-xs mb-4 break-all">
                {this.state.error.message}
              </p>
            )}
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground font-display font-bold px-5 py-2.5 rounded-[var(--radius-md)]"
              >
                Recharger la page
              </button>
              <a
                href="/"
                className="border-2 border-primary text-primary font-display font-bold px-5 py-2.5 rounded-[var(--radius-md)]"
              >
                Retour a l'accueil
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
