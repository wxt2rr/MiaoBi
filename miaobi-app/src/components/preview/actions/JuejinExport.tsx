'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Gem, Copy, CheckCircle } from 'lucide-react';
import { ExportService } from '@/services/ExportService';

export const JuejinExport: React.FC = () => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const htmlContent = ExportService.generateJuejinHTML();
      
      if (htmlContent) {
        await navigator.clipboard.writeText(htmlContent);
        setIsSuccess(true);
        alert("掘金格式内容已复制到剪贴板，可直接粘贴到掘金编辑器");
        
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (error) {
      console.error('掘金导出失败:', error);
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
      className="w-full justify-start gap-3 h-10 hover:bg-cyan-50 hover:border-cyan-200 transition-colors"
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <Gem className="w-3 h-3 text-white" />
        </div>
        <span className="font-medium">掘金</span>
      </div>
      <div className="ml-auto">
        {isSuccess ? (
          <CheckCircle className="w-4 h-4 text-cyan-600" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </Button>
  );
};