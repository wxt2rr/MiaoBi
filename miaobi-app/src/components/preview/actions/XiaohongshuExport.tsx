'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, CheckCircle } from 'lucide-react';
import { ExportService } from '@/services/ExportService';

export const XiaohongshuExport: React.FC = () => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // 小红书使用纯文本格式
      const textContent = ExportService.generateXiaohongshuText();
      
      if (textContent) {
        await navigator.clipboard.writeText(textContent);
        setIsSuccess(true);
        alert("小红书格式内容已复制到剪贴板，可直接粘贴到小红书编辑器");
        
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (error) {
      console.error('小红书导出失败:', error);
      alert("复制失败，请重试或检查浏览器权限");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isExporting}
      className="w-full justify-start gap-3 h-10 hover:bg-pink-50 hover:border-pink-200 transition-colors"
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-gradient-to-r from-pink-400 to-red-400 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <span className="font-medium">小红书</span>
      </div>
      <div className="ml-auto">
        {isSuccess ? (
          <CheckCircle className="w-4 h-4 text-pink-600" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </Button>
  );
};