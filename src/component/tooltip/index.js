const Util = require('../../util/common');
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
       * 是否渲染 tooltip 的标题
       * @type {Boolean}
       */
      showTitle: false,
      /**
       * tooltip 的标题样式
       * @type {Object}
       */
      titleStyle: {
        fontSize: 12,
        fill: '#000',
        textAlign: 'start',
        textBaseline: 'top'
      },
      /**
       * 记录项文本样式
       * @type {Object}
       */
      textStyle: {},
      /**
       * 是否显示 tooltip 辅助线配置，默认展示
       * @type {Object}
       */
      showCrosshairs: false,
      /**
       * tooltip 辅助线显示样式
       * @type {Object}
       */
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 1
      },
      /**
       * tooltip 内容容器
       * @type {Group}
       */
      contentContainer: null,
      /**
       * tooltip 辅助线形状
       * @type {[type]}
       */
      crosshairsShape: null,
      /**
       * tooltip marker 的形状
       * @type {[type]}
       */
      markerGroup: null,
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
      background: null,
      /**
       * tooltip container 的最大长度
       * @type {[type]}
       */
      maxLength: null,
      /**
       * 布局方式，horizontal 或者 vertical
       * @type {String}
       */
      layout: 'horizontal',
      offsetX: 0,
      offsetY: 0
    };
  }

  constructor(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    this._init();
  }

  _init() {
    const frontPlot = this.frontPlot;
    const contentContainer = frontPlot.addGroup({
      className: 'tooltip'
    });
    const itemsGroup = contentContainer.addGroup({
      className: 'items-group',
      zIndex: 1
    });
    this.itemsGroup = itemsGroup;
    this.contentContainer = contentContainer;

    // init crosshairs
    if (this.showCrosshairs) {
      const crosshairsStyle = this.crosshairsStyle;
      const plotRange = this.chartPlot;
      const shape = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: 0,
          y1: plotRange.bl.y,
          x2: 0,
          y2: plotRange.tl.y
        }, crosshairsStyle)
      });
      this.crosshairsShape = shape;
    }

    /* if (this.background) {
      const backgroundShape = contentContainer.addShape('Rect', {
        className: 'tooltip-background',
        attrs: Util.mix({
          x: 0,
          y: 0,
          width: 10,
          height: 10
        }, this.background)
      });
      this.backgroundShape = backgroundShape;
    }
    contentContainer.sort(); */
  }

  setContent(title, items) {
    this._renderTitle(title);
    this._renderItems(items);
    // this._renderBackground();
  }

  setPosition(x) {
    const { contentContainer, chartPlot, canvas, offsetX, offsetY, crosshairsShape } = this;
    const canvasWidth = canvas.get('width');
    const containerBBox = contentContainer.getBBox();
    const containerWidth = containerBBox.width;
    const containerHeight = containerBBox.height;

    let posX = x - (containerWidth / 2) + offsetX;
    let posY = chartPlot.tl.y - containerHeight + offsetY;

    if (posX < 0) {
      posX = 0;
    }
    if (posX + containerWidth > canvasWidth) {
      posX = canvasWidth - containerWidth;
    }

    if (posY < 0) {
      posY = 0;
    }

    contentContainer.moveTo(posX, posY);
    crosshairsShape && crosshairsShape.moveTo(x, 0);
  }

  setMarkers(cfg = {}) {
    const self = this;
    const { items, style, type } = cfg;
    const markerGroup = self._getMarkerGroup(type);
    if (type === 'circle') {
      for (let i = 0, length = items.length; i < length; i++) {
        const item = items[i];
        const marker = new Marker({
          className: 'tooltip-circle-marker',
          attrs: Util.mix({
            x: item.x,
            y: item.y,
            stroke: item.color
          }, style)
        });
        markerGroup.add(marker);
      }
    } else {
      markerGroup.addShape('rect', {
        className: 'tooltip-rect-marker',
        attrs: style
      });
    }
  }

  clearMarkers() {
    const markerGroup = this.markerGroup;
    markerGroup && markerGroup.clear();
  }

  // TODO 动画
  show() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const contentContainer = this.contentContainer;
    const canvas = this.canvas;
    canvas.sort();
    crosshairsShape && crosshairsShape.show();
    markerGroup && markerGroup.show();
    contentContainer && contentContainer.show();
    canvas.draw();
  }

  // TODO 动画
  hide() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const contentContainer = this.contentContainer;
    const canvas = this.canvas;
    crosshairsShape && crosshairsShape.hide();
    markerGroup && markerGroup.hide();
    contentContainer && contentContainer.hide();
    canvas.draw();
  }

  // TODO destroy 还是 remove
  destroy() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const contentContainer = this.contentContainer;

    crosshairsShape && crosshairsShape.remove(true);
    markerGroup && markerGroup.remove(true);
    contentContainer && contentContainer.remove(true);

    this._attrs = {};
    this.destroyed = true;
  }

  /* _renderBackground() {
    const backgroundShape = this.backgroundShape;
    if (!backgroundShape) {
      return;
    }

    const contentContainer = this.contentContainer;
    const contentBBox = contentContainer.getBBox();
    const { width, height } = contentBBox;
    backgroundShape.attr({
      width,
      height,
      x: contentBBox.
    });
  } */

  _renderTitle(title) {
    const { showTitle } = this;

    if (showTitle && title) {
      const { contentContainer, titleStyle, titleShape } = this;
      if (titleShape) {
        titleShape.attr('text', title);
      } else {
        const titleShape = contentContainer.addShape('text', {
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
  }

  _renderItems(items) {
    const self = this;
    if (items) {
      const itemsGroup = self.itemsGroup;
      itemsGroup && itemsGroup.clear();
      // item 的格式 { color, marker, name, value, x, y, origin }
      items.map(item => {
        self._renderItem(item);
        return item;
      });

      this._adjustItems();
    }
  }

  _renderItem(item) {
    const self = this;
    const { itemsGroup, textStyle, wordSpace } = self;
    const { color, marker, name, value } = item;
    const x = self._getNextX();
    const y = self._getNextY();
    const itemGroup = itemsGroup.addGroup({
      x,
      y
    });

    let startX = 0;
    if (marker) {
      const radius = marker.radius || 5;
      const markerShape = new Marker({
        className: 'tooltip-item-marker',
        attrs: Util.mix({
          x: radius + x,
          y,
          fill: color
        }, marker)
      });
      itemGroup.add(markerShape);
      startX += markerShape.getBBox().width + wordSpace;
    }

    itemGroup.addShape('text', {
      className: 'tooltip-text',
      attrs: Util.mix({}, textStyle, {
        x: startX + x,
        y,
        text: name + ': ' + value
      })
    });

    const bbox = itemGroup.getBBox();
    const itemWidth = self.itemWidth;
    itemGroup.set('width', itemWidth || bbox.width); // 缓存宽度
    itemGroup.set('height', bbox.height); // 缓存高度
    return itemGroup;
  }

  _getMarkerGroup(type) {
    let markerGroup = this.markerGroup;
    if (!markerGroup) {
      if (type === 'circle') {
        markerGroup = this.frontPlot.addGroup({
          zIndex: 1
        });
      } else {
        markerGroup = this.backPlot.addGroup();
      }
      this.markerGroup = markerGroup;
    } else {
      markerGroup.clear();
    }

    return markerGroup;
  }
}

Util.mix(Tooltip.prototype, Mixin);


module.exports = Tooltip;
