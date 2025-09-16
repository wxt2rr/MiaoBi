/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkdownIt from 'markdown-it';

function makeRule(md: MarkdownIt) {
  return function replaceListItem() {
    (md.renderer as any).rules.list_item_open = function replaceOpen() {
      return "<li><section>";
    };
    (md.renderer as any).rules.list_item_close = function replaceClose() {
      return "</section></li>";
    };
  };
}

export default function markdownItLi(md: MarkdownIt) {
  (md as any).core.ruler.push("replace-li", makeRule(md));
}