declare module 'markdown-it-implicit-figures' {
  import { PluginSimple } from 'markdown-it';
  
  interface ImplicitFiguresOptions {
    dataType?: boolean;
    figcaption?: boolean | string;
    tabindex?: boolean;
    link?: boolean;
    lazyLoading?: boolean;
    async?: boolean;
    classes?: string;
    decoding?: string;
  }
  
  const markdownItImplicitFigures: PluginSimple<ImplicitFiguresOptions>;
  export = markdownItImplicitFigures;
}