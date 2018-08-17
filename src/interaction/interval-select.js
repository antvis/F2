const Util = require('../util/common');
const Helper = require('../util/helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class IntervalSelect extends Interaction {
  getDefaultCfg() {
    let defaultCfg = super.getDefaultCfg();
    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'tap',
      processEvent: null,
      selectAxis: true,
      selectAxisStyle: {
        fontWeight: 'bold'
      },
      mode: 'shape',
      selectStyle: {
        fillOpacity: 1
      },
      unSelectStyle: {
        fillOpacity: 0.4
      },
      cancelable: true
    });
    if (Util.isWx || Util.isMy) { // 小程序
      defaultCfg.startEvent = 'touchstart';
      defaultCfg.endEvent = 'touchend';
    }

    return defaultCfg;

  }

  _resetShape(shape) {
    const originAttrs = shape.get('_originAttrs');
    if (originAttrs) {
      shape._attrs.attrs = originAttrs;
      shape.set('_originAttrs', null);
    }
  }

  _setEventData(ev) {
    const selectedShape = this.selectedShape;
    if (selectedShape && !selectedShape.get('destroyed')) {
      ev.data = selectedShape.get('origin')._origin;
      ev.shapeInfo = selectedShape.get('origin');
      ev.shape = selectedShape;
      ev.selected = !!selectedShape.get('_selected');
    }
  }

  reset() {
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
    self.selectedShape = null;
    self.selectedAxisShape = null;
  }

  start(ev) {
    const chart = this.chart;
    if (ev.type === 'tap') {
      ev.clientX = ev.center.x;
      ev.clientY = ev.center.y;
    }
    const { x, y } = Util.createEvent(ev, chart);

    const mode = this.mode;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');
    let selectedShape;
    const unSelectedShapes = [];
    if (mode === 'shape') {
      const plot = chart.get('plotRange');
      if (!Helper.isPointInPlot({ x, y }, plot)) {
        this.reset();
        return;
      }
      Util.each(children, child => {
        const box = child.getBBox();
        if (x >= box.x && x <= (box.x + box.width) && y >= box.y && y <= (box.height + box.y)) { // inbox
          selectedShape = child;
        } else {
          unSelectedShapes.push(child);
        }
      });
    } else if (mode === 'range') {
      const records = chart.getSnapRecords({ x, y });
      if (!records.length) {
        this.reset();
        return;
      }

      const data = records[0]._origin;
      Util.each(children, child => {
        if (child.get('isShape') && (child.get('className') === geom.get('type'))) { // get geometry's shape
          const shapeData = child.get('origin')._origin;
          if (Object.is(shapeData, data)) {
            selectedShape = child;
          } else {
            unSelectedShapes.push(child);
          }
        }
      });
    }

    if (selectedShape) {
      this.selectedShape = selectedShape;
      if (selectedShape.get('_selected')) {
        if (!this.cancelable) {
          this._setEventData(ev);
          return;
        }
        this.reset();
      } else {
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

        if (this.selectAxis) {
          if (this.selectedAxisShape) {
            this._resetShape(this.selectedAxisShape);
          }

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
    } else {
      this.reset();
    }

    this._setEventData(ev);
  }

  end(ev) {
    this._setEventData(ev);
  }
}

Chart.registerInteraction('interval-select', IntervalSelect);
module.exports = IntervalSelect;
