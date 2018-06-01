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
      }
      // onSelected: null // 选中的结果
    });
  }

  bindEvents() {
    const { el, startEvent, endEvent } = this;
    startEvent && Util.addEventListener(el, startEvent, Util.wrapBehavior(this, '_start'));
    endEvent && Util.addEventListener(el, endEvent, Util.wrapBehavior(this, '_end'));
  }

  clearEvents() {
    const { el, startEvent, endEvent } = this;
    startEvent && Util.removeEventListener(el, startEvent, Util.getWrapBehavior(this, '_start'));
    endEvent && Util.removeEventListener(el, endEvent, Util.getWrapBehavior(this, '_end'));
  }

  start(ev) {
    const chart = this.chart;
    const { x, y } = Util.createEvent(ev, chart);

    this.halo && this.halo.remove(true);

    const records = chart.getSnapRecords({ x, y });
    if (!records.length) return;

    let selectedShape;
    const data = records[0]._origin;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');
    Util.each(children, child => {
      if (child.get('isShape') && (child.get('className') === geom.get('type'))) { // get geometry's shape
        const shapeData = child.get('origin')._origin;
        if (Object.is(shapeData, data)) {
          selectedShape = child;
          return false;
        }
      }
    });
    const lastShape = this.lastShape;

    if (selectedShape && selectedShape !== lastShape) { // 没有被选中
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
      } else {
        this.canvas.draw();
      }
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
}

Chart.registerInteraction('pie-select', PieSelect);

module.exports = PieSelect;
