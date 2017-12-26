const Util = require('../util/common');
const { Guide } = require('../component/index');

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScale = null;
    Util.mix(this, cfg);
  }

  _getScale() {
    return {
      xScale: this.xScale,
      yScale: this.yScale
    };
  }

  addGuide(guide) {
    this.guides.push(guide);
  }

  setScale(xScale, yScale) {
    const guides = this.guides;
    this.xScale = xScale;
    this.yScale = yScale;
    Util.each(guides, function(guide) {
      guide.xScale = xScale;
      guide.yScale = yScale;
    });
  }

  paint(coord) {
    const self = this;
    const guides = self.guides;
    Util.each(guides, function(guide) {
      const container = guide.top ? self.frontPlot : self.backPlot;
      guide.render(coord, container);
    });
  }

  clear(parent) {
    this.guides = [];
    this.reset(parent);
    return this;
  }

  reset(parent) {
    if (parent) {
      const guideWrpper = parent.getElementsByClassName('guideWapper')[0];
      if (guideWrpper) {
        parent.removeChild(guideWrpper);
      }
    }
  }
  /**
   * 添加辅助线
   * @chainable
   * @param  {Array} start 起始点
   * @param  {Array} end   结束点
   * @param  {Object} cfg  配置项
   * @return {Object} guideController 对象
   */
  line(start, end, cfg) {
    const config = {
      start,
      end,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getScale());
    const guide = new Guide.Line(config);
    this.addGuide(guide);
    return this;
  }
  /**
   * 添加辅助文本
   * @chainable
   * @param  {Array} position 文本位置
   * @param  {String} text   文本
   * @param  {Object} cfg  配置项
   * @return {Object} guideController 对象
   */
  text(position, text, cfg) {
    const config = {
      position,
      text,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getScale());
    const guide = new Guide.Text(config);
    this.addGuide(guide);
    return this;
  }
  /**
   * 添加辅助弧线
   * @chainable
   * @param  {Array} start 弧线开始点
   * @param  {Array} end 弧线结束点
   * @param  {Object} cfg  配置项
   * @return {Object} guideController 对象
   */
  arc(start, end, cfg) {
    const config = {
      start,
      end,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getScale());
    const guide = new Guide.Arc(config);
    this.addGuide(guide);
    return this;
  }
  /**
   * 添加辅助
   * @chainable
   * @param  {Array} position 位置
   * @param  {String} html html文本
   * @param  {Object} cfg  配置项
   * @return {Object} guideController 对象
   */
  html(position, html, cfg) {
    const config = {
      position,
      html,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getScale());
    const guide = new Guide.Html(config);
    this.addGuide(guide);
    return this;
  }
  /**
   * 添加辅助框
   * @param  {Array} start 辅助框起点，左上角
   * @param  {Array} end   辅助框终点，右下角
   * @param  {Object} cfg   配置项
   * @return {Object}       guideController 对象
   */
  rect(start, end, cfg) {
    const config = {
      start,
      end,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getScale());
    const guide = new Guide.Rect(config);
    this.addGuide(guide);
    return this;
  }
}

module.exports = {
  init(chart) {
    const guideController = new GuideController({
      frontPlot: chart.get('frontPlot'),
      backPlot: chart.get('backPlot')
    });
    chart.set('guideController', guideController);
    // chart.__proto__.guide = function() {
    //   return guideController;
    // };
  },
  beforeGeomDraw(chart) {
    const guideController = chart.get('guideController');
    if (!guideController.guides.length) {
      return;
    }
    const xScale = chart._getXScale();
    const yScale = chart._getYScales()[0];
    const coord = chart.get('coord');
    guideController.setScale(xScale, yScale);
    guideController.paint(coord);
  },
  clear(chart) {
    const guideController = chart.get('guideController');
    guideController.clear();
  },
  repaint(chart) {
    const parent = chart.get('canvas').parentNode;
    chart.get('guideController').reset(parent);
  }
};
