const Util = require('../util/common');
const Marker = require('./marker');
const Container = require('./list');
const TextBox = require('./text-box');
const GAP = 4;

/**
 * TODOList：
 * 1. 移除 fixed 参数
 */
class Tooltip {
  getDefaultCfg() {
    return {
      /**
       * wether show the crosshairs
       * @type {Object}
       */
      showCrosshairs: false,
      /**
       * the style for crosshairs
       * @type {Object}
       */
      crosshairsStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 1
      },
      /**
       * the type of crosshairs, optional value is 'x', 'y' or 'xy', default is 'y'
       */
      crosshairsType: 'y',
      /**
       * show or hide the x axis tip
       */
      showXTip: false,
      /**
       * show or hide the y axis tip
       */
      showYTip: false,
      xTip: null,
      xTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [ 3, 5 ]
      },
      yTip: null,
      yTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [ 3, 5 ]
      },
      /**
       * the style for tooltip container's background
       * @type {Object}
       */
      background: null,
      /**
       * layout, can be horizontal or vertical
       * @type {String}
       */
      layout: 'horizontal',
      offsetX: 0,
      offsetY: 0
    };
  }

  constructor(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    const { frontPlot, custom } = this;

    if (!custom) { // custom means user do customize
      const container = new Container(Util.mix({
        parent: frontPlot,
        zIndex: 3
      }, cfg));
      this.container = container;
      const { fixed, background } = this;
      if (!fixed) {
        this.tooltipArrow = frontPlot.addShape('Polygon', {
          className: 'tooltip-arrow',
          visible: false,
          zIndex: 2,
          attrs: Util.mix({
            points: []
          }, background)
        });
      }
    }
    if (this.showXTip) {
      const { xTipBackground } = this;
      const xTipBox = new TextBox({
        className: 'xTip',
        background: xTipBackground,
        visible: false
      });
      frontPlot.add(xTipBox.container);
      this.xTipBox = xTipBox;
    }

    if (this.showYTip) {
      const { yTipBackground } = this;
      const yTipBox = new TextBox({
        className: 'yTip',
        background: yTipBackground,
        visible: false
      });
      frontPlot.add(yTipBox.container);
      this.yTipBox = yTipBox;
    }

    if (this.showCrosshairs) {
      this._renderCrosshairs();
    }

    frontPlot.sort();
  }

  setContent(title, items) {
    this.title = title;
    this.items = items;
    if (!this.custom) {
      const container = this.container;
      container.setTitle(title);
      container.setItems(items);
    }
  }

  setYTipContent(val) {
    const yTip = this.yTip;
    if (Util.isFunction(yTip)) {
      val = yTip(val);
    } else {
      val = Util.mix({
        text: val
      }, yTip);
    }
    this.yTipBox && this.yTipBox.updateContent(val);
  }

  setYTipPosition(pos) {
    const plotRange = this.plotRange;
    const crosshairsShapeX = this.crosshairsShapeX;
    if (this.showYTip) {
      const yTipBox = this.yTipBox;
      const yTipHeight = yTipBox.getHeight();
      const yTipWidth = yTipBox.getWidth();
      let posX = plotRange.tl.x - yTipWidth;
      let posY = pos - (yTipHeight / 2);
      if (posY <= plotRange.tl.y) {
        posY = plotRange.tl.y;
      }
      if (posY + yTipHeight >= plotRange.br.y) {
        posY = plotRange.br.y - yTipHeight;
      }

      if (posX < 0) {
        posX = plotRange.tl.x;
        crosshairsShapeX && crosshairsShapeX.attr('x1', plotRange.tl.x + yTipWidth);
      }


      yTipBox.updatePosition(posX, posY);
    }
  }

  setXTipContent(val) {
    const xTip = this.xTip;
    if (Util.isFunction(xTip)) {
      val = xTip(val);
    } else {
      val = Util.mix({
        text: val
      }, xTip);
    }
    this.xTipBox && this.xTipBox.updateContent(val);
  }

  setXTipPosition(pos) {
    const { showXTip, canvas, plotRange, xTipBox, crosshairsShapeY } = this;
    if (showXTip) {
      const el = canvas.get('el');
      const canvasHeight = Util.getHeight(el);
      const xTipWidth = xTipBox.getWidth();
      const xTipHeight = xTipBox.getHeight();
      let posX = pos - (xTipWidth / 2);
      let posY = plotRange.br.y;
      if (posX <= plotRange.tl.x) {
        posX = plotRange.tl.x;
      }
      if (posX + xTipWidth >= plotRange.tr.x) {
        posX = plotRange.tr.x - xTipWidth;
      }

      if (canvasHeight - posY < xTipHeight) {
        posY -= xTipHeight;
      }
      xTipBox.updatePosition(posX, posY);
      crosshairsShapeY && crosshairsShapeY.attr('y1', posY);
    }
  }

  setXCrosshairPosition(pos) {
    this.crosshairsShapeX && this.crosshairsShapeX.moveTo(0, pos);
  }

  setYCrosshairPosition(pos) {
    this.crosshairsShapeY && this.crosshairsShapeY.moveTo(pos, 0);
  }

  setPosition(items) {
    const { container, plotRange, offsetX, offsetY, fixed, tooltipArrow } = this;
    if (!container) {
      return;
    }

    const containerBBox = container.container.getBBox();
    const { minX, minY, width, height } = containerBBox;

    const { tl, tr } = plotRange;
    let posX = 0;
    const posY = tl.y - height - GAP + offsetY;

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
      if (posX < tl.x) {
        posX = tl.x;
      }
      if (posX + width > tr.x) {
        posX = tr.x - width;
      }

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
    const crosshairsShapeX = this.crosshairsShapeX;
    const crosshairsShapeY = this.crosshairsShapeY;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;
    const xTipBox = this.xTipBox;
    const yTipBox = this.yTipBox;
    const canvas = this.canvas;
    crosshairsShapeX && crosshairsShapeX.show();
    crosshairsShapeY && crosshairsShapeY.show();
    markerGroup && markerGroup.show();
    container && container.show();
    tooltipArrow && tooltipArrow.show();
    xTipBox && xTipBox.show();
    yTipBox && yTipBox.show();
    canvas.draw();
  }

  hide() {
    const crosshairsShapeX = this.crosshairsShapeX;
    const crosshairsShapeY = this.crosshairsShapeY;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;
    const xTipBox = this.xTipBox;
    const yTipBox = this.yTipBox;
    crosshairsShapeX && crosshairsShapeX.hide();
    crosshairsShapeY && crosshairsShapeY.hide();
    markerGroup && markerGroup.hide();
    container && container.hide();
    tooltipArrow && tooltipArrow.hide();
    xTipBox && xTipBox.hide();
    yTipBox && yTipBox.hide();
  }

  destroy() {
    const crosshairsShapeX = this.crosshairsShapeX;
    const crosshairsShapeY = this.crosshairsShapeY;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;
    const xTipBox = this.xTipBox;
    const yTipBox = this.yTipBox;

    crosshairsShapeX && crosshairsShapeX.remove(true);
    crosshairsShapeY && crosshairsShapeY.remove(true);
    markerGroup && markerGroup.remove(true);
    tooltipArrow && tooltipArrow.remove(true);
    container && container.clear();
    xTipBox && xTipBox.clear();
    yTipBox && yTipBox.clear();

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

  _renderCrosshairs() {
    const { crosshairsType, crosshairsStyle, frontPlot, plotRange } = this;
    const { tl, br } = plotRange;
    if (Util.directionEnabled(crosshairsType, 'x')) {
      this.crosshairsShapeX = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-x',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: tl.x,
          y1: 0,
          x2: br.x,
          y2: 0
        }, crosshairsStyle)
      });
    }

    if (Util.directionEnabled(crosshairsType, 'y')) {
      this.crosshairsShapeY = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-y',
        zIndex: 0,
        visible: false,
        attrs: Util.mix({
          x1: 0,
          y1: br.y,
          x2: 0,
          y2: tl.y
        }, crosshairsStyle)
      });
    }

  }
}

module.exports = Tooltip;
