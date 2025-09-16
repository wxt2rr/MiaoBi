/**
 * 复制文本到剪贴板
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // 现代浏览器 API
    await navigator.clipboard.writeText(text);
  } else {
    // 兼容旧浏览器的方法
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('复制失败:', err);
      throw new Error('复制失败');
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

/**
 * 复制 HTML 内容到剪贴板（支持富文本）
 * 使用原项目 Markdown2Html-main 的 copySafari 方法
 */
export const copyHtmlToClipboard = async (html: string, plainText?: string): Promise<void> => {
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
          e.clipboardData.setData("text/plain", plainText || stripHtml(html));
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
};

/**
 * 从 HTML 中提取纯文本
 */
const stripHtml = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

/**
 * 下载文件
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain'): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * 生成带时间戳的文件名
 */
export const generateFilename = (baseName: string, extension: string): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${baseName}-${timestamp}.${extension}`;
};