import { FONT_THEME_OPTIONS, FONT_NUM } from '@/constants/fontThemes';
import { fontThemes } from '@/themes/font';
import { replaceStyle, ensureStyleElement } from './styleHelper';

/**
 * 字体主题管理器
 */
export class FontThemeManager {
  private static instance: FontThemeManager;
  
  static getInstance(): FontThemeManager {
    if (!FontThemeManager.instance) {
      FontThemeManager.instance = new FontThemeManager();
    }
    return FontThemeManager.instance;
  }

  /**
   * 获取所有字体主题选项
   */
  getAllFontThemes() {
    return FONT_THEME_OPTIONS;
  }

  /**
   * 获取当前字体主题
   */
  getCurrentFontTheme(): number {
    const fontNum = parseInt(localStorage.getItem(FONT_NUM) || '0', 10);
    return fontNum;
  }

  /**
   * 设置字体主题
   */
  setFontTheme(fontNum: number) {
    localStorage.setItem(FONT_NUM, fontNum.toString());
    
    // 应用字体主题样式
    this.applyFontTheme(fontNum);
    
    // 触发自定义事件，通知其他组件主题已更改
    window.dispatchEvent(new CustomEvent('fontThemeChanged', {
      detail: { fontNum }
    }));
  }

  /**
   * 应用字体主题样式
   */
  private applyFontTheme(fontNum: number) {
    // 确保样式元素存在
    ensureStyleElement('dynamic-font-style');

    const fontTheme = fontThemes[fontNum];
    if (!fontTheme) {
      replaceStyle('dynamic-font-style', '');
      return;
    }

    // 应用字体样式
    replaceStyle('dynamic-font-style', fontTheme.css);
  }

  /**
   * 初始化字体主题
   */
  initialize() {
    // 初始化localStorage值
    if (!localStorage.getItem(FONT_NUM)) {
      localStorage.setItem(FONT_NUM, '0');
    }

    // 应用当前主题
    const fontNum = this.getCurrentFontTheme();
    this.applyFontTheme(fontNum);
  }
}

// 导出单例实例
export const fontThemeManager = FontThemeManager.getInstance();