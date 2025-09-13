// 文章相关类型
export interface Article {
  id: string;
  title: string;
  content: string; // TipTap JSON格式
  htmlContent?: string; // 生成的HTML内容
  createdAt: Date;
  updatedAt: Date;
  themeId?: string;
}

// AI配置类型
export interface AIConfig {
  openaiApiKey?: string;
  openaiModel?: string;
  openaiBaseUrl?: string;
  temperature?: number;
}

// 主题配置类型
export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    paragraph: number;
    heading: number;
  };
}

// AI操作类型
export interface AIOperation {
  type: 'continue' | 'polish' | 'summarize' | 'expand' | 'custom';
  prompt?: string;
  context?: string;
  options?: Record<string, any>;
}

// 编辑器状态类型
export interface EditorState {
  content: string;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  currentArticleId?: string;
}

// 图片生成配置类型
export interface ImageGenerationConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  imageSize?: string;
  imageQuality?: string;
  imageStyle?: string;
}

// 用户设置类型
export interface UserSettings {
  aiConfig: AIConfig;
  imageConfig: ImageGenerationConfig;
  defaultTheme: string;
  autoSave: boolean;
  autoSaveInterval: number;
  shortcuts: Record<string, string>;
} 