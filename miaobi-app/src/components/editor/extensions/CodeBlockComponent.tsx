import React, { useEffect, useRef } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import hljs from 'highlight.js';

interface CodeBlockComponentProps {
  node: {
    attrs: {
      language?: string;
    };
    textContent: string;
  };
}

export const CodeBlockComponent: React.FC<CodeBlockComponentProps> = ({
  node,
}) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      const language = node.attrs.language || 'bash';
      const code = node.textContent;
      
      // 使用highlight.js进行语法高亮
      if (language && hljs.getLanguage(language)) {
        try {
          const highlightedCode = hljs.highlight(code, { language }).value;
          codeRef.current.innerHTML = highlightedCode;
        } catch (e) {
          console.log('Highlight error:', e);
          codeRef.current.textContent = code;
        }
      } else {
        codeRef.current.textContent = code;
      }
    }
  }, [node.attrs.language, node.textContent]);

  return (
    <NodeViewWrapper as="div" className="code-block-wrapper">
      <pre className="custom">
        <code
          ref={codeRef}
          className={`hljs language-${node.attrs.language || 'bash'}`}
        />
      </pre>
    </NodeViewWrapper>
  );
};
