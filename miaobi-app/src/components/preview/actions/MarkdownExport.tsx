'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { useMarkdownStore } from '@/stores/markdownStore';

export function MarkdownExport() {
  const { content } = useMarkdownStore();

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleExport}
      className="w-full justify-start gap-2"
    >
      <FileText className="h-4 w-4" />
      <span>导出 Markdown</span>
      <Download className="h-4 w-4 ml-auto" />
    </Button>
  );
}