'use client';

import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Pilcrow } from 'lucide-react';

interface HeadingGroupProps {
  editor: Editor;
}

export function HeadingGroup({ editor }: HeadingGroupProps) {
  const getCurrentHeading = () => {
    if (editor.isActive('heading', { level: 1 })) return { icon: Heading1, text: 'H1' };
    if (editor.isActive('heading', { level: 2 })) return { icon: Heading2, text: 'H2' };
    if (editor.isActive('heading', { level: 3 })) return { icon: Heading3, text: 'H3' };
    if (editor.isActive('heading', { level: 4 })) return { icon: Heading4, text: 'H4' };
    if (editor.isActive('heading', { level: 5 })) return { icon: Heading5, text: 'H5' };
    if (editor.isActive('heading', { level: 6 })) return { icon: Heading6, text: 'H6' };
    return { icon: Pilcrow, text: '正文' };
  };

  const currentHeading = getCurrentHeading();
  const CurrentIcon = currentHeading.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <CurrentIcon className="h-4 w-4" />
          <span className="text-sm">{currentHeading.text}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="flex items-center gap-2"
        >
          <Pilcrow className="h-4 w-4" />
          <span>正文</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="flex items-center gap-2"
        >
          <Heading1 className="h-4 w-4" />
          <span>标题 1</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="flex items-center gap-2"
        >
          <Heading2 className="h-4 w-4" />
          <span>标题 2</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className="flex items-center gap-2"
        >
          <Heading3 className="h-4 w-4" />
          <span>标题 3</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className="flex items-center gap-2"
        >
          <Heading4 className="h-4 w-4" />
          <span>标题 4</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className="flex items-center gap-2"
        >
          <Heading5 className="h-4 w-4" />
          <span>标题 5</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className="flex items-center gap-2"
        >
          <Heading6 className="h-4 w-4" />
          <span>标题 6</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
