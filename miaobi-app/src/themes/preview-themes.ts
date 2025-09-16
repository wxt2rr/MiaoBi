import type { ThemeConfig } from '@/types';

export const previewThemes: ThemeConfig[] = [
  {
    id: 'default',
    name: '默认主题',
    description: '简洁优雅的默认样式',
    category: 'minimal',
    isDefault: true,
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f6f8fa',
      background: '#ffffff',
      surface: '#f6f8fa',
      text: {
        primary: '#24292e',
        secondary: '#586069',
        muted: '#6a737d'
      },
      border: '#e1e4e8',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545'
    },
    fonts: {
      heading: {
        family: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
        weight: 600,
        size: {
          h1: '1.875rem',
          h2: '1.5rem',
          h3: '1.25rem',
          h4: '1.125rem'
        }
      },
      body: {
        family: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
        weight: 400,
        size: '1rem',
        lineHeight: 1.6
      },
      code: {
        family: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
        size: '0.875rem'
      }
    },
    spacing: {
      paragraph: 1.5,
      heading: 2,
      section: 3,
      element: 1
    },
    components: {
      blockquote: {
        borderColor: '#2563eb',
        backgroundColor: '#f1f5f9',
        padding: '1rem 1.5rem'
      },
      code: {
        backgroundColor: '#f6f8fa',
        borderColor: '#e1e4e8',
        borderRadius: '0.375rem'
      },
      link: {
        color: '#2563eb',
        hoverColor: '#1d4ed8'
      }
    },
    wechat: {
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: '100%'
    },
    preview: {
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      borderColor: '#e1e4e8'
    }
  },
  {
    id: 'github',
    name: 'GitHub风格',
    description: '经典的GitHub Markdown样式',
    category: 'business',
    colors: {
      primary: '#0366d6',
      secondary: '#586069',
      accent: '#f6f8fa',
      background: '#ffffff',
      surface: '#f6f8fa',
      text: {
        primary: '#24292e',
        secondary: '#586069',
        muted: '#6a737d'
      },
      border: '#e1e4e8',
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545'
    },
    fonts: {
      heading: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        weight: 600,
        size: {
          h1: '2rem',
          h2: '1.5rem',
          h3: '1.25rem',
          h4: '1rem'
        }
      },
      body: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        weight: 400,
        size: '16px',
        lineHeight: 1.5
      },
      code: {
        family: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        size: '85%'
      }
    },
    spacing: {
      paragraph: 1.5,
      heading: 1.25,
      section: 2,
      element: 0.5
    },
    components: {
      blockquote: {
        borderColor: '#dfe2e5',
        backgroundColor: '#f6f8fa',
        padding: '0 1em'
      },
      code: {
        backgroundColor: '#f6f8fa',
        borderColor: '#e1e4e8',
        borderRadius: '3px'
      },
      link: {
        color: '#0366d6',
        hoverColor: '#0256cc'
      }
    },
    wechat: {
      fontSize: 16,
      lineHeight: 1.5,
      maxWidth: '100%'
    },
    preview: {
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      borderColor: '#e1e4e8'
    }
  },
  {
    id: 'minimal',
    name: '极简风格',
    description: '简洁优雅的极简设计',
    category: 'minimal',
    colors: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      accent: '#ecf0f1',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: {
        primary: '#2c3e50',
        secondary: '#7f8c8d',
        muted: '#95a5a6'
      },
      border: '#e9ecef',
      success: '#27ae60',
      warning: '#f39c12',
      error: '#e74c3c'
    },
    fonts: {
      heading: {
        family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: 300,
        size: {
          h1: '2.5rem',
          h2: '2rem',
          h3: '1.5rem',
          h4: '1.25rem'
        }
      },
      body: {
        family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        weight: 400,
        size: '1rem',
        lineHeight: 1.7
      },
      code: {
        family: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        size: '0.9rem'
      }
    },
    spacing: {
      paragraph: 2,
      heading: 2.5,
      section: 4,
      element: 1.5
    },
    components: {
      blockquote: {
        borderColor: '#bdc3c7',
        backgroundColor: '#f8f9fa',
        padding: '1.5rem 2rem'
      },
      code: {
        backgroundColor: '#f8f9fa',
        borderColor: '#e9ecef',
        borderRadius: '4px'
      },
      link: {
        color: '#3498db',
        hoverColor: '#2980b9'
      }
    },
    wechat: {
      fontSize: 16,
      lineHeight: 1.7,
      maxWidth: '100%'
    },
    preview: {
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      borderColor: '#e1e4e8'
    }
  },
  {
    id: 'creative',
    name: '创意风格',
    description: '富有创意的设计风格',
    category: 'creative',
    colors: {
      primary: '#e74c3c',
      secondary: '#9b59b6',
      accent: '#f39c12',
      background: '#ffffff',
      surface: '#fdf2e9',
      text: {
        primary: '#2c3e50',
        secondary: '#7f8c8d',
        muted: '#95a5a6'
      },
      border: '#f1c40f',
      success: '#27ae60',
      warning: '#f39c12',
      error: '#e74c3c'
    },
    fonts: {
      heading: {
        family: '"Georgia", "Times New Roman", serif',
        weight: 700,
        size: {
          h1: '2.25rem',
          h2: '1.875rem',
          h3: '1.5rem',
          h4: '1.25rem'
        }
      },
      body: {
        family: '"Georgia", "Times New Roman", serif',
        weight: 400,
        size: '1.1rem',
        lineHeight: 1.6
      },
      code: {
        family: '"Courier New", Courier, monospace',
        size: '0.9rem'
      }
    },
    spacing: {
      paragraph: 1.8,
      heading: 2.2,
      section: 3.5,
      element: 1.2
    },
    components: {
      blockquote: {
        borderColor: '#e74c3c',
        backgroundColor: '#fdf2e9',
        padding: '1.5rem 2rem'
      },
      code: {
        backgroundColor: '#f8f9fa',
        borderColor: '#f1c40f',
        borderRadius: '6px'
      },
      link: {
        color: '#e74c3c',
        hoverColor: '#c0392b'
      }
    },
    wechat: {
      fontSize: 17,
      lineHeight: 1.6,
      maxWidth: '100%'
    },
    preview: {
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      borderColor: '#e1e4e8'
    }
  }
];

// 根据ID获取主题
export const getThemeById = (id: string): ThemeConfig | undefined => {
  return previewThemes.find(theme => theme.id === id);
};

// 获取默认主题
export const getDefaultTheme = (): ThemeConfig => {
  return previewThemes.find(theme => theme.isDefault) || previewThemes[0];
};

// 根据分类获取主题
export const getThemesByCategory = (category: string): ThemeConfig[] => {
  return previewThemes.filter(theme => theme.category === category);
};
