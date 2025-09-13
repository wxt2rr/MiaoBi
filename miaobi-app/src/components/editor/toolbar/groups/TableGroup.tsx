'use client';

import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  Plus, 
  Minus, 
  Trash2,
  ChevronDown
} from 'lucide-react';

interface TableGroupProps {
  editor: Editor;
}

export function TableGroup({ editor }: TableGroupProps) {
  const isInTable = editor.isActive('table');

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  const toggleHeaderColumn = () => {
    editor.chain().focus().toggleHeaderColumn().run();
  };

  const toggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run();
  };

  if (!isInTable) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={insertTable}
        aria-label="插入表格"
      >
        <Table className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Table className="h-4 w-4" />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={addColumnBefore} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>在前面插入列</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addColumnAfter} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>在后面插入列</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteColumn} className="flex items-center gap-2">
          <Minus className="h-4 w-4" />
          <span>删除列</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={addRowBefore} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>在上面插入行</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addRowAfter} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>在下面插入行</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteRow} className="flex items-center gap-2">
          <Minus className="h-4 w-4" />
          <span>删除行</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={toggleHeaderRow} className="flex items-center gap-2">
          <span>切换标题行</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleHeaderColumn} className="flex items-center gap-2">
          <span>切换标题列</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={deleteTable} className="flex items-center gap-2 text-destructive">
          <Trash2 className="h-4 w-4" />
          <span>删除表格</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
