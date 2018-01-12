/**
 * TODO: tooltipcallback 回调和 custom 回调
 */
const Util = require('../util/common');
const DomUtil = require('../util/dom');
const Global = require('../global');
const { Tooltip } = require('../component/index');

// TODO: 细化
// Register the default configuration for Tooltip
Global.tooltip = Util.deepMix(Global.tooltip || {}, {
  triggerOn: 'mousemove',
  showTitle: false,
  showCrosshairs: false,
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: 1
  },
  showTooltipMarker: true,
  // tooltipMarkerStyle: {} tooltipMarker 样式
  background: {
    // TODO 背景颜色
  },
  textStyle: {
    fontSize: 12,
    fill: '#000',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  showItemMarker: true,
  itemMarkerStyle: {
    radius: 5,
    symbol: 'circle'
  }
});

function _getTooltipValueScale(geom) {
  const colorAttr = geom.getAttr('color');
  if (colorAttr) {
    const colorScale = colorAttr.getScale(colorAttr.type);
    if (colorScale.isLinear) {
      return colorScale;
    }
  }
  const xScale = geom.getXScale();
  const yScale = geom.getYScale();
  if (yScale) {
    return yScale;
  }

  return xScale;
}

function getTooltipName(geom, origin) {
  let name;
  let nameScale;
  const groupScales = geom._getGroupScales();
  if (groupScales.length) { // 如果存在分组类型，取第一个分组类型
    Util.each(groupScales, function(scale) {
      nameScale = scale;
      return false;
    });
  }
  if (nameScale) {
    const field = nameScale.field;
    name = nameScale.getText(origin[field]);
  } else {
    const valueScale = _getTooltipValueScale(geom);
    name = valueScale.alias || valueScale.field;
  }
  return name;
}

function getTooltipValue(geom, origin) {
  const scale = _getTooltipValueScale(geom);
  return origin[scale.field];
}

function getTooltipTitle(geom, origin) {
  const position = geom.getAttr('position');
  const field = position.getFields()[0];
  const scale = geom.get('scales')[field];
  return scale.getText(origin[scale.field]);
}

function _indexOfArray(items, item) {
  let rst = -1;
  Util.each(items, function(sub, index) {
    if (sub.title === item.title && sub.name === item.name && sub.value === item.value && sub.color === item.color) {
      rst = index;
      return false;
    }
  });
  return rst;
}

// 去除重复的值, 去除不同图形相同数据，只展示一份即可
function _uniqItems(items) {
  const tmp = [];
  Util.each(items, function(item) {
    const index = _indexOfArray(tmp, item);
    if (index === -1) {
      tmp.push(item);
    } else {
      tmp[index] = item;
    }
  });
  return tmp;
}

function isEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

class TooltipController {
  constructor(cfg) {
    this.enable = true;
    this.cfg = null;
    this.tooltip = null;
    this.chart = null;
    this.timeStamp = 0;
    Util.mix(this, cfg);
  }

  _setTooltipCrosshairs() {
    const self = this;
    const chart = self.chart;
    const defaultCfg = Util.mix({}, Global.tooltip);
    const geoms = this.chart.get('geoms');
    const shapes = [];
    geoms.map(geom => {
      const type = geom.get('type');
      if (Util.indexOf(shapes, type) === -1) {
        shapes.push(type);
      }
      return geom;
    });
    if (geoms.length && chart.get('coord').type === 'cartesian') {
      if (shapes.length === 1 && [ 'line', 'area', 'path' ].indexOf(shapes[0]) !== -1) {
        Util.mix(defaultCfg, {
          showCrosshairs: true
        });
      }
    }

    return defaultCfg;
  }

  render() {
    const self = this;
    if (self.tooltip) {
      return;
    }

    const chart = self.chart;
    const canvas = chart.get('canvas');
    const frontPlot = chart.get('frontPlot');
    const backPlot = chart.get('backPlot');
    const chartPlot = chart.get('plot');

    const defaultCfg = self._setTooltipCrosshairs();
    let cfg = self.cfg;
    cfg = Util.mix({
      chartPlot,
      frontPlot,
      backPlot,
      canvas
    }, defaultCfg, cfg);
    this.cfg = cfg;
    const tooltip = new Tooltip(cfg);
    self.tooltip = tooltip;
    self.bindEvents();
  }

  clear() {
    const tooltip = this.tooltip;
    tooltip && tooltip.destroy();
    this.tooltip = null;
    this.prePoint = null;
    this.unBindEvents();
  }

