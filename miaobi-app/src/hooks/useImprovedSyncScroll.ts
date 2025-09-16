'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ImprovedSyncScrollOptions {
  editorRef: React.RefObject<HTMLElement | null>;
  previewRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

export function useImprovedSyncScroll({ 
  editorRef, 
  previewRef, 
  enabled = true 
}: ImprovedSyncScrollOptions) {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollSourceRef = useRef<'editor' | 'preview' | null>(null);

  // 获取实际的滚动容器
  const getScrollContainer = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return null;
    
    // 查找具有滚动能力的容器
    let element = ref.current;
    while (element) {
      const style = window.getComputedStyle(element);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll' || 
          element.scrollHeight > element.clientHeight) {
        return element;
      }
      element = element.parentElement as HTMLElement;
    }
    return ref.current;
  }, []);

  // 计算滚动比例 - 参考 markdown.com.cn/editor 的实现
  const calculateScrollRatio = useCallback((element: HTMLElement) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    
    if (maxScroll === 0) return 0;
    
    // 使用更精确的比例计算
    return Math.min(1, Math.max(0, scrollTop / maxScroll));
  }, []);

  // 同步滚动到目标位置
  const syncScrollTo = useCallback((targetElement: HTMLElement, ratio: number) => {
    const { scrollHeight, clientHeight } = targetElement;
    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    const targetScrollTop = Math.round(maxScroll * ratio);
    
    // 使用 requestAnimationFrame 确保平滑滚动
    requestAnimationFrame(() => {
      targetElement.scrollTop = targetScrollTop;
    });
  }, []);

  // 处理编辑器滚动
  const handleEditorScroll = useCallback((event: Event) => {
    if (!enabled || isScrollingRef.current || lastScrollSourceRef.current === 'preview') {
      return;
    }

    const editorContainer = getScrollContainer(editorRef);
    const previewContainer = getScrollContainer(previewRef);
    
    if (!editorContainer || !previewContainer) return;

    lastScrollSourceRef.current = 'editor';
    isScrollingRef.current = true;

    const ratio = calculateScrollRatio(editorContainer);
    syncScrollTo(previewContainer, ratio);

    // 重置滚动状态
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      lastScrollSourceRef.current = null;
    }, 100);
  }, [enabled, editorRef, previewRef, getScrollContainer, calculateScrollRatio, syncScrollTo]);

  // 处理预览区滚动
  const handlePreviewScroll = useCallback((event: Event) => {
    if (!enabled || isScrollingRef.current || lastScrollSourceRef.current === 'editor') {
      return;
    }

    const editorContainer = getScrollContainer(editorRef);
    const previewContainer = getScrollContainer(previewRef);
    
    if (!editorContainer || !previewContainer) return;

    lastScrollSourceRef.current = 'preview';
    isScrollingRef.current = true;

    const ratio = calculateScrollRatio(previewContainer);
    syncScrollTo(editorContainer, ratio);

    // 重置滚动状态
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      lastScrollSourceRef.current = null;
    }, 100);
  }, [enabled, editorRef, previewRef, getScrollContainer, calculateScrollRatio, syncScrollTo]);

  // 设置滚动监听器
  useEffect(() => {
    if (!enabled) return;

    const editorContainer = getScrollContainer(editorRef);
    const previewContainer = getScrollContainer(previewRef);

    if (!editorContainer || !previewContainer) {
      // 如果容器还没准备好，延迟重试
      const retryTimeout = setTimeout(() => {
        // 触发重新设置
      }, 100);
      
      return () => clearTimeout(retryTimeout);
    }

    // 添加滚动监听器
    editorContainer.addEventListener('scroll', handleEditorScroll, { 
      passive: true,
      capture: false 
    });
    
    previewContainer.addEventListener('scroll', handlePreviewScroll, { 
      passive: true,
      capture: false 
    });

    return () => {
      editorContainer.removeEventListener('scroll', handleEditorScroll);
      previewContainer.removeEventListener('scroll', handlePreviewScroll);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, editorRef, previewRef, handleEditorScroll, handlePreviewScroll, getScrollContainer]);

  // 手动同步滚动
  const syncScroll = useCallback((source: 'editor' | 'preview') => {
    if (!enabled) return;

    const editorContainer = getScrollContainer(editorRef);
    const previewContainer = getScrollContainer(previewRef);
    
    if (!editorContainer || !previewContainer) return;

    const sourceContainer = source === 'editor' ? editorContainer : previewContainer;
    const targetContainer = source === 'editor' ? previewContainer : editorContainer;
    
    const ratio = calculateScrollRatio(sourceContainer);
    syncScrollTo(targetContainer, ratio);
  }, [enabled, editorRef, previewRef, getScrollContainer, calculateScrollRatio, syncScrollTo]);

  return {
    syncScroll,
    isScrolling: isScrollingRef.current
  };
}