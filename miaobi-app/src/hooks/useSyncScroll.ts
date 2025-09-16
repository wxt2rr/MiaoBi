'use client';

import { useEffect, useRef, useCallback } from 'react';

interface SyncScrollOptions {
  editorRef: React.RefObject<HTMLElement | null>;
  previewRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export function useSyncScroll({ editorRef, previewRef, enabled = true }: SyncScrollOptions) {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 计算滚动比例
  const calculateScrollRatio = useCallback((element: HTMLElement) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const maxScroll = scrollHeight - clientHeight;
    return maxScroll > 0 ? scrollTop / maxScroll : 0;
  }, []);

  // 同步滚动到目标元素
  const syncScrollTo = useCallback((targetElement: HTMLElement, ratio: number) => {
    const { scrollHeight, clientHeight } = targetElement;
    const maxScroll = scrollHeight - clientHeight;
    const targetScrollTop = maxScroll * ratio;
    
    targetElement.scrollTo({
      top: targetScrollTop,
      behavior: 'auto' // 使用auto避免动画干扰
    });
  }, []);

  // 处理编辑器滚动
  const handleEditorScroll = useCallback(() => {
    if (!enabled || !editorRef.current || !previewRef.current || isScrollingRef.current) {
      return;
    }

    isScrollingRef.current = true;
    const ratio = calculateScrollRatio(editorRef.current);
    syncScrollTo(previewRef.current, ratio);

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 设置新的定时器来重置滚动状态
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);
  }, [enabled, editorRef, previewRef, calculateScrollRatio, syncScrollTo]);

  // 处理预览区滚动
  const handlePreviewScroll = useCallback(() => {
    if (!enabled || !editorRef.current || !previewRef.current || isScrollingRef.current) {
      return;
    }

    isScrollingRef.current = true;
    const ratio = calculateScrollRatio(previewRef.current);
    syncScrollTo(editorRef.current, ratio);

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 设置新的定时器来重置滚动状态
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);
  }, [enabled, editorRef, previewRef, calculateScrollRatio, syncScrollTo]);

  // 设置滚动监听器
  useEffect(() => {
    const editorElement = editorRef.current;
    const previewElement = previewRef.current;

    if (!editorElement || !previewElement || !enabled) {
      return;
    }

    // 添加滚动监听器
    editorElement.addEventListener('scroll', handleEditorScroll, { passive: true });
    previewElement.addEventListener('scroll', handlePreviewScroll, { passive: true });

    return () => {
      editorElement.removeEventListener('scroll', handleEditorScroll);
      previewElement.removeEventListener('scroll', handlePreviewScroll);
      
      // 清理定时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [editorRef, previewRef, enabled, handleEditorScroll, handlePreviewScroll]);

  // 手动同步滚动的方法
  const syncScroll = useCallback((source: 'editor' | 'preview') => {
    if (!enabled || !editorRef.current || !previewRef.current) {
      return;
    }

    const sourceElement = source === 'editor' ? editorRef.current : previewRef.current;
    const targetElement = source === 'editor' ? previewRef.current : editorRef.current;
    
    const ratio = calculateScrollRatio(sourceElement);
    syncScrollTo(targetElement, ratio);
  }, [enabled, editorRef, previewRef, calculateScrollRatio, syncScrollTo]);

  return {
    syncScroll,
    isScrolling: isScrollingRef.current
  };
}
