'use client';

import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code,
  Highlighter,
  Superscript,
  Subscript
} from 'lucide-react';

interface TextFormattingGroupProps {
  editor: Editor;
}

export function TextFormattingGroup({ editor }: TextFormattingGroupProps) {
  return (
    <div className="flex items-center gap-1">
      {/* 加粗 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="加粗"
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      {/* 斜体 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="斜体"
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      {/* 下划线 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="下划线"
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      {/* 删除线 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="删除线"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      {/* 行内代码 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="行内代码"
      >
        <Code className="h-4 w-4" />
      </Toggle>

      {/* 高亮 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('highlight')}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        aria-label="高亮"
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>

      {/* 上标 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('superscript')}
        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
        aria-label="上标"
      >
        <Superscript className="h-4 w-4" />
      </Toggle>

      {/* 下标 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('subscript')}
        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        aria-label="下标"
      >
        <Subscript className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
