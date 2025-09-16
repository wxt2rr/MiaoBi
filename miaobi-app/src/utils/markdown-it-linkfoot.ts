/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkdownIt from 'markdown-it';

function makeRule(md: MarkdownIt) {
  return function replaceLink(state: any) {
    const blockTokens = state.tokens;
    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== "inline" || !blockTokens[j].children) {
        continue;
      }
      const tokens = blockTokens[j].children;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const currentToken = tokens[i];
        if (currentToken.type === "link_close") {
          const linkOpenToken = tokens[i - 2];
          const textToken = tokens[i - 1];
          const linkUrl = linkOpenToken.attrGet("href");
          const linkText = textToken.content;
          
          // 创建新的 token 结构
          const newToken = new state.Token("html_inline", "", 0);
          newToken.content = `<a href="${linkUrl}" class="link-foot">${linkText}<sup>[${linkUrl}]</sup></a>`;
          
          // 替换原来的三个 token
          tokens.splice(i - 2, 3, newToken);
          i -= 2;
        }
      }
    }
  };
}

export default function markdownItLinkfoot(md: MarkdownIt) {
  (md as any).core.ruler.push("replace-link", makeRule(md));
}