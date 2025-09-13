'use client';

import { Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import Suggestion from '@tiptap/suggestion';
import { Editor } from '@tiptap/react';
import { Sparkles, MessageCircle, Send } from 'lucide-react';
import { createRoot, Root } from 'react-dom/client';

interface CommandItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
}

// 直接渲染的React组件
function SlashMenu({ 
  items, 
  selectedIndex, 
  onSelect, 
  position,
  showAskAI,
  question,
  onQuestionChange,
  onAskAI,
  isAsking
}: {
  items: CommandItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  position: { x: number; y: number };
  showAskAI: boolean;
  question: string;
  onQuestionChange: (value: string) => void;
  onAskAI: () => void;
  isAsking: boolean;
}) {
  if (showAskAI) {
    return (
      <div 
        className="fixed bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-[320px] max-w-[400px]"
        style={{ 
          left: position.x, 
          top: position.y + 8, 
          zIndex: 99999 
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-900 text-sm">问AI</span>
        </div>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ask AI what you want..."
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onAskAI();
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Enter 发送 • Esc 取消
            </span>
            <button
              onClick={onAskAI}
              disabled={!question.trim() || isAsking}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isAsking ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  发送
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bg-white border border-gray-200 rounded-lg shadow-xl p-2 min-w-[240px] max-w-[280px]"
      style={{ 
        left: position.x, 
        top: position.y + 8, 
        zIndex: 99999 
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
            index === selectedIndex 
              ? 'bg-blue-50 border border-blue-200' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelect(index)}
        >
          <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-gray-100 rounded-md">
            <item.icon className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm">{item.title}</div>
            <div className="text-xs text-gray-500 truncate">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const DirectSlashCommandsExtension = Extension.create({
  name: 'directSlashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        pluginKey: new PluginKey('directSlashCommands'),
        command: ({ editor, range, props }: { editor: Editor; range: { from: number; to: number }; props: CommandItem }) => {
          // 处理命令
        },
      },
    };
  },

  addProseMirrorPlugins() {
    
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,

        items: ({ query }: { query: string }) => {
          
          const commands: CommandItem[] = [
            {
              title: 'AI续写',
              description: '基于上下文智能续写内容',
              icon: Sparkles,
              action: 'ai-continue',
            },
            {
              title: '问AI',
              description: '向AI提问并获得回答',
              icon: MessageCircle,
              action: 'ask-ai',
            },
          ];

          return commands.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
          );
        },

        render: () => {
          let popup: HTMLDivElement;
          let root: Root;
          let selectedIndex = 0;
          let showAskAI = false;
          let question = '';
          let isAsking = false;
          let currentEditor: Editor;
          let currentRange: { from: number; to: number };

          const updateMenu = () => {
            if (!root || !popup) return;
            
            const rect = popup.getBoundingClientRect();
            const position = { x: rect.left, y: rect.top };
            
            root.render(
              <SlashMenu
                items={[
                  {
                    title: 'AI续写',
                    description: '基于上下文智能续写内容',
                    icon: Sparkles,
                    action: 'ai-continue',
                  },
                  {
                    title: '问AI',
                    description: '向AI提问并获得回答',
                    icon: MessageCircle,
                    action: 'ask-ai',
                  },
                ]}
                selectedIndex={selectedIndex}
                onSelect={(index) => {
                  const actions = ['ai-continue', 'ask-ai'];
                  const action = actions[index];
                  
                  if (action === 'ask-ai') {
                    showAskAI = true;
                    updateMenu();
                  } else {
                    // 检查 currentRange 是否存在
                    if (currentRange) {
                      // 删除斜杠
                      currentEditor.chain().focus().deleteRange(currentRange).run();
                    }
                    
                    // 发送事件
                    const event = new CustomEvent('slash-command', { 
                      detail: { type: action, editor: currentEditor, range: currentRange || { from: 0, to: 0 } } 
                    });
                    window.dispatchEvent(event);
                    
                    // 清理
                    cleanup();
                  }
                }}
                position={position}
                showAskAI={showAskAI}
                question={question}
                onQuestionChange={(value) => {
                  question = value;
                  updateMenu();
                }}
                onAskAI={() => {
                  if (!question.trim()) return;
                  
                  isAsking = true;
                  updateMenu();
                  
                  // 删除斜杠
                  currentEditor.chain().focus().deleteRange(currentRange).run();
                  
                  // 发送问AI事件
                  const event = new CustomEvent('slash-command', { 
                    detail: { 
                      type: 'ask-ai', 
                      editor: currentEditor, 
                      range: currentRange,
                      question: question.trim()
                    } 
                  });
                  window.dispatchEvent(event);
                  
                  // 清理
                  cleanup();
                }}
                isAsking={isAsking}
              />
            );
          };

          const cleanup = () => {
            if (root) {
              root.unmount();
            }
            if (popup && popup.parentNode) {
              popup.parentNode.removeChild(popup);
            }
          };

          return {
            onStart: (props: { editor: Editor; clientRect?: () => DOMRect; range: { from: number; to: number } }) => {
              
              currentEditor = props.editor;
              currentRange = props.range;
              
              // 重置状态
              selectedIndex = 0;
              showAskAI = false;
              question = '';
              isAsking = false;
              
              // 创建容器
              popup = document.createElement('div');
              popup.style.position = 'absolute';
              popup.style.pointerEvents = 'auto';
              document.body.appendChild(popup);
              
              // 创建React根
              root = createRoot(popup);
              
              // 定位
              if (props.clientRect) {
                const rect = props.clientRect();
                popup.style.left = `${rect.x}px`;
                popup.style.top = `${rect.y + rect.height}px`;
              }
              
              // 渲染菜单
              updateMenu();
            },

            onUpdate(props: { editor: Editor; clientRect?: () => DOMRect; range: { from: number; to: number } }) {
              
              currentRange = props.range;
              
              // 更新位置
              if (props.clientRect && popup) {
                const rect = props.clientRect();
                popup.style.left = `${rect.x}px`;
                popup.style.top = `${rect.y + rect.height}px`;
              }
            },

            onKeyDown(props: { event: KeyboardEvent }) {
              if (props.event.key === 'Escape') {
                cleanup();
                return true;
              }

              if (showAskAI) {
                // 在问AI模式下，让输入框处理键盘事件
                return false;
              }

              if (props.event.key === 'ArrowUp') {
                selectedIndex = Math.max(0, selectedIndex - 1);
                updateMenu();
                return true;
              }

              if (props.event.key === 'ArrowDown') {
                selectedIndex = Math.min(1, selectedIndex + 1);
                updateMenu();
                return true;
              }

              if (props.event.key === 'Enter') {
                const actions = ['ai-continue', 'ask-ai'];
                const action = actions[selectedIndex];
                
                if (action === 'ask-ai') {
                  showAskAI = true;
                  updateMenu();
                } else {
                  // 检查 currentRange 是否存在
                  if (currentRange) {
                    // 删除斜杠
                    currentEditor.chain().focus().deleteRange(currentRange).run();
                  }
                  
                  // 发送事件
                  const event = new CustomEvent('slash-command', { 
                    detail: { type: action, editor: currentEditor, range: currentRange || { from: 0, to: 0 } } 
                  });
                  window.dispatchEvent(event);
                  
                  // 清理
                  cleanup();
                }
                return true;
              }

              return false;
            },

            onExit() {
              cleanup();
            },
          };
        },
      }),
    ];
  },
});
