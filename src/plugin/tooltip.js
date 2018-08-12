const Util = require('../util/common');
const Global = require('../global');
const Tooltip = require('../component/tooltip');

// Register the default configuration for Tooltip
Global.tooltip = Util.deepMix({
  triggerOn: [ 'touchstart', 'touchmove' ],
  // triggerOff: 'touchend',
  alwaysShow: false, // 当移出触发区域，是否仍显示提示框内容，默认为 false，移出触发区域 tooltip 消失，设置为 true 可以保证一直显示提示框内容
  showTitle: false,
  showCrosshairs: false,
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: 1
  },
  showTooltipMarker: true,
  background: {
    radius: 1,
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: [ 3, 5 ]
  },
  titleStyle: {
    fontSize: 12,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'top'
  },
  nameStyle: {
    fontSize: 12,
    fill: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  valueStyle: {
    fontSize: 12,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  },
  showItemMarker: true,
  itemMarkerStyle: {
    radius: 3,
    symbol: 'circle',
    lineWidth: 1,
    stroke: '#fff'
  },
  layout: 'horizontal'
}, Global.tooltip || {});

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
  return scale.getText(origin[scale.field]);
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
    this.cfg = {};
    this.tooltip = null;
    this.chart = null;
    this.timeStamp = 0;
    Util.mix(this, cfg);
    const chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
  }

  _setCrosshairsCfg() {
    const self = this;
    const chart = self.chart;
    const defaultCfg = Util.mix({}, Global.tooltip);
    const geoms = chart.get('geoms');
    const shapes = [];
    Util.each(geoms, geom => {
      const type = geom.get('type');
      if (Util.indexOf(shapes, type) === -1) {
        shapes.push(type);
      }
    });
    const coordType = chart.get('coord').type;
    if (geoms.length && (coordType === 'cartesian' || coordType === 'rect')) {
      if (shapes.length === 1 && [ 'line', 'area', 'path', 'point' ].indexOf(shapes[0]) !== -1) {
        Util.mix(defaultCfg, {
          showCrosshairs: true
        });
      }
    }

    return defaultCfg;
  }

  _getMaxLength(cfg = {}) {
    const { layout, plotRange } = cfg;
    return (layout === 'horizontal') ? plotRange.br.x - plotRange.bl.x : plotRange.bl.y - plotRange.tr.y;
  }

  render() {
    const self = this;

    if (self.tooltip || !self.enable) {
      return;
    }

    const chart = self.chart;
    const canvas = chart.get('canvas');
    const frontPlot = chart.get('frontPlot').addGroup({
      className: 'tooltipContainer',
      zIndex: 10
    });
    const backPlot = chart.get('backPlot').addGroup({
      className: 'tooltipContainer'
    });
    const plotRange = chart.get('plotRange');
    const coord = chart.get('coord');

    const defaultCfg = self._setCrosshairsCfg();
    let cfg = self.cfg;
    cfg = Util.deepMix({
      plotRange,
      frontPlot,
      backPlot,
      canvas,
      fixed: coord.transposed || coord.isPolar
    }, defaultCfg, cfg);
    cfg.maxLength = self._getMaxLength(cfg);
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
      const { tl, br } = chart.get('plotRange');
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
        radius: 4,
        fill: '#fff',
        lineWidth: 2
      }, tooltipCfg.tooltipMarkerStyle);
    }

    return cfg;
  }

  _setTooltip(point, items, tooltipMarkerCfg = {}) {
    const lastActive = this._lastActive;
    const tooltip = this.tooltip;
    const cfg = this.cfg;

    items = _uniqItems(items); // 过滤重复的记录项

    if (cfg.onShow) { // tooltip 展示
      cfg.onShow({
        x: point.x,
        y: point.y,
        tooltip,
        items,
        tooltipMarkerCfg
      });
    }
    if (isEqual(lastActive, items)) {
      return;
    }
    this._lastActive = items;

    if (cfg.onChange || Util.isFunction(cfg.custom)) { // 兼容之前的写法
      const onChange = cfg.onChange || cfg.custom;
      onChange({
        x: point.x,
        y: point.y,
        tooltip,
        items,
        tooltipMarkerCfg
      });
    }

    if (!cfg.custom) {
      const first = items[0];
      const title = first.title || first.name;
      tooltip.setContent(title, items);
    }
    tooltip.setPosition(items);

    const markerItems = tooltipMarkerCfg.items;
    if (cfg.showTooltipMarker && markerItems.length) {
      tooltipMarkerCfg = this._getTooltipMarkerStyle(tooltipMarkerCfg);
      tooltip.setMarkers(tooltipMarkerCfg);
    } else {
      tooltip.clearMarkers();
    }

    tooltip.show();
  }

  showTooltip(point) {
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

    Util.each(geoms, geom => {
      const type = geom.get('type');
      const records = geom.getSnapRecords(point);
      Util.each(records, record => {
        if (record.x && record.y) {
          const { x, y, _origin, color } = record;
          const tooltipItem = {
            x,
            y: Util.isArray(y) ? y[1] : y,
            color: color || Global.defaultColor,
            origin: _origin,
            name: getTooltipName(geom, _origin),
            value: getTooltipValue(geom, _origin),
            title: getTooltipTitle(geom, _origin)
          };
          if (marker) {
            tooltipItem.marker = Util.mix({
              fill: color || Global.defaultColor
            }, marker);
          }
          items.push(tooltipItem);

          if ([ 'line', 'area', 'path' ].indexOf(type) !== -1) {
            tooltipMarkerType = 'circle';
            tooltipMarkerItems.push(tooltipItem);
          } else if (type === 'interval' && (coord.type === 'cartesian' || coord.type === 'rect')) {
            tooltipMarkerType = 'rect';
            tooltipItem.width = geom.getSize(record._origin);
            tooltipMarkerItems.push(tooltipItem);
          }
        }
      });
    });

    if (items.length) {
      const tooltipMarkerCfg = {
        items: tooltipMarkerItems,
        type: tooltipMarkerType
      };
      self._setTooltip(point, items, tooltipMarkerCfg);
    } else {
      self.hideTooltip();
    }
  }

  hideTooltip() {
    const cfg = this.cfg;
    this._lastActive = [];
    const tooltip = this.tooltip;
    if (tooltip) {
      tooltip.hide();
      if (cfg.onHide) {
        cfg.onHide({
          tooltip
        });
      }
      const canvas = this.chart.get('canvas');
      canvas.draw();
    }
  }

  handleShowEvent(ev) {
    const chart = this.chart;
    const plot = chart.get('plotRange');
    const { x, y } = Util.createEvent(ev, chart);
    if (!(x >= plot.tl.x && x <= plot.tr.x && y >= plot.tl.y && y <= plot.br.y) && !this.cfg.alwaysShow) { // not in chart plot
      this.hideTooltip();
      return;
    }
    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();
    if ((timeStamp - lastTimeStamp) > 16) {
      this.showTooltip({ x, y });
      this.timeStamp = timeStamp;
    }
  }

  handleHideEvent() {
    this.hideTooltip();
  }

  handleDocEvent(ev) {
    const canvasDom = this.canvasDom;
    if (ev.target !== canvasDom) {
      this.hideTooltip();
    }
  }

  _handleEvent(methodName, method, action) {
    const canvasDom = this.canvasDom;
    Util.each([].concat(methodName), aMethod => {
      if (action === 'bind') {
        Util.addEventListener(canvasDom, aMethod, method);
      } else {
        Util.removeEventListener(canvasDom, aMethod, method);
      }
    });
  }

  bindEvents() {
    const cfg = this.cfg;
    const { triggerOn, triggerOff, alwaysShow } = cfg;
    const showMethod = Util.wrapBehavior(this, 'handleShowEvent');
    const hideMethod = Util.wrapBehavior(this, 'handleHideEvent');

    triggerOn && this._handleEvent(triggerOn, showMethod, 'bind');
    triggerOff && this._handleEvent(triggerOff, hideMethod, 'bind');
    // TODO: 当用户点击 canvas 外的事件时 tooltip 消失
    if (!alwaysShow) {
      const docMethod = Util.wrapBehavior(this, 'handleDocEvent');
      Util.isBrowser && Util.addEventListener(document, 'touchstart', docMethod);
    }
  }

  unBindEvents() {
    const cfg = this.cfg;
    const { triggerOn, triggerOff, alwaysShow } = cfg;
    const showMethod = Util.getWrapBehavior(this, 'handleShowEvent');
    const hideMethod = Util.getWrapBehavior(this, 'handleHideEvent');

    triggerOn && this._handleEvent(triggerOn, showMethod, 'unBind');
    triggerOff && this._handleEvent(triggerOff, hideMethod, 'unBind');

    // TODO: 当用户点击 canvas 外的事件时 tooltip 消失
    if (!alwaysShow) {
      const docMethod = Util.getWrapBehavior(this, 'handleDocEvent');
      Util.isBrowser && Util.removeEventListener(document, 'touchstart', docMethod);
    }
  }
}

