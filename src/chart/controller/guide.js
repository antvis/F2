const Util = require('../../util/common');

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScale = null;
    Util.mix(this, cfg);
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
      guide.paint(coord, container);
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
}

module.exports = GuideController;
