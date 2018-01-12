const Util = require('../util/common');

module.exports = {
  _getNextX() {
    const { layout, itemGap, itemsGroup, itemWidth } = this;
    const children = itemsGroup.get('children');
    let nextX = 0;
    if (layout === 'horizontal') { // 水平布局
      for (let i = 0, len = children.length; i < len; i++) {
        const child = children[i];
        nextX += (itemWidth ? itemWidth : child.get('width')) + itemGap;
      }
    }
    return nextX;
  },
  _getNextY() {
    const { itemMarginBottom, layout, itemsGroup, titleShape } = this;
    const titleGap = titleShape ? this.titleGap : 0;
    const children = itemsGroup.get('children');

    let nextY = titleGap;
    if (titleShape) {
      nextY += titleShape.getBBox().height;
    }

    if (layout === 'vertical') { // 竖直布局
      for (let i = 0, len = children.length; i < len; i++) {
        const child = children[i];
        nextY += child.get('height') + itemMarginBottom;
      }
    }
    return nextY;
  },
  _getMaxItemWidth() {
    if (this.maxItemWidth) {
      return this.maxItemWidth;
    }
    const itemsGroup = this.itemsGroup;
    const children = itemsGroup.get('children');
    let maxItemWidth = 0;
    for (let i = 0, length = children.length; i < length; i++) {
      maxItemWidth = Math.max(maxItemWidth, children[i].get('width'));
    }
    this.maxItemWidth = maxItemWidth;
    return maxItemWidth;
  },
  _adjustHorizontal() {
    const { maxLength, itemsGroup } = this;
    if (Util.isNil(maxLength) || itemsGroup.getBBox().width <= maxLength) {
      return;
    }

    const children = itemsGroup.get('children');
    const { itemGap, itemMarginBottom, titleShape } = this;
    let titleGap = 0;
    if (titleShape) {
      titleGap = titleShape.getBBox().height + this.titleGap;
    }

    let row = 0;
    let rowLength = 0;
    let width;
    let height;
    const itemWidth = this.itemWidth || this._getMaxItemWidth();
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      width = itemWidth || child.get('width');
      height = child.get('height') + itemMarginBottom;

      if (maxLength - rowLength < width) {
        row++;
        rowLength = 0;
      }

      child.moveTo(rowLength, row * height + titleGap);
      rowLength += width + itemGap;
    }
    return;
  },
  _adjustVertical() {
    const { maxLength, itemsGroup } = this; // 垂直布局，则 maxLength 代表容器的高度

    if (Util.isNil(maxLength) || itemsGroup.getBBox().height <= maxLength) {
      return;
    }

    const { titleShape, itemGap, itemMarginBottom, titleGap, itemWidth } = this;
    const titleHeight = titleShape ? (titleShape.getBBox().height + titleGap) : 0;
    const children = itemsGroup.get('children');

    let colLength = titleHeight;
    let width;
    let height;
    let maxItemWidth = 0;
    let totalLength = 0;

    for (let i = 0, length = children.length; i < length; i++) {
      const child = children[i];
      width = child.get('width');
      height = child.get('height');

      if (itemWidth) {
        maxItemWidth = itemWidth + itemGap;
      } else if (width > maxItemWidth) {
        maxItemWidth = width + itemGap;
      }

      if (maxLength - colLength < height) {
        colLength = titleHeight;
        totalLength += maxItemWidth;
        child.moveTo(totalLength, titleHeight);
      } else {
        child.moveTo(totalLength, colLength);
      }

      colLength += height + itemMarginBottom;
    }
    return;
  },
  _adjustItems() {
    const layout = this.layout;
    if (layout === 'horizontal') {
      this._adjustHorizontal();
    } else {
      this._adjustVertical();
    }
  }
};
