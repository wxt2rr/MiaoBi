'use client';

import React, { useEffect } from 'react';
import { PreviewHeader } from './PreviewHeader';
import { PreviewContent } from './PreviewContent';
import { PreviewSidebar } from './PreviewSidebar';
import { usePreviewStore } from '@/stores/previewStore';
import { loadSavedTheme } from '@/utils/themeManager';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  content: string;
  className?: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ 
  content, 
  className = '' 
}) => {
  const { currentTheme } = usePreviewStore();

  // 初始化主题
  useEffect(() => {
    loadSavedTheme();
  }, []);

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* 顶部操作栏 - 简洁、功能明确 */}
      <PreviewHeader />
      
      {/* 主体区域 - 内容为王 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 预览内容 - 占据主要视觉空间 */}
        <div className="flex-1 overflow-hidden">
          <PreviewContent />
        </div>
        
        {/* 侧边栏 - 收纳次要功能 */}
        <PreviewSidebar />
      </div>
    </div>
  );
};