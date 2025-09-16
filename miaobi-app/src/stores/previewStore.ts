import { create } from 'zustand';

type PreviewMode = 'pc' | 'mobile';

interface PreviewState {
  currentTheme: string;
  previewMode: PreviewMode;
  setCurrentTheme: (theme: string) => void;
  setPreviewMode: (mode: PreviewMode) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  currentTheme: 'default',
  previewMode: 'pc',
  setCurrentTheme: (theme: string) => set({ currentTheme: theme }),
  setPreviewMode: (mode: PreviewMode) => set({ previewMode: mode }),
}));