import type { ThemeConfig } from '@/types';
import { ExportService } from './export-service';

export class ThemePreviewService {
  /**
   * 生成带主题样式的预览HTML
   */
  static generatePreviewHTMLWithTheme(
    content: string, 
    theme: ThemeConfig,
    mode: 'mobile' | 'desktop' = 'mobile'
  ): string {
    const sanitized = ExportService.sanitizeHTML(content, { inlineStyles: true });
    const themeStyles = this.generateThemeStyles(theme);
    
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>微信文章预览</title>
  <style>
    ${themeStyles}
    
    /* 基础样式重置 */
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: ${theme.fonts.body.family};
      font-size: ${theme.wechat.fontSize}px;
      line-height: ${theme.wechat.lineHeight};
      color: ${theme.colors.text.primary};
      background-color: ${theme.preview.backgroundColor};
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .preview-container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: #f6f8fa;
    }
    
    .wechat-article {
      max-width: ${mode === 'mobile' ? '375px' : '100%'};
      width: 100%;
      background: ${theme.preview.backgroundColor};
      border-radius: ${theme.preview.borderRadius};
      padding: ${theme.preview.padding};
      box-shadow: ${theme.preview.boxShadow};
      border: 1px solid ${theme.preview.borderColor || theme.colors.border};
      overflow: hidden;
      position: relative;
      min-height: ${mode === 'mobile' ? '667px' : 'auto'};
    }
    
    /* 移动端特殊样式 */
    ${mode === 'mobile' ? `
    .wechat-article {
      max-height: 667px;
      overflow-y: auto;
    }
    
    .wechat-article::-webkit-scrollbar {
      width: 4px;
    }
    
    .wechat-article::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .wechat-article::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2);
      border-radius: 2px;
    }
    ` : ''}
    
    /* 桌面端特殊样式 */
    ${mode === 'desktop' ? `
    .preview-container {
      align-items: flex-start;
      padding: 20px;
      min-height: 100vh;
    }
    
    .wechat-article {
      max-width: 800px;
      min-height: auto;
      max-height: none;
      overflow-y: visible;
    }
    ` : ''}
    
    /* 标题样式 */
    .wechat-article h1 {
      font-family: ${theme.fonts.heading.family};
      font-size: ${theme.fonts.heading.size.h1};
      font-weight: ${theme.fonts.heading.weight};
      color: ${theme.colors.primary};
      margin: ${theme.spacing.heading}rem 0 ${theme.spacing.element}rem 0;
      line-height: 1.2;
      border-bottom: 2px solid ${theme.colors.primary};
      padding-bottom: 0.5rem;
    }
    
    .wechat-article h2 {
      font-family: ${theme.fonts.heading.family};
      font-size: ${theme.fonts.heading.size.h2};
      font-weight: ${theme.fonts.heading.weight};
      color: ${theme.colors.primary};
      margin: ${theme.spacing.heading}rem 0 ${theme.spacing.element}rem 0;
      line-height: 1.2;
    }
    
    .wechat-article h3 {
      font-family: ${theme.fonts.heading.family};
      font-size: ${theme.fonts.heading.size.h3};
      font-weight: ${theme.fonts.heading.weight};
      color: ${theme.colors.text.primary};
      margin: ${theme.spacing.heading}rem 0 ${theme.spacing.element}rem 0;
      line-height: 1.2;
    }
    
    .wechat-article h4 {
      font-family: ${theme.fonts.heading.family};
      font-size: ${theme.fonts.heading.size.h4};
      font-weight: ${theme.fonts.heading.weight};
      color: ${theme.colors.text.primary};
      margin: ${theme.spacing.heading}rem 0 ${theme.spacing.element}rem 0;
      line-height: 1.2;
    }
    
    /* 段落样式 */
    .wechat-article p {
      margin: ${theme.spacing.paragraph}rem 0;
      text-align: justify;
      word-break: break-word;
      line-height: ${theme.fonts.body.lineHeight};
    }
    
    /* 强调样式 */
    .wechat-article strong, .wechat-article b {
      font-weight: bold;
      color: ${theme.colors.primary};
    }
    
    .wechat-article em, .wechat-article i {
      font-style: italic;
      color: ${theme.colors.secondary};
    }
    
    /* 引用块样式 */
    .wechat-article blockquote {
      border-left: 4px solid ${theme.components.blockquote.borderColor};
      background-color: ${theme.components.blockquote.backgroundColor};
      padding: ${theme.components.blockquote.padding};
      margin: ${theme.spacing.section}rem 0;
      border-radius: 4px;
      position: relative;
    }
    
    .wechat-article blockquote::before {
      content: '"';
      font-size: 4rem;
      color: ${theme.colors.primary};
      position: absolute;
      top: -10px;
      left: 10px;
      opacity: 0.3;
    }
    
