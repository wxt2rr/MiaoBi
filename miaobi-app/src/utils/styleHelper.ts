/**
 * 样式辅助函数，参考Markdown2Html-main项目的实现
 */

/**
 * 替换指定ID的样式元素内容
 * @param id 样式元素的ID
 * @param css CSS内容
 */
export const replaceStyle = (id: string, css: string): void => {
  const style = document.getElementById(id) as HTMLStyleElement;
  if (!style) {
    console.warn(`样式元素 #${id} 未找到，尝试创建`);
    const newStyle = ensureStyleElement(id);
    newStyle.textContent = css;
    console.log(`创建并设置样式元素 #${id}，内容长度: ${css.length}`);
    return;
  }

  try {
    style.textContent = css;
    console.log(`更新样式元素 #${id}，内容长度: ${css.length}`);
  } catch (e) {
    console.error('设置样式内容失败:', e);
    // 备选方案
    try {
      style.innerHTML = css;
      console.log(`使用innerHTML备选方案成功更新 #${id}`);
    } catch (e2) {
      console.error('innerHTML备选方案也失败:', e2);
    }
  }

  // 确保样式元素在head中
  const head = document.getElementsByTagName("head")[0];
  if (style.parentNode !== head) {
    head.appendChild(style);
    console.log(`将样式元素 #${id} 移动到head中`);
  }
};

/**
 * 确保样式元素存在，如果不存在则创建
 * @param id 样式元素的ID
 */
export const ensureStyleElement = (id: string): HTMLStyleElement => {
  let style = document.getElementById(id) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.id = id;
    document.head.appendChild(style);
  }
  return style;
};