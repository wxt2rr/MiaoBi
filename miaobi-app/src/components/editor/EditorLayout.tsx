'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Eye, Copy, CheckCircle, Menu } from 'lucide-react';
import TipTapEditor from './EditorWrapper';
import PreviewPanel from '../preview/PreviewWrapper';
import SettingsDialog from '../settings/SettingsDialog';
import { ExportService } from '@/services/export-service';
import { useEditorStore } from '@/stores/editor-store';

export default function EditorLayout() {
  const { content } = useEditorStore();
  const [showPreview, setShowPreview] = useState(true);
  const [showArticles, setShowArticles] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');

  const handleCopyForWechat = async () => {
    if (!content.trim()) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
      return;
    }

    setCopyStatus('copying');
    
    try {
      const wechatHTML = ExportService.generateWechatHTML(content);
      const success = await ExportService.copyToClipboard(wechatHTML);
      
      if (success) {
        setCopyStatus('success');
        setTimeout(() => setCopyStatus('idle'), 3000);
      } else {
        setCopyStatus('error');
        setTimeout(() => setCopyStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('复制失败:', error);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 顶部工具栏 */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowArticles(true)}
          >
            <Menu className="h-4 w-4 mr-2" />
            文章
          </Button>
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">妙笔 - 微信文章副驾驶</h1>
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyForWechat}
            disabled={copyStatus === 'copying' || !content.trim()}
          >
            {copyStatus === 'success' ? (
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copyStatus === 'copying' && '复制中...'}
            {copyStatus === 'success' && '复制成功!'}
            {copyStatus === 'error' && '复制失败'}
            {copyStatus === 'idle' && '为微信复制'}
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
          <div className="flex-1 overflow-hidden">
            <TipTapEditor />
          </div>
        </div>

        {/* 分隔线 */}
        {showPreview && (
          <Separator orientation="vertical" className="h-full" />
        )}

        {/* 右侧预览区域 */}
        {showPreview && (
          <div className="w-1/2 flex flex-col ml-1">
            <div className="p-2 border-b bg-muted/50">
              <h3 className="text-sm font-medium text-muted-foreground">
                微信预览
              </h3>
            </div>
            <div className="flex-1 overflow-hidden">
              <PreviewPanel />
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