/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import MarkdownIt from 'markdown-it';

function makeRule(md: MarkdownIt) {
  return function addTableContainer(state: any) {
    const tokens = state.tokens;
    const arr: any[] = [];
    
    for (let i = 0; i < tokens.length; i++) {
      const curToken = tokens[i];
      
      if (curToken.type === "table_open") {
        const tableContainerStart = new state.Token("html_inline", "", 0);
        tableContainerStart.content = `<section class="table-container">`;
        arr.push(tableContainerStart);
        arr.push(curToken);
      } else if (curToken.type === "table_close") {
        arr.push(curToken);
        const tableContainerClose = new state.Token("html_inline", "", 0);
        tableContainerClose.content = `</section>`;
        arr.push(tableContainerClose);
      } else {
        arr.push(curToken);
      }
    }
    
    state.tokens = arr;
  };
}

export default function markdownItTableContainer(md: MarkdownIt) {
  (md as any).core.ruler.push("table_container", makeRule(md));
}