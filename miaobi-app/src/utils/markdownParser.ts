// 简单的 Markdown 解析器
export function parseMarkdown(markdown: string, sanitize: boolean = true): string {
  if (!markdown) return '';

  let html = markdown
    // 标题
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // 粗体
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    
    // 斜体
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    
    // 删除线
    .replace(/~~(.*)~~/gim, '<del>$1</del>')
    
    // 行内代码
    .replace(/`([^`]*)`/gim, '<code>$1</code>')
    
    // 链接
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
    
    // 代码块
    .replace(/```(\w*)\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
    
    // 引用
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    
    // 无序列表
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    
    // 有序列表
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    
    // 水平线
    .replace(/^---$/gim, '<hr>')
    
    // 段落
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br>');

  // 包装段落
  html = '<p>' + html + '</p>';
  
  // 清理空段落
  html = html.replace(/<p><\/p>/g, '');
  
  // 处理列表
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  
  // 处理引用
  html = html.replace(/(<blockquote>.*<\/blockquote>)/gs, '<div class="blockquote-wrapper">$1</div>');

  return html;
}