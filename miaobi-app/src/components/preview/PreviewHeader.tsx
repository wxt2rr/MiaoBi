'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { usePreviewStore } from '@/stores/previewStore';
import { Monitor, Smartphone, Eye } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';

export const PreviewHeader: React.FC = () => {
  const { previewMode, setPreviewMode } = usePreviewStore();

  const handleToggleMode = () => {
    const newMode: 'pc' | 'mobile' = previewMode === 'pc' ? 'mobile' : 'pc';
    setPreviewMode(newMode);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 左侧：预览状态 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">实时预览</span>
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        <Badge variant="outline" className="text-xs">
          {previewMode === 'pc' ? 'PC端' : '移动端'}
        </Badge>
      </div>

      {/* 右侧：核心操作 */}
      <div className="flex items-center gap-3">
        {/* 主题样式选择器 */}
        <ThemeSelector />
        
        <Separator orientation="vertical" className="h-4" />
        
        {/* 预览模式切换 */}
        <Button
          variant={previewMode === 'pc' ? 'default' : 'outline'}
          size="sm"
          onClick={handleToggleMode}
          className="gap-2"
        >
          {previewMode === 'pc' ? (
            <>
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">PC</span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">移动端</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};