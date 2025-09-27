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
  description?: string;
  category: 'business' | 'personal' | 'creative' | 'minimal';
  isDefault?: boolean;
  isCustom?: boolean;
  
  // 颜色系统
  colors: {
    primary: string;        // 主色调
    secondary: string;      // 辅助色
    accent: string;         // 强调色
    background: string;     // 背景色
    surface: string;        // 表面色
    text: {
      primary: string;      // 主文本色
      secondary: string;    // 次要文本色
      muted: string;        // 弱化文本色
    };
    border: string;         // 边框色
    success?: string;       // 成功色
    warning?: string;       // 警告色
    error?: string;         // 错误色
  };
  
  // 字体系统
  fonts: {
    heading: {
      family: string;
      weight: number;
      size: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
      };
    };
    body: {
      family: string;
      weight: number;
      size: string;
      lineHeight: number;
    };
    code: {
      family: string;
      size: string;
    };
  };
  
  // 间距系统
  spacing: {
    paragraph: number;      // 段落间距
    heading: number;        // 标题间距
    section: number;        // 章节间距
    element: number;        // 元素间距
  };
  
  // 组件样式
  components: {
    blockquote: {
      borderColor: string;
      backgroundColor: string;
      padding: string;
    };
    code: {
      backgroundColor: string;
      borderColor: string;
      borderRadius: string;
    };
    link: {
      color: string;
      hoverColor: string;
    };
  };
  
  // 微信兼容性配置
  wechat: {
    fontSize: number;       // 微信推荐字号
    lineHeight: number;     // 微信推荐行高
    maxWidth: string;       // 最大宽度
  };
  
  // 预览样式配置
  preview: {
    backgroundColor: string;
    borderRadius: string;
    padding: string;
    boxShadow: string;
    borderColor?: string;
  };
}

// AI操作类型
export interface AIOperation {
  type: 'continue' | 'polish' | 'summarize' | 'expand' | 'custom';
  prompt?: string;
  context?: string;
  options?: Record<string, string | number | boolean>;
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
  provider?: 'openai' | 'stability' | 'midjourney';
  apiKey?: string;
  openaiApiKey?: string;
  baseUrl?: string;
  model?: string;
  dalleModel?: string;
  imageSize?: string;
  imageQuality?: string;
  imageStyle?: string;
}

// 云存储配置类型
export interface CloudStorageConfig {
  provider: 'github' | 's3' | 'wechat' | 'juejin' | 'local';
  enabled: boolean;
  // GitHub 配置
  github?: {
    token?: string;
    repo?: string;
    owner?: string;
    branch?: string;
    path?: string;
  };
  // S3 通用配置
  s3?: {
    endpoint?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    bucket?: string;
    region?: string;
    path?: string;
  };
  // 平台特定配置
  platform?: {
    apiUrl?: string;
    token?: string;
    uploadPath?: string;
  };
}

// 用户设置类型
export interface UserSettings {
  aiConfig: AIConfig;
  imageConfig: ImageGenerationConfig;
  cloudStorage: CloudStorageConfig;
  defaultTheme: string;
  autoSave: boolean;
  autoSaveInterval: number;
  shortcuts: Record<string, string>;
} 