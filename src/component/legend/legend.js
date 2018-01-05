
const Util = require('../../util/common');
const { Group } = require('../../graphic/index');

class Legend {
  getDefaultCfg() {}

  constructor(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg); // TODO textStyle
    this._init();
    this.renderTitle();
    this.renderItems();
  }

  _init() {
    const legendContainer = new Group({
      className: 'legend'
    });
    this.container = legendContainer;
    const itemsGroup = legendContainer.addGroup({
      className: 'itemsGroup'
    });
    this.itemsGroup = itemsGroup;
  }

  renderTitle() {
    const title = this.title;
    if (title && title.text) {
      const legendContainer = this.container;
      const titleShape = legendContainer.addShape('text', {
        className: 'legend-title',
        attrs: Util.mix({
          x: 0,
          y: 0,
          fill: '#333',
          textBaseline: 'middle',
          textAlign: 'start'
        }, title)
      });
      this.titleShape = titleShape;
    }
  }

  renderItems() {}

  getWidth() {
    const container = this.container;
    const bbox = container.getBBox();
    return bbox.width;
  }

  getHeight() {
    const container = this.container;
    const bbox = container.getBBox();
    return bbox.height;
  }

  clear() {
    // TODO 需要测试
    const container = this.container;
    container.clear();
    container.remove();
  }
}

module.exports = Legend;
