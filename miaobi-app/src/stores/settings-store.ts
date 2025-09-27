import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings, AIConfig, ImageGenerationConfig, CloudStorageConfig } from '@/types';

interface SettingsStore extends UserSettings {
  // 操作方法
  updateAIConfig: (config: Partial<AIConfig>) => void;
  updateImageConfig: (config: Partial<ImageGenerationConfig>) => void;
  updateCloudStorage: (config: Partial<CloudStorageConfig>) => void;
  setDefaultTheme: (themeId: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  aiConfig: {
    openaiModel: 'gpt-4o',
    temperature: 0.7,
  },
  imageConfig: {
    model: 'dall-e-3',
    imageSize: '1024x1024',
    imageQuality: 'standard',
    imageStyle: 'natural',
  },
  cloudStorage: {
    provider: 'local',
    enabled: false,
    github: {
      token: '',
      repo: '',
      owner: '',
      branch: 'main',
      path: 'images',
    },
    s3: {
      endpoint: '',
      accessKeyId: '',
      secretAccessKey: '',
      bucket: '',
      region: 'us-east-1',
      path: 'images',
    },
    platform: {
      apiUrl: '',
      token: '',
      uploadPath: 'images',
    },
  },
  defaultTheme: 'default',
  autoSave: true,
  autoSaveInterval: 5000, // 5秒
  shortcuts: {
    save: 'Ctrl+S',
    continue: 'Tab Tab',
    command: 'Ctrl+/',
  }
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      updateAIConfig: (config: Partial<AIConfig>) => {
        set(state => ({
          aiConfig: { ...state.aiConfig, ...config }
        }));
      },

      updateImageConfig: (config: Partial<ImageGenerationConfig>) => {
        set(state => ({
          imageConfig: { ...state.imageConfig, ...config }
        }));
      },

      updateCloudStorage: (config: Partial<CloudStorageConfig>) => {
        set(state => ({
          cloudStorage: { ...state.cloudStorage, ...config }
        }));
      },

      setDefaultTheme: (themeId: string) => {
        set({ defaultTheme: themeId });
      },

      updateSettings: (settings: Partial<UserSettings>) => {
        set(state => ({ ...state, ...settings }));
      },

      resetSettings: () => {
        set(defaultSettings);
      }
    }),
    {
      name: 'miaobi-settings-storage'
    }
  )
); 