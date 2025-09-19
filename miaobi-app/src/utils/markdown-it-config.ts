import MarkdownIt from 'markdown-it';
import markdownItDeflist from 'markdown-it-deflist';
import markdownItImplicitFigures from 'markdown-it-implicit-figures';
import markdownItTableOfContents from 'markdown-it-table-of-contents';
import markdownItRuby from 'markdown-it-ruby';
// 注意：markdown-it-imsize 在浏览器环境中不可用，因为它依赖 fs 模块

// 导入自定义插件
import markdownItSpan from './markdown-it-span';
import markdownItTableContainer from './markdown-it-table-container';
import markdownItRemovepre from './markdown-it-removepre';
import markdownItLinkfoot from './markdown-it-linkfoot';
import markdownItImageFlow from './markdown-it-imageflow';
import markdownItLi from './markdown-it-li';
import markdownItUrlspan from './markdown-it-urlspan';
import markdownItMath from './markdown-it-math';
import hljs from 'highlight.js';

// 专门微信代码高亮的解析器
export const markdownParserWechat: MarkdownIt = new MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    const text = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const lines = text.split("\n");
    const codeLines: string[] = [];
    const numbers: string[] = [];
    for (let i = 0; i < lines.length - 1; i++) {
      codeLines.push('<code><span class="code-snippet_outer">' + (lines[i] || "<br>") + "</span></code>");
      numbers.push("<li></li>");
    }
    return (
      '<section class="code-snippet__fix code-snippet__js">' +
      '<ul class="code-snippet__line-index code-snippet__js">' +
      numbers.join("") +
      "</ul>" +
      '<pre class="code-snippet__js" data-lang="' +
      lang +
      '">' +
      codeLines.join("") +
      "</pre></section>"
    );
  },
});

markdownParserWechat
  .use(markdownItUrlspan)
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItTableContainer) // 在表格外部添加容器
  .use(markdownItRemovepre) // 移除代码段中的 pre code
  .use(markdownItMath) // 数学公式
  .use(markdownItLinkfoot) // 修改脚注
  .use(markdownItTableOfContents, {
    transformLink: () => "",
    includeLevel: [2, 3],
    markerPattern: /^\[toc\]/im,
  }) // TOC仅支持二级和三级标题
  .use(markdownItRuby) // 注音符号
  .use(markdownItImplicitFigures, { figcaption: true }) // 图示
  .use(markdownItDeflist) // 定义列表
  .use(markdownItLi) // li 标签中加入 p 标签
  .use(markdownItImageFlow); // 横屏移动插件
  // 注意：暂时移除 markdownItImsize，因为它在浏览器环境中不可用

// 普通解析器，代码高亮用highlight.js - 与原项目完全一致
export const markdownParser: MarkdownIt = new MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    if (lang === undefined || lang === "") {
      lang = "bash";
    }
    // 加上custom则表示自定义样式，而非微信专属，避免被remove pre
    if (lang && hljs.getLanguage(lang)) {
      try {
        const formatted = hljs.highlight(str, { language: lang }).value;
        return '<pre class="custom"><code class="hljs">' + formatted + "</code></pre>";
      } catch (e) {
        console.log('Highlight错误:', e);
      }
    }
    return '<pre class="custom"><code class="hljs">' + markdownParser.utils.escapeHtml(str) + "</code></pre>";
  },
});

markdownParser
  .use(markdownItUrlspan)
  .use(markdownItSpan) // 在标题标签中添加span
  .use(markdownItTableContainer) // 在表格外部添加容器
  .use(markdownItMath) // 数学公式
  .use(markdownItLinkfoot) // 修改脚注
  .use(markdownItTableOfContents, {
    transformLink: () => "",
    includeLevel: [2, 3],
    markerPattern: /^\[toc\]/im,
  }) // TOC仅支持二级和三级标题
  .use(markdownItRuby) // 注音符号
  .use(markdownItImplicitFigures, { figcaption: true }) // 图示
  .use(markdownItDeflist) // 定义列表
  .use(markdownItLi) // li 标签中加入 p 标签
  .use(markdownItImageFlow); // 横屏移动插件
  // 注意：暂时移除 markdownItImsize，因为它在浏览器环境中不可用