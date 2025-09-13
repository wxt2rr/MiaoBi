'use client';

import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify
} from 'lucide-react';

interface AlignmentGroupProps {
  editor: Editor;
}

export function AlignmentGroup({ editor }: AlignmentGroupProps) {
  return (
    <div className="flex items-center gap-1">
      {/* 左对齐 */}
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'left' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
        aria-label="左对齐"
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      {/* 居中对齐 */}
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'center' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
        aria-label="居中对齐"
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      {/* 右对齐 */}
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'right' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
        aria-label="右对齐"
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      {/* 两端对齐 */}
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'justify' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
        aria-label="两端对齐"
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
