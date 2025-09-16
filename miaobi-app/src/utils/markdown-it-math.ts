/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkdownIt from 'markdown-it';

const mathPlugin = (md: MarkdownIt) => {
  const mathInline = (state: any, start: number, end: number, silent: boolean) => {
    let pos = start;
    let found = false;
    let token;
    let res;

    if (state.src[pos] !== "$") {
      return false;
    }

    res = state.src.slice(++pos);
    const match = res.match(/^\$(.+?)\$/);
    if (!match) {
      return false;
    }

    if (!silent) {
      token = state.push("math_inline", "math", 0);
      token.content = match[1];
      token.markup = "$";
    }

    state.pos = pos + match[0].length;
    return true;
  };

  const mathBlock = (state: any, start: number, end: number, silent: boolean) => {
    let pos = state.bMarks[start] + state.tShift[start];
    let max = state.eMarks[start];
    let token;

    if (pos + 2 > max) {
      return false;
    }

    if (state.src.slice(pos, pos + 2) !== "$$") {
      return false;
    }

    pos += 2;
    let firstLine = state.src.slice(pos, max);

    if (firstLine.trim().slice(-2) === "$$") {
      firstLine = firstLine.trim().slice(0, -2);
      let found = true;
      
      if (!silent) {
        token = state.push("math_block", "math", 0);
        token.block = true;
        token.content = firstLine;
        token.info = "";
        token.markup = "$$";
      }

      state.line = start + 1;
      return found;
    }

    return false;
  };

  md.inline.ruler.after("escape", "math_inline", mathInline);
  md.block.ruler.after("blockquote", "math_block", mathBlock, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });

  (md.renderer as any).rules.math_inline = (tokens: any[], idx: number) => {
    return `<span class="katex-inline">${tokens[idx].content}</span>`;
  };

  (md.renderer as any).rules.math_block = (tokens: any[], idx: number) => {
    return `<div class="katex-block">${tokens[idx].content}</div>`;
  };
};

export default mathPlugin;