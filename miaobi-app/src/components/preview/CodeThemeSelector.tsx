'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Code, Check } from 'lucide-react';
import { CODE_THEME_OPTIONS } from '@/constants/codeThemes';
import { codeThemeManager } from '@/utils/codeThemeManager';
import { useState, useEffect } from 'react';

export function CodeThemeSelector() {
  const [currentCodeNum, setCurrentCodeNum] = useState(0);
  const [isMacCode, setIsMacCode] = useState(false);

  // 初始化和监听状态变化
  useEffect(() => {
    const updateState = () => {
      const { codeNum, isMacCode: macCode } = codeThemeManager.getCurrentCodeTheme();
      setCurrentCodeNum(codeNum);
      setIsMacCode(macCode);
    };

    updateState();
    
    // 监听localStorage变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'code_num' || e.key === 'is_mac_code') {
        updateState();
      }
    };

    // 监听代码主题变化事件
    const handleCodeThemeChange = () => {
      updateState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('codeThemeChanged', handleCodeThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('codeThemeChanged', handleCodeThemeChange as EventListener);
    };
  }, []);

  const handleCodeThemeChange = (codeNum: number) => {
    codeThemeManager.setCodeTheme(codeNum, isMacCode);
    // 状态会在事件监听器中自动更新，不需要手动设置
  };

  const handleMacStyleToggle = () => {
    const newMacCode = !isMacCode;
    codeThemeManager.setCodeTheme(currentCodeNum, newMacCode);
    // 状态会在事件监听器中自动更新，不需要手动设置
  };

  // const currentTheme = CODE_THEME_OPTIONS[currentCodeNum];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Code className="h-4 w-4" />
          <span>代码主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 max-h-80 overflow-y-auto">
        {CODE_THEME_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleCodeThemeChange(index)}
            className="flex items-center gap-2 cursor-pointer"
            title={option.description}
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{option.name}</span>
              {option.description && (
                <div className="text-xs text-muted-foreground truncate">
                  {option.description}
                </div>
              )}
            </div>
            {currentCodeNum === index && (
              <Check className="h-3 w-3 ml-auto flex-shrink-0 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={handleMacStyleToggle}
          className="flex items-center gap-2 cursor-pointer"
          title="切换Mac风格代码块样式"
        >
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium">Mac 风格</span>
            <div className="text-xs text-muted-foreground">
              添加Mac风格的代码块装饰
            </div>
          </div>
          {isMacCode && (
            <Check className="h-3 w-3 ml-auto flex-shrink-0 text-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}