'use client';

import { Editor } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TextFormattingGroup } from './groups/TextFormattingGroup';
import { HeadingGroup } from './groups/HeadingGroup';
import { ListGroup } from './groups/ListGroup';
import { LinkGroup } from './groups/LinkGroup';
import { MediaGroup } from './groups/MediaGroup';
import { TableGroup } from './groups/TableGroup';
import { CodeGroup } from './groups/CodeGroup';
import { ColorGroup } from './groups/ColorGroup';
import { AlignmentGroup } from './groups/AlignmentGroup';
import { FileText, Edit3, Upload, Download } from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor | null;
  isMarkdownMode: boolean;
  onModeChange: (mode: 'rich' | 'markdown') => void;
  onImportMarkdown: () => void;
  onExportMarkdown: () => void;
  isImporting: boolean;
  isExporting: boolean;
}

export function EditorToolbar({ 
  editor, 
  isMarkdownMode, 
  onModeChange, 
  onImportMarkdown, 
  onExportMarkdown, 
  isImporting, 
  isExporting 
}: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b bg-background p-2">
      <div className="flex flex-wrap items-center gap-1">
        {/* 模式切换下拉框 - 放在首位 */}
        <div className="flex items-center gap-2 mr-2">
          <Select value={isMarkdownMode ? 'markdown' : 'rich'} onValueChange={onModeChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rich">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-3 h-3" />
                  富文本
                </div>
              </SelectItem>
              <SelectItem value="markdown">
                <div className="flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Markdown
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {isMarkdownMode ? (
          // Markdown 模式：只显示上传图片和导入/导出按钮
          <>
            {/* 媒体组 - 只显示上传图片 */}
            <MediaGroup editor={editor} showOnlyImageUpload={true} />
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            {/* 导入/导出按钮 */}
            <button
              onClick={onImportMarkdown}
              disabled={isImporting}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 disabled:opacity-50"
              title="导入 Markdown 文件"
            >
              <Upload className="w-3 h-3" />
              {isImporting ? '导入中...' : '导入 MD'}
            </button>
            <button
              onClick={onExportMarkdown}
              disabled={isExporting}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 disabled:opacity-50"
              title="导出为 Markdown 文件"
            >
              <Download className="w-3 h-3" />
              {isExporting ? '导出中...' : '导出 MD'}
            </button>
          </>
        ) : (
          // 富文本模式：显示所有工具
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
