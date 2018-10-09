const Util = require('../util/common');
const { Group } = require('../graphic/index');
const Marker = require('./marker');
const MARKER_RADIUS = 3;

class List {
  getDefaultCfg() {
    return {
      showTitle: false,
      /**
       * title string
       * @type {?String}
       */
      title: null,
      /**
       * items array
       * @type {?Array}
       */
      items: null,
      /**
       * offset between title and items
       * @type {Number}
       */
      titleGap: 12,
      /**
       * offset between each item
       * @type {Number}
       */
      itemGap: 10,
      /**
       * the offset between each item in vertical direaction
       * @type {Number}
       */
      itemMarginBottom: 12,
      /**
       * the formatter for item text
       * @type {[type]}
       */
      itemFormatter: null,
      itemWidth: null,
      /**
       * offset between marker and text
       * @type {Number}
       */
      wordSpace: 6,
      x: 0,
      y: 0,
      layout: 'horizontal',
      /**
       * the join string of `name` and `value`
       * @type {String}
       */
      joinString: ': '
    };
  }

  constructor(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    this._init();
    this._renderTitle();
    this._renderItems();
  }

  _init() {
    const container = new Group({
      zIndex: this.zIndex || 0
    });
    this.container = container;
    const wrapper = container.addGroup();
    this.wrapper = wrapper;
    const itemsGroup = wrapper.addGroup({
      className: 'itemsGroup'
    });
    this.itemsGroup = itemsGroup;

    if (this.parent) {
      this.parent.add(container);
    }
  }

