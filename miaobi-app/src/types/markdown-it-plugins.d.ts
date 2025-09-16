// 为 markdown-it 插件添加类型声明

declare module 'markdown-it-deflist' {
  import { PluginSimple } from 'markdown-it';
  const plugin: PluginSimple;
  export default plugin;
}

declare module 'markdown-it-footnote' {
  import { PluginSimple } from 'markdown-it';
  const plugin: PluginSimple;
  export default plugin;
}

declare module 'markdown-it-katex' {
  import { PluginSimple } from 'markdown-it';
  const plugin: PluginSimple;
  export default plugin;
}

declare module 'markdown-it-table-of-contents' {
  import { PluginWithOptions } from 'markdown-it';
  interface TOCOptions {
    includeLevel?: number[];
    markerPattern?: RegExp;
    transformLink?: () => string;
  }
  const plugin: PluginWithOptions<TOCOptions>;
  export default plugin;
}

declare module 'markdown-it-ruby' {
  import { PluginSimple } from 'markdown-it';
  const plugin: PluginSimple;
  export default plugin;
}

declare module 'markdown-it-imsize' {
  import { PluginSimple } from 'markdown-it';
  const plugin: PluginSimple;
  export default plugin;
}