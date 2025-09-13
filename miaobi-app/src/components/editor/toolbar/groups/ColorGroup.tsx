'use client';

import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Palette, Type, Highlighter } from 'lucide-react';

interface ColorGroupProps {
  editor: Editor;
}

const colors = [
  '#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6', '#FFFFFF',
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E', '#10B981',
  '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
  '#EC4899', '#F43F5E'
];

export function ColorGroup({ editor }: ColorGroupProps) {
  const setTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const setHighlightColor = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
  };

  const removeTextColor = () => {
    editor.chain().focus().unsetColor().run();
  };

  const removeHighlight = () => {
    editor.chain().focus().unsetHighlight().run();
  };

  return (
    <div className="flex items-center gap-1">
      {/* 文字颜色 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="文字颜色">
            <Type className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">文字颜色</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeTextColor}
                className="text-xs"
              >
                清除
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => setTextColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* 背景颜色/高亮 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="背景颜色">
            <Highlighter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">背景颜色</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeHighlight}
                className="text-xs"
              >
                清除
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => setHighlightColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