  _renderTitle(title) {
    title = title || this.title;
    let titleShape = this.titleShape;
    let titleHeight = 0;

    if (this.showTitle && title) {
      if (titleShape && !titleShape.get('destroyed')) {
        titleShape.attr('text', title);
      } else {
        const { wrapper, titleStyle } = this;
        titleShape = wrapper.addShape('text', {
          className: 'title',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: title
          }, titleStyle)
        });
        this.titleShape = titleShape;
      }
      titleHeight = titleShape.getBBox().height + this.titleGap;
    }
    this._titleHeight = titleHeight;
  }

  _renderItems(items) {
    const self = this;
    items = items || self.items;

    if (!items) {
      return;
    }

    if (self.reversed) {
      items.reverse();
    }
    Util.each(items, (item, index) => {
      self._addItem(item, index);
    });
    if (items.length > 1) {
      this._adjustItems();
    }
    this._renderBackground();
  }

  _renderBackground() {
    const background = this.background;
    if (background) {
      const container = this.container;
      const wrapper = this.wrapper;
      const { minX, minY, width, height } = wrapper.getBBox();
      let padding = background.padding || [ 0, 0, 0, 0 ];
      padding = Util.parsePadding(padding);
      const attrs = Util.mix({
        x: minX - padding[3],
        y: minY - padding[0],
        width: width + padding[1] + padding[3],
        height: height + padding[0] + padding[2]
      }, background);
      let backShape = this.backShape;
      if (backShape) {
        backShape.attr(attrs);
      } else {
        backShape = container.addShape('Rect', {
          zIndex: -1,
          attrs
        });
      }
      this.backShape = backShape;
      container.sort();
    }
  }

  _addItem(item) {
    const itemsGroup = this.itemsGroup;
    const itemGroup = itemsGroup.addGroup({
      name: item.name,
      value: item.value,
      dataValue: item.dataValue,
      checked: item.checked
    });
    const { unCheckStyle, unCheckColor, nameStyle, valueStyle, wordSpace } = this;
    const { marker, value } = item;
    let startX = 0;

    if (unCheckColor) {
      unCheckStyle.fill = unCheckColor;
    }

    if (marker) {
      const radius = marker.radius || MARKER_RADIUS;
      const markerAttrs = Util.mix({
        x: radius,
        y: this._titleHeight
      }, marker);

      if (item.checked === false) {
        Util.mix(markerAttrs, unCheckStyle);
      }

      const markerShape = new Marker({
        className: 'item-marker',
        attrs: markerAttrs
      });
      itemGroup.add(markerShape);
      startX += markerShape.getBBox().width + wordSpace;
    }

    let nameText;
    let name = item.name;
    if (name) {
      const joinString = this.joinString || '';
      name = value ? name + joinString : name;
      nameText = itemGroup.addShape('text', {
        className: 'name',
        attrs: Util.mix({
          x: startX,
          y: this._titleHeight,
          text: this._formatItemValue(name)
        }, nameStyle, item.checked === false ? unCheckStyle : null)
      });
    }

    if (value) {
      let valueX = startX;
      if (nameText) {
        valueX += nameText.getBBox().width;
      }

      itemGroup.addShape('text', {
        className: 'value',
        attrs: Util.mix({
          x: valueX,
          y: this._titleHeight,
          text: value
        }, valueStyle, item.checked === false ? unCheckStyle : null)
      });
    }
    return itemGroup;
  }

  _formatItemValue(value) {
    const formatter = this.itemFormatter;
    if (formatter) {
      value = formatter.call(this, value);
    }
    return value;
  }

  _getMaxItemWidth() {
    let width;
    const itemWidth = this.itemWidth;

    if (Util.isNumber(itemWidth) || Util.isNil(itemWidth)) {
      return itemWidth;
    }

    if (itemWidth === 'auto') {
      const itemsGroup = this.itemsGroup;
      const children = itemsGroup.get('children');
      const count = children.length;
      let maxItemWidth = 0;
      for (let i = 0; i < count; i++) {
        const { width } = children[i].getBBox();
        maxItemWidth = Math.max(maxItemWidth, width);
      }
      const maxLength = this.maxLength;
      const itemGap = this.itemGap;
      const twoAvgWidth = (maxLength - itemGap) / 2;
      const threeAvgWidth = (maxLength - itemGap * 2) / 3;

      if (count === 2) {
        width = Math.max(maxItemWidth, twoAvgWidth);
      } else {
        // 1. max <= 3Avg, 3Avg
        // 2. 3Avg < max && max < 2avg, 2avg
        // 3. max > 2avg, max, one column
        if (maxItemWidth <= threeAvgWidth) {
          width = threeAvgWidth;
        } else if (maxItemWidth <= twoAvgWidth) {
          width = twoAvgWidth;
        } else {
          width = maxItemWidth;
        }
      }
      return width;
    }
  }

  _adjustHorizontal() {
    const { maxLength, itemsGroup } = this;

    const children = itemsGroup.get('children');
    const { itemGap, itemMarginBottom } = this;
    const titleHeight = this._titleHeight;

    let row = 0;
    let rowWidth = 0;
    let width;
    let height;
    const itemWidth = this._getMaxItemWidth();
    const legendHitBoxes = [];
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      const box = child.getBBox();
      const childHeight = box.height;
      const childWidth = box.width;
      width = itemWidth || childWidth;
      height = childHeight + itemMarginBottom;

      if (width - (maxLength - rowWidth) > 0.0001) {
        row++;
        rowWidth = 0;
      }

      child.moveTo(rowWidth, row * height);
      legendHitBoxes.push({
        x: rowWidth,
        y: row * height + titleHeight - childHeight / 2,
        width: childWidth * 1.375,
        height: childHeight * 1.375
      });
      rowWidth += width + itemGap;
    }
    this.legendHitBoxes = legendHitBoxes;
    return;
  }

  _adjustVertical() {
    const { maxLength, itemsGroup } = this;
    const { itemGap, itemMarginBottom, itemWidth } = this;
    const titleHeight = this._titleHeight;
    const children = itemsGroup.get('children');

    let colHeight = 0;
    let width;
    let height;
    let maxItemWidth = 0;
    let totalWidth = 0;
    const legendHitBoxes = [];

    for (let i = 0, length = children.length; i < length; i++) {
      const child = children[i];
      const bbox = child.getBBox();
      width = bbox.width;
      height = bbox.height;

      if (Util.isNumber(itemWidth)) {
        maxItemWidth = itemWidth + itemGap;
      } else if (width > maxItemWidth) {
        maxItemWidth = width + itemGap;
      }

      if (maxLength - colHeight < height) {
        colHeight = 0;
        totalWidth += maxItemWidth;
        child.moveTo(totalWidth, 0);
        legendHitBoxes.push({
          x: totalWidth,
          y: titleHeight - height / 2,
          width: width * 1.375,
          height: height * 1.375
        });
      } else {
        child.moveTo(totalWidth, colHeight);
        legendHitBoxes.push({
          x: totalWidth,
          y: colHeight - height / 2 + titleHeight,
          width: width * 1.375,
          height: height * 1.375
        });
      }

      colHeight += height + itemMarginBottom;
    }
    this.legendHitBoxes = legendHitBoxes;
    return;
  }

  _adjustItems() {
    const layout = this.layout;
    if (layout === 'horizontal') {
      this._adjustHorizontal();
    } else {
      this._adjustVertical();
    }
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    const container = this.container;
    container && container.moveTo(x, y);
    return this;
  }

  setItems(items) {
    this.clearItems();
    this._renderItems(items);
  }

  setTitle(title) {
    this._renderTitle(title);
  }

  clearItems() {
    const itemsGroup = this.itemsGroup;
    itemsGroup.clear();
  }

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

  show() {
    const container = this.container;
    container.show();
  }

  hide() {
    const container = this.container;
    container.hide();
  }

  clear() {
    const container = this.container;
    container.clear();
    container.remove(true);
  }
}

module.exports = List;
