/**
 * 转换工具函数 - 从 Markdown2Html-main 项目复制并适配
 */

// 处理微信数学公式
export const solveWeChatMath = (): void => {
  const layout = document.getElementById("nice");
  if (!layout) return;
  
  const mjxs = layout.getElementsByTagName("mjx-container");
  for (let i = 0; i < mjxs.length; i++) {
    const mjx = mjxs[i];
    if (!mjx.hasAttribute("jax")) {
      break;
    }

    mjx.removeAttribute("jax");
    mjx.removeAttribute("display");
    mjx.removeAttribute("tabindex");
    mjx.removeAttribute("ctxtmenu_counter");
    
    const svg = mjx.firstChild as SVGElement;
    if (svg) {
      const width = svg.getAttribute("width");
      const height = svg.getAttribute("height");
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      if (width) svg.style.width = width;
      if (height) svg.style.height = height;
    }
  }
};

// 处理知乎数学公式
export const solveZhihuMath = (): void => {
  const layout = document.getElementById("nice");
  if (!layout) return;
  
  const mjxs = layout.getElementsByTagName("mjx-container");
  while (mjxs.length > 0) {
    const mjx = mjxs[0];
    let data = mjx.getAttribute("data-mjx-formula");
    if (!data) {
      mjx.remove();
      continue;
    }

    if (mjx.hasAttribute("display") && data.indexOf("\\tag") === -1) {
      data += "\\\\";
    }

    mjx.outerHTML = `<img class="Formula-image" data-eeimg="true" src="" alt="${data}">`;
  }
};

// 处理掘金数学公式
export const solveJuejinMath = (): void => {
  const layout = document.getElementById("nice");
  if (!layout) return;
  
  const mjxs = layout.getElementsByTagName("mjx-container");
  while (mjxs.length > 0) {
    const mjx = mjxs[0];
    const data = mjx.getAttribute("data-mjx-formula");
    if (!data) {
      mjx.remove();
      continue;
    }

    // 行间公式
    if (mjx.hasAttribute("display")) {
      mjx.outerHTML = `<figure><img class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></figure>`;
    }
    // 行内公式
    else {
      mjx.outerHTML = `<span><img style="display:inline;" class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></span>`;
    }
  }
};

// 掘金单独处理代码块
export const solveJuejinCode = (html: string): string => {
  // 掘金代码不换行问题
  const brReg = /<pre([^>])*class="custom"([^>])*>(.*?)<\/pre>/g;
  const brMatchList = html.match(brReg);
  if (brMatchList) {
    for (const item of brMatchList) {
      const content = item
        .replace(/display: -webkit-box;/g, "display: block;") // -webkit-box替换为block
        .replace(/<br>/g, "\n<span/>") // <br>替换为\n<span/>
        .replace(/&nbsp;/g, " "); // 空格转回，不转回遇到 "$ " 情况会出现问题

      html = html.replace(item, content);
    }
  }
  return html;
};

// 添加掘金后缀
export const addJuejinSuffix = (): void => {
  const suffix = document.createElement("p");
  suffix.id = "nice-suffix-juejin-container";
  suffix.className = "nice-suffix-juejin-container";
  suffix.innerHTML = `本文使用 <a href="https://mdnice.com/?from=juejin">mdnice</a> 排版`;

  const element = document.getElementById("nice");
  if (element) {
    element.appendChild(suffix);
  }
};

// 获取处理后的 HTML
export const solveHtml = (): string => {
  const element = document.getElementById("nice");
  if (!element) return "";

  // 为所有子元素添加 data-tool 属性
  const inner = element.children;
  for (let i = 0; i < inner.length; i++) {
    inner[i].setAttribute("data-tool", "mdnice编辑器");
  }

  let html = element.innerHTML;
  
  // 处理数学公式相关的替换
  html = html.replace(/<mjx-container (class="inline.+?)<\/mjx-container>/g, "<span $1</span>");
  html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline');
  html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
  html = html.replace(/mjx-container/g, "section");
  html = html.replace(/class="mjx-solid"/g, 'fill="none" stroke-width="70"');
  html = html.replace(/<mjx-assistive-mml.+?<\/mjx-assistive-mml>/g, "");

  return html;
};

// 获取当前应用的主题样式
export const getCurrentThemeStyles = (): string => {
  const styleElements = document.querySelectorAll('style[data-theme]');
  let styles = '';
  
  styleElements.forEach(style => {
    styles += style.textContent || '';
  });
  
  return styles;
};

// 内联样式处理（简化版，不依赖 juice）
export const inlineStyles = (html: string, css: string): string => {
  // 这里可以实现一个简化的内联样式处理
  // 或者使用其他库来替代 juice
  return html;
};