export const basicTheme = `
/* 基础 Markdown 主题 */
.preview-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #24292e;
  background-color: #ffffff;
}

.preview-content h1,
.preview-content h2,
.preview-content h3,
.preview-content h4,
.preview-content h5,
.preview-content h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.preview-content h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.preview-content h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.preview-content h3 {
  font-size: 1.25em;
}

.preview-content h4 {
  font-size: 1em;
}

.preview-content h5 {
  font-size: 0.875em;
}

.preview-content h6 {
  font-size: 0.85em;
  color: #6a737d;
}

.preview-content p {
  margin-bottom: 16px;
}

.preview-content blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}

.preview-content blockquote > :first-child {
  margin-top: 0;
}

.preview-content blockquote > :last-child {
  margin-bottom: 0;
}

.preview-content code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.preview-content pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}

.preview-content pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.preview-content table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}

.preview-content table th,
.preview-content table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.preview-content table th {
  font-weight: 600;
  background-color: #f6f8fa;
}

.preview-content table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.preview-content ul,
.preview-content ol {
  padding-left: 2em;
  margin-bottom: 16px;
}

.preview-content li {
  margin-bottom: 0.25em;
}

.preview-content li > p {
  margin-bottom: 0;
}

.preview-content hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}

.preview-content img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 16px 0;
}

.preview-content a {
  color: #0366d6;
  text-decoration: none;
}

.preview-content a:hover {
  text-decoration: underline;
}

/* 数学公式样式 */
.preview-content .katex {
  font-size: 1.1em;
}

.preview-content .katex-display {
  margin: 1em 0;
  text-align: center;
}

/* 脚注样式 */
.preview-content .footnote-ref {
  color: #0366d6;
  text-decoration: none;
}

.preview-content .footnotes {
  border-top: 1px solid #eaecef;
  margin-top: 2em;
  padding-top: 1em;
  font-size: 0.9em;
}
`;