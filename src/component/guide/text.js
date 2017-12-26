const Util = require('../../util/common');
const GuideBase = require('./base');
const Global = require('../../global');

class Text extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'text',
      top: true, // 默认显示在上面
      position: [],
      text: '',
      cfg: Global.guide.text
    };
  }

  render(coord, container) {
    const position = this.position;
    const point = this.parsePoint(coord, position);
    const cfg = this.cfg;
    const text = this.text;

    if (cfg.offset) {
      point.x += cfg.offset[0];
      point.y += cfg.offset[1];
    }

    container.addShape('text', {
      className: 'guide-text',
      attrs: Util.mix({
        x: point.x,
        y: point.y,
        text
      }, cfg)
    });
  }
}

module.exports = Text;
