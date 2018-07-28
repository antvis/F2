const Util = require('../../util/common');
const GuideBase = require('./base');

class Point extends GuideBase {
  _initDefaultCfg() {
    this.type = 'point';
    this.position = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.pointStyle = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  }

  render(coord, container) {
    const position = this.parsePoint(coord, this.position);

    const wrapperContainer = container.addGroup({
      className: 'guide-point'
    });

    wrapperContainer.addShape('Circle', {
      className: 'guide-point-point',
      attrs: Util.mix({
        x: position.x + this.offsetX,
        y: position.y + this.offsetY,
      }, this.pointStyle)
    });

    this.element = wrapperContainer;
  }
}

GuideBase.Point = Point;
module.exports = Point;
