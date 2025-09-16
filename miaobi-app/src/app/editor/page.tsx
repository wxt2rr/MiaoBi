'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEditorStore } from '@/stores/editor-store';
import EditorLayout from '@/components/editor/EditorLayout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function EditorPage() {
  const router = useRouter();
  const { articles, currentArticleId, createNewArticle } = useEditorStore();

  useEffect(() => {
    // 如果没有文章且没有当前编辑的文章，创建一个新文章
    if (articles.length === 0 && !currentArticleId) {
      createNewArticle();
    }
  }, [articles.length, currentArticleId, createNewArticle]);

  return (
    <ErrorBoundary>
      <main className="h-screen w-full">
        <EditorLayout />
      </main>
    </ErrorBoundary>
  );
}