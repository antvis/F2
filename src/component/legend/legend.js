
const Util = require('../../util/common');
const { Group } = require('../../graphic/index');

class Legend {
  getDefaultCfg() {
    return {
      /**
       * 图例在画布上的位置
       * @type {[type]}
       */
      x: 0,
      /**
       * 图例在画布上的位置
       * @type {[type]}
       */
      y: 0
    };
  }

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
    // Contains hit boxes for each legend item
    this.legendHitBoxes = [];
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
    const container = this.container;
    container.clear();
    container.remove();
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    const container = this.container;
    container && container.moveTo(x, y);
    return this;
  }
}

module.exports = Legend;
