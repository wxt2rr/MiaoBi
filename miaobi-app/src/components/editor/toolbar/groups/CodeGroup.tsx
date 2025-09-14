'use client';

import { Editor } from '@tiptap/react';
// import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { 
  Code2, 
  FileCode
} from 'lucide-react';

interface CodeGroupProps {
  editor: Editor;
}

export function CodeGroup({ editor }: CodeGroupProps) {
  return (
    <div className="flex items-center gap-1">
      {/* 行内代码 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="行内代码"
      >
        <Code2 className="h-4 w-4" />
      </Toggle>

      {/* 代码块 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('codeBlock')}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="代码块"
      >
        <FileCode className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
