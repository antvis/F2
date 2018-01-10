/**
 * TODO: tooltip 组件
 * 应该有和 category 共用的方法
 */
const Util = require('../../util/common');
const { Group } = require('../../graphic/index');
const MARKER_RADIUS = 5;
const Mixin = require('../mixin');
const Marker = require('../marker');

class Tooltip {
  getDefaultCfg() {
    return {
      /**
       * tooltip 在画布上的 x 方向上位置
       * @type {Number}
       */
      x: 0,
      /**
       * tooltip 在画布上的 y 方向上位置
       * @type {Number}
       */
      y: 0,
      /**
       * tooltip 的记录项
       * @type {Array]}
       */
      items: null,
      /**
       * tooltip 的标题文本
       * @type {[type]}
       */
      // titleText: null,
      /**
       * 是否渲染 tooltip 的标题
       * @type {Boolean}
       */
      showTitle: false,
      /**
       * TODO
       * tooltip 的标题样式
       * @type {Object}
       */
      titleStyle: {},
      /**
       * 记录项文本样式
       * @type {Object}
       */
      textStyle: {},
      /**
       * tooltip 辅助线配置
       * @type {Object}
       */
      crosshairs: null,
      /**
       * tooltip 的图形容器
       * @type {Group}
       */
      container: null,
      /**
       * 标题距离图例项的间距
       * @type {Number}
       */
      titleGap: 12,
      /**
       * 水平布局中，各个图例项之间的间距
       * @type {Number}
       */
      itemGap: 24,
      /**
       * 各个图例项下方留白的间距
       * @type {Number}
       */
      itemMarginBottom: 12,
      /**
       * marker 和文字的距离
       * @type {Number}
       */
      wordSpace: 8,
      /**
       * tooltip 容器的样式
       * @type {Object}
       */
      background: {},
      /**
       * tooltip container 的最大长度
       * @type {[type]}
       */
      maxLength: null,
      /**
       * 布局方式，horizontal 或者 vertical
       * @type {String}
       */
      layout: 'horizontal'
    };
  }

  constructor(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    this._init();

  }

  _init() {
    // if (this.custom) return; // 用户自定义，自定义逻辑在 controller 中设置
    const container = new Group({
      className: 'tooltip'
    });
    const itemsGroup = container.addGroup({
      className: 'itemsGroup'
    });
    this.itemsGroup = itemsGroup;
    this.container = container;
    // TODO: init crosshairs
  }

  setContent(title, items) {
    this._renderTitle(title);
    this._rendetItems(items);
  }

  setPosition(x, y) {
    const container = this.container;
    container.moveTo(x, y);
  }

  setMarkers() {}


  _renderTitle(title) {
    const { showTitle } = this;

    if (showTitle && title) {
      const container = this.container;
      const titleStyle = this.titleStyle;
      const titleShape = container.addShape('text', {
        className: 'tooltip-title',
        attrs: Util.mix({
          x: 0,
          y: 0,
          text: title
        }, titleStyle)
      });
      this.titleShape = titleShape;
    }
  }

  _rendetItems(items) {
    const self = this;
    if (items) {
      // item 的格式 { color, marker, name, value, x, y, origin: }
      items.map(item => {
        self._renderItem(item);
        return item;
      });
    }
  }

  _renderItem(item) {
    const self = this;
    const { color, marker, name, value } = item;
    const itemsGroup = self.itemsGroup;
    const x = self._getNextX(); // TODO
    const y = self._getNextY(); // TODO
    const itemGroup = itemsGroup.addGroup({
      x,
      y
    });

    const textStyle = self.textStyle;
    const wordSpace = self.wordSpace;
    let startX = 0;

    if (marker) { // 如果有 marker 添加marker
      const markerAttrs = {
        x: MARKER_RADIUS + x,
        y,
        fill: color,
        symbol: marker
      };

      const markerShape = new Marker({
        className: 'tooltip-marker',
        attrs: markerAttrs
      });
      itemGroup.add(markerShape);
      startX += markerShape.getBBox().width + wordSpace;
    }

    const textAttrs = Util.mix({}, textStyle, {
      x: startX + x,
      y,
      text: name + ': ' + value
    });

    itemGroup.addShape('text', {
      className: 'tooltip-text',
      attrs: textAttrs
    });

    const bbox = itemGroup.getBBox();
    const itemWidth = self.itemWidth;
    itemGroup.set('width', itemWidth || bbox.width); // 缓存宽度
    itemGroup.set('height', bbox.height); // 缓存高度
    // this.legendHitBoxes[index] = bbox;
    return itemGroup;
  }

  show() {}
  hide() {}
  destroy() {} // destroy 还是 remove
}

Util.mix(Tooltip.prototype, Mixin);


module.exports = Tooltip;
