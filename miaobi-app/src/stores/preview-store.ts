import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PreviewMode = 'mobile' | 'desktop' | 'raw';

export interface PreviewState {
  // 预览模式
  mode: PreviewMode;
  
  // 缩放级别
  zoom: number;
  
  // 是否全屏
  isFullscreen: boolean;
  
  // 是否显示工具栏
  showToolbar: boolean;
  
  // 当前主题ID
  currentTheme: string;
  
  // 是否正在加载
  isLoading: boolean;
  
  // 预览内容缓存
  cachedContent: string;
  cachedTheme: string;
  
  // 操作方法
  setMode: (mode: PreviewMode) => void;
  setZoom: (zoom: number) => void;
  toggleFullscreen: () => void;
  toggleToolbar: () => void;
  setTheme: (themeId: string) => void;
  setLoading: (loading: boolean) => void;
  updateCache: (content: string, themeId: string) => void;
  resetPreview: () => void;
}

const defaultState = {
  mode: 'mobile' as PreviewMode,
  zoom: 1,
  isFullscreen: false,
  showToolbar: true,
  currentTheme: 'default',
  isLoading: false,
  cachedContent: '',
  cachedTheme: '',
};

export const usePreviewStore = create<PreviewState>()(
  persist(
    (set) => ({
      ...defaultState,

      setMode: (mode: PreviewMode) => {
        set({ mode });
      },

      setZoom: (zoom: number) => {
        // 限制缩放范围
        const clampedZoom = Math.max(0.25, Math.min(3, zoom));
        set({ zoom: clampedZoom });
      },

      toggleFullscreen: () => {
        set((state) => ({ isFullscreen: !state.isFullscreen }));
      },

      toggleToolbar: () => {
        set((state) => ({ showToolbar: !state.showToolbar }));
      },

      setTheme: (themeId: string) => {
        set({ currentTheme: themeId });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateCache: (content: string, themeId: string) => {
        set({ 
          cachedContent: content,
          cachedTheme: themeId
        });
      },

      resetPreview: () => {
        set(defaultState);
      },
    }),
    {
      name: 'miaobi-preview-storage',
      partialize: (state) => ({
        mode: state.mode,
        zoom: state.zoom,
        showToolbar: state.showToolbar,
        currentTheme: state.currentTheme,
      }),
    }
  )
);
