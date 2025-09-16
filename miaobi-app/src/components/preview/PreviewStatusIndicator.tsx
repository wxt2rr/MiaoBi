'use client';

import React from 'react';
import { usePreviewStore } from '@/stores/preview-store';
import { useEditorStore } from '@/stores/editor-store';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Monitor, 
  Code, 
  ZoomIn, 
  Eye,
  EyeOff,
  Maximize
} from 'lucide-react';

export default function PreviewStatusIndicator() {
  const { 
    mode, 
    zoom, 
    isFullscreen, 
    showToolbar,
    isLoading 
  } = usePreviewStore();
  
  const { content, hasUnsavedChanges } = useEditorStore();

  const getModeIcon = () => {
    switch (mode) {
      case 'mobile':
        return <Smartphone className="h-3 w-3" />;
      case 'desktop':
        return <Monitor className="h-3 w-3" />;
      case 'raw':
        return <Code className="h-3 w-3" />;
      default:
        return <Eye className="h-3 w-3" />;
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'mobile':
        return '移动端';
      case 'desktop':
        return '桌面端';
      case 'raw':
        return '原始HTML';
      default:
        return '预览';
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {/* 模式指示器 */}
      <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
        {getModeIcon()}
        {getModeLabel()}
      </Badge>

      {/* 缩放指示器 */}
      {mode !== 'raw' && (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <ZoomIn className="h-3 w-3" />
          {Math.round(zoom * 100)}%
        </Badge>
      )}

      {/* 全屏指示器 */}
      {isFullscreen && (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <Maximize className="h-3 w-3" />
          全屏
        </Badge>
      )}

      {/* 工具栏状态 */}
      {!showToolbar && (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <EyeOff className="h-3 w-3" />
          隐藏工具栏
        </Badge>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 animate-pulse">
          <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
          加载中
        </Badge>
      )}

      {/* 未保存状态 */}
      {hasUnsavedChanges && (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-orange-600">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          未保存
        </Badge>
      )}

      {/* 内容统计 */}
      <Badge variant="outline" className="px-2 py-1">
        {content.length} 字符
      </Badge>
    </div>
  );
}
