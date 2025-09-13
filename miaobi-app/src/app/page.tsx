'use client';

import { useState, useEffect } from 'react';
import { useEditorStore } from '@/stores/editor-store';
import EditorLayout from '@/components/editor/EditorLayout';
import WelcomeScreen from '@/components/welcome/WelcomeScreen';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function Home() {
  const { articles, currentArticleId } = useEditorStore();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // 如果有文章或当前正在编辑文章，直接显示编辑器
    if (articles.length > 0 || currentArticleId) {
      setShowWelcome(false);
    }
  }, [articles.length, currentArticleId]);

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  if (showWelcome && articles.length === 0 && !currentArticleId) {
    return (
      <ErrorBoundary>
        <WelcomeScreen onGetStarted={handleGetStarted} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <main className="h-screen w-full">
        <EditorLayout />
      </main>
    </ErrorBoundary>
  );
}
