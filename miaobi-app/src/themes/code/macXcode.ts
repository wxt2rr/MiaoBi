export const macXcodeTheme = `/*

XCode style (c) Angel Garcia <angelgarcia.mail@gmail.com>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 16px;
  padding-top: 50px; /* 为Mac风格装饰留出空间 */
  background: #fff;
  color: black;
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
  background: #f5f5f5;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #e0e0e0;
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

/* Gray DOCTYPE selectors like WebKit */
.xml .hljs-meta {
  color: #c0c0c0;
}

.hljs-comment,
.hljs-quote {
  color: #007400;
}

.hljs-tag,
.hljs-attribute,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-name {
  color: #aa0d91;
}

.hljs-variable,
.hljs-template-variable {
  color: #3F6E74;
}

.hljs-code,
.hljs-string,
.hljs-meta-string {
  color: #c41a16;
}

.hljs-regexp,
.hljs-link {
  color: #0E0EFF;
}

.hljs-title,
.hljs-symbol,
.hljs-bullet,
.hljs-number {
  color: #1c00cf;
}

.hljs-section,
.hljs-meta {
  color: #643820;
}


.hljs-class .hljs-title,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-params {
  color: #5c2699;
}

.hljs-attr {
  color: #836C28;
}

.hljs-subst {
  color: #000;
}

.hljs-formula {
  background-color: #eee;
  font-style: italic;
}

.hljs-addition {
  background-color: #baeeba;
}

.hljs-deletion {
  background-color: #ffc8bd;
}

.hljs-selector-id,
.hljs-selector-class {
  color: #9b703f;
}

.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}

#nice .custom code {
  padding-top: 15px;
  background: #fff;
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
  background-color: #fff;
  margin-bottom: -7px;
  border-radius: 5px;
  background-position: 10px 10px;
}

#nice .custom {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
}`;