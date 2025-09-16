'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileType, Download } from 'lucide-react';

export function PdfExport() {
  const handleExport = () => {
    // PDF导出功能 - 这里可以集成 jsPDF 或其他PDF库
    alert('PDF导出功能开发中...');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleExport}
      className="w-full justify-start gap-2"
    >
      <FileType className="h-4 w-4" />
      <span>导出 PDF</span>
      <Download className="h-4 w-4 ml-auto" />
    </Button>
  );
}