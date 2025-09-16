// 红绯主题 (对应 three.js)
export const redTheme = `
/* 全局属性 */
#nice {
  line-height: 1.75;
  color: #595959;
  font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light;
  letter-spacing: 2px;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
  background-size: 20px 20px;
  background-position: center center;
}

/* 段落 */
#nice p {
  color: #595959;
  margin: 10px 0px;
  letter-spacing: 2px;
  font-size: 14px;
  word-spacing: 2px;
}

/* 一级标题 */
#nice h1 {
  font-size: 25px;
}

#nice h1 .content {
  display: inline-block;
  font-weight: bold;
  color: #595959;
}

/* 二级标题 */
#nice h2 {
  text-align: left;
  margin: 20px 10px 0px 0px;
}

#nice h2 .content {
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  padding-left: 10px;
  border-left: 5px solid #FF6B6B;
  color: #595959;
}

/* 三级标题 */
#nice h3 {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

#nice h3 .content {
  border-bottom: 2px solid #FF6B6B;
  color: #595959;
}

/* 无序列表 */
#nice ul {
  font-size: 15px;
  color: #595959;
  list-style-type: circle;
}

/* 有序列表 */
#nice ol {
  font-size: 15px;
  color: #595959;
}

/* 列表内容 */
#nice li section {
  font-size: 14px;
  font-weight: normal;
  color: #595959;
}

/* 引用 */
#nice blockquote::before {
  content: "❝";
  color: #FF6B6B;
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
}

#nice blockquote {
  text-size-adjust: 100%;
  line-height: 1.55em;
  font-weight: 400;
  border-radius: 6px;
  color: #595959;
  font-style: normal;
  text-align: left;
  box-sizing: inherit;
  border-left: none;
  border: 1px solid #FF6B6B;
  background: #FFF5F5;
}

#nice blockquote p {
  color: #595959;
}

#nice blockquote::after {
  content: "❞";
  float: right;
  color: #FF6B6B;
}

/* 链接 */
#nice a span {
  color: #E74C3C;
  font-weight: normal;
  border-bottom: 1px solid #E74C3C;
}

/* 加粗 */
#nice strong::before {
  content: '「';
}

#nice strong {
  color: #595959;
  font-weight: bold;
}

#nice strong::after {
  content: '」';
}

/* 斜体 */
#nice em {
  font-style: normal;
  color: #595959;
  background: #FFF5F5;
}

/* 加粗斜体 */
#nice em strong {
  color: #595959;
}

/* 删除线 */
#nice del {
  color: #595959;
}

/* 分隔线 */
#nice hr {
  height: 1px;
  padding: 0;
  border: none;
  border-top: 2px solid #FF6B6B;
}

/* 图片 */
#nice img {
  border-radius: 6px;
  display: block;
  margin: 20px auto;
  object-fit: contain;
}

/* 图片描述文字 */
#nice figcaption {
  display: block;
  font-size: 13px;
  color: #595959;
}

/* 行内代码 */
#nice p code,
#nice li code {
  color: #595959;
}

/* 代码块 */
#nice .code-snippet__fix {
  background: #f7f7f7;
  border-radius: 2px;
}

/* 表格 */
#nice table tr th,
#nice table tr td {
  font-size: 14px;
  color: #595959;
}

/* 脚注 */
#nice .footnotes {
  background: #FFF5F5;
  padding: 20px 20px 20px 20px;
  font-size: 14px;
  border: 0.8px solid #FF6B6B;
  border-radius: 6px;
  border: 1px solid #FF6B6B;
}

#nice .footnote-word {
  font-weight: normal;
  color: #595959;
}

#nice .footnote-ref {
  font-weight: normal;
  color: #595959;
}

#nice .footnote-item em {
  background: #FFF5F5;
  font-size: 14px;
  color: #595959;
  display: block;
}

#nice .footnotes-sep:before {
  content: 'Reference';
  color: #595959;
  letter-spacing: 1px;
  border-bottom: 2px solid #FF6B6B;
  display: inline;
  background: linear-gradient(white 60%, #FFF5F5 40%);
  font-size: 20px;
}

#nice .footnote-item p {
  color: #595959;
  font-weight: bold;
}

#nice .footnote-item p em {
  font-weight: normal;
}

/* 滑动图片 */
#nice .imageflow-img {
  display: inline-block;
  width: 100%;
  margin-bottom: 0;
}
`;