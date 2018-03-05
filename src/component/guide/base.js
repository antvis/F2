const Util = require('../../util/common');

const KEYWORDS_PERCENT = {
  min: 0,
  median: 0.5,
  max: 1
};

class GuideBase {
  _initDefaultCfg() {}

  constructor(cfg) {
    this._initDefaultCfg();
    Util.deepMix(this, cfg);
  }

  _getNormalizedValue(val, scale) {
    let rst;
    if (Util.isNil(KEYWORDS_PERCENT[val])) {
      rst = scale.scale(val);
    } else {
      rst = KEYWORDS_PERCENT[val];
    }
    return rst;
  }

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

  parsePoint(coord, position) {
    const self = this;
    const xScale = self.xScale;
    const yScales = self.yScales;
    if (Util.isFunction(position)) {
      position = position(xScale, yScales); // position 必须是对象
    }

    // 如果数据格式是 ['50%', '50%'] 的格式
    if (Util.isString(position[0]) && position[0].indexOf('%') !== -1) {
      return this.parsePercentPoint(coord, position);
    }

    const x = self._getNormalizedValue(position[0], xScale);
    const y = self._getNormalizedValue(position[1], yScales[0]);

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

  remove() {
    const { element } = this;
    element && element.remove(true);
  }
}

module.exports = GuideBase;
