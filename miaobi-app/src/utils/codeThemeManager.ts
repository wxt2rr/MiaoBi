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
          
          // 如果已经有#nice前缀，直接返回
          if (trimmed.startsWith('#nice')) {
            return trimmed;
          }
          
          // 特殊处理Mac装饰选择器
          if (trimmed.includes('.custom:before') || trimmed.includes('.custom:after') || 
              trimmed.includes('pre.custom:before') || trimmed.includes('pre.custom:after')) {
            return trimmed; // 已经有#nice前缀，直接返回
          }
          
          // 处理 .custom 选择器
          if (trimmed === '.custom') {
            return `#nice ${trimmed}`;
          }
          
          // 处理 pre.custom 选择器
          if (trimmed === 'pre.custom') {
            return `#nice ${trimmed}`;
          }
          
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
    console.log('CSS作用域处理:', { originalLength: css.length, scopedLength: scopedCss.length });
    console.log('处理后的CSS片段:', scopedCss.substring(0, 1000));
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
      
      // 调试信息
      console.log('应用代码主题:', { themeId, codeNum, isMacCode, cssLength: scopedCSS.length });
      console.log('CSS内容预览:', scopedCSS.substring(0, 1000));
      
      // 检查关键选择器
      const keySelectors = [
        '#nice pre.custom',
        '#nice .custom code',
        '#nice pre.custom code.hljs',
        '#nice .custom:before'
      ];
      
      keySelectors.forEach(selector => {
        if (scopedCSS.includes(selector)) {
          console.log(`✅ 找到选择器: ${selector}`);
        } else {
          console.log(`❌ 缺少选择器: ${selector}`);
        }
      });
      
      // 检查DOM中的代码块
      setTimeout(() => {
        const codeBlocks = document.querySelectorAll('#nice pre.custom');
        console.log('找到代码块数量:', codeBlocks.length);
        if (codeBlocks.length > 0) {
          const firstBlock = codeBlocks[0] as HTMLElement;
          console.log('第一个代码块的样式:', {
            backgroundColor: getComputedStyle(firstBlock).backgroundColor,
            borderRadius: getComputedStyle(firstBlock).borderRadius,
            boxShadow: getComputedStyle(firstBlock).boxShadow,
            className: firstBlock.className
          });
          
          // 检查是否有:before伪元素
          const beforeStyle = getComputedStyle(firstBlock, '::before');
          console.log('::before伪元素样式:', {
            content: beforeStyle.content,
            display: beforeStyle.display,
            backgroundImage: beforeStyle.backgroundImage,
            height: beforeStyle.height
          });
        }
      }, 100);
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