module.exports = {
  init(chart) {
    const tooltipController = new TooltipController({
      chart
    });
    chart.set('tooltipController', tooltipController);
    /**
     * 配置 tooltip
     * @param  {Boolean|Object} enable Boolean 表示是否开启tooltip，Object 则表示配置项
     * @param  {Object} cfg 配置项
     * @return {Chart} 返回 Chart 实例
     */
    chart.tooltip = function(enable, cfg = {}) {
      if (Util.isObject(enable)) {
        cfg = enable;
        enable = true;
      }
      tooltipController.enable = enable;
      tooltipController.cfg = cfg;

      return this;
    };
  },
  afterGeomDraw(chart) {
    const tooltipController = chart.get('tooltipController');
    tooltipController.render();

    /**
     * 根据坐标点显示对应的 tooltip
     * @param  {Object} point 画布上的点
     * @return {Chart}       返回 chart 实例
     */
    chart.showTooltip = function(point) {
      tooltipController.showTooltip(point);
      return this;
    };

    /**
     * 隐藏 tooltip
     * @return {Chart}       返回 chart 实例
     */
    chart.hideTooltip = function() {
      tooltipController.hideTooltip();
      return this;
    };
  },
  clearInner(chart) {
    const tooltipController = chart.get('tooltipController');
    tooltipController.clear();
  }
};
