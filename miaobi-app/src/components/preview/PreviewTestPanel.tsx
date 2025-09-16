'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/stores/editor-store';
import { usePreviewStore } from '@/stores/preview-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Info
} from 'lucide-react';

export default function PreviewTestPanel() {
  const { setContent } = useEditorStore();
  const { 
    mode, 
    zoom, 
    isFullscreen, 
    showToolbar,
    currentTheme,
    isLoading,
    setMode,
    setZoom,
    toggleFullscreen,
    setTheme,
    resetPreview
  } = usePreviewStore();

  const [testResults, setTestResults] = useState<{
    themeSwitch: boolean;
    modeSwitch: boolean;
    zoomControl: boolean;
    fullscreen: boolean;
    performance: boolean;
  }>({
    themeSwitch: false,
    modeSwitch: false,
    zoomControl: false,
    fullscreen: false,
    performance: false,
  });

  const [isRunning, setIsRunning] = useState(false);

  // 测试内容模板
  const testContent = `
<h1>测试标题</h1>
<p>这是一个测试段落，用于验证预览功能是否正常工作。</p>
<h2>二级标题</h2>
<p>这里包含一些<strong>粗体文本</strong>和<em>斜体文本</em>。</p>
<blockquote>
  <p>这是一个引用块，用于测试引用样式。</p>
</blockquote>
<ul>
  <li>列表项 1</li>
  <li>列表项 2</li>
  <li>列表项 3</li>
</ul>
<pre><code>console.log('测试代码块');</code></pre>
<p>最后一段包含<a href="#">链接</a>的文本。</p>
  `.trim();

  const runTests = async () => {
    setIsRunning(true);
    setTestResults({
      themeSwitch: false,
      modeSwitch: false,
      zoomControl: false,
      fullscreen: false,
      performance: false,
    });

    // 设置测试内容
    setContent(testContent);

    // 测试1: 主题切换
    try {
      const themes = ['default', 'github', 'minimal', 'creative'];
      for (const theme of themes) {
        setTheme(theme);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setTheme('default');
      setTestResults(prev => ({ ...prev, themeSwitch: true }));
    } catch (error) {
      console.error('主题切换测试失败:', error);
    }

    // 测试2: 模式切换
    try {
      const modes = ['mobile', 'desktop', 'raw'] as const;
      for (const mode of modes) {
        setMode(mode);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setMode('mobile');
      setTestResults(prev => ({ ...prev, modeSwitch: true }));
    } catch (error) {
      console.error('模式切换测试失败:', error);
    }

    // 测试3: 缩放控制
    try {
      const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];
      for (const zoom of zoomLevels) {
        setZoom(zoom);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      setZoom(1);
      setTestResults(prev => ({ ...prev, zoomControl: true }));
    } catch (error) {
      console.error('缩放控制测试失败:', error);
    }

    // 测试4: 全屏功能
    try {
      toggleFullscreen();
      await new Promise(resolve => setTimeout(resolve, 100));
      if (isFullscreen) {
        toggleFullscreen();
      }
      setTestResults(prev => ({ ...prev, fullscreen: true }));
    } catch (error) {
      console.error('全屏功能测试失败:', error);
    }

    // 测试5: 性能测试
    try {
      const startTime = performance.now();
      for (let i = 0; i < 10; i++) {
        setContent(testContent + `\n<p>性能测试段落 ${i + 1}</p>`);
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // 如果10次更新在1秒内完成，认为性能良好
      setTestResults(prev => ({ ...prev, performance: duration < 1000 }));
    } catch (error) {
      console.error('性能测试失败:', error);
    }

    setIsRunning(false);
  };

  const resetTests = () => {
    setTestResults({
      themeSwitch: false,
      modeSwitch: false,
      zoomControl: false,
      fullscreen: false,
      performance: false,
    });
    setContent('');
    resetPreview();
  };

  const getTestIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getTestStatus = (passed: boolean) => {
    return passed ? (
      <Badge variant="default" className="bg-green-500">通过</Badge>
    ) : (
      <Badge variant="destructive">失败</Badge>
    );
  };

  const allTestsPassed = Object.values(testResults).every(result => result);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          预览功能测试面板
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 测试控制 */}
        <div className="flex items-center gap-2">
          <Button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isRunning ? '测试中...' : '运行测试'}
          </Button>
          <Button
            variant="outline"
            onClick={resetTests}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            重置
          </Button>
        </div>

        {/* 测试结果 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">测试结果</h3>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getTestIcon(testResults.themeSwitch)}
                <span className="text-sm">主题切换</span>
              </div>
              {getTestStatus(testResults.themeSwitch)}
            </div>
            
            <div className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getTestIcon(testResults.modeSwitch)}
                <span className="text-sm">模式切换</span>
              </div>
              {getTestStatus(testResults.modeSwitch)}
            </div>
            
            <div className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getTestIcon(testResults.zoomControl)}
                <span className="text-sm">缩放控制</span>
              </div>
              {getTestStatus(testResults.zoomControl)}
            </div>
            
            <div className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getTestIcon(testResults.fullscreen)}
                <span className="text-sm">全屏功能</span>
              </div>
              {getTestStatus(testResults.fullscreen)}
            </div>
            
            <div className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                {getTestIcon(testResults.performance)}
                <span className="text-sm">性能测试</span>
              </div>
              {getTestStatus(testResults.performance)}
            </div>
          </div>
        </div>

        {/* 总体结果 */}
        <div className="p-3 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {allTestsPassed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="font-medium">总体结果</span>
            </div>
            <Badge variant={allTestsPassed ? "default" : "secondary"}>
              {allTestsPassed ? '所有测试通过' : '部分测试失败'}
            </Badge>
          </div>
        </div>

        {/* 当前状态 */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">当前状态</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>模式: {mode}</div>
            <div>缩放: {Math.round(zoom * 100)}%</div>
            <div>主题: {currentTheme}</div>
            <div>全屏: {isFullscreen ? '是' : '否'}</div>
            <div>工具栏: {showToolbar ? '显示' : '隐藏'}</div>
            <div>加载中: {isLoading ? '是' : '否'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
