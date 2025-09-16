import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export interface ImageResizeOptions {
  HTMLAttributes: Record<string, string | number | boolean>;
}

export const ImageResize = Extension.create<ImageResizeOptions>({
  name: 'imageResize',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('imageResize'),
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            const { doc } = state;

            doc.descendants((node, pos) => {
              if (node.type.name === 'image') {
                // 隐藏原始图片节点
                const hideDecoration = Decoration.node(pos, pos + node.nodeSize, {
                  style: 'display: none;'
                });
                decorations.push(hideDecoration);
                
                // 创建包装的图片
                const decoration = Decoration.widget(pos + 1, () => {
                  const container = document.createElement('div');
                  container.className = 'image-resize-container relative inline-block group';
                  container.style.position = 'relative';
                  container.style.display = 'inline-block';
                  container.style.maxWidth = '100%';
                  
                  // 创建图片元素
                  const imageElement = document.createElement('img');
                  imageElement.src = node.attrs.src;
                  imageElement.alt = node.attrs.alt || '';
                  imageElement.title = node.attrs.title || '';
                  imageElement.className = 'max-w-full h-auto';
                  imageElement.style.display = 'block';
                  imageElement.style.maxWidth = '100%';
                  imageElement.style.height = 'auto';
                  
                  // 直接设置图片的样式属性，确保尺寸保持
                  if (node.attrs.width) {
                    imageElement.style.width = `${node.attrs.width}px`;
                    imageElement.style.maxWidth = 'none';
                    imageElement.setAttribute('data-width', node.attrs.width.toString());
                  }
                  if (node.attrs.height) {
                    imageElement.style.height = `${node.attrs.height}px`;
                    imageElement.setAttribute('data-height', node.attrs.height.toString());
                  }
                  
                  // 设置容器的尺寸，确保整体尺寸保持
                  if (node.attrs.width) {
                    container.style.width = `${node.attrs.width}px`;
                  }
                  if (node.attrs.height) {
                    container.style.height = `${node.attrs.height}px`;
                  }
                  
                  // 使用 CSS 变量来保持尺寸
                  if (node.attrs.width || node.attrs.height) {
                    container.style.setProperty('--image-width', node.attrs.width ? `${node.attrs.width}px` : 'auto');
                    container.style.setProperty('--image-height', node.attrs.height ? `${node.attrs.height}px` : 'auto');
                  }
                  
                  // 创建调整大小的控制点 - 使用更明显的样式
                  const resizeHandle = document.createElement('div');
                  resizeHandle.className = 'resize-handle';
                  
                  // 创建控制点元素
                  const handleElement = document.createElement('div');
                  handleElement.style.cssText = `
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(135deg, #374151, #111827);
                    border: 2px solid white;
                    border-radius: 4px;
                    cursor: se-resize;
                    opacity: 0;
                    transition: opacity 0.2s;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                  `;
                  
                  // 创建内部指示器
                  const indicator = document.createElement('div');
                  indicator.style.cssText = `
                    width: 6px;
                    height: 6px;
                    background: white;
                    border-radius: 1px;
                    transform: rotate(45deg);
                  `;
                  
                  handleElement.appendChild(indicator);
                  resizeHandle.appendChild(handleElement);
                  
                  // 鼠标悬停时显示控制点
                  container.addEventListener('mouseenter', () => {
                    handleElement.style.opacity = '1';
                  });
                  
                  container.addEventListener('mouseleave', () => {
                    handleElement.style.opacity = '0';
                  });
                  
                  // 调整大小功能
                  let isResizing = false;
                  let startX = 0;
                  let startY = 0;
                  let startWidth = 0;
                  let startHeight = 0;
                  let editorView: unknown = null;
                  
                  // 获取编辑器视图
                  const getEditorView = () => {
                    const editorElement = document.querySelector('.ProseMirror');
                    if (editorElement) {
                      return (editorElement as { __editorView?: unknown }).__editorView || null;
                    }
                    return null;
                  };
                  
                  // 绑定 mousedown 事件到控制点元素
                  handleElement.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('开始调整图片大小'); // 调试日志
                    
                    isResizing = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    startWidth = imageElement.offsetWidth;
                    startHeight = imageElement.offsetHeight;
                    editorView = getEditorView();
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  });
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    if (!isResizing) return;
                    
                    const deltaX = e.clientX - startX;
                    const deltaY = e.clientY - startY;
                    
                    const newWidth = Math.max(50, startWidth + deltaX);
                    const newHeight = Math.max(50, startHeight + deltaY);
                    
                    imageElement.style.width = `${newWidth}px`;
                    imageElement.style.height = `${newHeight}px`;
                    imageElement.style.maxWidth = 'none';
                  };
                  
                  const handleMouseUp = () => {
                    if (!isResizing) return;
                    
                    isResizing = false;
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    
                    // 更新编辑器中的图片属性
                    if (editorView && typeof editorView === 'object' && editorView !== null) {
                      const view = editorView as { state: { tr: unknown; doc: { descendants: (fn: (node: { type: { name: string }; attrs: { src: string } }, pos: number) => void) => void } }; dispatch: (tr: unknown) => void };
                      const tr = view.state.tr;
                      const newAttrs = {
                        ...node.attrs,
                        width: imageElement.offsetWidth,
                        height: imageElement.offsetHeight,
                      };
                      
                      // 找到图片节点的位置并更新
                      let found = false;
                      view.state.doc.descendants((node: { type: { name: string }; attrs: { src: string } }, pos: number) => {
                        if (!found && node.type.name === 'image' && node.attrs.src === imageElement.src) {
                          (tr as { setNodeMarkup: (pos: number, type: unknown, attrs: unknown) => void }).setNodeMarkup(pos, null, newAttrs);
                          found = true;
                          return false; // 停止遍历
                        }
                      });
                      
                      if (found) {
                        view.dispatch(tr);
                      }
                    }
                  };
                  
                  container.appendChild(imageElement);
                  container.appendChild(resizeHandle);
                  
                  return container;
                });
                
                decorations.push(decoration);
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default ImageResize;
