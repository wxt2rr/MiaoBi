// 字体主题索引文件 - 参考Markdown2Html-main项目
export interface FontThemeInfo {
  id: string;
  name: string;
  css: string;
}

// 字体主题列表（需要根据原项目确定具体的字体主题）
export const fontThemes: FontThemeInfo[] = [
  {
    id: 'default',
    name: '默认字体',
    css: '' // 空CSS表示使用默认字体
  },
  {
    id: 'serif',
    name: '宋体',
    css: `
#nice {
  font-family: "Times New Roman", "宋体", serif !important;
}
#nice p, #nice li, #nice blockquote p {
  font-family: "Times New Roman", "宋体", serif !important;
}
    `
  },
  {
    id: 'sans-serif',
    name: '黑体',
    css: `
#nice {
  font-family: "Helvetica Neue", "黑体", "Microsoft YaHei", sans-serif !important;
}
#nice p, #nice li, #nice blockquote p {
  font-family: "Helvetica Neue", "黑体", "Microsoft YaHei", sans-serif !important;
}
    `
  }
];

export const getFontThemeById = (id: string): FontThemeInfo | undefined => {
  return fontThemes.find(theme => theme.id === id);
};

export const getFontThemeByIndex = (index: number): FontThemeInfo => {
  return fontThemes[index] || fontThemes[0];
};