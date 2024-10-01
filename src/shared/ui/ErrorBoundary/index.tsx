import { Component, type ErrorInfo, type ReactNode } from 'react';

import { FallbackTextMain, FallbackTextSecondary } from '@/shared/constants/fallback';

import { Fallback } from '../Fallback';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fallback mainText={FallbackTextMain.Main} secondaryText={FallbackTextSecondary.Main} />
      );
    }

    return this.props.children;
  }
}
