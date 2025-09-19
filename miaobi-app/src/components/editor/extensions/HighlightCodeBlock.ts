import { Node, mergeAttributes } from '@tiptap/core';
import hljs from 'highlight.js';

export interface HighlightCodeBlockOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlightCodeBlock: {
      /**
       * Set a code block
       */
      setCodeBlock: (attributes?: { language?: string }) => ReturnType;
      /**
       * Toggle a code block
       */
      toggleCodeBlock: (attributes?: { language?: string }) => ReturnType;
    };
  }
}

export const HighlightCodeBlock = Node.create<HighlightCodeBlockOptions>({
  name: 'codeBlock',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'text*',

  marks: '',

  group: 'block',

  code: true,

  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'bash',
        parseHTML: element => {
          const match = element.firstElementChild?.className.match(/language-(\w+)/);
          const language = match ? match[1] : null;
          return language || 'bash';
        },
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const language = node.attrs.language || 'bash';
    const code = node.textContent;
    
    // 使用highlight.js进行语法高亮
    let highlightedCode = code;
    if (language && hljs.getLanguage(language)) {
      try {
        highlightedCode = hljs.highlight(code, { language }).value;
      } catch (e) {
        // 如果高亮失败，使用自动检测
        highlightedCode = hljs.highlightAuto(code).value;
      }
    } else {
      // 如果没有指定语言，尝试自动检测
      try {
        highlightedCode = hljs.highlightAuto(code).value;
      } catch (e) {
        // 如果自动检测也失败，使用转义的HTML
        highlightedCode = hljs.highlightAuto(code).value;
      }
    }

    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'custom',
      }),
      [
        'code',
        {
          class: `hljs language-${language}`,
        },
        highlightedCode,
      ],
    ];
  },

  addCommands() {
    return {
      setCodeBlock:
        attributes =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
      toggleCodeBlock:
        attributes =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),

      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || $anchor.parent.type.name !== this.name) {
          return false;
        }

        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }

        return false;
      },

      // exit node on triple enter
      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith('\n\n');

        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);
            return true;
          })
          .exitCode()
          .run();
      },

      // exit node on arrow down
      ArrowDown: ({ editor }) => {
        const { state } = editor;
        const { selection, doc } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;

        if (!isAtEnd) {
          return false;
        }

        const after = $from.after();

        if (after === undefined) {
          return false;
        }

        const nodeAfter = doc.nodeAt(after);

        if (nodeAfter) {
          return false;
        }

        return editor.commands.exitCode();
      },
    };
  },
});
