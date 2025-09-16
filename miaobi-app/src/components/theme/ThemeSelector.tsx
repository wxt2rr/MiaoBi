'use client';

import React, { useState } from 'react';
import { usePreviewStore } from '@/stores/preview-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette, Check } from 'lucide-react';
import { previewThemes, getThemeById } from '@/themes/preview-themes';

export default function ThemeSelector() {
  const { currentTheme, setTheme } = usePreviewStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeConfig = getThemeById(currentTheme);

  return (
    <div className="flex items-center gap-2">
      {/* 主题选择器 */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {currentThemeConfig?.name || '选择主题'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
          <DropdownMenuLabel>选择主题</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* 内置主题 */}
          <div className="px-2 py-1">
            <div className="text-xs font-medium text-muted-foreground mb-2">内置主题</div>
            <div className="grid grid-cols-1 gap-1">
              {previewThemes.map((theme) => (
                <DropdownMenuItem
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className="flex items-center justify-between p-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{theme.name}</div>
                      <div className="text-xs text-muted-foreground">{theme.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {theme.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        默认
                      </Badge>
                    )}
                    {currentTheme === theme.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
