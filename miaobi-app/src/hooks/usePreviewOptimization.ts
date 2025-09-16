import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useEditorStore } from '@/stores/editor-store';
import { usePreviewStore } from '@/stores/preview-store';
import { ThemePreviewService } from '@/services/theme-preview-service';
import { getThemeById } from '@/themes/preview-themes';

// 防抖函数
function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function usePreviewOptimization() {
  const { content } = useEditorStore();
  const { mode, currentTheme, setLoading } = usePreviewStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastContentRef = useRef<string>('');
  const lastThemeRef = useRef<string>('');
  const lastModeRef = useRef<string>('');

  // 获取当前主题配置
  const currentThemeConfig = useMemo(() => {
    return getThemeById(currentTheme);
  }, [currentTheme]);

  // 生成预览HTML（带缓存）
  const previewHTML = useMemo(() => {
    if (!currentThemeConfig) return '';
    
    try {
      // 只有移动端和桌面端模式才使用主题预览服务
      if (mode === 'mobile' || mode === 'desktop') {
        return ThemePreviewService.generatePreviewHTMLWithTheme(
          content,
          currentThemeConfig,
          mode
        );
      }
      return '';
    } catch (error) {
      console.error('生成预览HTML失败:', error);
      return '';
    }
  }, [content, currentThemeConfig, mode]);

  // 检查是否需要更新
  const shouldUpdate = useMemo(() => {
    return (
      content !== lastContentRef.current ||
      currentTheme !== lastThemeRef.current ||
      mode !== lastModeRef.current
    );
  }, [content, currentTheme, mode]);

  // 更新iframe内容
  const updateIframe = useCallback((html: string) => {
    if (iframeRef.current && html) {
      try {
        iframeRef.current.srcdoc = html;
        
        // 更新缓存
        lastContentRef.current = content;
        lastThemeRef.current = currentTheme;
        lastModeRef.current = mode;
      } catch (error) {
        console.error('更新iframe失败:', error);
      }
    }
  }, [content, currentTheme, mode]);

  // 防抖更新
  const debouncedUpdate = useMemo(
    () => debounce(updateIframe as (...args: unknown[]) => unknown, 300),
    [updateIframe]
  );

  // 节流更新（用于频繁变化）
  const throttledUpdate = useMemo(
    () => throttle(updateIframe as (...args: unknown[]) => unknown, 100),
    [updateIframe]
  );

  // 监听内容变化
  useEffect(() => {
    if (shouldUpdate && previewHTML) {
      setLoading(true);
      
      // 根据变化类型选择更新策略
      if (content !== lastContentRef.current) {
        // 内容变化使用防抖
        debouncedUpdate(previewHTML);
      } else {
        // 主题或模式变化使用节流
        throttledUpdate(previewHTML);
      }
      
      // 模拟加载完成
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [shouldUpdate, previewHTML, debouncedUpdate, throttledUpdate, setLoading, content]);

  // 监听导入文件后的刷新事件
  useEffect(() => {
    const handleContentChanged = () => {
      // 强制刷新预览
      if (previewHTML) {
        setLoading(true);
        updateIframe(previewHTML);
        
        // 更新缓存
        lastContentRef.current = content;
        lastThemeRef.current = currentTheme;
        lastModeRef.current = mode;
        
        // 模拟加载完成
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    window.addEventListener('contentChanged', handleContentChanged);
    
    return () => {
      window.removeEventListener('contentChanged', handleContentChanged);
    };
  }, [previewHTML, updateIframe, setLoading, content, currentTheme, mode]);

  // 处理iframe加载完成
  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  // 错误处理
  const handleIframeError = useCallback(() => {
    console.error('iframe加载失败');
    setLoading(false);
  }, [setLoading]);

  // 强制刷新
  const forceRefresh = useCallback(() => {
    if (previewHTML) {
      setLoading(true);
      updateIframe(previewHTML);
    }
  }, [previewHTML, updateIframe, setLoading]);

  // 清理缓存
  const clearCache = useCallback(() => {
    lastContentRef.current = '';
    lastThemeRef.current = '';
    lastModeRef.current = '';
  }, []);

  return {
    iframeRef,
    previewHTML,
    shouldUpdate,
    handleIframeLoad,
    handleIframeError,
    forceRefresh,
    clearCache,
    currentThemeConfig
  };
}
