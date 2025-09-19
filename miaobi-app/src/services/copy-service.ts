import juice from 'juice';

/**
 * 复制服务 - 参考 Markdown2Html-main 项目的实现
 */
export class CopyService {
  /**
   * 解决HTML样式内联问题，参考原项目的 solveHtml 函数
   */
  static solveHtml(): string {
    const element = document.getElementById('nice');
    if (!element) {
      throw new Error('预览容器未找到，请确保预览区域已加载');
    }

    // 添加data-tool属性（参考原项目）
    const inner = element.children;
    for (let i = 0; i < inner.length; i++) {
      const item = inner[i] as HTMLElement;
      item.setAttribute("data-tool", "mdnice编辑器");
    }

    // 获取HTML内容
    let html = element.innerHTML;
    
    // 处理数学公式相关的替换（参考原项目）
    html = html.replace(/<mjx-container (class="inline.+?)<\/mjx-container>/g, "<span $1</span>");
    html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline');
    html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
    html = html.replace(/mjx-container/g, "section");
    html = html.replace(/class="mjx-solid"/g, 'fill="none" stroke-width="70"');
    html = html.replace(/<mjx-assistive-mml.+?<\/mjx-assistive-mml>/g, "");

    // 获取所有样式
    const styles = this.getAllStyles();
    
    let res = "";
    try {
      // 使用 juice 将CSS样式内联到HTML中
      res = juice.inlineContent(html, styles, {
        inlinePseudoElements: true,
        preserveImportant: true,
      });
    } catch (e) {
      console.error("CSS 样式处理失败:", e);
      // 如果 juice 处理失败，返回原始HTML
      res = html;
    }

    return res;
  }

  /**
   * 获取所有相关的CSS样式（参考原项目的实现）
   */
  private static getAllStyles(): string {
    let styles = '';
    
    // 按照原项目的顺序获取样式：基础样式 + 主题样式 + 代码样式 + 字体样式
    const basicStyle = document.getElementById('dynamic-basic-style');
    const themeStyle = document.getElementById('dynamic-theme-style');
    const codeStyle = document.getElementById('dynamic-code-style');
    const fontStyle = document.getElementById('dynamic-font-style');
    
    if (basicStyle && basicStyle.textContent) {
      styles += basicStyle.textContent + '\n';
    }
    
    if (themeStyle && themeStyle.textContent) {
      styles += themeStyle.textContent + '\n';
    }
    
    if (codeStyle && codeStyle.textContent) {
      styles += codeStyle.textContent + '\n';
    }
    
    if (fontStyle && fontStyle.textContent) {
      styles += fontStyle.textContent + '\n';
    }
    
    // 如果没有找到动态样式，回退到获取所有style标签
    if (!styles.trim()) {
      const styleElements = document.querySelectorAll('style');
      styleElements.forEach(styleEl => {
        if (styleEl.textContent) {
          styles += styleEl.textContent + '\n';
        }
      });
    }

    return styles;
  }

  /**
   * 复制HTML到剪贴板（参考原项目的 copySafari 函数）
   */
  static async copyHtmlToClipboard(html: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // 获取或创建隐藏的 input 元素
        let input = document.getElementById("copy-input") as HTMLInputElement;
        if (!input) {
          // input 不能用 CSS 隐藏，必须在页面内存在
          input = document.createElement("input");
          input.id = "copy-input";
          input.style.position = "absolute";
          input.style.left = "-1000px";
          input.style.zIndex = "-1000";
          document.body.appendChild(input);
        }
        
        // 让 input 选中一个字符，无所谓那个字符
        input.value = "NOTHING";
        input.setSelectionRange(0, 1);
        input.focus();

        // 复制触发
        const copyHandler = (e: ClipboardEvent) => {
          e.preventDefault();
          if (e.clipboardData) {
            e.clipboardData.setData("text/html", html);
            e.clipboardData.setData("text/plain", html);
          }
          document.removeEventListener("copy", copyHandler);
          resolve();
        };
        
        document.addEventListener("copy", copyHandler);
        
        // 执行复制命令
        const success = document.execCommand("copy");
        if (!success) {
          document.removeEventListener("copy", copyHandler);
          reject(new Error('execCommand copy failed'));
        }
        
      } catch (error) {
        console.error('复制失败:', error);
        reject(error);
      }
    });
  }

  /**
   * 完整的微信复制流程
   */
  static async copyForWechat(): Promise<void> {
    try {
      // 1. 解决HTML样式内联问题
      const processedHtml = this.solveHtml();
      
      // 2. 复制到剪贴板
      await this.copyHtmlToClipboard(processedHtml);
      
      console.log('复制成功，HTML长度:', processedHtml.length);
    } catch (error) {
      console.error('微信复制失败:', error);
      throw error;
    }
  }
}