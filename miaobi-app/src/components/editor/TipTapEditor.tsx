'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
// 文本格式化扩展
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
// 节点扩展
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import CodeBlock from '@tiptap/extension-code-block';
// 样式扩展
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';

import { useEditorStore } from '@/stores/editor-store';
import { useAI } from '@/hooks/useAI';
import { DirectSlashCommandsExtension } from './extensions/DirectSlashCommands';
import AITypingMark from './extensions/AITypingMark';
import { TextSelectionPopupExtension } from './extensions/TextSelectionPopup';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import useImageGeneration from '@/hooks/useImageGeneration';

export default function TipTapEditor() {
  const { content, setContent, saveCurrentArticle } = useEditorStore();
  const { continueWriting, error } = useAI();
  const { generateImage, blobToDataUrl, isLoading: isGeneratingImage } = useImageGeneration();
  const [ghostText, setGhostText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [typingPosition, setTypingPosition] = useState<number | null>(null);
  const [aiContentRange, setAiContentRange] = useState<{ from: number; to: number } | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // 获取AI内容末尾的DOM位置
  const getAIEndPosition = () => {
    if (!editor || !aiContentRange) return null;
    
    try {
      // 获取AI内容末尾的坐标
      const { to } = aiContentRange;
      const coords = editor.view.coordsAtPos(to);
      return {
        left: coords.left,
        top: coords.bottom + 5, // 在文字下方5px
      };
    } catch (error) {
      console.error('获取AI位置失败:', error);
      return null;
    }
  };

  const editor = useEditor({
    extensions: [
      DirectSlashCommandsExtension, // 放在最前面确保优先处理
      // 禁用StarterKit中的一些扩展，使用我们自己的配置
      StarterKit.configure({
        bold: false,
        italic: false,
        strike: false,
        code: false,
        heading: false,
        blockquote: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
      }),
      CharacterCount,
      // 文本格式化
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Highlight,
      Superscript,
      Subscript,
      // 节点
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Blockquote,
      HorizontalRule,
      BulletList,
      OrderedList,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlock,
      // 样式
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      // AI打字标记
      AITypingMark,
      // 文本选择弹框 - 先使用空函数，后续通过useEffect更新
      TextSelectionPopupExtension.configure({
        onGenerateImage: () => {
          console.log('⚠️ 扩展配置中的空onGenerateImage被调用 - 需要等待handleImageGeneration初始化');
          return Promise.resolve();
        },
      }),
    ],
    content,
    immediatelyRender: false, // 修复 SSR 水合不匹配
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-full p-6',
      },
      // 移除handleKeyDown避免与插件冲突
    },
  });

  // 处理图像生成 - 使用useCallback确保能访问到最新的editor
  const handleImageGeneration = useCallback(async (
    selectedText: string,
    prompt: string,
    type: 'illustration' | 'diagram'
  ) => {
    if (!editor) {
      alert('编辑器未初始化，请刷新页面重试');
      return;
    }

    if (!generateImage) {
      alert('图片生成服务未初始化，请检查配置');
      return;
    }

    try {
      // 生成图片
      const result = await generateImage(selectedText, prompt, type);
      
      if (!result) {
        alert('图片生成失败，请检查API配置或网络连接');
        return;
      }

      // 转换为Data URL
      const dataUrl = await blobToDataUrl(result.blob);
      
      // 在选中文本后插入图片
      const { selection } = editor.state;
      const insertPos = selection.to;
      
      // 移动光标到选中文本后面，然后插入图片
      editor.commands.setTextSelection(insertPos);
      editor.commands.insertContent([
        { type: 'paragraph', content: [] }, // 添加一个空行
        {
          type: 'image',
          attrs: {
            src: dataUrl,
            alt: `AI生成的${type === 'illustration' ? '配图' : '图例'}`,
            title: prompt || selectedText
          }
        },
        { type: 'paragraph', content: [] } // 添加一个空行
      ]);
      
    } catch (error) {
      console.error('图片生成失败:', error);
      alert('图片生成失败: ' + (error as Error).message);
    }
  }, [editor, generateImage, blobToDataUrl]);


  // 将handleImageGeneration函数暴露到全局window对象
  useEffect(() => {
    if (handleImageGeneration) {
      (window as any).handleImageGeneration = handleImageGeneration;
    }
  }, [handleImageGeneration]);

  // 更新TextSelectionPopupExtension的配置
  useEffect(() => {
    if (editor && handleImageGeneration) {
      // 获取扩展实例
      const extension = editor.extensionManager.extensions.find(ext => ext.name === 'textSelectionPopup');
      
      if (extension) {
        // 更新扩展的options
        extension.options.onGenerateImage = handleImageGeneration;
        
        // 强制触发扩展重新初始化
        if (editor.view && editor.view.dispatch) {
          const { state } = editor.view;
          const tr = state.tr;
          editor.view.dispatch(tr);
        }
      }
    }
  }, [editor, handleImageGeneration]);

  // 处理斜杠命令事件
  useEffect(() => {
    const handleSlashCommand = async (event: CustomEvent<{ type: string; editor: unknown; range?: unknown; question?: string }>) => {
      const { type, question } = event.detail;
      
      if (!editor) {
        return;
      }

      const currentContent = editor.getText();
      
      try {
        setIsGenerating(true);
        
        // 获取当前光标位置（在所有case中都会用到）
        const currentPos = editor.state.selection.from;
        setTypingPosition(currentPos);
        
        switch (type) {
          case 'ai-continue':
            // AI续写功能 - 实现打字效果
            const generator = continueWriting(currentContent);
            let aiText = '';
            let isFirstChunk = true;
            
            // 创建一个临时的span来标记AI生成的内容
            const aiStartMarker = `<span class="ai-typing" style="color: #9CA3AF; background-color: #F3F4F6;">`;
            const aiEndMarker = `</span>`;
            
            // 记录AI内容开始位置
            const aiStartPos = currentPos;
            editor.commands.setTextSelection(currentPos);
            
            for await (const chunk of generator) {
              // 直接插入chunk，会自动应用当前的mark
              if (isFirstChunk) {
                // 第一次插入时，先设置AI打字标记
                editor.commands.setAITyping();
                editor.commands.insertContent(chunk);
                isFirstChunk = false;
              } else {
                // 后续插入时，确保仍在AI标记范围内
                editor.commands.insertContent(chunk);
              }
              
              aiText += chunk;
              
              // 小延迟模拟打字效果
              await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            // 记录AI内容的完整范围
            const aiEndPos = aiStartPos + aiText.length;
            setAiContentRange({ from: aiStartPos, to: aiEndPos });
            
            // 生成完成后，设置ghostText用于确认提示
            setGhostText(aiText);
            break;
            
          case 'ask-ai':
            // 问AI功能 - 使用和AI续写相同的交互逻辑
            if (question) {
              // 使用问题作为输入，让AI生成回答
              const answerGenerator = continueWriting(`问题：${question}\n\n回答：`);
              let askAiText = '';
              let isFirstAskChunk = true;
              
              // 记录AI内容开始位置
              const askAiStartPos = currentPos;
              editor.commands.setTextSelection(currentPos);
              
              for await (const chunk of answerGenerator) {
                // 直接插入chunk，会自动应用当前的mark
                if (isFirstAskChunk) {
                  // 第一次插入时，先设置AI打字标记
                  editor.commands.setAITyping();
                  editor.commands.insertContent(chunk);
                  isFirstAskChunk = false;
                } else {
                  // 后续插入时，确保仍在AI标记范围内
                  editor.commands.insertContent(chunk);
                }
                
                askAiText += chunk;
                
                // 小延迟模拟打字效果
                await new Promise(resolve => setTimeout(resolve, 50));
              }
              
              // 记录AI内容的完整范围
              const askAiEndPos = askAiStartPos + askAiText.length;
              setAiContentRange({ from: askAiStartPos, to: askAiEndPos });
              
              // 生成完成后，设置ghostText用于确认提示
              setGhostText(askAiText);
            }
            break;
            
        }
      } catch (error) {
        console.error('AI操作失败:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    window.addEventListener('slash-command', handleSlashCommand as unknown as EventListener);
    
    return () => {
      window.removeEventListener('slash-command', handleSlashCommand as unknown as EventListener);
    };
  }, [editor, continueWriting]);

  // 处理AI打字的确认/取消
  useEffect(() => {
    if (!editor || !ghostText) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && ghostText && aiContentRange) {
        event.preventDefault();
        
        // 确认AI内容：移除AI打字标记，文字变为黑色，去除背景
        // 选中AI内容范围
        editor.commands.setTextSelection({ from: aiContentRange.from, to: aiContentRange.to });
        // 移除AI打字标记
        editor.commands.unsetAITyping();
        
        setGhostText('');
        setTypingPosition(null);
        setAiContentRange(null);
      } else if (event.key === 'Escape' && ghostText && aiContentRange) {
        event.preventDefault();
        
        // 取消AI内容：删除AI生成的所有文字，回到生成前状态
        editor.commands.deleteRange({ from: aiContentRange.from, to: aiContentRange.to });
        
        setGhostText('');
        setTypingPosition(null);
        setAiContentRange(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, ghostText, aiContentRange]);

  // 当content从store更新时，同步到编辑器
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // 自动保存
  useEffect(() => {
    const interval = setInterval(() => {
      saveCurrentArticle();
    }, 5000); // 每5秒自动保存

    return () => clearInterval(interval);
  }, [saveCurrentArticle]);


  if (!editor) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">加载编辑器中...</div>
      </div>
    );
  }

      return (
    <div className="h-full flex flex-col relative">
      {/* 工具栏 */}
      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto">
        <EditorContent 
          editor={editor}
          className="h-full"
          ref={editorRef}
        />
        
        {/* AI打字完成后的确认提示 - 显示在AI内容末尾 */}
        {(() => {
          const aiEndPos = getAIEndPosition();
          return ghostText && aiEndPos && (
            <div 
              className="fixed bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50 pointer-events-none"
              style={{
                left: `${aiEndPos.left}px`,
                top: `${aiEndPos.top}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>AI续写完成</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> 确定 | 
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Esc</kbd> 取消
              </div>
            </div>
          );
        })()}
      </div>
      
      {/* 编辑器状态栏 */}
      <div className="p-2 border-t bg-muted/50 text-xs text-muted-foreground flex items-center justify-between">
        <div>
          字数: {editor.storage.characterCount?.characters() || 0} | 
          按 / 使用AI命令 | 
          选中文字查看润色选项
          {isGenerating && (
            <span className="ml-2 text-primary">
              <Sparkles className="h-3 w-3 inline animate-spin" />
              AI思考中...
            </span>
          )}
          {error && (
            <span className="ml-2 text-destructive">
              错误: {error}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 