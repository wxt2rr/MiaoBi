'use client';

import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { 
  List, 
  ListOrdered, 
  CheckSquare,
  Quote,
  Minus
} from 'lucide-react';

interface ListGroupProps {
  editor: Editor;
}

export function ListGroup({ editor }: ListGroupProps) {
  return (
    <div className="flex items-center gap-1">
      {/* 无序列表 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="无序列表"
      >
        <List className="h-4 w-4" />
      </Toggle>

      {/* 有序列表 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="有序列表"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      {/* 任务列表 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('taskList')}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        aria-label="任务列表"
      >
        <CheckSquare className="h-4 w-4" />
      </Toggle>

      {/* 引用块 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="引用块"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      {/* 水平分割线 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label="水平分割线"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}
