// 更新 Markdown 内容
const updateMarkdownContent = useCallback((newContent: string) => {
  setMarkdownContent(newContent);
  
  // 将Markdown内容转换为HTML并同步到编辑器存储
  const htmlContent = markdownService.markdownToHtml(newContent);
  setContent(htmlContent);
}, [setContent]);
