export const macAtomOneDarkTheme = `/*

Mac Style Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 16px;
  color: #abb2bf;
  background: #282c34;
}

#nice pre.custom {
  background-color: #282c34 !important;
  border: none !important;
  border-radius: 5px !important;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px !important;
  margin: 16px 0 !important;
  padding: 0 !important;
  font-size: 14px !important;
  line-height: 1.45 !important;
  overflow: visible !important;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
}

#nice pre.custom code.hljs {
  background: #282c34 !important;
  padding: 0 0 0 10px !important;
  font-size: inherit !important;
  color: inherit !important;
  border: none !important;
  border-radius: 0 !important;
  word-break: normal !important;
  white-space: pre !important;
  word-spacing: normal !important;
  word-wrap: normal !important;
  line-height: inherit !important;
}

#nice .custom code {
  padding-top: 0px;
  background: #282c34;
  border-radius: 5px;
}

#nice pre.custom:before,
#nice .custom:before {
  content: '';
  display: block;
  background: url(https://shub.weiyan.tech/md2html/point.svg);
  height: 30px;
  width: 100%;
  background-size: 40px;
  background-repeat: no-repeat;
  background-color: #282c34;
  margin-bottom: -7px;
  border-radius: 5px;
  background-position: 10px 10px;
}

#nice .custom {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75;
}

.hljs-literal {
  color: #56b6c2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
  color: #98c379;
}

.hljs-built_in,
.hljs-class .hljs-title {
  color: #e6c07b;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}`;