const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class CategoryPinch extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'pinchstart',
      processingEvent: 'pinch',
      endEvent: 'pinchend',
      resetEvent: '',
      currentPinchScaling: null,
      originValues: null,
      minScale: 1, // Minimum zoom
      maxScale: 4, // Maximum zoom
      _timestamp: 0
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const hammer = this.hammer;
    hammer.get('pinch').set({ // open pinch recognizer
      enable: true
    });
    chart.set('limitInPlot', true);
  }

  start() {
    this.currentPinchScaling = 1;
  }

  process(e) {
    this._handlePinch(e);
  }

  end(e) {
    this._handlePinch(e);
    this.currentPinchScaling = null; // reset
  }

  _handlePinch(e) {
    const currentPinchScaling = this.currentPinchScaling;
    const diff = 1 / (currentPinchScaling) * e.scale;
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.center.x - rect.left;
    const offsetY = e.center.y - rect.top;
    const center = {
      x: offsetX,
      y: offsetY
    };
    const lastTimestamp = this._timestamp;
    const now = +new Date();
    if ((now - lastTimestamp) > 16) {
      this._doZoom(diff, center);
      this._timestamp = now;
    }

    // Keep track of overall scale
    this.currentPinchScaling = e.scale;
  }

  _doZoom(diff, center) {
    const chart = this.chart;
    const xScale = chart.getXScale();
    if (xScale.isCategory) {
      this._zoomScale(xScale, diff, center);
      chart.repaint();
    }
  }

  _zoomScale(scale, zoom, center) {
    const { type, field, values } = scale;
    const chart = this.chart;
    const coord = chart.get('coord');
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    if (!this.originValues || chart.get('dataChanged')) {
      const data = chart.get('data');
      const originValues = [];
      data.map(obj => {
        let value = obj[field];
        if (type === 'timeCat') {
          value = scale._toTimeStamp(value);
        }
        if (originValues.indexOf(value) === -1) {
          originValues.push(value);
        }
        return obj;
      });
      this.originValues = originValues;
      this.originTicks = scale.ticks;
    }

    const originTicks = this.originTicks;
    const originValues = this.originValues;
    const originValuesLen = originValues.length;
    const minCount = originValuesLen / this.maxScale;
    const maxCount = originValuesLen / this.minScale;

    const valuesLength = values.length;
    const offsetPoint = coord.invertPoint(center);
    const percent = offsetPoint.x;
    const deltaCount = parseInt(valuesLength * Math.abs(zoom - 1));
    const minDelta = parseInt(deltaCount * (percent));
    const maxDelta = deltaCount - minDelta;

    if (zoom >= 1 && valuesLength >= minCount) { // 放大
      const newValues = values.slice(minDelta, valuesLength - maxDelta);
      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: originTicks
      }));
    } else if (zoom < 1 && valuesLength <= maxCount) { // 缩小
      const firstIndex = originValues.indexOf(values[0]);
      const lastIndex = originValues.indexOf(values[valuesLength - 1]);
      const minIndex = Math.max(0, firstIndex - minDelta);
      const maxIndex = Math.min(lastIndex + maxDelta, originValuesLen);
      const newValues = originValues.slice(minIndex, maxIndex);
      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: originTicks
      }));
    }
  }
}


Chart.registerInteraction('category-pinch', CategoryPinch);
module.exports = CategoryPinch;
