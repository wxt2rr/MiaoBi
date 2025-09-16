'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Image, Download } from 'lucide-react';

export function ImageExport() {
  const handleExport = () => {
    // 图片导出功能 - 这里可以集成 html2canvas
    alert('图片导出功能开发中...');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleExport}
      className="w-full justify-start gap-2"
    >
      <Image className="h-4 w-4" />
      <span>导出图片</span>
      <Download className="h-4 w-4 ml-auto" />
    </Button>
  );
}