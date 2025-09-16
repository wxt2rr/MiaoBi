'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMarkdownStore } from '@/stores/markdownStore';

export function PreviewContent() {
  const { content, htmlContent } = useMarkdownStore();

  return (
    <ScrollArea className="h-full">
      <div className="p-8">
        <div 
          className="markdown-preview prose prose-slate max-w-none
            prose-headings:text-slate-900 prose-headings:font-semibold
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-strong:font-semibold
            prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
            prose-ul:text-slate-700 prose-ol:text-slate-700
            prose-li:text-slate-700"
          dangerouslySetInnerHTML={{ __html: htmlContent || content }}
        />
      </div>
    </ScrollArea>
  );
}