'use client';

import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, Unlink } from 'lucide-react';
import { useState } from 'react';

interface LinkGroupProps {
  editor: Editor;
}

export function LinkGroup({ editor }: LinkGroupProps) {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSetLink = () => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setUrl('');
      setIsOpen(false);
    }
  };

  const handleUnsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const getCurrentUrl = () => {
    const { href } = editor.getAttributes('link');
    return href || '';
  };

  return (
    <div className="flex items-center gap-1">
      {/* 添加链接 */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive('link')}
            aria-label="添加链接"
          >
            <Link className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="link-url">链接地址</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={url || getCurrentUrl()}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSetLink();
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSetLink}>
                {editor.isActive('link') ? '更新链接' : '添加链接'}
              </Button>
              {editor.isActive('link') && (
                <Button size="sm" variant="outline" onClick={handleUnsetLink}>
                  移除链接
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* 移除链接 */}
      {editor.isActive('link') && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUnsetLink}
          aria-label="移除链接"
        >
          <Unlink className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
