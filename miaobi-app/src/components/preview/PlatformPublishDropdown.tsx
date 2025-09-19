'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Share2, ChevronDown } from 'lucide-react';
import { WechatExport } from './actions/WechatExport';
import { ZhihuExport } from './actions/ZhihuExport';
import { JuejinExport } from './actions/JuejinExport';
import { XiaohongshuExport } from './actions/XiaohongshuExport';

export const PlatformPublishDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">平台发布</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2 space-y-1">
          <WechatExport />
          <ZhihuExport />
          <JuejinExport />
          <XiaohongshuExport />
        </div>
        <div className="px-3 py-2 text-xs text-muted-foreground border-t">
          💡 一键复制格式化内容，直接粘贴到对应平台
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};