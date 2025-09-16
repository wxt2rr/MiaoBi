// 全栈蓝主题 (对应 thirteen.js)
export const fullstackTheme = `
/* 全局属性 */
#nice {
  line-height: 1.25;
  color: #2b2b2b;
  font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light;
  letter-spacing: 2px;
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%);
  background-size: 20px 20px;
  background-position: center center;
}

/* 段落 */
#nice p {
  color: #2b2b2b;
  margin: 10px 0px;
  letter-spacing: 2px;
  font-size: 14px;
  word-spacing: 2px;
}

/* 一级标题 */
#nice h1 {
  font-size: 25px;
}

#nice h1 span {
  display: inline-block;
  font-weight: bold;
  color: #40B8FA;
}

/* 二级标题 */
#nice h2 {
  display: block;
  border-bottom: 4px solid #40B8FA;
}

#nice h2 .content {
  display: flex;
  color: #40B8FA;
  font-size: 20px;
  margin-left: 25px;
}

/* 二级标题前缀 */
#nice h2 .prefix {
  display: flex;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
  background-image: url(https://my-wechat.mdnice.com/fullstack-1.png);
  margin-bottom: -22px;
}

/* 二级标题后缀 */
#nice h2 .suffix {
  display: flex;
  box-sizing: border-box;
  width: 200px;
  height: 10px;
  border-top-left-radius: 20px;
  background: RGBA(64, 184, 250, .5);
  color: rgb(255, 255, 255);
  font-size: 16px;
  letter-spacing: 0.544px;
  justify-content: flex-end;
  box-sizing: border-box !important;
  overflow-wrap: break-word !important;
  float: right;
  margin-top: -10px;
}

/* 三级标题 */
#nice h3 {
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
}

#nice h3 .content {
  border-bottom: 2px solid RGBA(79, 177, 249, .65);
  color: #2b2b2b;
  padding-bottom: 2px;
}

#nice h3 .content:before {
  content: '';
  width: 30px;
  height: 30px;
  display: block;
  background-image: url(https://my-wechat.mdnice.com/fullstack-2.png);
  background-position: center;
  background-size: 30px;
  margin: auto;
  opacity: 1;
  background-repeat: no-repeat;
  margin-bottom: -8px;
}

#nice h4 .content {
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}

#nice h4 .content:before {
  content: '';
  background-image: url(https://my-wechat.mdnice.com/fullstack-3.png);
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 100%;
  background-position: left bottom;
  background-repeat: no-repeat;
  width: 16px;
  height: 15px;
  line-height: 15px;
  margin-right: 6px;
  margin-bottom: -2px;
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
  color: RGBA(64, 184, 250, .5);
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
  border: 1px solid RGBA(64, 184, 250, .4);
  background: RGBA(64, 184, 250, .1);
}

#nice blockquote p {
  color: #595959;
}

#nice blockquote::after {
  content: "❞";
  float: right;
  color: RGBA(64, 184, 250, .5);
}

/* 链接 */
#nice a span {
  color: #40B8FA;
  font-weight: normal;
  border-bottom: 1px solid #3BAAFA;
}

/* 加粗 */
#nice strong::before {
  content: '「';
}

#nice strong {
  color: #3594F7;
  font-weight: bold;
}

#nice strong::after {
  content: '」';
}

/* 斜体 */
#nice em {
  font-style: normal;
  color: #3594F7;
  font-weight: bold;
}

/* 加粗斜体 */
#nice em strong {
  color: #3594F7;
}

/* 删除线 */
#nice del {
  color: #3594F7;
}

/* 分隔线 */
#nice hr {
  height: 1px;
  padding: 0;
  border: none;
  border-top: 2px solid #3BAAFA;
}

/* 图片 */
#nice img {
  border-radius: 6px;
  display: block;
  margin: 20px auto;
  object-fit: contain;
  box-shadow: 2px 4px 7px #999;
}

/* 图片描述文字 */
#nice figcaption {
  display: block;
  font-size: 13px;
  color: #2b2b2b;
}

#nice figcaption:before {
  content: '';
  background-image: url(https://img.alicdn.com/tfs/TB1Yycwyrj1gK0jSZFuXXcrHpXa-32-32.png);
  display: inline-block;
  width: 18px;
  height: 18px;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5px;
  margin-bottom: -5px;
}

/* 行内代码 */
#nice p code,
#nice li code {
  color: #3594F7;
  background: RGBA(59, 170, 250, .1);
  padding: 0 2px;
  border-radius: 2px;
  height: 21px;
  line-height: 22px;
}

/* 代码块 */
#nice .code-snippet__fix {
  background: #f7f7f7;
  border-radius: 2px;
}

#nice pre code {
  letter-spacing: 0px;
}

/* 表格 */
#nice table tr th,
#nice table tr td {
  font-size: 14px;
  color: #595959;
}

/* 脚注 */
#nice .footnotes {
  background: RGBA(53, 148, 247, .4);
  padding: 20px 20px 20px 20px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid RGBA(53, 148, 247, 1);
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
  font-size: 14px;
  color: #595959;
  display: block;
}

#nice .footnotes-sep:before {
  content: 'Reference';
  color: #595959;
  letter-spacing: 1px;
  border-bottom: 2px solid RGBA(64, 184, 250, 1);
  display: inline;
  background: linear-gradient(white 60%, RGBA(64, 184, 250, .4) 40%);
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