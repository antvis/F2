const Util = require('../util/common');
class Plot {
  constructor(cfg) {
    Util.mix(this, cfg);
    this._init();
  }

  _init() {
    const self = this;
    const start = self.start;
    const end = self.end;
    const xMin = Math.min(start.x, end.x);
    const xMax = Math.max(start.x, end.x);
    const yMin = Math.min(start.y, end.y);
    const yMax = Math.max(start.y, end.y);

    this.tl = {
      x: xMin,
      y: yMin
    };
    this.tr = {
      x: xMax,
      y: yMin
    };
    this.bl = {
      x: xMin,
      y: yMax
    };
    this.br = {
      x: xMax,
      y: yMax
    };
    this.width = xMax - xMin;
    this.height = yMax - yMin;
  }

  /**
   * 重置
   * @param  {Object} start 起始点
   * @param  {Object} end  结束点
   */
  reset(start, end) {
    this.start = start;
    this.end = end;
    this._init();
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
    const tl = this.tl;
    const br = this.br;
    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
  }
}

module.exports = Plot;
