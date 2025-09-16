// 橙心风主题 (对应 fifteen.js)
export const orangeTheme = `
/* 全局属性 */
#nice {
  margin-top: 0;
  padding: 0;
}

/* 段落 */
#nice p {
  font-size: 16px;
  line-height: 26px;
  word-spacing: 3px;
  letter-spacing: 1px;
  color: #424B5D;
}

#nice h1, #nice h2, #nice h3, #nice h4, #nice h5, #nice h6 {
  margin-top: 24px;
  margin-bottom: 12px;
  font-weight: bold;
}

/* 一级标题 */
#nice h1 {
  font-size: 22px;
  color: #e7642b;
}

/* 二级标题 */
#nice h2 {
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 12px;
}

#nice h2 .content {
  color: #e7642b;
  text-align: center;
  display: block;
  background-color: #e7642b;
  color: white;
  padding: 3px 11px;
  border-radius: 1px;
}

/* 三级标题 */
#nice h3 {
  font-size: 18px;
  color: #424B5D;
}

/* 四级标题 */
#nice h4 {
  font-size: 16px;
  color: #424B5D;
}

/* 五级标题 */
#nice h5 {
  font-size: 16px;
  color: #424B5D;
}

/* 有序、无序列表整体样式 */
#nice ul, #nice ol {
  font-size: 15px;
  margin: 0;
  padding-left: 24px;
  color: #424B5D;
}

/* 列表内容 */
#nice li section {
  margin: 4px 0;
  line-height: 24px;
  color: #424B5D;
}

/* 引用 */
#nice blockquote {
  margin: 0 8px;
  border: none;
  background: #ffffff;
  box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09);
}

/* 引用文字 */
#nice blockquote p {
  font-size: 14px;
  color: #424B5D;
  line-height: 24px;
}

/* 链接 */
#nice a span {
  color: #eb6161;
  border-bottom: 1px solid #eb6161;
}

#nice a::before {
  content: '👉';
  margin-right: 6px;
}

/* 加粗 */
#nice strong {
  color: #424B5D;
}

/* 斜体 */
#nice em {
  color: #424B5D;
}

/* 加粗斜体 */
#nice em strong {
  color: #424B5D;
}

/* 分隔线 */
#nice hr {
  border-top: 1px dashed #424B5D;
}

/* 图片 */
#nice img {
  border-radius: 5px;
  margin: 12px auto;
}

/* 图片描述文字 */
#nice figcaption {
  font-size: 14px;
  margin: 12px auto;
  color: #999999;
}

/* 行内代码 */
#nice p code, #nice li code {
  padding-left: 0;
  padding-right: 0;
  background: transparent;
  border-radius: 0;
  color: #eb6161;
  border-bottom: 1px solid #eb6161;
}

/* 代码块 */
#nice pre {
  margin: 12px auto;
  box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09) !important;
  border-radius: 5px;
}

/* 表格 */
#nice table {
  margin: 12px auto;
}

#nice table tr th,
#nice table tr td {
  color: #424B5D;
  font-size: 14px;
}

/* 脚注文字 */
#nice .footnote-word {
  color: #eb6161;
}

/* 脚注上标 */
#nice .footnote-ref {
  color: #eb6161;
}

#nice .footnotes-sep:before {
  font-size: 16px;
}

/* 参考资料文字 */
#nice .footnote-item p { 
  font-size: 12px;
  color: #424B5D;
}

/* 参考资料解释 */
#nice .footnote-item p em {
  font-size: 12px;
  color: #999999;
}

/* 行间公式 */
#nice .block-equation svg {
  color: #424B5D;
}

/* 行内公式 */
#nice .inline-equation svg {  
  color: #424B5D;
}

#nice .imageflow-layer1 img {
  border-radius: 0;
}

#nice .imageflow-caption {
  font-size: 14px;
  margin-top: 8px;
  color: #999999;
}

::-webkit-scrollbar {
  height: 4px;
}
`;