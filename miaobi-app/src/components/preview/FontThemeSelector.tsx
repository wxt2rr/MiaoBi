'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Type, Check } from 'lucide-react';
import { fontThemeManager } from '@/utils/fontThemeManager';
import { FONT_THEME_OPTIONS } from '@/constants/fontThemes';

export function FontThemeSelector() {
  const [currentFontTheme, setCurrentFontTheme] = useState(0);

  useEffect(() => {
    // 初始化字体主题管理器
    fontThemeManager.initialize();
    
    // 获取当前字体主题
    setCurrentFontTheme(fontThemeManager.getCurrentFontTheme());

    // 监听字体主题变化事件
    const handleFontThemeChange = (e: CustomEvent) => {
      setCurrentFontTheme(e.detail.fontNum);
    };

    window.addEventListener('fontThemeChanged', handleFontThemeChange as EventListener);

    return () => {
      window.removeEventListener('fontThemeChanged', handleFontThemeChange as EventListener);
    };
  }, []);

  const handleFontThemeSelect = (fontNum: number) => {
    fontThemeManager.setFontTheme(fontNum);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Type className="h-4 w-4" />
          <span>字体主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {FONT_THEME_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleFontThemeSelect(index)}
            className="flex items-center gap-2 cursor-pointer"
            title={option.description}
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{option.name}</span>
            </div>
            {currentFontTheme === index && (
              <Check className="h-3 w-3 ml-auto flex-shrink-0 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}