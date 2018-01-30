/**
 * @fileOverview 绘图区域
 * @author dxq613@gmail.com
 */

const Util = require('../util');

/**
 * 画布绘制图表的区域
 * @class Plot
 */
class Plot {

  get(name) {
    return this[name];
  }

  set(name, value) {
    this[name] = value;
  }

  constructor(cfg) {
    Util.mix(this, cfg);
    this.__init();
  }

  // 初始化，设置4个顶点
  __init() {
    const self = this;
    const start = self.get('start');
    const end = self.get('end');

    const tl = {};
    tl.x = Math.min(start.x, end.x);
    tl.y = Math.min(start.y, end.y);
    self.set('tl', tl);

    const tr = {};
    tr.x = Math.max(start.x, end.x);
    tr.y = Math.min(start.y, end.y);
    self.set('tr', tr);

    const bl = {};
    bl.x = Math.min(start.x, end.x);
    bl.y = Math.max(start.y, end.y);
    self.set('bl', bl);


    const br = {};
    br.x = Math.max(start.x, end.x);
    br.y = Math.max(start.y, end.y);
    self.set('br', br);

    self.set('width', br.x - tl.x);
    self.set('height', br.y - tl.y);
  }

  /**
   * 重置
   * @param  {Object} start 起始点
   * @param  {Object} end  结束点
   */
  reset(start, end) {
    this.set('start', start);
    this.set('end', end);
    this.__init();
  }

  /**
   * 点是否在图表的绘制区域内
   * @param  {Nubmer}  x x坐标点
   * @param  {[type]}  y y坐标点
   * @return {Boolean} 是否在绘制区域内
   */
  isInRange(x, y) {
    if (Util.isObject(x)) {
      y = x.y;
      x = x.x;
    }
    const tl = this.get('tl');
    const br = this.get('br');
    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
  }
}

module.exports = Plot;
