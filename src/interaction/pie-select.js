const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class PieSelect extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      animate: false,
      offset: 1, // 间距
      appendRadius: 8, // 光环的大小
      style: {
        fillOpacity: 0.5
      },
      cancelable: true // 选中之后是否允许取消选中，默认允许取消选中
    });
  }

  start(ev) {
    const chart = this.chart;
    if (ev.type === 'tap') {
      ev.clientX = ev.center.x;
      ev.clientY = ev.center.y;
    }
    const { x, y } = Util.createEvent(ev, chart);

    this.halo && this.halo.remove(true);

    const records = chart.getSnapRecords({ x, y });
    if (!records.length) {
      this.selected = false;
      this.selectedShape = null;
      return;
    }

    let selectedShape;
    const data = records[0]._origin;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');
    // 饼图的 bbox 范围查找不精确，所以使用数据比对
    Util.each(children, child => {
      if (child.get('isShape') && (child.get('className') === geom.get('type'))) { // get geometry's shape
        const shapeData = child.get('origin')._origin;
        if (Object.is(shapeData, data)) { // 判断是否相同
          selectedShape = child;
          return false;
        }
      }
    });
    const lastShape = this.lastShape;
    this.selectedShape = selectedShape;
    this.selected = true;
    if (selectedShape === lastShape) { // 上去被选中的
      if (!this.cancelable) { // 不允许取消选中
        return;
      }
      this.halo && this.halo.remove(true);
      this.lastShape = null;
      this.selected = false;
    } else {
      this.lastShape = selectedShape;
      const { x, y, startAngle, endAngle, r, fill } = selectedShape._attrs.attrs;
      const frontPlot = chart.get('frontPlot');
      const { offset, style, appendRadius } = this;
      const halo = frontPlot.addShape('sector', {
        attrs: Util.mix({
          x,
          y,
          r: r + offset + appendRadius,
          r0: r + offset,
          fill,
          startAngle,
          endAngle
        }, style)
      });
      this.halo = halo;
      let animate = this.animate;
      if (animate) {
        if (animate === true) {
          animate = {
            duration: 300
          };
        }
        halo.attr('r', r + offset);
        halo.animate().to(Util.mix({
          attrs: {
            r: r + offset + appendRadius
          }
        }, animate));
      }
    }

    this.canvas.draw();
  }

  end(ev) {
    const selectedShape = this.selectedShape;
    if (selectedShape && !selectedShape.get('destroyed')) {
      ev.data = selectedShape.get('origin')._origin; // 绘制数据，包含原始数据啊
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
      ev.selected = !!this.selected;
    }
  }
}

Chart.registerInteraction('pie-select', PieSelect);
module.exports = PieSelect;
