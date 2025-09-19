'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette, Check } from 'lucide-react';
import { getAllThemes } from '@/utils/themeManager';
import { usePreviewStore } from '@/stores/previewStore';

export function ThemeSelector() {
  const { currentTheme, setCurrentTheme } = usePreviewStore();
  const themes = getAllThemes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span>主题样式</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-80 overflow-y-auto">
        {themes.map((theme, index) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setCurrentTheme(index)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className={`w-3 h-3 rounded-full ${theme.color} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{theme.name}</span>
            </div>
            {currentTheme === index && (
              <Check className="h-3 w-3 ml-auto flex-shrink-0 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}