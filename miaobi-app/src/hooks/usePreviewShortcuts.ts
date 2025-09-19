import { useEffect } from 'react';
import { usePreviewStore } from '@/stores/preview-store';

export function usePreviewShortcuts() {
  const { 
    mode, 
    zoom, 
    isFullscreen, 
    showToolbar,
    setMode, 
    setZoom, 
    toggleFullscreen,
    toggleToolbar 
  } = usePreviewStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 忽略在输入框中的快捷键
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // ESC 退出全屏
      if (event.key === 'Escape' && isFullscreen) {
        event.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      
      // Ctrl/Cmd + 0 重置缩放
      if ((event.ctrlKey || event.metaKey) && event.key === '0') {
        event.preventDefault();
        setZoom(1);
      }
      
      // Ctrl/Cmd + + 放大
      if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '+')) {
        event.preventDefault();
        setZoom(Math.min(3, zoom + 0.25));
      }
      
      // Ctrl/Cmd + - 缩小
      if ((event.ctrlKey || event.metaKey) && event.key === '-') {
        event.preventDefault();
        setZoom(Math.max(0.25, zoom - 0.25));
      }

      // F11 切换全屏
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      }

      // Ctrl/Cmd + Shift + M 切换移动端模式
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'M') {
        event.preventDefault();
        setMode('mobile');
      }

      // Ctrl/Cmd + Shift + D 切换桌面端模式
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setMode('desktop');
      }

      // Ctrl/Cmd + Shift + R 切换原始HTML模式
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        setMode('raw');
      }

      // Ctrl/Cmd + Shift + T 切换工具栏
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        toggleToolbar();
      }

      // 数字键快速切换缩放
      if (event.key >= '1' && event.key <= '9' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        const zoomLevels = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5];
        const index = parseInt(event.key) - 1;
        if (index < zoomLevels.length) {
          event.preventDefault();
          setZoom(zoomLevels[index]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    mode, 
    zoom, 
    isFullscreen, 
    showToolbar,
    setMode, 
    setZoom, 
    toggleFullscreen,
    toggleToolbar
  ]);
}


