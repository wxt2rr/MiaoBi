export const macMonokaiTheme = `/*
Monokai style - ported by Luigi Maselli - http://grigio.org
*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 16px;
  padding-top: 50px; /* 为Mac风格装饰留出空间 */
  background: #272822; 
  color: #ddd;
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
  background: #3e3d32;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #2d2e27;
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

.hljs-tag,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-strong,
.hljs-name {
  color: #f92672;
}

.hljs-code {
  color: #66d9ef;
}

.hljs-class .hljs-title {
  color: white;
}

.hljs-attribute,
.hljs-symbol,
.hljs-regexp,
.hljs-link {
  color: #bf79db;
}

.hljs-string,
.hljs-bullet,
.hljs-subst,
.hljs-title,
.hljs-section,
.hljs-emphasis,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #a6e22e;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-doctag,
.hljs-title,
.hljs-section,
.hljs-type,
.hljs-selector-id {
  font-weight: bold;
}

#nice .custom code {
  padding-top: 15px;
  background: #272822;
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
  background-color: #272822;
  margin-bottom: -7px;
  border-radius: 5px;
  background-position: 10px 10px;
}

#nice .custom {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
}`;