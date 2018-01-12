const Util = require('../../util/common');
const Legend = require('./legend');
const Marker = require('../marker');
const Mixin = require('../mixin');

class CategoryLegend extends Legend {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 图例的标题，默认不展示
       * @type {?Object}
       */
      title: null,
      /**
       * 图例项的集合
       * @type {?Array}
       */
      items: null,
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
       * 图例项被取消选中的颜色
       * @type {String}
       */
      unCheckColor: '#bfbfbf',
      /**
       * 图例项文本内容格式化
       * @type {[type]}
       */
      itemFormatter: null,
      /**
       * 图例项文本样式
       * @type {Object}
       */
      textStyle: {
        fill: '#8C8C8C',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle',
        lineHeight: 20
      },
      /**
       * marker 和文字的距离
       * @type {Number}
       */
      wordSpace: 8,
      /**
       * 是否自动换行，默认为 true
       * @type {Boolean}
       */
      autoWrap: true
    });
  }

  renderItems() {
    const self = this;
    const { items, reversed } = self;

    if (!items) {
      return;
    }

    if (reversed) {
      items.reverse();
    }

    Util.each(items, (item, index) => {
      self._addItem(item, index);
    });

    this.autoWrap && this._adjustItems(); // 默认自动换行，并按照图例项的最大宽度对齐
  }

  _addItem(item, index) {
    const itemsGroup = this.itemsGroup;
    const x = this._getNextX();
    const y = this._getNextY();
    const unCheckColor = this.unCheckColor;
    const itemGroup = itemsGroup.addGroup({
      x,
      y,
      text: item.value, // 显示的内容
      dataValue: item.dataValue, // 图例项对应原始数据中的数值
      checked: item.checked
    });

    const textStyle = this.textStyle;
    const wordSpace = this.wordSpace;
    let startX = 0;

    if (item.marker) { // 如果有marker添加marker
      const markerAttrs = Util.mix({}, item.marker, {
        x: item.marker.radius + x,
        y
      });

      if (!item.checked) {
        if (markerAttrs.fill) {
          markerAttrs.fill = unCheckColor;
        }
        if (markerAttrs.stroke) {
          markerAttrs.stroke = unCheckColor;
        }
      }

      const markerShape = new Marker({
        className: 'legeng-marker',
        attrs: markerAttrs
      });
      itemGroup.add(markerShape);
      startX += markerShape.getBBox().width + wordSpace;
    }

    const textAttrs = Util.mix({}, textStyle, {
      x: startX + x,
      y,
      text: this._formatItemValue(item.value)
    });
    if (!item.checked) {
      Util.mix(textAttrs, {
        fill: unCheckColor
      });
    }

    itemGroup.addShape('text', {
      className: 'legend-text',
      attrs: textAttrs
    });

    // 添加一个包围矩形，用于事件支持
    const bbox = itemGroup.getBBox();
    const itemWidth = this.itemWidth;
    itemGroup.addShape('rect', {
      className: 'legend-item',
      attrs: {
        x,
        y: y - bbox.height / 2,
        fill: '#fff',
        fillOpacity: 0,
        width: itemWidth || bbox.width,
        height: bbox.height
      }
    });
    itemGroup.set('width', itemWidth || bbox.width); // 缓存每个图例项的宽度
    itemGroup.set('height', bbox.height); // 缓存每个图例项的高度
    this.legendHitBoxes[index] = bbox;
    return itemGroup;
  }

  _formatItemValue(value) {
    const formatter = this.itemFormatter;
    if (formatter) {
      value = formatter.call(this, value);
    }
    return value;
  }
}

Util.mix(CategoryLegend.prototype, Mixin);

module.exports = CategoryLegend;
