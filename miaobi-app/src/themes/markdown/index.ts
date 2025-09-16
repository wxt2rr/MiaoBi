// 主题索引文件
import { basicTheme } from './basic';
import { wechatTheme } from './wechat';
import { purpleTheme } from './purple';
import { tenderTheme } from './tender';
import { redTheme } from './red';
import { blueTheme } from './blue';
import { greenTheme } from './green';
import { orangeTheme } from './orange';
import { fullstackTheme } from './fullstack';
import { minimalBlackTheme } from './minimal-black';
import { gridBlackTheme } from './grid-black';
import { geekBlackTheme } from './geek-black';
import { customTheme } from './custom';

export interface ThemeInfo {
  id: string;
  name: string;
  css: string;
  description?: string;
}

export const themes: ThemeInfo[] = [
  {
    id: 'basic',
    name: '默认主题',
    css: basicTheme,
    description: '简洁的默认样式'
  },
  {
    id: 'wechat',
    name: '微信风格',
    css: wechatTheme,
    description: '适合微信公众号的样式'
  },
  {
    id: 'purple',
    name: '炫紫',
    css: purpleTheme,
    description: '优雅的紫色主题'
  },
  {
    id: 'tender',
    name: '嫩青',
    css: tenderTheme,
    description: '清新的青色主题'
  },
  {
    id: 'red',
    name: '红绯',
    css: redTheme,
    description: '热情的红色主题'
  },
  {
    id: 'blue',
    name: '蓝墨',
    css: blueTheme,
    description: '沉稳的蓝色主题'
  },
  {
    id: 'green',
    name: '绿意',
    css: greenTheme,
    description: '自然的绿色主题'
  },
  {
    id: 'orange',
    name: '橙心风',
    css: orangeTheme,
    description: '温暖的橙色主题'
  },
  {
    id: 'fullstack',
    name: '全栈蓝',
    css: fullstackTheme,
    description: '专业的全栈开发主题'
  },
  {
    id: 'minimal-black',
    name: '极简黑',
    css: minimalBlackTheme,
    description: '简约的黑色主题'
  },
  {
    id: 'grid-black',
    name: '网格黑',
    css: gridBlackTheme,
    description: '网格背景的黑色主题'
  },
  {
    id: 'geek-black',
    name: '极客黑',
    css: geekBlackTheme,
    description: '极客风格的黑色主题'
  },
  {
    id: 'custom',
    name: '自定义',
    css: customTheme,
    description: '可自定义的空白主题'
  }
];

export const getThemeById = (id: string): ThemeInfo | undefined => {
  return themes.find(theme => theme.id === id);
};

export const getThemeNames = (): string[] => {
  return themes.map(theme => theme.name);
};

export const getThemeIds = (): string[] => {
  return themes.map(theme => theme.id);
};