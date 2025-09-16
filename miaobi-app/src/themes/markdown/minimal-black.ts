// 极简黑主题 (对应 fourteen.js)
export const minimalBlackTheme = `
/* 全局属性 */
#nice {
  font-size: 14px;
  padding: 10px;
}

/* 图片下提示 */
#nice figcaption {
  font-size: 12px;
}

#nice .imageflow-caption {
  font-size: 12px;
}

/* 段落 */
#nice p {
  font-size: 14px;
}

/* 二级标题 */
#nice h2 {
  text-align: center;
  position: relative;
  font-weight: bold;
  color: black;
  line-height: 1.1em;
  padding-top: 12px;
  padding-bottom: 12px;
  margin: 70px 30px 30px;
  border: 1px solid #000;
}

#nice h2:before {
  content: ' ';
  float: left;
  display: block;
  width: 90%;
  border-top: 1px solid #000;
  height: 1px;
  line-height: 1px;
  margin-left: -5px;
  margin-top: -17px;
}

#nice h2:after {
  content: ' ';
  float: right;
  display: block;
  width: 90%;
  border-bottom: 1px solid #000;
  height: 1px;
  line-height: 1px;
  margin-right: -5px;
  margin-top: 16px;
}

/* 二级标题内容 */
#nice h2 .content {
  display: block;
  -webkit-box-reflect: below 0em -webkit-gradient(linear,left top,left bottom, from(rgba(0,0,0,0)),to(rgba(255,255,255,0.1)));
}

/* 二级标题前缀 */
#nice h2 .prefix {
  display: block;
  width: 3px;
  margin: 0 0 0 5%;
  height: 3px;
  line-height: 3px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 3px 0 #000,
    0 3px #000,
    -3px 0 #000,
    0 -3px #000;
}

/* 二级标题后缀 */
#nice h2 .suffix {
  display: block;
  width: 3px;
  margin: 0 0 0 95%;
  height: 3px;
  line-height: 3px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 3px 0 #000,
    0 3px #000,
    -3px 0 #000,
    0 -3px #000;
}

/* 三级标题 */
#nice h3 {
  background-color: #000;
  color: #fff;
  padding: 2px 10px;
  width: fit-content;
  font-size: 17px;
  margin: 60px auto 10px;
}

#nice h3 strong {
  color: #fff;
}

/* 无序列表 */
#nice ul {
  list-style-type: square;
}

/* 无序二级列表 */
#nice ul li ul li {
  list-style-type: circle;
}

/* 引用 */
#nice blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.65);
  border-right: 1px solid rgba(0, 0, 0, 0.65);
  background: rgb(249, 249, 249);
}

/* 图片 */
#nice img {
  box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;
  border-radius: 4px;
  margin-top: 10px;
}

/* 行内代码 */
#nice p code, #nice li code {
  color: #ff6441;
}

/* 代码块 */
#nice pre.custom {
  box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;
  max-width: 100%;
  border-radius: 4px;
  margin: 10px auto 0 auto;
}

/* 表格 */
#nice table tr th,
#nice table tr td {
  font-size: 14px;
}

/* 脚注 */
#nice .footnotes-sep {
  font-size: 14px;
  color: #888;
  border-top: 1px solid #eee;
  padding: 30px 0 10px 0px;
  background-color: transparent;
  margin: 0;
  width: 100%;
}

#nice .footnotes-sep:before {
  content: '参考资料';
}

#nice .footnotes {
  border-left: 5px solid #eee;
  padding-left: 10px;
}

/* 参考资料编号 */
#nice .footnote-num {
  font-size: 14px;
  color: #999;
}

/* 参考资料文字 */
#nice .footnote-item p { 
  font-size: 14px;
  color: #999;
}

/* 参考资料解释 */
#nice .footnote-item p em {
  font-size: 14px;
  color: #999;
}

/* 文章结尾 */
#nice:after {
  content: '- END -';
  font-size: 15px;
  display: block;
  text-align: center;
  margin-top: 50px;
  color: #999;
  border-bottom: 1px solid #eee;
}

/* 滑动幻灯片 */
#nice .imageflow-layer1 img {
  margin: 0;
  box-shadow: none;
  border-radius: 0;
}
`;