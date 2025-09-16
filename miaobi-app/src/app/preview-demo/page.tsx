'use client';

import React, { useState, useEffect } from 'react';
import { PreviewPanel } from '@/components/preview/PreviewPanel';
import { loadSavedTheme } from '@/utils/themeManager';

const sampleMarkdown = `# Markdown 预览功能演示

这是一个 **Markdown 预览功能** 的演示页面，展示了从 Markdown2Html-main 项目迁移过来的所有功能。

## 功能特性

### 1. 多平台导出
- 🟢 **微信公众号**：专门优化的代码高亮和样式
- 🔵 **知乎**：适配知乎编辑器的格式
- 🟡 **掘金**：适配掘金平台的样式
- 📄 **Markdown**：导出原始 MD 文件
- 📋 **PDF**：生成 PDF 文档
- 📷 **图片**：截图导出

### 2. 预览模式
- 💻 **PC 预览**：桌面端显示效果
- 📱 **移动端预览**：手机端显示效果

### 3. 主题系统
- 🎨 **基础主题**：GitHub 风格
- 🟢 **微信主题**：公众号专用样式

## 代码示例

\`\`\`javascript
// JavaScript 代码示例
function parseMarkdown(content, isWechatMode = false) {
  const parser = isWechatMode ? markdownParserWechat : markdownParser;
  return parser.render(content);
}

// 导出功能
const handleExport = async (format) => {
  try {
    const html = parseMarkdown(content, format === 'wechat');
    await copyToClipboard(html);
    console.log(\`导出成功: \${format}\`);
  } catch (error) {
    console.error('导出失败:', error);
  }
};
\`\`\`

\`\`\`python
# Python 代码示例
def markdown_to_html(content: str, theme: str = 'basic') -> str:
    """将 Markdown 转换为 HTML"""
    parser = get_parser(theme)
    return parser.render(content)

class MarkdownExporter:
    def __init__(self, theme='basic'):
        self.theme = theme
        self.parser = get_parser(theme)
    
    def export_wechat(self, content: str) -> str:
        """导出微信格式"""
        return self.parser.render(content)
\`\`\`

## 表格示例

| 功能 | 状态 | 描述 |
|------|------|------|
| 微信导出 | ✅ | 支持微信公众号格式 |
| 知乎导出 | ✅ | 支持知乎编辑器 |
| 掘金导出 | ✅ | 支持掘金平台 |
| PDF 导出 | ✅ | 生成 PDF 文档 |
| 图片导出 | ✅ | 截图功能 |
| 主题切换 | ✅ | 多种主题选择 |

## 引用示例

> 这是一个引用示例。引用可以用来突出重要的信息或者引用他人的观点。
> 
> 在微信主题中，引用会有特殊的样式设计，包括左侧的红色边框和背景色。

## 列表示例

### 无序列表
- 第一项内容
- 第二项内容
  - 嵌套项目 1
  - 嵌套项目 2
- 第三项内容

### 有序列表
1. 首先安装依赖
2. 然后配置解析器
3. 最后实现导出功能
   1. 微信导出
   2. 知乎导出
   3. 其他平台导出

## 数学公式

行内公式：$E = mc^2$

块级公式：
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## 图片示例

![示例图片](https://via.placeholder.com/600x300/3498db/ffffff?text=Markdown+Preview)

## 水平分割线

---

## 总结

这个预览系统成功地将 Markdown2Html-main 项目的核心功能迁移到了现代化的 Next.js 架构中，提供了：

1. **完整的导出功能**
2. **灵活的主题系统** 
3. **响应式预览模式**
4. **现代化的用户界面**

*感谢使用我们的 Markdown 预览系统！*
`;

export default function PreviewDemoPage() {
  const [content, setContent] = useState(sampleMarkdown);

  useEffect(() => {
    // 加载保存的主题
    loadSavedTheme();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Markdown 预览功能演示</h1>
            <p className="text-gray-600 mt-1">测试从 Markdown2Html-main 迁移的所有功能</p>
          </div>
          
          <div className="flex h-[800px]">
            {/* 左侧编辑区 */}
            <div className="w-1/2 border-r border-gray-200">
              <div className="h-full flex flex-col">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">Markdown 编辑器</h3>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 p-4 font-mono text-sm resize-none border-none outline-none"
                  placeholder="在这里输入 Markdown 内容..."
                />
              </div>
            </div>
            
            {/* 右侧预览区 */}
            <div className="w-1/2">
              <PreviewPanel content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}