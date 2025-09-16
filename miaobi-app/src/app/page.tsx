'use client';

import WelcomeScreen from '@/components/welcome/WelcomeScreen';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <WelcomeScreen />
    </ErrorBoundary>
  );
}