    /* 代码样式 */
    .wechat-article code {
      background-color: ${theme.components.code.backgroundColor};
      border: 1px solid ${theme.components.code.borderColor};
      border-radius: ${theme.components.code.borderRadius};
      padding: 2px 6px;
      font-family: ${theme.fonts.code.family};
      font-size: ${theme.fonts.code.size};
      color: ${theme.colors.text.primary};
    }
    
    .wechat-article pre {
      background-color: ${theme.components.code.backgroundColor};
      border: 1px solid ${theme.components.code.borderColor};
      border-radius: ${theme.components.code.borderRadius};
      padding: 16px;
      overflow-x: auto;
      margin: ${theme.spacing.section}rem 0;
    }
    
    .wechat-article pre code {
      background: none;
      border: none;
      padding: 0;
    }
    
    /* 链接样式 */
    .wechat-article a {
      color: ${theme.components.link.color};
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.2s ease;
    }
    
    .wechat-article a:hover {
      color: ${theme.components.link.hoverColor};
      border-bottom-color: ${theme.components.link.hoverColor};
    }
    
    /* 列表样式 */
    .wechat-article ul, .wechat-article ol {
      padding-left: 1.5em;
      margin: ${theme.spacing.paragraph}rem 0;
    }
    
    .wechat-article li {
      margin: 0.5em 0;
      line-height: ${theme.fonts.body.lineHeight};
    }
    
    .wechat-article ul li {
      list-style-type: disc;
    }
    
    .wechat-article ol li {
      list-style-type: decimal;
    }
    
    /* 图片样式 */
    .wechat-article img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: ${theme.spacing.element}rem 0;
      display: block;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    /* 表格样式 */
    .wechat-article table {
      width: 100%;
      border-collapse: collapse;
      margin: ${theme.spacing.section}rem 0;
      background: ${theme.colors.background};
    }
    
    .wechat-article th, .wechat-article td {
      border: 1px solid ${theme.colors.border};
      padding: 8px 12px;
      text-align: left;
    }
    
    .wechat-article th {
      background-color: ${theme.colors.surface};
      font-weight: bold;
      color: ${theme.colors.primary};
    }
    
    /* 分割线样式 */
    .wechat-article hr {
      border: none;
      height: 2px;
      background: linear-gradient(to right, transparent, ${theme.colors.border}, transparent);
      margin: ${theme.spacing.section}rem 0;
    }
    
    /* 响应式调整 */
    @media (max-width: 768px) {
      .preview-container {
        padding: 10px;
      }
      
      .wechat-article {
        max-width: 100%;
        padding: 16px;
      }
      
      .wechat-article h1 {
        font-size: 1.5rem;
      }
      
      .wechat-article h2 {
        font-size: 1.3rem;
      }
      
      .wechat-article h3 {
        font-size: 1.2rem;
      }
    }
  </style>
</head>
<body>
  <div class="preview-container">
    <div class="wechat-article">
      ${sanitized || '<p style="color: #999; text-align: center; font-style: italic;">开始写作，这里将实时显示微信效果预览...</p>'}
    </div>
  </div>
</body>
</html>`.trim();
  }

  /**
   * 生成主题样式CSS
   */
  private static generateThemeStyles(theme: ThemeConfig): string {
    return `
      /* 主题变量 */
      :root {
        --theme-primary: ${theme.colors.primary};
        --theme-secondary: ${theme.colors.secondary};
        --theme-accent: ${theme.colors.accent};
        --theme-background: ${theme.colors.background};
        --theme-surface: ${theme.colors.surface};
        --theme-text-primary: ${theme.colors.text.primary};
        --theme-text-secondary: ${theme.colors.text.secondary};
        --theme-text-muted: ${theme.colors.text.muted};
        --theme-border: ${theme.colors.border};
        --theme-font-heading: ${theme.fonts.heading.family};
        --theme-font-body: ${theme.fonts.body.family};
        --theme-font-code: ${theme.fonts.code.family};
      }
    `;
  }

  /**
   * 生成微信兼容的HTML（用于复制）
   */
  static generateWechatHTMLWithTheme(content: string, theme: ThemeConfig): string {
    const sanitized = ExportService.sanitizeHTML(content, { inlineStyles: true });
    
    return `
<section class="wechat-article" style="font-family: ${theme.fonts.body.family}; font-size: ${theme.wechat.fontSize}px; line-height: ${theme.wechat.lineHeight}; color: ${theme.colors.text.primary}; background-color: ${theme.colors.background}; max-width: ${theme.wechat.maxWidth}; margin: 0 auto; padding: 20px;">
  ${sanitized}
</section>`.trim();
  }
}