  _getTooltipMarkerStyle(cfg = {}) {
    const { type, items } = cfg;
    const tooltipCfg = this.cfg;
    if (type === 'rect') {
      let x;
      let y;
      let width;
      let height;
      const chart = this.chart;
      const { tl, br } = chart.get('plot');
      const coord = chart.get('coord');
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const intervalWidth = firstItem.width;
      if (coord.transposed) {
        x = tl.x;
        y = lastItem.y - intervalWidth * 0.75;
        width = br.x - tl.x;
        height = firstItem.y - lastItem.y + 1.5 * intervalWidth;
      } else {
        x = firstItem.x - intervalWidth * 0.75;
        y = tl.y;
        width = lastItem.x - firstItem.x + 1.5 * intervalWidth;
        height = br.y - tl.y;
      }

      cfg.style = Util.mix({
        x,
        y,
        width,
        height,
        fill: '#CCD6EC',
        opacity: 0.3
      }, tooltipCfg.tooltipMarkerStyle);
    } else {
      cfg.style = Util.mix({
        radius: 5,
        fill: '#fff',
        lineWidth: 2
      }, tooltipCfg.tooltipMarkerStyle);
    }

    return cfg;
  }

  _setTooltip(items, tooltipMarkerCfg = {}) {
    const lastActive = this._lastActive;

    if (isEqual(lastActive, items)) {
      return;
    }

    items = _uniqItems(items);
    this._lastActive = items;

    const first = items[0];
    const title = first.title || first.name;
    const tooltip = this.tooltip;
    const cfg = this.cfg;
    tooltip.setContent(title, items);

    const markerItems = tooltipMarkerCfg.items;
    if (cfg.showTooltipMarker && markerItems.length) {
      tooltipMarkerCfg = this._getTooltipMarkerStyle(tooltipMarkerCfg);
      tooltip.setMarkers(tooltipMarkerCfg);
    } else {
      tooltip.clearMarkers();
    }
    // const { x, y } = items[0];
    // tooltip.setPosition(x, y);
    tooltip.setPosition(items[0].x);
    tooltip.show();
  }

  _showTooltip(point) {
    const self = this;
    const chart = self.chart;

    let tooltipMarkerType;
    const tooltipMarkerItems = [];
    const items = [];
    const cfg = self.cfg;
    let marker;
    if (cfg.showItemMarker) {
      marker = cfg.itemMarkerStyle;
    }

    const geoms = chart.get('geoms');
    const coord = chart.get('coord');
    geoms.map(geom => {
      const type = geom.get('type');
      const records = geom.getSnapRecords(point);
      records.map(record => {
        const { x, y, _origin, color } = record;
        const tooltipItem = {
          x,
          y: Util.isArray(y) ? y[1] : y,
          color: color || Global.defaultColor,
          marker,
          origin: _origin,
          name: getTooltipName(geom, _origin),
          value: getTooltipValue(geom, _origin),
          title: getTooltipTitle(geom, _origin)
        };
        items.push(tooltipItem);

        if ([ 'line', 'area', 'path' ].indexOf(type) !== -1) {
          tooltipMarkerType = 'circle';
          tooltipMarkerItems.push(tooltipItem);
        } else if (type === 'interval' && coord.type === 'cartesian') {
          tooltipMarkerType = 'rect';
          tooltipItem.width = geom.getSize(record._origin);
          tooltipMarkerItems.push(tooltipItem);
        }
        return record;
      });

      return geoms;
    });

    if (items.length) {
      const tooltipMarkerCfg = {
        items: tooltipMarkerItems,
        type: tooltipMarkerType
      };
      self._setTooltip(items, tooltipMarkerCfg);
    } else {
      self.hideTooltip();
    }
  }

  hideTooltip() {
    const tooltip = this.tooltip;
    this._lastActive = [];
    tooltip.hide();
  }

  handleEvent(ev) {
    const chart = this.chart;
    const plot = chart.get('plot');
    const { x, y } = DomUtil.createEvent(ev, chart);
    if (!(x >= plot.tl.x && x <= plot.tr.x && y >= plot.tl.y && y <= plot.br.y)) { // not in chart plot
      this.hideTooltip();
      return;
    }
    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();
    if ((timeStamp - lastTimeStamp) > 16) {
      this._showTooltip({ x, y });
      this.timeStamp = timeStamp;
    }
  }

  bindEvents() {
    const chart = this.chart;
    const triggerOn = this.cfg.triggerOn;
    const method = Util.wrapBehavior(this, 'handleEvent');
    if (Util.isFunction(triggerOn)) {
      triggerOn(method, 'bind'); // TODO： 测试。供用户自己绑定事件
    } else {
      DomUtil.addEventListener(chart, triggerOn, method);
    }
  }

  unBindEvents() {
    const chart = this.chart;
    const triggerOn = this.cfg.triggerOn;
    const method = Util.getWrapBehavior(this, 'handleEvent');
    if (Util.isFunction(triggerOn)) {
      triggerOn(method, 'unBind'); // TODO： 测试 供用户自己解绑事件
    } else {
      DomUtil.removeEventListener(chart, triggerOn, method);
    }
  }
}

module.exports = {
  init(chart) {
    const tooltipController = new TooltipController({
      chart
    });
    chart.set('tooltipController', tooltipController);
  },
  afterGeomDraw(chart) {
    const tooltipController = chart.get('tooltipController');
    tooltipController.render();
  },
  clearInner(chart) {
    const tooltipController = chart.get('tooltipController');
    tooltipController.clear();
  }
};
