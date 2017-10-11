/**
 * @fileOverview guide text
 * @author 旻诺<audrey.tm@alibaba-inc.com>
 */

const Guide = require('./guide');
const G = require('../graphic/g');
const Global = require('../global');

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
  // override
  paint(coord, canvas) {
    const self = this;
    const position = self.position;
    const point = self.parsePoint(coord, position);
    const cfg = self.cfg;
    const text = self.text;
    G.drawText(text, point, canvas, cfg);
  }
}

module.exports = Text;
