'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WechatExport } from './actions/WechatExport';
import { ZhihuExport } from './actions/ZhihuExport';
import { JuejinExport } from './actions/JuejinExport';
import { XiaohongshuExport } from './actions/XiaohongshuExport';
import { MarkdownExport } from './actions/MarkdownExport';
import { PdfExport } from './actions/PdfExport';
import { ImageExport } from './actions/ImageExport';
import { PreviewToggle } from './actions/PreviewToggle';
import { ThemeSelector } from './ThemeSelector';

export const PreviewToolbar: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-background">
      {/* 平台导出组 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            平台导出
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <WechatExport />
          <ZhihuExport />
          <JuejinExport />
          <XiaohongshuExport />
        </div>
      </div>
      
      <Separator />
      
      {/* Markdown 导出 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            文档格式
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <MarkdownExport />
        </div>
      </div>
      
      <Separator />
      
      {/* 其他导出格式 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            其他格式
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <PdfExport />
          <ImageExport />
        </div>
      </div>
      
      <Separator />
      
      {/* 预览设置 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            预览设置
          </Badge>
        </div>
        <div className="space-y-2">
          <PreviewToggle />
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};