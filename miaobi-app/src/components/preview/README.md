# 预览功能优化文档

## 📋 功能概述

本次优化对妙笔项目的预览功能进行了全面升级，实现了以下核心功能：

### ✨ 主要特性

1. **主题系统集成**
   - 支持多种预设主题（默认、GitHub、极简、创意）
   - 实时主题切换和预览
   - 主题配置持久化存储

2. **多模式预览**
   - 移动端预览模式（375x667 手机尺寸）
   - 桌面端预览模式（全宽显示）
   - 原始HTML预览模式

3. **交互功能增强**
   - 缩放控制（25%-300%）
   - 全屏预览
   - 工具栏显示/隐藏
   - 实时状态指示器

4. **性能优化**
   - 防抖和节流机制
   - 内容缓存
   - 智能更新策略

5. **快捷键支持**
   - Ctrl/Cmd + 0: 重置缩放
   - Ctrl/Cmd + +/-: 缩放控制
   - F11: 切换全屏
   - Ctrl/Cmd + Shift + M/D/R: 切换预览模式
   - 数字键1-9: 快速缩放

## 🏗️ 架构设计

### 组件结构

```
PreviewSystem/
├── stores/
│   └── preview-store.ts          # 预览状态管理
├── hooks/
│   ├── usePreviewOptimization.ts # 性能优化Hook
│   └── usePreviewShortcuts.ts    # 快捷键Hook
├── services/
│   └── theme-preview-service.ts  # 主题预览服务
├── themes/
│   └── preview-themes.ts         # 主题预设库
└── components/
    ├── EnhancedPreviewWrapper.tsx    # 增强预览包装器
    ├── PreviewContent.tsx            # 预览内容组件
    ├── PreviewToolbar.tsx            # 预览工具栏
    ├── ResponsivePreviewContainer.tsx # 响应式容器
    ├── ThemeSelector.tsx             # 主题选择器
    ├── PreviewStatusIndicator.tsx    # 状态指示器
    └── PreviewTestPanel.tsx          # 测试面板
```

### 状态管理

使用 Zustand 进行状态管理，支持持久化存储：

```typescript
interface PreviewState {
  mode: 'mobile' | 'desktop' | 'raw';
  zoom: number;
  isFullscreen: boolean;
  showToolbar: boolean;
  currentTheme: string;
  isLoading: boolean;
  // ... 更多状态
}
```

## 🎨 主题系统

### 主题配置结构

```typescript
interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  category: 'business' | 'personal' | 'creative' | 'minimal';
  
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
  };
  
  fonts: {
    heading: { family: string; weight: number; size: {...} };
    body: { family: string; weight: number; size: string; lineHeight: number };
    code: { family: string; size: string };
  };
  
  spacing: {
    paragraph: number;
    heading: number;
    section: number;
    element: number;
  };
  
  components: {
    blockquote: { borderColor: string; backgroundColor: string; padding: string };
    code: { backgroundColor: string; borderColor: string; borderRadius: string };
    link: { color: string; hoverColor: string };
  };
  
  wechat: {
    fontSize: number;
    lineHeight: number;
    maxWidth: string;
  };
  
  preview: {
    backgroundColor: string;
    borderRadius: string;
    padding: string;
    boxShadow: string;
  };
}
```

### 预设主题

1. **默认主题** - 简洁优雅的默认样式
2. **GitHub风格** - 经典的GitHub Markdown样式
3. **极简风格** - 简洁优雅的极简设计
4. **创意风格** - 富有创意的设计风格

## 🚀 性能优化

### 优化策略

1. **防抖机制**
   - 内容变化使用300ms防抖
   - 避免频繁的iframe更新

2. **节流机制**
   - 主题和模式切换使用100ms节流
   - 减少不必要的重渲染

3. **缓存机制**
   - 缓存生成的HTML内容
   - 避免重复计算

4. **智能更新**
   - 根据变化类型选择更新策略
   - 内容变化使用防抖，配置变化使用节流

### 性能指标

- 预览切换响应时间 < 300ms
- 主题切换响应时间 < 100ms
- 缩放操作响应时间 < 50ms

## 🎯 使用方法

### 基本使用

```tsx
import EnhancedPreviewWrapper from '@/components/preview/EnhancedPreviewWrapper';

function MyComponent() {
  return (
    <EnhancedPreviewWrapper>
      {/* 预览内容 */}
    </EnhancedPreviewWrapper>
  );
}
```

