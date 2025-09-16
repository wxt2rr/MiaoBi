/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkdownIt from 'markdown-it';

interface SpanOptions {
  anchorClass?: string;
  addHeadingSpan?: boolean;
  slugify?: (s: string, md: MarkdownIt) => string;
}

function slugify(s: string, md: MarkdownIt): string {
  // Unicode-friendly
  const spaceRegex = new RegExp((md.utils as any).lib.ucmicro.Z.source, "g");
  return encodeURIComponent(s.replace(spaceRegex, ""));
}

function makeRule(md: MarkdownIt, options: SpanOptions) {
  return function addHeadingAnchors(state: any) {
    // Go to length-2 because we're going to be peeking ahead.
    for (let i = 0; i < state.tokens.length - 1; i++) {
      if (state.tokens[i].type !== "heading_open" || state.tokens[i + 1].type !== "inline") {
        continue;
      }

      const headingInlineToken = state.tokens[i + 1];

      if (!headingInlineToken.content) {
        continue;
      }

      if (options.addHeadingSpan) {
        const spanTokenPre = new state.Token("html_inline", "", 0);
        spanTokenPre.content = `<span class="prefix"></span><span class="content">`;
        headingInlineToken.children = headingInlineToken.children || [];
        headingInlineToken.children.unshift(spanTokenPre);
        
        const spanTokenPost = new state.Token("html_inline", "", 0);
        spanTokenPost.content = `</span><span class="suffix"></span>`;
        headingInlineToken.children.push(spanTokenPost);
      }

      // Advance past the inline and heading_close tokens.
      i += 2;
    }
  };
}

export default function markdownItSpan(md: MarkdownIt, opts: SpanOptions = {}) {
  const defaults: SpanOptions = {
    anchorClass: "markdown-it-headingspan",
    addHeadingSpan: true,
    slugify: slugify,
  };
  const options = Object.assign(defaults, opts);
  (md as any).core.ruler.push("heading_span", makeRule(md, options));
}