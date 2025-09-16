export class ExportService {
  /**
   * 生成微信公众号格式的HTML
   */
  static generateWechatHTML(): string {
    // 获取预览区域的HTML内容
    const previewElement = document.querySelector('.markdown-preview');
    if (!previewElement) {
      console.warn('预览区域未找到');
      return '';
    }

    // 获取渲染后的HTML内容
    const htmlContent = previewElement.innerHTML;
    
    // 微信公众号样式优化
    const wechatStyles = `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        h1, h2, h3, h4, h5, h6 { color: #2c3e50; margin: 1.5em 0 0.5em; }
        p { line-height: 1.8; margin: 1em 0; }
        blockquote { 
          border-left: 4px solid #42b883; 
          padding-left: 1em; 
          margin: 1em 0; 
          background: #f8f9fa; 
        }
        code { 
          background: #f1f3f4; 
          padding: 0.2em 0.4em; 
          border-radius: 3px; 
          font-family: "SF Mono", Monaco, monospace; 
        }
        pre { 
          background: #f8f9fa; 
          padding: 1em; 
          border-radius: 6px; 
          overflow-x: auto; 
        }
      </style>
    `;
    
    return wechatStyles + htmlContent;
  }

  /**
   * 生成知乎格式的HTML
   */
  static generateZhihuHTML(): string {
    const previewElement = document.querySelector('.markdown-preview');
    if (!previewElement) {
      console.warn('预览区域未找到');
      return '';
    }

    const htmlContent = previewElement.innerHTML;
    
    // 知乎样式优化
    const zhihuStyles = `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif; }
        h1, h2, h3, h4, h5, h6 { color: #1a1a1a; font-weight: 600; }
        p { line-height: 1.7; color: #444; }
        blockquote { 
          border-left: 3px solid #0084ff; 
          padding-left: 1em; 
          color: #666; 
          font-style: italic; 
        }
        code { 
          background: #f6f6f6; 
          color: #c7254e; 
          padding: 0.2em 0.4em; 
          border-radius: 3px; 
        }
        pre { 
          background: #f5f5f5; 
          padding: 1em; 
          border-radius: 4px; 
          border: 1px solid #e1e4e8; 
        }
      </style>
    `;
    
    return zhihuStyles + htmlContent;
  }

  /**
   * 生成掘金格式的HTML
   */
  static generateJuejinHTML(): string {
    const previewElement = document.querySelector('.markdown-preview');
    if (!previewElement) {
      console.warn('预览区域未找到');
      return '';
    }

    const htmlContent = previewElement.innerHTML;
    
    // 掘金样式优化
    const juejinStyles = `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        h1, h2, h3, h4, h5, h6 { color: #252933; font-weight: 700; }
        p { line-height: 1.74; color: #515767; }
        blockquote { 
          border-left: 4px solid #007fff; 
          padding-left: 1em; 
          background: #f4f5f5; 
          margin: 1em 0; 
        }
        code { 
          background: #f2f4f5; 
          color: #476582; 
          padding: 0.2em 0.4em; 
          border-radius: 2px; 
        }
        pre { 
          background: #f6f8fa; 
          padding: 1em; 
          border-radius: 6px; 
          border: 1px solid #e1e8ed; 
        }
      </style>
    `;
    
    return juejinStyles + htmlContent;
  }

  /**
   * 生成小红书格式的纯文本（去除HTML标签）
   */
  static generateXiaohongshuText(): string {
    const previewElement = document.querySelector('.markdown-preview');
    if (!previewElement) {
      console.warn('预览区域未找到');
      return '';
    }

    // 获取纯文本内容，去除HTML标签
    const textContent = (previewElement as HTMLElement).innerText || previewElement.textContent || '';
    
    // 小红书格式优化：添加表情符号和换行
    return textContent
      .replace(/^#\s+(.+)$/gm, '✨ $1 ✨')  // 一级标题
      .replace(/^##\s+(.+)$/gm, '🌟 $1')    // 二级标题
      .replace(/^###\s+(.+)$/gm, '💫 $1')   // 三级标题
      .replace(/\n\n/g, '\n\n📝 ')          // 段落分隔
      .trim();
  }
}