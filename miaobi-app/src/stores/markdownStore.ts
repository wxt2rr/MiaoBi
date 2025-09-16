import { create } from 'zustand';

interface MarkdownState {
  content: string;
  htmlContent: string;
  setContent: (content: string) => void;
  setHtmlContent: (htmlContent: string) => void;
}

export const useMarkdownStore = create<MarkdownState>((set) => ({
  content: '# 欢迎使用妙笔\n\n开始你的创作之旅...',
  htmlContent: '',
  setContent: (content: string) => set({ content }),
  setHtmlContent: (htmlContent: string) => set({ htmlContent }),
}));