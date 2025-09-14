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
                  
                  // 应用保存的尺寸
                  const applyDimensions = () => {
                    if (node.attrs.width) {
                      imageElement.style.width = `${node.attrs.width}px`;
                      imageElement.style.maxWidth = 'none';
                    }
                    if (node.attrs.height) {
                      imageElement.style.height = `${node.attrs.height}px`;
                    }
                  };
                  
                  // 立即应用尺寸（如果图片已加载）
                  if (imageElement.complete) {
                    applyDimensions();
                  } else {
                    // 如果图片未加载，等待加载完成
                    imageElement.onload = applyDimensions;
                  }
                  
                  // 使用 setTimeout 确保 DOM 更新后应用尺寸
                  setTimeout(applyDimensions, 0);
                  
                  // 创建调整大小的控制点 - 使用更明显的样式
                  const resizeHandle = document.createElement('div');
                  resizeHandle.className = 'resize-handle';
                  resizeHandle.innerHTML = `
                    <div style="
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
                    ">
                      <div style="
                        width: 6px;
                        height: 6px;
                        background: white;
                        border-radius: 1px;
                        transform: rotate(45deg);
                      "></div>
                    </div>
                  `;
                  
                  // 鼠标悬停时显示控制点
                  container.addEventListener('mouseenter', () => {
                    const handle = resizeHandle.querySelector('div') as HTMLElement;
                    if (handle) handle.style.opacity = '1';
                  });
                  
                  container.addEventListener('mouseleave', () => {
                    const handle = resizeHandle.querySelector('div') as HTMLElement;
                    if (handle) handle.style.opacity = '0';
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
                  
                  resizeHandle.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
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
