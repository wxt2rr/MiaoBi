'use client';

import React, { useEffect, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEditorStore } from '@/stores/editor-store';
import { usePreviewStore } from '@/stores/previewStore';
import { getThemeByIndex } from '@/utils/themeManager';
import { basicTheme } from '@/themes/markdown/basic';
import { cn } from '@/lib/utils';
import { replaceStyle, ensureStyleElement } from '@/utils/styleHelper';
import { codeThemeManager } from '@/utils/codeThemeManager';
import { fontThemeManager } from '@/utils/fontThemeManager';
import { CODE_NUM, IS_MAC_CODE } from '@/constants/codeThemes';
import { FONT_NUM } from '@/constants/fontThemes';
import { markdownParser } from '@/utils/markdown-it-config';

export function PreviewContent() {
  const { content: markdownContent } = useEditorStore();
  const { currentTheme, previewMode } = usePreviewStore();

  // 处理内容 - 可能是HTML或Markdown
  const htmlContent = useMemo(() => {
    if (!markdownContent) return '<p>开始编辑以查看预览...</p>';
    
    // 检查内容是否已经是HTML（包含HTML标签）
    const isHtml = /<[^>]+>/.test(markdownContent);
    
    if (isHtml) {
      // 如果已经是HTML，直接返回
      return markdownContent;
    } else {
      // 如果是Markdown，使用markdownParser解析
      try {
        return markdownParser.render(markdownContent);
      } catch (error) {
        console.error('Markdown解析错误:', error);
        return '<p>Markdown解析错误</p>';
      }
    }
  }, [markdownContent]);

  // 动态应用主题样式
  useEffect(() => {
    const themeInfo = getThemeByIndex(currentTheme);
    
    // 确保样式元素存在
    ensureStyleElement('dynamic-basic-style');
    ensureStyleElement('dynamic-theme-style');
    ensureStyleElement('dynamic-font-style');
    
    // 应用基础模板样式
    replaceStyle('dynamic-basic-style', basicTheme);
    
    if (themeInfo) {
      // 应用主题样式
      replaceStyle('dynamic-theme-style', themeInfo.css);
    } else {
      // 清空主题样式
      replaceStyle('dynamic-theme-style', '');
    }
  }, [currentTheme]);

  // 监听代码主题变化并应用样式
  useEffect(() => {
    // 确保代码主题管理器已初始化
    const initializeAndApplyCodeTheme = () => {
      try {
        // 先初始化代码主题管理器
        codeThemeManager.initialize();
        
        // 然后应用当前代码主题
        const { codeNum, isMacCode } = codeThemeManager.getCurrentCodeTheme();
        codeThemeManager.applyCodeTheme(codeNum, isMacCode);
        
        // console.log('代码主题初始化并应用成功', { codeNum, isMacCode });
      } catch (error) {
        console.error('代码主题初始化失败:', error);
      }
    };

    // 延迟执行以确保DOM元素已创建
    const timer = setTimeout(initializeAndApplyCodeTheme, 100);

    // 监听localStorage变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CODE_NUM || e.key === IS_MAC_CODE) {
        const { codeNum, isMacCode } = codeThemeManager.getCurrentCodeTheme();
        // 直接应用样式，避免触发事件循环
        codeThemeManager.applyCodeTheme(codeNum, isMacCode);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 监听自定义事件（用于同一页面内的主题切换）
    const handleCodeThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      // 只重新应用样式，不调用setCodeTheme避免循环
      const { codeNum, isMacCode } = customEvent.detail;
      // 直接调用公共方法应用样式，避免触发事件
      codeThemeManager.applyCodeTheme(codeNum, isMacCode);
    };
    
    window.addEventListener('codeThemeChanged', handleCodeThemeChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('codeThemeChanged', handleCodeThemeChange);
    };
  }, []);

  // 监听字体主题变化并应用样式
  useEffect(() => {
    // 初始应用字体主题
    fontThemeManager.initialize();

    // 监听localStorage变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FONT_NUM) {
        const fontNum = fontThemeManager.getCurrentFontTheme();
        fontThemeManager.setFontTheme(fontNum);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 监听自定义事件（用于同一页面内的主题切换）
    const handleFontThemeChange = () => {
      console.log('字体主题已更新');
    };
    
    window.addEventListener('fontThemeChanged', handleFontThemeChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('fontThemeChanged', handleFontThemeChange);
    };
  }, []);

  // 根据预览模式计算容器样式
  const containerStyle = useMemo(() => {
    const baseStyle = {
      fontSize: '16px',
      color: 'black',
      padding: '0 10px',
      lineHeight: '1.6',
      wordSpacing: '0px',
      letterSpacing: '0px',
      wordBreak: 'break-word' as const,
      wordWrap: 'break-word' as const,
      textAlign: 'left' as const,
      fontFamily: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif'
    };

    if (previewMode === 'mobile') {
      return {
        ...baseStyle,
        maxWidth: '375px',
        margin: '0 auto',
        padding: '20px 16px',
        fontSize: '14px',
        lineHeight: '1.5'
      };
    }

    return {
      ...baseStyle,
      maxWidth: '100%',
      padding: '20px 40px'
    };
  }, [previewMode]);

  // 根据预览模式计算外层容器样式
  const wrapperClass = useMemo(() => {
    return cn(
      "h-full",
      previewMode === 'mobile' && "bg-gray-100 flex items-start justify-center py-4",
      previewMode === 'pc' && "bg-white"
    );
  }, [previewMode]);

  const contentWrapperClass = useMemo(() => {
    return cn(
      previewMode === 'mobile' && "bg-white shadow-lg rounded-lg overflow-hidden min-h-[600px] w-[375px]",
      previewMode === 'pc' && "w-full"
    );
  }, [previewMode]);

  return (
    <ScrollArea className={wrapperClass}>
      <div className={cn("relative", previewMode === 'mobile' ? "p-4" : "p-8")}>
        {/* 模式指示器 */}
        {previewMode === 'mobile' && (
          <div className="absolute top-2 left-2 z-10 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
            移动端预览 (375px)
          </div>
        )}
        {previewMode === 'pc' && (
          <div className="absolute top-2 right-2 z-10 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded shadow-sm">
            PC端预览
          </div>
        )}
        
        <div className={contentWrapperClass}>
          <div 
            id="nice"
            className="preview-content markdown-preview"
            style={containerStyle}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </ScrollArea>
  );
}