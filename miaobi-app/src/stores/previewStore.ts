import { create } from 'zustand';
import { loadSavedTheme, saveTheme } from '@/utils/themeManager';

type PreviewMode = 'pc' | 'mobile';

interface PreviewState {
  currentTheme: number; // 改为使用索引，与原项目一致
  previewMode: PreviewMode;
  setCurrentTheme: (themeIndex: number) => void;
  setPreviewMode: (mode: PreviewMode) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  currentTheme: loadSavedTheme(), // 从localStorage加载保存的主题
  previewMode: 'mobile', // 默认移动端预览，与原项目一致
  setCurrentTheme: (themeIndex: number) => {
    saveTheme(themeIndex); // 保存到localStorage
    set({ currentTheme: themeIndex });
  },
  setPreviewMode: (mode: PreviewMode) => set({ previewMode: mode }),
}));