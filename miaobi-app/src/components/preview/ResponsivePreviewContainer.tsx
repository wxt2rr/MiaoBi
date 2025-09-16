'use client';

import React, { useMemo } from 'react';
import { usePreviewStore } from '@/stores/preview-store';
import { cn } from '@/lib/utils';

interface ResponsivePreviewContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsivePreviewContainer({ 
  children, 
  className 
}: ResponsivePreviewContainerProps) {
  const { mode, zoom } = usePreviewStore();

  // 计算容器样式 - 参考 markdown.com.cn/editor 的简洁设计
  const containerStyle = useMemo((): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transform: mode !== 'raw' ? `scale(${zoom})` : 'none',
      transformOrigin: 'top left',
      transition: 'transform 0.2s ease-in-out',
    };

    if (mode === 'mobile') {
      return {
        ...baseStyle,
        width: '375px',
        margin: '0 auto',
        height: '100%',
        minHeight: '100%',
        border: '1px solid #e1e4e8',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
      };
    }

    if (mode === 'desktop') {
      return {
        ...baseStyle,
        width: '100%',
        height: '100%',
        border: '1px solid #e1e4e8',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      };
    }

    return baseStyle;
  }, [mode, zoom]);

  // 计算包装器样式 - 简洁的背景设计
  const wrapperStyle = useMemo(() => {
    if (mode === 'mobile') {
      return {
        background: '#f6f8fa',
        padding: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        flex: 1,
      };
    }

    if (mode === 'desktop') {
      return {
        background: '#f6f8fa',
        padding: '16px',
        height: '100%',
      };
    }

    return {
      background: '#f6f8fa',
      padding: '16px',
      height: '100%',
    };
  }, [mode]);

  return (
    <div style={wrapperStyle} className={cn('preview-wrapper', className)}>
      <div 
        style={containerStyle}
        className={cn(
          'preview-container',
          mode === 'mobile' && 'mobile-preview',
          mode === 'desktop' && 'desktop-preview',
          mode === 'raw' && 'raw-preview'
        )}
      >
        {children}
        
        {/* 简洁的模式标识 - 参考 markdown.com.cn/editor */}
        {mode === 'mobile' && (
          <div className="absolute top-2 left-2 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
            移动端预览 (375×667)
          </div>
        )}
        
        {mode === 'desktop' && (
          <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
            桌面端预览
          </div>
        )}
      </div>
    </div>
  );
}
