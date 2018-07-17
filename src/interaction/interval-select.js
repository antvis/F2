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
      selectAxis: true, // 是否高亮坐标轴文本
      selectAxisStyle: {
        fontWeight: 'bold'
      },
      selectStyle: {
        fillOpacity: 1
      }, // 被选中图形的样式
      unSelectStyle: {
        fillOpacity: 0.4
      }, // 未被选中图形的样式
      cancelable: true // 选中之后是否允许取消选中，默认允许取消选中
    });
  }

  _resetShape(shape) {
    const originAttrs = shape.get('_originAttrs');
    if (originAttrs) {
      shape._attrs.attrs = originAttrs;
      shape.set('_originAttrs', null);
    }
  }

  _reset() {
    const self = this;
    if (!self.selectedShape) {
      return;
    }
    const chart = self.chart;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');

    Util.each(children, child => {
      self._resetShape(child);
      child.set('_selected', false);
    });

    if (self.selectedAxisShape) {
      self._resetShape(self.selectedAxisShape);
    }
    self.canvas.draw();
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

    // 查找被点击的 shape
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

    if (selectedShape) { // 有图形被选中
      this.selectedShape = selectedShape;
      if (selectedShape.get('_selected')) { // 已经被选中
        if (!this.cancelable) { // 不允许取消选中则不处理
          return;
        }
        this._reset(); // 允许取消选中
      } else { // 未被选中
        const { selectStyle, unSelectStyle, selectAxisStyle } = this;

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
          child.set('_selected', false);
          unSelectStyle && child.attr(unSelectStyle);
        });

        selectedShape.set('_selected', true);

        if (this.selectAxis) { // 坐标轴高亮
          if (this.selectedAxisShape) {
            this._resetShape(this.selectedAxisShape);
          }
          // 查找 坐标轴 shape
          const xScale = geom.getXScale();
          const origin = selectedShape.get('origin')._origin;
          const {
            frontPlot,
            backPlot
          } = chart.get('axisController');

          let axisShape;

          Util.each(frontPlot.get('children').concat(backPlot.get('children')), s => {
            if (s.get('value') === xScale.scale(origin[xScale.field])) {
              axisShape = s;
              return false;
            }
          });
          this.selectedAxisShape = axisShape;
          axisShape.set('_originAttrs', Object.assign({}, axisShape.attr()));
          axisShape.attr(selectAxisStyle);
        }

        this.canvas.draw();
      }
    } else { // 没有选中图形，恢复原态
      this._reset();
      this.selectedShape = null;
      this.selectedAxisShape = null;
    }
  }

  end(ev) {
    const selectedShape = this.selectedShape;
    if (selectedShape && !selectedShape.get('destroyed')) {
      ev.data = selectedShape.get('origin')._origin; // 绘制数据，包含原始数据啊
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
      ev.selected = !!selectedShape.get('_selected'); // 返回选中的状态
    }
  }

  reset() {
    this._reset();
  }
}

Chart.registerInteraction('interval-select', IntervalSelect);
module.exports = IntervalSelect;
