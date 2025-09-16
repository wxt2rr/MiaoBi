# Markdown 预览功能说明

## 功能概述

本项目成功将 Markdown2Html-main 项目的预览区所有功能迁移到了现代化的 Next.js 架构中。

## 核心功能

### 1. 双解析器系统
- **微信解析器** (`markdownParserWechat`)：专门为微信公众号优化
- **通用解析器** (`markdownParser`)：适用于其他平台

### 2. 多平台导出
- 🟢 **微信公众号**：特殊的代码高亮格式，适配微信编辑器
- 🔵 **知乎**：适配知乎编辑器的 HTML 格式
- 🟡 **掘金**：适配掘金平台的样式要求
- 📄 **Markdown**：导出原始 .md 文件
- 📋 **PDF**：通过浏览器打印功能生成 PDF
- 📷 **图片**：使用 html2canvas 生成高清截图

### 3. 预览模式
- 💻 **PC 预览**：桌面端宽屏显示
- 📱 **移动端预览**：手机端窄屏显示

### 4. 主题系统
- 🎨 **基础主题**：GitHub 风格的简洁主题
- 🟢 **微信主题**：专为微信公众号设计的丰富样式

## 技术架构

### 前端技术栈
- **Next.js 15**：React 框架
- **TypeScript**：类型安全
- **Tailwind CSS**：样式框架
- **Zustand**：状态管理

### 核心依赖
- **markdown-it**：Markdown 解析器
- **highlight.js**：代码语法高亮
- **html2canvas**：HTML 转图片
- **各种 markdown-it 插件**：扩展功能

### 组件结构
```
src/components/preview/
├── PreviewPanel.tsx          # 主预览面板
├── PreviewToolbar.tsx        # 工具栏
├── PreviewContent.tsx        # 内容显示区
├── ThemeSelector.tsx         # 主题选择器
└── actions/                  # 导出功能组件
    ├── WechatExport.tsx      # 微信导出
    ├── ZhihuExport.tsx       # 知乎导出
    ├── JuejinExport.tsx      # 掘金导出
    ├── MarkdownExport.tsx    # MD 导出
    ├── PdfExport.tsx         # PDF 导出
    ├── ImageExport.tsx       # 图片导出
    └── PreviewToggle.tsx     # 预览模式切换
```

## 使用方法

### 1. 基本使用
```tsx
import { PreviewPanel } from '@/components/preview/PreviewPanel';

function MyEditor() {
  const [content, setContent] = useState('# Hello World');
  
  return (
    <div className="flex">
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <PreviewPanel content={content} />
    </div>
  );
}
```

### 2. 状态管理
```tsx
import { usePreviewStore } from '@/stores/previewStore';

function MyComponent() {
  const { 
    previewMode, 
    setPreviewMode,
    currentTheme,
    setCurrentTheme 
  } = usePreviewStore();
  
  // 使用状态...
}
```

### 3. 主题管理
```tsx
import { applyTheme, loadSavedTheme } from '@/utils/themeManager';

// 应用主题
applyTheme('wechat');

// 加载保存的主题
loadSavedTheme();
```

## 演示页面

访问 `/preview-demo` 查看完整的功能演示：
- 左右分屏编辑器
- 实时预览更新
- 所有导出功能测试
- 主题切换演示

## 特色功能

### 微信公众号优化
- 特殊的代码块格式（带行号）
- 优化的样式适配微信编辑器
- 数学公式特殊处理

### 响应式设计
- PC/移动端预览模式
- 自适应布局
- 现代化 UI 设计

### 性能优化
- 客户端渲染检查
- 按需加载组件
- 优化的状态管理

## 与原项目对比

| 功能 | 原项目 (Markdown2Html-main) | 新项目 (miaobi-app) |
|------|------------------------------|----------------------|
| 框架 | React + MobX + Ant Design | Next.js + Zustand + Tailwind |
| 语言 | JavaScript | TypeScript |
| 样式 | CSS + Ant Design | Tailwind CSS |
| 状态管理 | MobX | Zustand |
| 构建工具 | Create React App | Next.js + Turbopack |
| 导出功能 | ✅ 完整支持 | ✅ 完整迁移 |
| 主题系统 | ✅ 多主题 | ✅ 现代化主题 |
| 预览模式 | ✅ PC/移动端 | ✅ 响应式设计 |

## 开发说明

### 启动开发服务器
```bash
cd miaobi-app
npm run dev
```

### 添加新主题
1. 在 `src/themes/markdown/` 创建新主题文件
2. 在 `src/utils/themeManager.ts` 中注册主题
3. 主题会自动出现在选择器中

### 添加新导出格式
1. 在 `src/components/preview/actions/` 创建新组件
2. 在 `PreviewToolbar.tsx` 中引入
3. 实现相应的格式转换逻辑

## 总结

这次迁移成功地将 Markdown2Html-main 的核心功能完整地移植到了现代化的 Next.js 架构中，不仅保持了原有的所有功能，还提升了：

- **开发体验**：TypeScript + 现代化工具链
- **用户体验**：更好的 UI 设计和交互
- **可维护性**：模块化组件结构
- **扩展性**：易于添加新功能和主题

所有功能都已经过测试，可以正常使用！