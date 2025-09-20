'use client';

import { useState, useRef, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Eye, Menu } from 'lucide-react';
import TipTapEditor from './EditorWrapper';
import PreviewPanel from '../preview/PreviewWrapper';
import SettingsDialog from '../settings/SettingsDialog';
import { useEditorStore } from '@/stores/editor-store';
import { useImprovedSyncScroll } from '@/hooks/useImprovedSyncScroll';
import { codeThemeManager } from '@/utils/codeThemeManager';


export default function EditorLayout() {
  const { content } = useEditorStore();
  const [showPreview, setShowPreview] = useState(true);
  const [showArticles, setShowArticles] = useState(false);

  
  // 同步滚动相关的refs
  const editorScrollRef = useRef<HTMLDivElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);
  
  // 启用同步滚动
  useImprovedSyncScroll({
    editorRef: editorScrollRef,
    previewRef: previewScrollRef,
    enabled: showPreview
  });

  // 初始化代码主题管理器
  useEffect(() => {
    codeThemeManager.initialize();
  }, []);

  // 设置滚动容器引用
  useEffect(() => {
    const editorContainer = document.getElementById('editor-scroll-container');
    const previewContainer = document.getElementById('preview-scroll-container');
    
    if (editorContainer) {
      editorScrollRef.current = editorContainer as HTMLDivElement;
    }
    if (previewContainer) {
      previewScrollRef.current = previewContainer as HTMLDivElement;
    }
  }, [showPreview]);



  return (
    <div className="h-full flex flex-col bg-background">
      {/* 顶部工具栏 */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">妙笔</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? '隐藏预览' : '显示预览'}
          </Button>
          

          <SettingsDialog>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </SettingsDialog>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧编辑器区域 */}
        <div className={`flex-1 flex flex-col ${showPreview ? 'mr-1' : ''}`}>
          <div className="flex-1 overflow-hidden" ref={editorScrollRef}>
            <TipTapEditor />
          </div>
        </div>

        {/* 分隔线 */}
        {showPreview && (
          <Separator orientation="vertical" className="h-full" />
        )}

        {/* 右侧预览区域 */}
        {showPreview && (
          <div className="w-1/2 flex flex-col ml-1 h-full">
            <div className="flex-1 overflow-hidden min-h-0" ref={previewScrollRef}>
              <PreviewPanel content={content} />
            </div>
          </div>
        )}
      </div>


      {/* 文章管理面板 */}
      {showArticles && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="w-80 bg-background h-full shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">文章管理</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowArticles(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm">
                文章管理功能正在开发中...
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                当前版本专注于核心编辑和AI功能
              </p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowArticles(false)} />
        </div>
      )}
    </div>
  );
} 