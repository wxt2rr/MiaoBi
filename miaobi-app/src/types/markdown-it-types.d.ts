// 为 markdown-it 插件定义类型
/* eslint-disable @typescript-eslint/ban-types */
declare module 'markdown-it' {
  interface MarkdownIt {
    core: {
      ruler: {
        push: (name: string, fn: Function) => void;
      };
    };
    renderer: {
      rules: {
        [key: string]: Function;
      };
    };
    utils: {
      lib: {
        ucmicro: {
          Z: {
            source: string;
          };
        };
      };
      escapeHtml: (str: string) => string;
    };
  }
}

export interface MarkdownItState {
  tokens: MarkdownItToken[];
  Token: new (type: string, tag: string, nesting: number) => MarkdownItToken;
}

export interface MarkdownItToken {
  type: string;
  content: string;
  children?: MarkdownItToken[];
  attrGet?: (name: string) => string | null;
  attrSet?: (name: string, value: string) => void;
}