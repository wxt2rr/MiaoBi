'use client';

import React, { useMemo } from 'react';
import { usePreviewStore } from '@/stores/preview-store';
import { useEditorStore } from '@/stores/editor-store';
import { usePreviewOptimization } from '@/hooks/usePreviewOptimization';
import { cn } from '@/lib/utils';

export default function MarkdownStylePreview() {
  const { content } = useEditorStore();
  const { mode, isLoading } = usePreviewStore();
  const {
    iframeRef,
    currentThemeConfig,
    handleIframeLoad,
    handleIframeError
  } = usePreviewOptimization();

  // 容器样式：移动端填满高度，桌面端自适应
  const containerStyle = useMemo((): React.CSSProperties => {
    if (mode === 'mobile') {
      return {
        width: '100%',
        height: '100%',
        minHeight: '100%',
        border: 'none',
        borderRadius: '0',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      };
    }

    if (mode === 'desktop') {
      return {
        width: '100%',
        height: '100%',
        border: '1px solid #e1e4e8',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      };
    }

    return {
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    };
  }, [mode]);

  // 包装器样式：链路贯通高度
  const wrapperStyle = useMemo(() => {
    if (mode === 'mobile') {
      return {
        background: 'transparent',
        padding: '0',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      } as React.CSSProperties;
    }

    if (mode === 'desktop') {
      return {
        background: '#f6f8fa',
        padding: '16px',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      } as React.CSSProperties;
    }

    return {
      background: '#f6f8fa',
      padding: '16px',
      height: '100%',
      display: 'block',
    } as React.CSSProperties;
  }, [mode]);

  if (!currentThemeConfig) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">主题配置加载失败</p>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle} className="markdown-preview-wrapper h-full flex flex-col">
      <div
        style={containerStyle}
        className={cn(
          'markdown-preview-container flex flex-col',
          mode === 'mobile' && 'mobile-mode h-full',
          mode === 'desktop' && 'desktop-mode h-full',
          mode === 'raw' && 'raw-mode h-full'
        )}
      >
        {/* 加载状态 */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground">正在生成预览...</p>
            </div>
          </div>
        )}

        {/* 预览内容 */}
        <div className="flex-1 min-h-0 flex flex-col">
          {mode === 'raw' ? (
            // 原始HTML预览
            <div className="flex-1 p-4 overflow-auto bg-muted/50">
              <div className="bg-background rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">原始HTML</h3>
                  <div className="text-xs text-muted-foreground">
                    {content.length} 字符
                  </div>
                </div>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {content || '开始写作，这里将显示原始HTML内容...'}
                </pre>
              </div>
            </div>
          ) : (
            // iframe预览：滚动发生在这一层
            <div className="flex-1 min-h-0 bg-white relative overflow-auto">
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                title="微信预览"
                sandbox="allow-same-origin"
                loading="lazy"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ minHeight: '100%', height: '100%' }}
              />
            </div>
          )}
        </div>

        {/* 模式标识 */}
        {mode === 'mobile' && (
          <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
            移动端预览
          </div>
        )}

        {mode === 'desktop' && (
          <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
            桌面端预览
          </div>
        )}
      </div>
    </div>
  );
}