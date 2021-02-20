import { deepMix, mix, isFunction, directionEnabled, parsePadding } from '../util/common';
import Container from './list';
import TextBox from './text-box';

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
      xTipTextStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      yTip: null,
      yTipBackground: {
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
    deepMix(this, this.getDefaultCfg(), cfg);
    const { frontPlot, custom } = this;

    if (!custom) { // custom means user do customize
      const container = new Container(mix({
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
          attrs: mix({
            points: []
          }, background)
        });
      }
    }
    if (this.showXTip) {
      const { xTipBackground, xTipTextStyle } = this;
      const xTipBox = new TextBox({
        context: frontPlot.get('context'),
        className: 'xTip',
        background: xTipBackground,
        textStyle: xTipTextStyle,
        visible: false
      });
      frontPlot.add(xTipBox.container);
      this.xTipBox = xTipBox;
    }

    if (this.showYTip) {
      const { yTipBackground, yTipTextStyle } = this;
      const yTipBox = new TextBox({
        context: frontPlot.get('context'),
        className: 'yTip',
        background: yTipBackground,
        textStyle: yTipTextStyle,
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
    if (isFunction(yTip)) {
      val = yTip(val);
    } else {
      val = mix({
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
    if (isFunction(xTip)) {
      val = xTip(val);
    } else {
      val = mix({
        text: val
      }, xTip);
    }
    this.xTipBox && this.xTipBox.updateContent(val);
  }

  setXTipPosition(pos) {
    const { showXTip, canvas, plotRange, xTipBox, crosshairsShapeY } = this;
    if (showXTip) {
      // const el = canvas.get('el');
      // const canvasHeight = Util.getHeight(el);
      const canvasHeight = canvas.get('height');
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
    let posY = tl.y - height - GAP + offsetY;
    if (posY < 0) {
      posY = 0;
    }

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
        const arrowY = posY + height;
        tooltipArrow.attr('points', [
          { x: x - 3, y: arrowY },
          { x: x + 3, y: arrowY },
          { x, y: arrowY + GAP }
        ]);
        const backShape = container.backShape;
        const radius = parsePadding(backShape.attr('radius'));
        if (x === tl.x) {
          radius[3] = 0;

          tooltipArrow.attr('points', [
            { x: tl.x, y: arrowY },
            { x: tl.x + GAP, y: arrowY },
            { x: tl.x, y: arrowY + GAP }
          ]);
        } else if (x === tr.x) {
          radius[2] = 0;

          tooltipArrow.attr('points', [
            { x: tr.x - GAP, y: arrowY },
            { x: tr.x, y: arrowY },
            { x: tr.x, y: arrowY + GAP }
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
        markerGroup.addShape('marker', {
          className: 'tooltip-circle-marker',
          attrs: mix({
            x: item.x,
            y: item.y,
            stroke: item.color
          }, style)
        });
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
    if (directionEnabled(crosshairsType, 'x')) {
      this.crosshairsShapeX = frontPlot.addShape('Line', {
        className: 'tooltip-crosshairs-x',
        zIndex: 0,
        visible: false,
        attrs: mix({
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
        attrs: mix({
          x1: 0,
          y1: br.y,
          x2: 0,
          y2: tl.y
        }, crosshairsStyle)
      });
    }

  }
}

export default Tooltip;
