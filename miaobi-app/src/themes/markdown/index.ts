// 主题索引文件 - 与Markdown2Html-main项目完全对齐
import { normalTheme } from './normal';
import { oneTheme } from './one';
import { twoTheme } from './two';
import { threeTheme } from './three';
import { fourTheme } from './four';
import { fiveTheme } from './five';
import { sixTheme } from './six';
import { sevenTheme } from './seven';
import { eightTheme } from './eight';
import { wghTheme } from './wgh';
import { tenTheme } from './ten';
import { elevenTheme } from './eleven';
import { twelveTheme } from './twelve';
import { thirteenTheme } from './thirteen';
import { fourteenTheme } from './fourteen';
import { fifteenTheme } from './fifteen';
import { nineTheme } from './nine';
import { customTheme } from './custom';

export interface ThemeInfo {
  id: string;
  name: string;
  css: string;
  themeId: string; // 与原项目保持一致的themeId字段
}

// 完全按照原项目Theme.js的themeList顺序和名称
export const themes: ThemeInfo[] = [
  {
    id: 'normal',
    themeId: 'normal',
    name: '默认主题',
    css: normalTheme
  },
  {
    id: 'one',
    themeId: '1',
    name: '橙心',
    css: oneTheme
  },
  {
    id: 'two',
    themeId: '2',
    name: '姹紫',
    css: twoTheme
  },
  {
    id: 'three',
    themeId: '3',
    name: '嫩青',
    css: threeTheme
  },
  {
    id: 'four',
    themeId: '4',
    name: '绿意',
    css: fourTheme
  },
  {
    id: 'five',
    themeId: '5',
    name: '红绯',
    css: fiveTheme
  },
  {
    id: 'six',
    themeId: '6',
    name: '蓝莹',
    css: sixTheme
  },
  {
    id: 'seven',
    themeId: '7',
    name: '兰青',
    css: sevenTheme
  },
  {
    id: 'eight',
    themeId: '8',
    name: '山吹',
    css: eightTheme
  },
  {
    id: 'wgh',
    themeId: '9',
    name: '网格黑',
    css: wghTheme
  },
  {
    id: 'ten',
    themeId: '10',
    name: '极客黑',
    css: tenTheme
  },
  {
    id: 'eleven',
    themeId: '11',
    name: '蔷薇紫',
    css: elevenTheme
  },
  {
    id: 'twelve',
    themeId: '12',
    name: '萌绿风',
    css: twelveTheme
  },
  {
    id: 'thirteen',
    themeId: '13',
    name: '全栈蓝',
    css: thirteenTheme
  },
  {
    id: 'fourteen',
    themeId: '14',
    name: '极简黑',
    css: fourteenTheme
  },
  {
    id: 'fifteen',
    themeId: '15',
    name: '橙蓝风',
    css: fifteenTheme
  },
  {
    id: 'nine',
    themeId: '16',
    name: '前端之巅同款',
    css: nineTheme
  },
  {
    id: 'custom',
    themeId: 'custom',
    name: '自定义',
    css: customTheme
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