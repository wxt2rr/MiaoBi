export const macGithubTheme = `/*

github.com style (c) Vasily Polovnyov <vast@whiteants.net>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 16px;
  padding-top: 50px; /* 为Mac风格装饰留出空间 */
  color: #333;
  background: #f8f8f8;
  border-radius: 8px;
  position: relative;
  margin: 16px 0;
}

.hljs:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: #e1e4e8;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #d1d5da;
}

.hljs:after {
  content: '';
  position: absolute;
  top: 8px;
  left: 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f57;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #28ca42;
  z-index: 1;
}

.hljs-comment,
.hljs-quote {
  color: #998;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #333;
  font-weight: bold;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: #008080;
}

.hljs-string,
.hljs-doctag {
  color: #d14;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: #900;
  font-weight: bold;
}

.hljs-subst {
  font-weight: normal;
}

.hljs-type,
.hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: #000080;
  font-weight: normal;
}

.hljs-regexp,
.hljs-link {
  color: #009926;
}

.hljs-symbol,
.hljs-bullet {
  color: #990073;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #0086b3;
}

.hljs-meta {
  color: #999;
  font-weight: bold;
}

.hljs-deletion {
  background: #fdd;
}

.hljs-addition {
  background: #dfd;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

#nice .custom code {
  padding-top: 15px;
  background: #f8f8f8;
  border-radius: 5px;
}

#nice .custom:before {
  content: '';
  display:block;
  background: url(https://shub.weiyan.tech/md2html/point.svg);
  height: 30px;
  width: 100%;
  background-size:40px;
  background-repeat: no-repeat;
  background-color: #f8f8f8;
  margin-bottom: -7px;
  border-radius: 5px;
  background-position: 10px 10px;
}

#nice .custom {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
}`;