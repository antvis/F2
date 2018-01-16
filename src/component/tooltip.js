const Util = require('../util/common');
const Marker = require('./marker');
const Container = require('./list');

class Tooltip {
  getDefaultCfg() {
    return {
      /**
       * 是否显示 tooltip 辅助线配置，默认不展示
       * @type {Object}
       */
      showCrosshairs: false,
      /**
       * tooltip 辅助线显示样式
       * @type {Object}
       */
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 2
      },
      /**
       * tooltip 容器的样式
       * @type {Object}
       */
      background: null,
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
    const frontPlot = this.frontPlot;
    const plotRange = this.plotRange;

    if (!this.container && !this.custom) { // custom 表示用户使用自定义 tooltip
      const container = new Container(cfg);
      this.container = container;
      frontPlot.add(container.container);
    }

    if (this.showCrosshairs) {
      const crosshairsStyle = this.crosshairsStyle;
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
  }

  setContent(title, items) {
    this.title = title;
    this.items = items;
    const container = this.container;
    container.setTitle(title);
    container.setItems(items);
  }

  setPosition(x/* , y */) {
    const { container, plotRange, offsetX, offsetY, crosshairsShape } = this;

    if (container) {
      const containerWidth = container.getWidth();
      const containerHeight = container.getHeight();

      let posX = x - (containerWidth / 2) + offsetX;
      let posY = plotRange.tl.y - containerHeight + offsetY; // 垂直方向贴着图表绘图区域上方边缘

      // 调整位置，始终位于图表范围内
      if (posX < 0) {
        posX = plotRange.tl.x;
      }
      if (posX + containerWidth > plotRange.tr.x) {
        posX = plotRange.tr.x - containerWidth;
      }

      if (posY < 0) {
        posY = 0;
      }

      if (!this.follow) { // 不跟随鼠标
        container.moveTo(plotRange.tl.x, posY);
      } else {
        container.moveTo(posX, posY);
      }
    }

    crosshairsShape && crosshairsShape.moveTo(x, 0); // 移动辅助线
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

  show() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const canvas = this.canvas;
    canvas.sort();
    crosshairsShape && crosshairsShape.show();
    markerGroup && markerGroup.show();
    container && container.show();
    canvas.draw();
  }

  hide() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const canvas = this.canvas;
    crosshairsShape && crosshairsShape.hide();
    markerGroup && markerGroup.hide();
    container && container.hide();
    canvas.draw();
  }

  destroy() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const container = this.container;

    crosshairsShape && crosshairsShape.remove(true);
    markerGroup && markerGroup.remove(true);
    container && container.clear();

    this.destroyed = true;
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

module.exports = Tooltip;
