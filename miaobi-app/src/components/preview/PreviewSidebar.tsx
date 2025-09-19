'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const PreviewSidebar: React.FC = () => {
  return (
    <div className="w-80 border-l bg-background/50 backdrop-blur">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* 侧边栏内容已移至顶部栏 */}
          <div className="text-center text-muted-foreground text-sm py-8">
            <p>功能已移至顶部工具栏</p>
            <p className="text-xs mt-2">平台发布和文件导出功能现在可以在预览区域顶部找到</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};