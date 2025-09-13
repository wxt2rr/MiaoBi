'use client';

import { Editor } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';
import { TextFormattingGroup } from './groups/TextFormattingGroup';
import { HeadingGroup } from './groups/HeadingGroup';
import { ListGroup } from './groups/ListGroup';
import { LinkGroup } from './groups/LinkGroup';
import { MediaGroup } from './groups/MediaGroup';
import { TableGroup } from './groups/TableGroup';
import { CodeGroup } from './groups/CodeGroup';
import { ColorGroup } from './groups/ColorGroup';
import { AlignmentGroup } from './groups/AlignmentGroup';

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b bg-background p-2">
      <div className="flex flex-wrap items-center gap-1">
        {/* 文本格式化组 */}
        <TextFormattingGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 标题组 */}
        <HeadingGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 列表组 */}
        <ListGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 链接组 */}
        <LinkGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 媒体组 */}
        <MediaGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 表格组 */}
        <TableGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 代码组 */}
        <CodeGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 颜色组 */}
        <ColorGroup editor={editor} />
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* 对齐组 */}
        <AlignmentGroup editor={editor} />
      </div>
    </div>
  );
}
