const Util = require('../../util/common');

const KEYWORDS_PERCENT = {
  min: 0,
  median: 0.5,
  max: 1
};

/**
 * 图表的辅助元素
 * @class Guide
 */
class GuideBase {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      xScale: null,
      yScale: null
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    cfg = Util.deepMix({}, defaultCfg, cfg);
    Util.mix(this, cfg);
  }

  /**
   * 将原始数值归一化
   * @param  {string | number} val   原始值
   * @param  {Scale} scale 度量对象
   * @return {Number}       返回归一化后的数值
   */
  _getNormalizedValue(val, scale) {
    let rst;
    if (Util.isNil(KEYWORDS_PERCENT[val])) {
      rst = scale.scale(val);
    } else {
      rst = KEYWORDS_PERCENT[val];
    }
    return rst;
  }

  // 如果传入的值是百分比的格式，根据坐标系的起始点和宽高计算
  parsePercentPoint(coord, position) {
    const xPercent = parseFloat(position[0]) / 100;
    const yPercent = parseFloat(position[1]) / 100;
    const start = coord.start;
    const end = coord.end;
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);
    const x = width * xPercent + Math.min(start.x, end.x);
    const y = height * yPercent + Math.min(start.y, end.y);
    return {
      x,
      y
    };
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
    if (Util.isFunction(position)) {
      position = position(xScale, yScale); // position 必须是对象
    }

    // 如果数据格式是 ['50%', '50%'] 的格式
    if (Util.isString(position[0]) && position[0].indexOf('%') !== -1) {
      return this.parsePercentPoint(coord, position);
    }

    const x = self._getNormalizedValue(position[0], xScale);
    const y = self._getNormalizedValue(position[1], yScale);

    return coord.convertPoint({
      x,
      y
    });
  }

  /**
   * 绘制辅助元素
   * @param  {Coord} coord  坐标系
   * @param  {Canvas.Group} group 绘制到的容器
   */
  render(/* coord,group */) {}
}

module.exports = GuideBase;
