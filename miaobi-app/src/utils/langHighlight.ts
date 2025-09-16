/* eslint-disable @typescript-eslint/no-explicit-any */
import hljs from 'highlight.js';

// 微信代码高亮
export const wechatCodeHighlight = (str: string, lang: string) => {
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
};

// 通用代码高亮
export const generalCodeHighlight = (str: string, lang: string) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const formatted = hljs
        .highlight(lang, str, true)
        .value.replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;")
        .replace(/span&nbsp;/g, "span ");
      return '<pre class="custom"><code class="hljs">' + formatted + "</code></pre>";
    } catch (e) {
      console.log(e);
    }
  }
  return '<pre class="custom"><code class="hljs">' + str.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code></pre>";
};