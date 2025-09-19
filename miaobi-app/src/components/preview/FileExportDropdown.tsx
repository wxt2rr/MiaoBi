'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown } from 'lucide-react';
import { MarkdownExport } from './actions/MarkdownExport';
import { PdfExport } from './actions/PdfExport';
import { ImageExport } from './actions/ImageExport';

export const FileExportDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">文件导出</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="p-2 space-y-1">
          <MarkdownExport />
          <PdfExport />
          <ImageExport />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};