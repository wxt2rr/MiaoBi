import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article, EditorState } from '@/types';

interface EditorStore extends EditorState {
  // 状态
  articles: Article[];
  
  // 操作方法
  setContent: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrentArticle: (articleId: string) => void;
  createNewArticle: () => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  saveCurrentArticle: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      content: '',
      isLoading: false,
      hasUnsavedChanges: false,
      currentArticleId: undefined,
      articles: [],

      // 操作方法
      setContent: (content: string) => {
        set({ 
          content, 
          hasUnsavedChanges: true 
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setCurrentArticle: (articleId: string) => {
        const article = get().articles.find(a => a.id === articleId);
        if (article) {
          set({
            currentArticleId: articleId,
            content: article.content,
            hasUnsavedChanges: false
          });
        }
      },

      createNewArticle: () => {
        const newArticle: Article = {
          id: crypto.randomUUID(),
          title: '未命名文章',
          content: '',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        set(state => ({
          articles: [newArticle, ...state.articles],
          currentArticleId: newArticle.id,
          content: '',
          hasUnsavedChanges: false
        }));
      },

      updateArticle: (id: string, updates: Partial<Article>) => {
        set(state => ({
          articles: state.articles.map(article =>
            article.id === id
              ? { ...article, ...updates, updatedAt: new Date() }
              : article
          )
        }));
      },

      deleteArticle: (id: string) => {
        set(state => {
          const newArticles = state.articles.filter(a => a.id !== id);
          const isCurrentArticle = state.currentArticleId === id;
          
          return {
            articles: newArticles,
            currentArticleId: isCurrentArticle ? undefined : state.currentArticleId,
            content: isCurrentArticle ? '' : state.content,
            hasUnsavedChanges: isCurrentArticle ? false : state.hasUnsavedChanges
          };
        });
      },

      saveCurrentArticle: () => {
        const state = get();
        if (state.currentArticleId && state.hasUnsavedChanges) {
          state.updateArticle(state.currentArticleId, {
            content: state.content
          });
          set({ hasUnsavedChanges: false });
        }
      }
    }),
    {
      name: 'miaobi-editor-storage',
      partialize: (state) => ({
        articles: state.articles,
        currentArticleId: state.currentArticleId
      })
    }
  )
); 