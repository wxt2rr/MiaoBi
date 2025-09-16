export function loadSavedTheme(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preview-theme') || 'default';
  }
  return 'default';
}

export function saveTheme(theme: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preview-theme', theme);
  }
}

import { themes } from '@/themes/markdown';

export function getAllThemes() {
  return themes.map(theme => ({
    id: theme.id,
    name: theme.name,
    description: theme.description,
    css: theme.css,
    // 为每个主题分配颜色标识
    color: getThemeColor(theme.id)
  }));
}

function getThemeColor(themeId: string): string {
  const colorMap: Record<string, string> = {
    'basic': 'bg-slate-500',
    'wechat': 'bg-green-500',
    'purple': 'bg-purple-500',
    'tender': 'bg-cyan-500',
    'red': 'bg-red-500',
    'blue': 'bg-blue-500',
    'green': 'bg-emerald-500',
    'orange': 'bg-orange-500',
    'fullstack': 'bg-indigo-500',
    'minimal-black': 'bg-gray-900',
    'grid-black': 'bg-gray-800',
    'geek-black': 'bg-black',
    'custom': 'bg-violet-500'
  };
  return colorMap[themeId] || 'bg-gray-500';
}