const Util = require('../util/common');
const Marker = require('./marker');
const Container = require('./list');
const GAP = 4;

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
        lineWidth: 1
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

    if (!this.custom) { // custom 表示用户使用自定义 tooltip
      const container = new Container(Util.mix({
        parent: frontPlot,
        zIndex: 3
      }, cfg));
      this.container = container;
      if (!this.fixed) {
        this.tooltipArrow = frontPlot.addShape('Polygon', {
          className: 'tooltip-arrow',
          visible: false,
          zIndex: 2,
          attrs: {
            points: [],
            fill: this.background.fill
          }
        });
      }
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

    frontPlot.sort();
  }

  setContent(title, items) {
    this.title = title;
    this.items = items;
    const container = this.container;
    container.setTitle(title);
    container.setItems(items);
  }

  setPosition(items) {
    const { container, plotRange, offsetX, offsetY, crosshairsShape, fixed, tooltipArrow } = this;
    crosshairsShape && crosshairsShape.moveTo(items[0].x, 0); // 移动辅助线

    if (!container) {
      return;
    }

    const containerBBox = container.container.getBBox();
    const { minX, minY, width, height } = containerBBox;

    const { tl, tr } = plotRange;
    let posX = 0;
    const posY = tl.y - height - GAP + offsetY; // 垂直方向贴着图表绘图区域上方边缘

    if (fixed) {
      const x = (tl.x + tr.x) / 2;
      posX = x - width / 2 + offsetX;
    } else {
      let x;
      if (items.length > 1) {
        x = (items[0].x + items[items.length - 1].x) / 2;
      } else {
        x = items[0].x;
      }
      posX = x - (width / 2) + offsetX;
      // 调整位置，始终位于图表范围内
      if (posX < tl.x) {
        posX = tl.x;
      }
      if (posX + width > tr.x) {
        posX = tr.x - width;
      }

      // if (posY < 0) {
      //   posY = 0;
      // }

      if (tooltipArrow) {
        tooltipArrow.attr('points', [
          { x: x - 3, y: tl.y - GAP + offsetY },
          { x: x + 3, y: tl.y - GAP + offsetY },
          { x, y: tl.y + offsetY }
        ]);
        const backShape = container.backShape;
        const radius = Util.parsePadding(backShape.attr('radius'));
        if (x === tl.x) {
          radius[3] = 0;

          tooltipArrow.attr('points', [
            { x: tl.x, y: tl.y + offsetY },
            { x: tl.x, y: tl.y - GAP + offsetY },
            { x: tl.x + GAP, y: tl.y - GAP + offsetY }
          ]);
        } else if (x === tr.x) {
          radius[2] = 0;

          tooltipArrow.attr('points', [
            { x: tr.x, y: tl.y + offsetY },
            { x: tr.x - GAP, y: tl.y - GAP + offsetY },
            { x: tr.x, y: tl.y - GAP + offsetY }
          ]);
        }
        backShape.attr('radius', radius);
      }
    }

    container.moveTo(posX - minX, posY - minY);
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
    const tooltipArrow = this.tooltipArrow;
    const canvas = this.canvas;
    // canvas.sort();
    crosshairsShape && crosshairsShape.show();
    markerGroup && markerGroup.show();
    container && container.show();
    tooltipArrow && tooltipArrow.show();
    canvas.draw();
  }

  hide() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;
    crosshairsShape && crosshairsShape.hide();
    markerGroup && markerGroup.hide();
    container && container.hide();
    tooltipArrow && tooltipArrow.hide();
  }

  destroy() {
    const crosshairsShape = this.crosshairsShape;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;

    crosshairsShape && crosshairsShape.remove(true);
    markerGroup && markerGroup.remove(true);
    container && container.clear();
    tooltipArrow && tooltipArrow.remove(true);

    this.destroyed = true;
  }

  _getMarkerGroup(type) {
    let markerGroup = this.markerGroup;
    if (!markerGroup) {
      if (type === 'circle') {
        markerGroup = this.frontPlot.addGroup({
          zIndex: 1
        });
        this.frontPlot.sort();
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
