import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Sparkles, Image as ImageIcon, BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TextSelectionPopupOptions {
  onGenerateImage: (selectedText: string, prompt: string, type: 'illustration' | 'diagram') => void;
}

// 弹框组件
const SelectionPopup: React.FC<{
  selectedText: string;
  onGenerateImage: (prompt: string, type: 'illustration' | 'diagram') => void;
  onClose: () => void;
}> = ({ selectedText, onGenerateImage, onClose }) => {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = React.useCallback(async (type: 'illustration' | 'diagram') => {
    if (isGenerating) return;

    if (typeof onGenerateImage !== 'function') {
      alert('图片生成功能未正确配置');
      return;
    }

    setIsGenerating(true);

    try {
      await onGenerateImage(prompt, type);
      
      // 2秒后关闭弹框
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('图片生成失败:', error);
      alert('图片生成失败: ' + (error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  }, [onGenerateImage, prompt, isGenerating, onClose]);

  return (
    <Card className="w-96 max-h-[80vh] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">AI生成图片</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* 选中文本显示 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">选中文本</label>
          <ScrollArea className="h-32 w-full rounded-md border p-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedText}
            </p>
          </ScrollArea>
        </div>

        {/* 提示词输入 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">提示词 (可选)</label>
          <Textarea
            value={prompt}
            onChange={(e) => {
              e.stopPropagation();
              setPrompt(e.target.value);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            placeholder="输入提示词来优化生成效果..."
            disabled={isGenerating}
            className="min-h-[60px] resize-none"
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleGenerate('illustration');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isGenerating}
            className="flex-1"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            生配图
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleGenerate('diagram');
            }}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isGenerating}
            variant="secondary"
            className="flex-1"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            生图例
          </Button>
        </div>

        {/* 加载状态 */}
        {isGenerating && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 animate-spin" />
            正在生成图片...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const TextSelectionPopupExtension = Extension.create<TextSelectionPopupOptions>({
  name: 'textSelectionPopup',

  addOptions() {
    return {
      onGenerateImage: () => {},
    };
  },

  addProseMirrorPlugins() {
    let popup: HTMLDivElement | null = null;
    let root: Root | null = null;
    let currentSelection: { from: number; to: number; text: string } | null = null;

    const hidePopup = () => {
      if (popup && root) {
        root.unmount();
        document.body.removeChild(popup);
        popup = null;
        root = null;
        currentSelection = null;
      }
    };

    const showPopup = (view: EditorView, from: number, to: number, text: string) => {
      hidePopup();

      // 创建弹框容器
      popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.zIndex = '9999';
      popup.style.pointerEvents = 'auto';
      popup.style.userSelect = 'auto';
      
      // 阻止编辑器事件干扰弹框
      popup.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
      
      popup.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      
      // 阻止编辑器焦点丢失
      popup.addEventListener('focusin', (e) => {
        e.stopPropagation();
      });
      
      document.body.appendChild(popup);

      // 计算位置
      const coords = view.coordsAtPos(to);
      popup.style.left = `${coords.left}px`;
      popup.style.top = `${coords.bottom + 5}px`;

      // 创建React根并渲染
      root = createRoot(popup);
      currentSelection = { from, to, text };

      root.render(
        <SelectionPopup
          selectedText={text}
          onGenerateImage={async (prompt: string, type: 'illustration' | 'diagram') => {
            if (currentSelection) {
              // 方法1: 尝试从window对象获取handleImageGeneration函数
              const globalHandleImageGeneration = (window as any).handleImageGeneration;
              
              if (globalHandleImageGeneration && typeof globalHandleImageGeneration === 'function') {
                try {
                  await globalHandleImageGeneration(currentSelection.text, prompt, type);
                  return;
                } catch (error) {
                  console.error('全局handleImageGeneration调用失败:', error);
                }
              }
              
              // 方法2: 检查this.options.onGenerateImage是否已正确更新
              if (typeof this.options.onGenerateImage === 'function' && this.options.onGenerateImage.toString().includes('handleImageGeneration')) {
                try {
                  await this.options.onGenerateImage(currentSelection.text, prompt, type);
                } catch (error) {
                  console.error('this.options.onGenerateImage调用失败:', error);
                }
              } else {
                alert('图片生成功能配置错误，请刷新页面重试');
              }
            }
          }}
          onClose={hidePopup}
        />
      );
    };

    return [
      new Plugin({
        key: new PluginKey('textSelectionPopup'),
        props: {
          decorations: (state) => {
            const { selection } = state;
            if (selection.empty || !selection.from || !selection.to) {
              return DecorationSet.empty;
            }

            const selectedText = state.doc.textBetween(selection.from, selection.to);
            if (selectedText.length < 3) {
              return DecorationSet.empty;
            }

            return DecorationSet.create(state.doc, [
              Decoration.widget(selection.to, () => {
                const widget = document.createElement('div');
                widget.style.display = 'none';
                return widget;
              }),
            ]);
          },
        },
        view: (view) => {
          const handleSelectionChange = () => {
            const { selection } = view.state;
            if (selection.empty || !selection.from || !selection.to) {
              hidePopup();
              return;
            }

            const selectedText = view.state.doc.textBetween(selection.from, selection.to);
            if (selectedText.length >= 3) {
              showPopup(view, selection.from, selection.to, selectedText);
            } else {
              hidePopup();
            }
          };

          // 监听选择变化
          view.dom.addEventListener('mouseup', handleSelectionChange);
          view.dom.addEventListener('keyup', handleSelectionChange);

          return {
            destroy: () => {
              view.dom.removeEventListener('mouseup', handleSelectionChange);
              view.dom.removeEventListener('keyup', handleSelectionChange);
              hidePopup();
            },
          };
        },
      }),
    ];
  },
});