### 主题切换

```tsx
import { usePreviewStore } from '@/stores/preview-store';

function ThemeSwitcher() {
  const { setTheme } = usePreviewStore();
  
  return (
    <button onClick={() => setTheme('github')}>
      切换到GitHub主题
    </button>
  );
}
```

### 模式切换

```tsx
import { usePreviewStore } from '@/stores/preview-store';

function ModeSwitcher() {
  const { setMode } = usePreviewStore();
  
  return (
    <div>
      <button onClick={() => setMode('mobile')}>移动端</button>
      <button onClick={() => setMode('desktop')}>桌面端</button>
      <button onClick={() => setMode('raw')}>原始HTML</button>
    </div>
  );
}
```

## 🧪 测试

### 自动化测试

使用 `PreviewTestPanel` 组件进行功能测试：

```tsx
import PreviewTestPanel from '@/components/preview/PreviewTestPanel';

function TestPage() {
  return <PreviewTestPanel />;
}
```

### 测试项目

1. **主题切换测试** - 验证所有主题能正常切换
2. **模式切换测试** - 验证移动端/桌面端/原始HTML模式
3. **缩放控制测试** - 验证缩放功能正常工作
4. **全屏功能测试** - 验证全屏切换功能
5. **性能测试** - 验证预览更新性能

## 🔧 配置选项

### 环境变量

```env
# 预览功能配置
NEXT_PUBLIC_PREVIEW_DEBOUNCE_DELAY=300
NEXT_PUBLIC_PREVIEW_THROTTLE_DELAY=100
NEXT_PUBLIC_PREVIEW_CACHE_SIZE=10
```

### 主题配置

可以通过修改 `preview-themes.ts` 文件来添加或修改主题：

```typescript
export const previewThemes: ThemeConfig[] = [
  {
    id: 'custom-theme',
    name: '自定义主题',
    // ... 主题配置
  },
  // ... 更多主题
];
```

## 🐛 故障排除

### 常见问题

1. **预览不更新**
   - 检查内容是否正确设置
   - 确认主题配置是否存在
   - 查看控制台错误信息

2. **主题切换失败**
   - 确认主题ID是否正确
   - 检查主题配置是否完整
   - 验证主题文件是否正确导入

3. **性能问题**
   - 检查内容长度是否过长
   - 确认防抖/节流配置是否合理
   - 查看是否有内存泄漏

### 调试工具

1. **状态监控**
   ```tsx
   import { usePreviewStore } from '@/stores/preview-store';
   
   function DebugPanel() {
     const state = usePreviewStore();
     console.log('Preview State:', state);
     return <div>Debug info in console</div>;
   }
   ```

2. **性能监控**
   ```tsx
   import { usePreviewOptimization } from '@/hooks/usePreviewOptimization';
   
   function PerformanceMonitor() {
     const { previewHTML, shouldUpdate } = usePreviewOptimization();
     console.log('Performance:', { previewHTML: previewHTML.length, shouldUpdate });
     return null;
   }
   ```

## 📈 未来规划

### 计划功能

1. **主题编辑器** - 可视化主题编辑界面
2. **自定义主题** - 支持用户创建和保存自定义主题
3. **主题导入导出** - 支持主题文件的导入导出
4. **更多预览模式** - 支持平板、大屏等更多设备尺寸
5. **预览历史** - 支持预览历史记录和回放

### 性能优化

1. **虚拟滚动** - 对长内容实现虚拟滚动
2. **懒加载** - 实现图片和资源的懒加载
3. **Web Workers** - 使用Web Workers处理复杂计算
4. **缓存优化** - 实现更智能的缓存策略

## 📝 更新日志

### v1.0.0 (2024-01-XX)

- ✨ 实现主题系统集成
- ✨ 添加多模式预览支持
- ✨ 实现缩放和全屏功能
- ✨ 添加快捷键支持
- ✨ 实现性能优化
- ✨ 添加测试面板
- 🐛 修复各种已知问题
- 📚 完善文档和注释

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进预览功能！

### 开发环境设置

1. 克隆项目
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`
4. 访问测试页面：`http://localhost:3000`

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 添加适当的注释
- 编写单元测试

---

*最后更新：2024年1月*


