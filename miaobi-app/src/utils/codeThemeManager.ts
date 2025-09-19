import { CODE_THEME_OPTIONS, CODE_NUM, IS_MAC_CODE } from '@/constants/codeThemes';
import { codeThemes } from '@/themes/code';
import { replaceStyle, ensureStyleElement } from './styleHelper';

/**
 * 代码主题管理器
 */
export class CodeThemeManager {
  private static instance: CodeThemeManager;
  
  static getInstance(): CodeThemeManager {
    if (!CodeThemeManager.instance) {
      CodeThemeManager.instance = new CodeThemeManager();
    }
    return CodeThemeManager.instance;
  }

  /**
   * 获取所有代码主题选项
   */
  getAllCodeThemes() {
    return CODE_THEME_OPTIONS;
  }

  /**
   * 获取当前代码主题
   */
  getCurrentCodeTheme(): { codeNum: number; isMacCode: boolean } {
    const codeNum = parseInt(localStorage.getItem(CODE_NUM) || '0', 10);
    const isMacCode = localStorage.getItem(IS_MAC_CODE) === 'true';
    return { codeNum, isMacCode };
  }

  /**
   * 设置代码主题
   */
  setCodeTheme(codeNum: number, isMacCode: boolean = false) {
    localStorage.setItem(CODE_NUM, codeNum.toString());
    localStorage.setItem(IS_MAC_CODE, isMacCode.toString());
    
    // 应用代码主题样式
    this.applyCodeTheme(codeNum, isMacCode);
    
    // 触发自定义事件，通知其他组件主题已更改
    window.dispatchEvent(new CustomEvent('codeThemeChanged', {
      detail: { codeNum, isMacCode }
    }));
  }

  /**
   * 切换Mac风格
   */
  toggleMacStyle() {
    const { codeNum, isMacCode } = this.getCurrentCodeTheme();
    this.setCodeTheme(codeNum, !isMacCode);
  }

  /**
   * 为CSS添加作用域前缀
   */
  private addScopeToCSS(css: string): string {
    // 使用正则表达式为每个选择器添加作用域前缀
    // 支持两种代码块结构：pre.custom 和 pre（TipTap生成的）
    const scopedCss = css.replace(/(^|{|,)\s*([\.#\w\s:,>~\[\]'="]+?)\s*{/g, (match, prefix, selector) => {
      const scopedSelectors = selector.split(',')
        .map((part: string) => {
          const trimmed = part.trim();
          // 为每个选择器创建两个版本：一个用于 pre.custom，一个用于 pre
          // 同时支持 code 元素内的 hljs 类
          if (trimmed.startsWith('.hljs')) {
            return `#nice pre.custom ${trimmed}, #nice pre ${trimmed}, #nice pre.custom code${trimmed}, #nice pre code${trimmed}`;
          }
          return `#nice pre.custom ${trimmed}, #nice pre ${trimmed}`;
        })
        .join(', ');
      return `${prefix} ${scopedSelectors} {`;
    });
    // console.log('CSS作用域处理:', { originalLength: css.length, scopedLength: scopedCss.length });
    return scopedCss;
  }

  /**
   * 应用代码主题样式
   */
  public applyCodeTheme(codeNum: number, isMacCode: boolean) {
    try {
      // 确保样式元素存在
      ensureStyleElement('dynamic-code-style');

      // 如果是微信代码主题（codeNum === 0），应用微信主题而不是清空
      if (codeNum === 0) {
        const wechatTheme = codeThemes['wechat'];
        if (wechatTheme) {
          const scopedCSS = this.addScopeToCSS(wechatTheme);
          replaceStyle('dynamic-code-style', scopedCSS);
          console.log('应用微信代码主题');
        } else {
          replaceStyle('dynamic-code-style', '');
        }
        return;
      }

      const option = CODE_THEME_OPTIONS[codeNum];
      if (!option) {
        replaceStyle('dynamic-code-style', '');
        console.warn('未找到代码主题选项:', codeNum);
        return;
      }

      // 选择主题ID
      let themeId = option.id;
      if (isMacCode && option.macId) {
        themeId = option.macId;
      }

      // 获取主题CSS
      const themeCss = codeThemes[themeId as keyof typeof codeThemes];
      if (!themeCss) {
        replaceStyle('dynamic-code-style', '');
        console.warn('未找到代码主题CSS:', themeId);
        return;
      }

      // 为CSS添加作用域并应用样式
      const scopedCSS = this.addScopeToCSS(themeCss);
      replaceStyle('dynamic-code-style', scopedCSS);
    } catch (error) {
      console.error('应用代码主题失败:', error);
      replaceStyle('dynamic-code-style', '');
    }
  }

  /**
   * 初始化代码主题
   */
  initialize() {
    try {
      // 初始化localStorage值
      if (!localStorage.getItem(CODE_NUM)) {
        localStorage.setItem(CODE_NUM, '0');
      }
      if (!localStorage.getItem(IS_MAC_CODE)) {
        localStorage.setItem(IS_MAC_CODE, 'false');
      }

      // 确保样式元素存在
      ensureStyleElement('dynamic-code-style');

      // 应用当前主题
      const { codeNum, isMacCode } = this.getCurrentCodeTheme();
      this.applyCodeTheme(codeNum, isMacCode);
      
      console.log('代码主题管理器初始化成功', { codeNum, isMacCode });
    } catch (error) {
      console.error('代码主题管理器初始化失败:', error);
    }
  }
}

// 导出单例实例
export const codeThemeManager = CodeThemeManager.getInstance();