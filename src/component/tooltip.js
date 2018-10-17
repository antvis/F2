const Util = require('../util/common');
const Marker = require('./marker');
const Container = require('./list');
const TextBox = require('./text-box');
const GAP = 4;

function directionEnabled(mode, dir) {
  if (mode === undefined) {
    return true;
  } else if (typeof mode === 'string') {
    return mode.indexOf(dir) !== -1;
  }

  return false;
}
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
      xTipTextStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      xTipBackground: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [ 3, 5 ]
      },
      yTipTextStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
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
      const { xTipBackground, xTipTextStyle } = this;
      const xTip = new TextBox({
        className: 'xTip',
        textStyle: xTipTextStyle,
        background: xTipBackground,
        visible: false
      });
      frontPlot.add(xTip.container);
      this.xTip = xTip;
    }

    if (this.showYTip) {
      const { yTipBackground, yTipTextStyle } = this;
      const yTip = new TextBox({
        className: 'yTip',
        textStyle: yTipTextStyle,
        background: yTipBackground,
        visible: false
      });
      frontPlot.add(yTip.container);
      this.yTip = yTip;
    }

    if (this.showCrosshairs) {
      this._renderCrosshairs();
    }

    frontPlot.sort();
  }

  setContent(title, items, transposed) {
    this.title = title;
    this.items = items;
    if (!this.custom) {
      const container = this.container;
      container.setTitle(title);
      container.setItems(items);
    }

    if (this.xTip) {
      const text = transposed ? items[0].value : title;
      this.xTip.updateContent(text);
    }
    if (this.yTip) {
      const text = !transposed ? items[0].value : title;
      this.yTip.updateContent(text);
    }
  }

  setPosition(items) {
    const { container, plotRange, offsetX, offsetY, fixed, tooltipArrow } = this;
    const { crosshairsShapeX, crosshairsShapeY } = this;
    crosshairsShapeX && crosshairsShapeX.moveTo(0, items[0].y);
    crosshairsShapeY && crosshairsShapeY.moveTo(items[0].x, 0);


    if (this.showXTip) {
      const xTip = this.xTip;
      const xTipWidth = xTip.getWidth();
      let x;
      let posX;
      if (items.length > 1) {
        x = (items[0].x + items[items.length - 1].x) / 2;
      } else {
        x = items[0].x;
      }
      posX = x - (xTipWidth / 2);
      if (posX <= plotRange.tl.x) {
        posX = plotRange.tl.x;
      }
      if (posX + xTipWidth >= plotRange.tr.x) {
        posX = plotRange.tr.x - xTipWidth;
      }
      xTip.updatePosition(posX, plotRange.br.y);
    }
    if (this.showYTip) {
      const yTip = this.yTip;
      const yTipHeight = yTip.getHeight();
      const yTipWidth = yTip.getWidth();
      let y;
      let posY;
      if (items.length > 1) {
        y = (items[0].y + items[items.length - 1].y) / 2;
      } else {
        y = items[0].y;
      }
      posY = y - (yTipHeight / 2);
      if (posY <= plotRange.tl.y) {
        posY = plotRange.tl.y;
      }
      if (posY + yTipHeight >= plotRange.br.y) {
        posY = plotRange.br.y - yTipHeight;
      }
      yTip.updatePosition(plotRange.tl.x - yTipWidth, posY);
    }

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
    const xTip = this.xTip;
    const yTip = this.yTip;
    const canvas = this.canvas;
    crosshairsShapeX && crosshairsShapeX.show();
    crosshairsShapeY && crosshairsShapeY.show();
    markerGroup && markerGroup.show();
    container && container.show();
    tooltipArrow && tooltipArrow.show();
    xTip && xTip.show();
    yTip && yTip.show();
    canvas.draw();
  }

  hide() {
    const crosshairsShapeX = this.crosshairsShapeX;
    const crosshairsShapeY = this.crosshairsShapeY;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;
    const xTip = this.xTip;
    const yTip = this.yTip;
    crosshairsShapeX && crosshairsShapeX.hide();
    crosshairsShapeY && crosshairsShapeY.hide();
    markerGroup && markerGroup.hide();
    container && container.hide();
    tooltipArrow && tooltipArrow.hide();
    xTip && xTip.hide();
    yTip && yTip.hide();
  }

  destroy() {
    const crosshairsShapeX = this.crosshairsShapeX;
    const crosshairsShapeY = this.crosshairsShapeY;
    const markerGroup = this.markerGroup;
    const container = this.container;
    const tooltipArrow = this.tooltipArrow;
    const xTip = this.xTip;
    const yTip = this.yTip;

    crosshairsShapeX && crosshairsShapeX.remove(true);
    crosshairsShapeY && crosshairsShapeY.remove(true);
    markerGroup && markerGroup.remove(true);
    tooltipArrow && tooltipArrow.remove(true);
    container && container.clear();
    xTip && xTip.clear();
    yTip && yTip.clear();

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
    if (directionEnabled(crosshairsType, 'x')) {
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

    if (directionEnabled(crosshairsType, 'y')) {
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
