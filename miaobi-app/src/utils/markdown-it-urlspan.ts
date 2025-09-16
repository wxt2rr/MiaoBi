/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkdownIt from 'markdown-it';

function renderLinkOpen(tokens: any[], idx: number, options: any, env: any, slf: any) {
  const token = tokens[idx];
  const href = token.attrGet('href');
  const description = tokens[idx + 1].content;
  
  // 如果链接文本和 href 相同，则添加 span 包装
  if (href === description) {
    token.attrSet('class', 'url-link');
  }
  
  return slf.renderToken(tokens, idx, options);
}

export default function markdownItUrlspan(md: MarkdownIt) {
  (md.renderer as any).rules.link_open = renderLinkOpen;
}