import { Mark, mergeAttributes } from '@tiptap/core';

export interface AITypingOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    aiTyping: {
      /**
       * 设置AI打字标记
       */
      setAITyping: () => ReturnType;
      /**
       * 取消AI打字标记
       */
      unsetAITyping: () => ReturnType;
      /**
       * 切换AI打字标记
       */
      toggleAITyping: () => ReturnType;
    };
  }
}

export const AITypingMark = Mark.create<AITypingOptions>({
  name: 'aiTyping',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      class: {
        default: 'ai-typing',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (!attributes.class) {
            return {};
          }
          return {
            class: attributes.class,
          };
        },
      },
      style: {
        default: 'color: #9CA3AF; background-color: #F3F4F6;',
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (!attributes.style) {
            return {};
          }
          return {
            style: attributes.style,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[class="ai-typing"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setAITyping: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      unsetAITyping: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleAITyping: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
    };
  },
});

export default AITypingMark;
