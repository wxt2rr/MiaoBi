import MarkdownIt from 'markdown-it';

export interface MarkdownImportOptions {
  preserveImages?: boolean;
  preserveLinks?: boolean;
}

export interface MarkdownExportOptions {
  includeImages?: boolean;
  includeStyles?: boolean;
}

export class MarkdownService {
  private md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt({
      html: true, // 允许 HTML 标签
      breaks: true, // 将换行符转换为 <br>
      linkify: true, // 自动转换 URL 为链接
      typographer: true, // 启用智能引号和其他替换
    });
  }

  /**
   * 将 Markdown 文本转换为 HTML
   */
  markdownToHtml(markdown: string, options: MarkdownImportOptions = {}): string {
    try {
      // 预处理 Markdown，确保语法正确
      const processedMarkdown = this.preprocessMarkdown(markdown);
      
      let html = this.md.render(processedMarkdown);
      
      // 处理图片
      if (options.preserveImages !== false) {
        html = this.processImages(html);
      }
      
      // 处理链接
      if (options.preserveLinks !== false) {
        html = this.processLinks(html);
      }
      
      return html;
    } catch (error) {
      console.error('Markdown 转换失败:', error);
      throw new Error('Markdown 转换失败');
    }
  }

  /**
   * 预处理 Markdown 文本，确保语法正确
   */
  private preprocessMarkdown(markdown: string): string {
    let processed = markdown;
    
    // 确保引用块格式正确
    processed = processed.replace(/^(\s*)>\s*(\*|\-|\+)\s+/gm, '$1> $2 ');
    
    // 确保列表在引用块内正确缩进
    processed = processed.replace(/^(\s*>\s*)(\*|\-|\+)\s+/gm, '$1$2 ');
    
    // 确保代码块格式正确
    processed = processed.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\``;
    });
    
    // 确保表格前后有空行
    processed = processed.replace(/(\n|^)(\|.*\|)\n(\|.*\|)\n(\|.*\|)/g, '$1\n$2\n$3\n$4\n');
    
    return processed;
  }

  /**
   * 将 HTML 转换为 Markdown 文本
   */
  htmlToMarkdown(html: string, options: MarkdownExportOptions = {}): string {
    try {
      // 创建一个临时 DOM 元素来解析 HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      let markdown = this.convertElementToMarkdown(tempDiv, options);
      
      // 清理多余的换行
      markdown = markdown.replace(/\n{3,}/g, '\n\n');
      markdown = markdown.trim();
      
      return markdown;
    } catch (error) {
      console.error('HTML 转换失败:', error);
      throw new Error('HTML 转换失败');
    }
  }

  /**
   * 处理图片标签
   */
  private processImages(html: string): string {
    // 确保图片标签有正确的属性
    return html.replace(/<img([^>]*)>/gi, (match, attributes) => {
      // 检查是否已经有 alt 属性
      if (!attributes.includes('alt=')) {
        attributes += ' alt=""';
      }
      return `<img${attributes}>`;
    });
  }

  /**
   * 处理链接标签
   */
  private processLinks(html: string): string {
    // 确保链接有正确的属性
    return html.replace(/<a([^>]*)>/gi, (match, attributes) => {
      // 添加 target="_blank" 和 rel="noopener noreferrer"
      if (!attributes.includes('target=')) {
        attributes += ' target="_blank"';
      }
      if (!attributes.includes('rel=')) {
        attributes += ' rel="noopener noreferrer"';
      }
      return `<a${attributes}>`;
    });
  }

  /**
   * 将 DOM 元素转换为 Markdown
   */
  private convertElementToMarkdown(element: HTMLElement, options: MarkdownExportOptions): string {
    let markdown = '';
    
    for (const node of Array.from(element.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE) {
        markdown += node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        markdown += this.convertHtmlElementToMarkdown(el, options);
      }
    }
    
    return markdown;
  }

  /**
   * 将 HTML 元素转换为 Markdown
   */
  private convertHtmlElementToMarkdown(element: HTMLElement, options: MarkdownExportOptions): string {
    const tagName = element.tagName.toLowerCase();
    const content = this.convertElementToMarkdown(element, options);
    
    switch (tagName) {
      case 'h1':
        return `# ${content}\n\n`;
      case 'h2':
        return `## ${content}\n\n`;
      case 'h3':
        return `### ${content}\n\n`;
      case 'h4':
        return `#### ${content}\n\n`;
      case 'h5':
        return `##### ${content}\n\n`;
      case 'h6':
        return `###### ${content}\n\n`;
      case 'p':
        return `${content}\n\n`;
      case 'br':
        return '\n';
      case 'strong':
      case 'b':
        return `**${content}**`;
      case 'em':
      case 'i':
        return `*${content}*`;
      case 'u':
        return `<u>${content}</u>`;
      case 's':
      case 'strike':
        return `~~${content}~~`;
      case 'code':
        return `\`${content}\``;
      case 'pre':
        if (element.querySelector('code')) {
          const code = element.querySelector('code')?.textContent || '';
          return `\`\`\`\n${code}\n\`\`\`\n\n`;
        }
        return `\`\`\`\n${content}\n\`\`\`\n\n`;
      case 'blockquote':
        return content.split('\n').map(line => `> ${line}`).join('\n') + '\n\n';
      case 'ul':
        return content + '\n';
      case 'ol':
        return content + '\n';
      case 'li':
        const parent = element.parentElement;
        if (parent?.tagName.toLowerCase() === 'ul') {
          return `- ${content}\n`;
        } else if (parent?.tagName.toLowerCase() === 'ol') {
          const index = Array.from(parent.children).indexOf(element) + 1;
          return `${index}. ${content}\n`;
        }
        return `- ${content}\n`;
      case 'a':
        const href = element.getAttribute('href');
        return href ? `[${content}](${href})` : content;
      case 'img':
        const src = element.getAttribute('src');
        const alt = element.getAttribute('alt') || '';
        const title = element.getAttribute('title');
        if (options.includeImages && src) {
          return title ? `![${alt}](${src} "${title}")` : `![${alt}](${src})`;
        }
        return '';
      case 'hr':
        return '---\n\n';
      case 'table':
        return this.convertTableToMarkdown(element);
      case 'tr':
        return this.convertTableRowToMarkdown(element);
      case 'td':
      case 'th':
        return this.convertTableCellToMarkdown(element);
      case 'div':
        return content + '\n';
      default:
        return content;
    }
  }

  /**
   * 转换表格为 Markdown
   */
  private convertTableToMarkdown(table: HTMLElement): string {
    const rows = Array.from(table.querySelectorAll('tr'));
    if (rows.length === 0) return '';

    let markdown = '';
    
    // 处理表头
    const headerRow = rows[0];
    const headerCells = Array.from(headerRow.querySelectorAll('th, td'));
    const headerText = headerCells.map(cell => this.convertTableCellToMarkdown(cell as HTMLElement)).join(' | ');
    markdown += `| ${headerText} |\n`;
    
    // 添加分隔符
    const separator = headerCells.map(() => '---').join(' | ');
    markdown += `| ${separator} |\n`;
    
    // 处理数据行
    for (let i = 1; i < rows.length; i++) {
      const cells = Array.from(rows[i].querySelectorAll('td, th'));
      const cellText = cells.map(cell => this.convertTableCellToMarkdown(cell as HTMLElement)).join(' | ');
      markdown += `| ${cellText} |\n`;
    }
    
    return markdown + '\n';
  }

  /**
   * 转换表格行为 Markdown
   */
  private convertTableRowToMarkdown(row: HTMLElement): string {
    const cells = Array.from(row.querySelectorAll('td, th'));
    const cellText = cells.map(cell => this.convertTableCellToMarkdown(cell as HTMLElement)).join(' | ');
    return `| ${cellText} |\n`;
  }

  /**
   * 转换表格单元格为 Markdown
   */
  private convertTableCellToMarkdown(cell: HTMLElement): string {
    return this.convertElementToMarkdown(cell, { includeImages: true }).trim();
  }

  /**
   * 验证 Markdown 文件
   */
  validateMarkdownFile(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      if (!file.name.toLowerCase().endsWith('.md')) {
        resolve(false);
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB 限制
        resolve(false);
        return;
      }
      
      resolve(true);
    });
  }

  /**
   * 读取 Markdown 文件内容
   */
  readMarkdownFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      
      reader.onerror = () => {
        reject(new Error('文件读取失败'));
      };
      
      reader.readAsText(file, 'UTF-8');
    });
  }

  /**
   * 下载 Markdown 文件
   */
  downloadMarkdownFile(content: string, filename: string = 'document.md'): void {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}

// 导出单例实例
export const markdownService = new MarkdownService();
