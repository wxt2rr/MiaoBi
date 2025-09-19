'use client';

import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Code2, 
  FileCode
} from 'lucide-react';

interface CodeGroupProps {
  editor: Editor;
}

const LANGUAGES = [
  { value: 'bash', label: 'Bash' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'sql', label: 'SQL' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'r', label: 'R' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'dockerfile', label: 'Dockerfile' },
  { value: 'nginx', label: 'Nginx' },
  { value: 'apache', label: 'Apache' },
  { value: 'shell', label: 'Shell' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'vim', label: 'Vim' },
  { value: 'diff', label: 'Diff' },
];

export function CodeGroup({ editor }: CodeGroupProps) {
  // 获取当前代码块的语言
  const getCurrentLanguage = () => {
    if (editor.isActive('codeBlock')) {
      const attrs = editor.getAttributes('codeBlock');
      return attrs.language || 'bash';
    }
    return 'bash';
  };

  const handleLanguageChange = (language: string) => {
    if (editor.isActive('codeBlock')) {
      editor.chain().focus().updateAttributes('codeBlock', { language }).run();
    } else {
      // 如果当前不是代码块，先创建代码块再设置语言
      editor.chain().focus().setCodeBlock({ language }).run();
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* 行内代码 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="行内代码"
      >
        <Code2 className="h-4 w-4" />
      </Toggle>

      {/* 代码块 */}
      <Toggle
        size="sm"
        pressed={editor.isActive('codeBlock')}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="代码块"
      >
        <FileCode className="h-4 w-4" />
      </Toggle>

      {/* 语言选择器 - 只在代码块激活时显示 */}
      {editor.isActive('codeBlock') && (
        <Select value={getCurrentLanguage()} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
