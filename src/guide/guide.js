/**
 * @fileOverview G2 图表的辅助元素
 * @author 旻诺<audrey.tm@alibaba-inc.com>
 */

const Util = require('../util');
const KEYWORDS_PERCENT = {
  min: 0,
  medium: 0.5,
  max: 1
};

function toPercent(scale, value) {
  let rst;
  if (Util.isNil(KEYWORDS_PERCENT[value])) {
    rst = scale.scale(value);
  } else {
    rst = KEYWORDS_PERCENT[value];
  }
  return rst;
}

/**
 * 图表的辅助元素
 * @class Guilde
 */
class Guide {

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      xScale: null,
      yScale: null,
      top: false,
      cfg: {}
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
  }

  /**
   * @protected
   * 转换成坐标系上的点
   * @param  {Coord} coord  坐标系
   * @param  {Array} position 点的数组 [x,y]
   * @return {Object} 转换成坐标系上的点
   */
  parsePoint(coord, position) {
    const self = this;
    const xScale = self.xScale;
    const yScale = self.yScale;
    const x = position[0];
    const y = position[1];
    let rstX;
    let rstY;
    if (xScale) {
      rstX = toPercent(xScale, x);
    } else {
      rstX = 0;
    }
    if (yScale) {
      rstY = toPercent(yScale, y);
    } else {
      rstY = 1;
    }
    return coord.convertPoint({
      x: rstX,
      y: rstY
    });
  }

  /**
   * 绘制辅助元素
   * @param  {Coord} coord  坐标系
   * @param  {Canvas.Group} group 绘制到的容器
   */
  paint(/* coord,group */) {}
}

module.exports = Guide;
