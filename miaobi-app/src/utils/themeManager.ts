import { themes } from '@/themes/markdown';

// 使用与原项目一致的localStorage键名
const TEMPLATE_NUM = 'template_num';

export function loadSavedTheme(): number {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(TEMPLATE_NUM);
    return saved ? parseInt(saved, 10) : 0;
  }
  return 0;
}

export function saveTheme(themeIndex: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TEMPLATE_NUM, themeIndex.toString());
  }
}

export function getAllThemes() {
  return themes.map((theme, index) => ({
    id: theme.id,
    themeId: theme.themeId,
    name: theme.name,
    css: theme.css,
    index: index, // 主题在数组中的索引，对应原项目的templateNum
    // 为每个主题分配颜色标识
    color: getThemeColor(theme.id)
  }));
}

export function getThemeByIndex(index: number) {
  return themes[index] || themes[0];
}

export function getThemeById(id: string) {
  return themes.find(theme => theme.id === id) || themes[0];
}

function getThemeColor(themeId: string): string {
  const colorMap: Record<string, string> = {
    'normal': 'bg-slate-500',
    'one': 'bg-orange-500',
    'two': 'bg-purple-500',
    'three': 'bg-cyan-500',
    'four': 'bg-green-500',
    'five': 'bg-red-500',
    'six': 'bg-blue-500',
    'seven': 'bg-teal-500',
    'eight': 'bg-yellow-500',
    'wgh': 'bg-gray-800',
    'ten': 'bg-gray-900',
    'eleven': 'bg-pink-500',
    'twelve': 'bg-emerald-500',
    'thirteen': 'bg-indigo-500',
    'fourteen': 'bg-black',
    'fifteen': 'bg-amber-500',
    'nine': 'bg-sky-500',
    'custom': 'bg-violet-500'
  };
  return colorMap[themeId] || 'bg-gray-500';
}