const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class PieSelect extends Interaction {
  getDefaultCfg() {
    let defaultCfg = super.getDefaultCfg();
    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'tap',
      processEvent: null,
      animate: false,
      offset: 1,
      appendRadius: 8,
      style: {
        fillOpacity: 0.5
      },
      cancelable: true,
      defaultSelected: null // set the default selected shape
    });
    if (Util.isWx || Util.isMy) { // 小程序
      defaultCfg.startEvent = 'touchstart';
      defaultCfg.endEvent = 'touchend';
    }

    return defaultCfg;
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const self = this;
    chart.registerPlugins({
      clearInner() {
        self.halo && self.halo.remove(true);
        self.selected = false;
        self.selectedShape = null;
        self.lastShape = null;
        self.halo = null;
        self.defaultSelected = null;
      }
    });
    const defaultSelected = self.defaultSelected;
    if (Util.isObject(defaultSelected)) {
      const selectedShape = self._getSelectedShapeByData(defaultSelected);
      selectedShape && self._selectedShape(selectedShape);
      this.canvas.draw();
    }
  }

  _getSelectedShapeByData(data) {
    let selectedShape = null;
    const chart = this.chart;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');
    Util.each(children, child => {
      if (child.get('isShape') && (child.get('className') === geom.get('type'))) { // get geometry's shape
        const shapeData = child.get('origin')._origin;
        if (Util.isObjectValueEqual(shapeData, data)) {
          selectedShape = child;
          return false;
        }
      }
    });
    return selectedShape;
  }

  _selectedShape(selectedShape) {
    const { offset, style, appendRadius, chart } = this;

    this.lastShape = selectedShape;
    const { x, y, startAngle, endAngle, r, fill } = selectedShape._attrs.attrs;
    const frontPlot = chart.get('frontPlot');
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

    const data = records[0]._origin;
    const selectedShape = this._getSelectedShapeByData(data);
    const lastShape = this.lastShape;
    this.selectedShape = selectedShape;
    this.selected = true;
    if (selectedShape === lastShape) {
      if (!this.cancelable) {
        return;
      }
      this.halo && this.halo.remove(true);
      this.lastShape = null;
      this.selected = false;
    } else {
      this._selectedShape(selectedShape);
    }

    this.canvas.draw();
  }

  end(ev) {
    const selectedShape = this.selectedShape;
    if (selectedShape && !selectedShape.get('destroyed')) {
      ev.data = selectedShape.get('origin')._origin;
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
      ev.selected = !!this.selected;
    }
  }
}

Chart.registerInteraction('pie-select', PieSelect);
module.exports = PieSelect;
