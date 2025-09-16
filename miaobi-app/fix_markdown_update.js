const fs = require('fs');

// 读取文件内容
const filePath = 'src/components/editor/TipTapEditor.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 替换updateMarkdownContent函数
const oldFunction = `  // 更新 Markdown 内容
  const updateMarkdownContent = useCallback((newContent: string) => {
    setMarkdownContent(newContent);
  }, []);`;

const newFunction = `  // 更新 Markdown 内容
  const updateMarkdownContent = useCallback((newContent: string) => {
    setMarkdownContent(newContent);
    
    // 将Markdown内容转换为HTML并同步到编辑器存储
    const htmlContent = markdownService.markdownToHtml(newContent);
    setContent(htmlContent);
  }, [setContent]);`;

// 执行替换
content = content.replace(oldFunction, newFunction);

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('修改完成');
