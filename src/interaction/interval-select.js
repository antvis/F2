const Util = require('../util/common');
const Helper = require('../util/helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class IntervalSelect extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'tap',
      processingEvent: null,
      selectStyle: {
        fillOpacity: 1
      }, // 被选中图形的样式
      unSelectStyle: {
        fillOpacity: 0.4
      } // 未被选中图形的样式
    });
  }

  _reset() {
    const chart = this.chart;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');

    Util.each(children, child => {
      const originAttrs = child.get('_originAttrs');
      if (originAttrs) {
        child._attrs.attrs = originAttrs;
        child.set('_originAttrs', null);
      }
    });
    this.canvas.draw();
  }

  start(ev) {
    const chart = this.chart;
    if (ev.type === 'tap') {
      ev.clientX = ev.center.x;
      ev.clientY = ev.center.y;
    }
    const { x, y } = Util.createEvent(ev, chart);
    const plot = chart.get('plotRange');
    if (!Helper.isPointInPlot({ x, y }, plot)) { // 不在绘图区域
      this._reset();
      return;
    }

    // 查找被点击的 shapw
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');
    let selectedShape;
    const unSelectedShapes = [];

    Util.each(children, child => {
      const box = child.getBBox();
      if (x >= box.x && x <= (box.x + box.width) && y >= box.y && y <= (box.height + box.y)) { // inbox
        selectedShape = child;
      } else {
        unSelectedShapes.push(child);
      }
    });

    const lastShape = this.lastShape;
    if (selectedShape && selectedShape !== lastShape) { // 没有被选中
      const { selectStyle, unSelectStyle } = this;

      if (!selectedShape.get('_originAttrs')) {
        const originAttrs = Object.assign({}, selectedShape.attr());
        selectedShape.set('_originAttrs', originAttrs);
      }

      selectedShape.attr(selectStyle);

      Util.each(unSelectedShapes, child => {
        if (!child.get('_originAttrs')) {
          const originAttrs = Object.assign({}, child.attr());
          child.set('_originAttrs', originAttrs);
        } else {
          child.attr(child.get('_originAttrs'));
        }

        unSelectStyle && child.attr(unSelectStyle);
      });

      this.lastShape = selectedShape;
      this.canvas.draw();
    } else {
      this.lastShape = null;
      this._reset();
    }
  }

  end(ev) {
    const selectedShape = this.lastShape;
    if (selectedShape && !selectedShape.get('destroyed')) {
      ev.data = selectedShape.get('origin')._origin; // 绘制数据，包含原始数据啊
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
    }
  }

  reset() {
    this._reset();
  }
}

Chart.registerInteraction('interval-select', IntervalSelect);
module.exports = IntervalSelect;
