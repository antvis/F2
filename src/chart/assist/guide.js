/**
 * @fileOverview 辅助信息的帮助类
 * @author dxq613@gmail.com
 */

const Util = require('../../util');

const GuideAssist = function(cfg) {
  Util.mix(this, cfg);
  this.guides = [];
};

Util.mix(GuideAssist.prototype, {
  guides: null,
  xScale: null,
  yScale: null,
  addGuide(guide) {
    this.guides.push(guide);
  },
  setScale(xScale, yScale) {
    const guides = this.guides;
    this.xScale = xScale;
    this.yScale = yScale;
    Util.each(guides, function(guide) {
      guide.xScale = xScale;
      guide.yScale = yScale;
    });
  },
  /**
   * 绘制辅助信息
   * @param  {Coord} coord 坐标系
   * @param  {Canvas.Group} canvas 分组
   */
  paintFront(coord, canvas) {
    const guides = this.guides;
    Util.each(guides, function(guide) {
      if (guide.top) {
        guide.paint(coord, canvas);
      }
    });
  },
  paintBack(coord, canvas) {
    const guides = this.guides;
    Util.each(guides, function(guide) {
      if (!guide.top) {
        guide.paint(coord, canvas);
      }
    });
  },
  paint(coord, canvas) {
    this.paintFront(coord, canvas);
    this.paintBack(coord, canvas);
  },
  clear(parent) {
    this.guides = [];
    this.reset(parent);
    return this;
  },
  reset(parent) {
    if (parent) {
      const guideWrpper = parent.getElementsByClassName('guideWapper')[0];
      if (guideWrpper) {
        parent.removeChild(guideWrpper);
      }
    }
  }
});

module.exports = GuideAssist;
