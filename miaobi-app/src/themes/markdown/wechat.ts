export const wechatTheme = `
/* 微信公众号主题 */
.preview-content {
  font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
  line-height: 1.75;
  color: #333;
  background-color: #fff;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.preview-content h1,
.preview-content h2,
.preview-content h3,
.preview-content h4,
.preview-content h5,
.preview-content h6 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold;
  color: #2c3e50;
}

.preview-content h1 {
  font-size: 24px;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.preview-content h2 {
  font-size: 20px;
  border-left: 4px solid #3498db;
  padding-left: 10px;
  background: linear-gradient(to right, #f8f9fa 0%, #ffffff 100%);
  padding: 8px 0 8px 15px;
  margin: 20px 0 15px 0;
}

.preview-content h3 {
  font-size: 18px;
  color: #2980b9;
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 5px;
}

.preview-content h4 {
  font-size: 16px;
  color: #34495e;
}

.preview-content h5 {
  font-size: 15px;
  color: #7f8c8d;
}

.preview-content h6 {
  font-size: 14px;
  color: #95a5a6;
}

.preview-content p {
  margin: 15px 0;
  text-align: justify;
  text-indent: 2em;
}

.preview-content blockquote {
  border-left: 4px solid #e74c3c;
  background-color: #fdf2f2;
  padding: 15px 20px;
  margin: 20px 0;
  border-radius: 0 8px 8px 0;
  position: relative;
}

.preview-content blockquote::before {
  content: '"';
  font-size: 60px;
  color: #e74c3c;
  position: absolute;
  left: 10px;
  top: -10px;
  font-family: Georgia, serif;
}

.preview-content blockquote p {
  margin: 0;
  color: #555;
  text-indent: 0;
  font-style: italic;
}

.preview-content code {
  background-color: #f1f2f6;
  color: #e74c3c;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Monaco, Courier, monospace;
  font-size: 14px;
  font-weight: 500;
}

.preview-content pre {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  position: relative;
}

.preview-content pre::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e74c3c;
  box-shadow: 20px 0 0 #f39c12, 40px 0 0 #27ae60;
}

.preview-content pre code {
  background: none;
  color: inherit;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;
}

/* 微信代码块特殊样式 */
.preview-content .code-snippet__fix {
  background-color: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
  border: 1px solid #e1e4e8;
}

.preview-content .code-snippet__line-index {
  background-color: #f1f3f4;
  color: #969896;
  text-align: right;
  padding: 15px 10px;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
  list-style: none;
  float: left;
  width: 40px;
}

.preview-content .code-snippet__js {
  background-color: #f8f8f8;
  padding: 15px;
  margin: 0;
  overflow-x: auto;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Monaco, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.preview-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.preview-content table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  padding: 15px 12px;
  text-align: left;
  font-size: 14px;
}

.preview-content table td {
  padding: 12px;
  border-bottom: 1px solid #f1f3f4;
  font-size: 14px;
}

.preview-content table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.preview-content table tr:hover {
  background-color: #e3f2fd;
}

.preview-content ul,
.preview-content ol {
  padding-left: 0;
  margin: 15px 0;
}

.preview-content li {
  margin: 8px 0;
  padding-left: 20px;
  position: relative;
}

.preview-content ul li::before {
  content: '▪';
  color: #3498db;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.preview-content ol {
  counter-reset: ol-counter;
}

.preview-content ol li {
  counter-increment: ol-counter;
}

.preview-content ol li::before {
  content: counter(ol-counter) '.';
  color: #3498db;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.preview-content hr {
  border: none;
  height: 2px;
  background: linear-gradient(to right, transparent, #3498db, transparent);
  margin: 30px 0;
}

.preview-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px auto;
  display: block;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.preview-content a {
  color: #3498db;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.preview-content a:hover {
  border-bottom-color: #3498db;
}

/* 强调样式 */
.preview-content strong {
  color: #e74c3c;
  font-weight: bold;
}

.preview-content em {
  color: #8e44ad;
  font-style: italic;
}

/* 数学公式样式 */
.preview-content .katex {
  font-size: 1.1em;
}

.preview-content .katex-display {
  margin: 20px 0;
  text-align: center;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

/* 脚注样式 */
.preview-content .footnotes {
  border-top: 2px solid #ecf0f1;
  margin-top: 40px;
  padding-top: 20px;
  font-size: 14px;
  color: #7f8c8d;
}

.preview-content .footnote-ref {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

/* 首段不缩进 */
.preview-content > p:first-of-type {
  text-indent: 0;
  font-weight: 500;
  color: #2c3e50;
}
`;