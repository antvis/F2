/**
 * @fileOverview DOM 的工具类
 * @author dxq613@gmail.com
 */

const DomUtil = {

  /**
   * 修改CSS
   * @param  {Object} DOM DOM元素
   * @param  {Object} CSS 键值对
   * @return {Object} DOM
   */
  modiCSS(DOM, CSS) {
    let key;

    for (key in CSS) {
      if (CSS.hasOwnProperty(key) === true) {
        DOM.style[key] = CSS[key];
      }
    }
    return DOM;
  },

  /**
   * 创建DOM 节点
   * @param  {String} str Dom 字符串
   * @return {HTMLElement}  DOM 节点
   */
  createDom(str) {
    const container = document.createElement('div');
    str = str.replace(/(^\s*)|(\s*$)/g, '');
    container.innerHTML = '' + str;
    return container.childNodes[0];
  },
   /**
   * 获取样式
   * @param  {HTMLElement} el  dom节点
   * @param  {String} name 样式名
   * @return {String} 属性值
   */
  getStyle(el, name) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(el, null)[name];
    }
    return el.currentStyle[name];
  },
  /**
   * 获取宽度
   * @param  {HTMLElement} el  dom节点
   * @return {Number} 宽度
   */
  getWidth(el) {
    let width = this.getStyle(el, 'width');
    if (width === 'auto') {
      width = el.offsetWidth;
    }
    return parseFloat(width);
  },
  /**
   * 获取高度
   * @param  {HTMLElement} el  dom节点
   * @return {Number} 高度
   */
  getHeight(el) {
    let height = this.getStyle(el, 'height');
    if (height === 'auto') {
      height = el.offsetHeight;
    }
    return parseFloat(height);
  }
};

module.exports = DomUtil;
