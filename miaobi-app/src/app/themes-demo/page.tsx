'use client';

import React, { useState } from 'react';
import { getAllThemes } from '@/utils/themeManager';
import { parseMarkdown } from '@/utils/markdownParser';

const sampleMarkdown = `# 主题演示

这是一个 **Markdown** 主题演示页面，展示了所有可用的主题效果。

## 二级标题

这里是一些普通的段落文本，用来展示主题的基本样式效果。

### 三级标题

> 这是一个引用块，用来展示引用的样式效果。
> 
> 引用可以包含多行内容。

#### 四级标题

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项
  - 另一个嵌套项
- 无序列表项 3

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

##### 五级标题

这里有一些 \`行内代码\` 和 [链接文本](https://example.com)。

\`\`\`javascript
// 代码块示例
function hello() {
  console.log("Hello, World!");
}
\`\`\`

| 表格标题1 | 表格标题2 | 表格标题3 |
|----------|----------|----------|
| 单元格1   | 单元格2   | 单元格3   |
| 数据1     | 数据2     | 数据3     |

---

*斜体文本* 和 **粗体文本** 以及 ***粗斜体文本***

~~删除线文本~~

这是一个数学公式：$E = mc^2$

脚注示例[^1]

[^1]: 这是脚注内容
`;

const ThemesDemo: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('basic');
  const themes = getAllThemes();
  const htmlContent = parseMarkdown(sampleMarkdown, false);

  const applyThemeStyles = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    return theme ? theme.css : '';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Markdown 主题演示</h1>
        
        {/* 主题选择器 */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">选择主题</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`
                  px-3 py-2 text-sm rounded-md border transition-all duration-200 text-center
                  ${selectedTheme === theme.id
                    ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }
                `}
                title={theme.name}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            当前主题：<span className="font-medium">{themes.find(t => t.id === selectedTheme)?.name}</span>
          </div>
        </div>

        {/* 预览区域 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium">预览效果</h3>
          </div>
          <div className="p-6">
            <style dangerouslySetInnerHTML={{ __html: applyThemeStyles(selectedTheme) }} />
            <div 
              id="nice"
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>

        {/* 主题信息 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">所有可用主题</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div 
                key={theme.id}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${selectedTheme === theme.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <h4 className="font-medium text-gray-900">{theme.name}</h4>
                <div className="text-xs text-gray-500 mt-2">ID: {theme.id}</div>
                <div className="text-xs text-gray-500">ThemeId: {theme.themeId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesDemo;