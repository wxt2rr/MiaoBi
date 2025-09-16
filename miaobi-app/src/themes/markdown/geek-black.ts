// 极客黑主题 (对应 wgh.js)
export const geekBlackTheme = `
/* 全局属性 */
#nice {
  background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg,rgba(50, 0, 0, 0.05) 3%, rgba(0, 0, 0, 0) 3%);
  background-size: 20px 20px;
  background-position: center center;
}

/* 段落 */
#nice p {
  box-sizing: border-box;
  margin-bottom: 16px;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
  font-size: 14px;
  text-align: start;
  white-space: normal;
  text-size-adjust: auto;
  line-height: 1.75em;
}

/* 一级标题 */
#nice h1 {
  margin-top: -0.46em;
  margin-bottom: 0.1em;
  border-bottom: 2px solid rgb(198, 196, 196);
  box-sizing: border-box;
}

#nice h1 .content {
  padding-top: 5px;
  padding-bottom: 5px;
  color: rgb(160, 160, 160);
  font-size: 13px;
  line-height: 2;
  box-sizing: border-box;
}

/* 二级标题 */
#nice h2 {
  margin: 10px auto;
  height: 40px;
  background-color: rgb(251, 251, 251);
  border-bottom: 1px solid rgb(246, 246, 246);
  overflow: hidden;
  box-sizing: border-box;
}

#nice h2 .content {
  margin-left: -10px;
  display: inline-block;
  width: auto;
  height: 40px;
  background-color: rgb(33, 33, 34);
  border-bottom-right-radius: 100px;
  color: rgb(255, 255, 255);
  padding-right: 30px;
  padding-left: 30px;
  line-height: 40px;
  font-size: 16px;
}

/* 三级标题 */
#nice h3 {
  margin: 20px auto 5px;
  border-top: 1px solid rgb(221, 221, 221);
  box-sizing: border-box;
}

#nice h3 .content {
  margin-top: -1px;
  padding-top: 6px;
  padding-right: 5px;
  padding-left: 5px;
  font-size: 17px;
  border-top: 2px solid rgb(33, 33, 34);
  display: inline-block;
  line-height: 1.1;
}

#nice h4 {
  margin: 10px auto -1px;
  border-top: 1px solid rgb(221, 221, 221);
  box-sizing: border-box;
}

#nice h4 .content {
  margin-top: -1px;
  padding-top: 6px;
  padding-right: 5px;
  padding-left: 5px;
  font-size: 14px;
  border-top: 2px solid rgb(33, 33, 34);
  display: inline-block;
  line-height: 1.1;
}

/* 列表内容 */
#nice li section {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
}

/* 引用 */
#nice blockquote {
  border-left-color: rgb(221, 221, 221);
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  padding-right: 1em;
  padding-left: 1em;
  border-left-width: 4px;
  color: rgb(119, 119, 119);
  quotes: none;
}

#nice blockquote p {
  font-size: 14px;
  font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
  color: rgb(119, 119, 119);
  line-height: 1.75em;
}

/* 链接 */
#nice a span {
  color: rgb(239, 112, 96);
  border-bottom: 1px solid rgb(239, 112, 96);
}

/* 行内代码 */
#nice p code, #nice li code {
  color: rgb(239, 112, 96);
}

/* 脚注文字 */
#nice .footnote-word {
  color: #ff3502;
}

/* 脚注上标 */
#nice .footnote-ref {
  color: rgb(239, 112, 96);
}
`;