const Util = require('../../util/common');
const Guide = require('./guide');
const Global = require('../../global');

/**
 * 辅助文本
 * @class Guide.Text
 */
class Text extends Guide {
  getDefaultCfg() {
    return {
      type: 'text',
      top: true, // 默认显示在上面
      position: [],
      text: '',
      cfg: Global.guide.text
    };
  }

  paint(coord, container) {
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
