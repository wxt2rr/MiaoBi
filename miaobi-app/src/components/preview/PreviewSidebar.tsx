'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronRight, 
  Share2, 
  Download
} from 'lucide-react';

import { WechatExport } from './actions/WechatExport';
import { ZhihuExport } from './actions/ZhihuExport';
import { JuejinExport } from './actions/JuejinExport';
import { XiaohongshuExport } from './actions/XiaohongshuExport';
import { MarkdownExport } from './actions/MarkdownExport';
import { PdfExport } from './actions/PdfExport';
import { ImageExport } from './actions/ImageExport';
export const PreviewSidebar: React.FC = () => {
  const [platformsOpen, setPlatformsOpen] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="w-80 border-l bg-background/50 backdrop-blur">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          
          {/* 平台发布 - 主要功能，默认展开 */}
          <Card>
            <Collapsible open={platformsOpen} onOpenChange={setPlatformsOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-primary" />
                      <span>平台发布</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">4个平台</Badge>
                      <ChevronRight className={`w-4 h-4 transition-transform ${platformsOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-3">
                  <div className="grid gap-2">
                    <WechatExport />
                    <ZhihuExport />
                    <JuejinExport />
                    <XiaohongshuExport />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/30 rounded-md p-2">
                    💡 一键复制格式化内容，直接粘贴到对应平台
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* 文件导出 */}
          <Card>
            <Collapsible open={exportOpen} onOpenChange={setExportOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-primary" />
                      <span>文件导出</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${exportOpen ? 'rotate-90' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-2">
                  <MarkdownExport />
                  <PdfExport />
                  <ImageExport />
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>



        </div>
      </ScrollArea>
    </div>
  );
};