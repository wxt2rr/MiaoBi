'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center h-full min-h-[400px] p-8">
          <div className="text-center space-y-4 max-w-md">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto" />
            <h2 className="text-xl font-semibold">出现了一些问题</h2>
            <p className="text-muted-foreground">
              应用遇到了意外错误，请刷新页面重试
            </p>
            {this.state.error && (
              <details className="text-left bg-muted p-3 rounded text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  错误详情
                </summary>
                <code className="text-xs break-all">
                  {this.state.error.message}
                </code>
              </details>
            )}
            <div className="space-x-2">
              <Button onClick={this.handleReset} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                重试
              </Button>
              <Button onClick={() => window.location.reload()}>
                刷新页面
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 