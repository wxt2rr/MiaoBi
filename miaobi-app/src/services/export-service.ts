import DOMPurify from 'dompurify';

interface ExportOptions {
  removeComments?: boolean;
  inlineStyles?: boolean;
  removeScripts?: boolean;
}

export class ExportService {
  // 微信支持的HTML标签白名单
  private static readonly ALLOWED_TAGS = [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'img', 'a',
    'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'section', 'article'
  ];

  // 微信支持的CSS属性白名单
  private static readonly ALLOWED_ATTRIBUTES = [
    'style', 'class', 'id', 'href', 'src', 'alt', 'title',
    'width', 'height', 'align', 'valign',
    'colspan', 'rowspan', 'target'
  ];

  // 微信支持的CSS属性
  private static readonly ALLOWED_CSS_PROPERTIES = [
    'color', 'background-color', 'background',
    'font-size', 'font-weight', 'font-style', 'font-family',
    'text-align', 'text-decoration', 'text-indent',
    'line-height', 'letter-spacing', 'word-spacing',
    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
    'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
    'border', 'border-top', 'border-bottom', 'border-left', 'border-right',
    'border-color', 'border-width', 'border-style', 'border-radius',
    'width', 'height', 'max-width', 'max-height',
    'display', 'float', 'clear',
    'opacity', 'box-shadow'
  ];

  /**
   * 净化HTML内容，移除不兼容的标签和属性
   */
  static sanitizeHTML(html: string, options: ExportOptions = {}): string {
    const {
      removeComments = true,
      inlineStyles = true,
      removeScripts = true
    } = options;

    // 配置DOMPurify
    const config = {
      ALLOWED_TAGS: this.ALLOWED_TAGS,
      ALLOWED_ATTR: this.ALLOWED_ATTRIBUTES,
      REMOVE_COMMENTS: removeComments,
      REMOVE_SCRIPT: removeScripts,
      ALLOW_UNKNOWN_PROTOCOLS: false,
      SANITIZE_DOM: true,
      WHOLE_DOCUMENT: false,
    };

    // 净化HTML
    let cleanHTML = DOMPurify.sanitize(html, config);

    // 如果需要内联样式，处理CSS
    if (inlineStyles) {
      cleanHTML = this.inlineStyles(cleanHTML);
    }

    // 进一步清理微信不支持的CSS属性
    cleanHTML = this.cleanCSS(cleanHTML);

    return cleanHTML;
  }

  /**
   * 将CSS样式内联化
   */
  private static inlineStyles(html: string): string {
    // 这里可以实现更复杂的CSS内联逻辑
    // 现在简单返回原HTML，因为TipTap已经生成内联样式
    return html;
  }

  /**
   * 清理不支持的CSS属性
   */
  private static cleanCSS(html: string): string {
    // 使用正则表达式清理style属性中不支持的CSS属性
    return html.replace(/style="([^"]*)"/g, (match, styleContent) => {
      const cleanedStyle = styleContent
        .split(';')
        .filter((declaration: string) => {
          const property = declaration.split(':')[0]?.trim().toLowerCase();
          return property && this.ALLOWED_CSS_PROPERTIES.includes(property);
        })
        .join(';');
      
      return cleanedStyle ? `style="${cleanedStyle}"` : '';
    });
  }

  /**
   * 为微信复制生成最终HTML
   */
  static generateWechatHTML(content: string): string {
    // 净化HTML
    const sanitized = this.sanitizeHTML(content);

    // 包装在微信友好的容器中
    const wechatHTML = `
<section style="font-size: 16px; color: #333; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif;">
${sanitized}
</section>`.trim();

    return wechatHTML;
  }

  /**
   * 复制到剪贴板
   */
  static async copyToClipboard(html: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(html);
        return true;
      } else {
        // 降级方案：使用传统的复制方法
        const textArea = document.createElement('textarea');
        textArea.value = html;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        return successful;
      }
    } catch (error) {
      console.error('复制到剪贴板失败:', error);
      return false;
    }
  }

  /**
   * 生成预览HTML（用于iframe显示）
   */
  static generatePreviewHTML(content: string): string {
    const sanitized = this.sanitizeHTML(content, { inlineStyles: true });
    
    console.log('预览内容 - 原始:', content);
    console.log('预览内容 - 净化后:', sanitized);
    
    const result = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      max-width: 100%;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
      word-wrap: break-word;
    }
    
    .article-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      max-width: 100%;
      overflow-wrap: break-word;
    }
    
    /* 微信样式优化 */
    h1, h2, h3, h4, h5, h6 {
      color: #2c3e50;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: bold;
      line-height: 1.4;
    }
    
    h1 { font-size: 1.5em; }
    h2 { font-size: 1.3em; }
    h3 { font-size: 1.2em; }
    
    p {
      margin: 1em 0;
      text-align: justify;
      word-break: break-word;
    }
    
    strong, b {
      font-weight: bold;
      color: #2c3e50;
    }
    
    em, i {
      font-style: italic;
    }
    
    blockquote {
      border-left: 4px solid #3498db;
      padding-left: 16px;
      margin: 1.5em 0;
      background-color: #f8f9fa;
      padding: 12px 16px;
      border-radius: 4px;
    }
    
    ul, ol {
      padding-left: 1.5em;
      margin: 1em 0;
    }
    
    li {
      margin: 0.5em 0;
    }
    
    code {
      background-color: #f1f2f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.9em;
    }
    
    pre {
      background-color: #f8f9fa;
      border: 1px solid #e1e8ed;
      border-radius: 6px;
      padding: 16px;
      overflow-x: auto;
      margin: 1.5em 0;
    }
    
    pre code {
      background: none;
      padding: 0;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 1em 0;
      display: block;
    }
    
    a {
      color: #3498db;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="article-content">
    ${sanitized || '<p style="color: #999; text-align: center;">开始写作，这里将实时显示微信效果预览...</p>'}
  </div>
</body>
</html>`.trim();

    console.log('最终预览HTML长度:', result.length);
    return result;
  }
} 