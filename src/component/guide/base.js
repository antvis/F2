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

  _getNormalizedValue(val, scale, direct) {
    let rst;

    if (Util.isString(val) && val.indexOf('%') !== -1) { // percentage, like '50%'
      val = parseFloat(val) / 100;
      rst = direct === 'y' ? 1 - val : val;
    } else if (Util.isNil(KEYWORDS_PERCENT[val])) {
      rst = scale.scale(val);
    } else {
      rst = KEYWORDS_PERCENT[val];
    }
    return rst;
  }

  parsePoint(coord, position) {
    const self = this;
    const xScale = self.xScale;
    const yScales = self.yScales;
    if (Util.isFunction(position)) {
      position = position(xScale, yScales); // position 必须是对象
    }

    const x = self._getNormalizedValue(position[0], xScale);
    const y = self._getNormalizedValue(position[1], yScales[0], 'y');

    const point = coord.convertPoint({ x, y });
    if (self.limitInPlot) { // limit in chart plotRange
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        return point;
      }
      return null;
    }
    return point;
  }

  /**
   * render the guide component
   * @param  {Coord} coord  coordinate instance
   * @param  {Canvas.Group} group the container
   */
  render(/* coord,group */) {}

  repaint() {
    this.remove();
    const { coord, container, canvas } = this;
    if (container && !container.isDestroyed()) {
      this.render(coord, container);
      canvas.draw();
    }
  }

  remove() {
    const { element } = this;
    element && element.remove(true);
  }
}

module.exports = GuideBase;
