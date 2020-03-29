import {
  EVENT_AFTER_INIT,
  EVENT_BEFORE_RENDER,
  EVENT_AFTER_RENDER,
  EVENT_BEFORE_DATA_CHANGE,
  EVENT_AFTER_DATA_CHANGE,
  EVENT_AFTER_SIZE_CHANGE,
  EVENT_AFTER_GEOM_INIT
} from './const';
const Base = require('../base');
const Plot = require('./plot');
const Util = require('../util/common');
const Coord = require('../coord/index');
const Geom = require('../geom/base');
const ScaleController = require('./controller/scale');
const AxisController = require('./controller/axis');
const Global = require('../global');
const { Canvas } = require('../graphic/index');
const Helper = require('../util/helper');


function compare(a, b) {
  return a - b;
}

function _isScaleExist(scales, compareScale) {
  let flag = false;
  Util.each(scales, scale => {
    const scaleValues = [].concat(scale.values);
    const compareScaleValues = [].concat(compareScale.values);
    if (scale.type === compareScale.type &&
      scale.field === compareScale.field &&
      scaleValues.sort(compare).toString() === compareScaleValues.sort(compare).toString()) {
      flag = true;
      return;
    }
  });

  return flag;
}

class Chart extends Base {
  static initPlugins() {
    return {
      _plugins: [],
      _cacheId: 0,
      register(plugins) {
        const p = this._plugins;
        ([]).concat(plugins).forEach(plugin => {
          if (p.indexOf(plugin) === -1) {
            p.push(plugin);
          }
        });

        this._cacheId++;
      },
      unregister(plugins) {
        const p = this._plugins;
        ([]).concat(plugins).forEach(plugin => {
          const idx = p.indexOf(plugin);
          if (idx !== -1) {
            p.splice(idx, 1);
          }
        });

        this._cacheId++;
      },
      clear() {
        this._plugins = [];
        this._cacheId++;
      },
      count() {
        return this._plugins.length;
      },
      getAll() {
        return this._plugins;
      },
      notify(chart, hook, args) {
        const descriptors = this.descriptors(chart);
        const ilen = descriptors.length;
        let i;
        let descriptor;
        let plugin;
        let params;
        let method;

        for (i = 0; i < ilen; ++i) {
          descriptor = descriptors[i];
          plugin = descriptor.plugin;
          method = plugin[hook];
          if (typeof method === 'function') {
            params = [ chart ].concat(args || []);
            if (method.apply(plugin, params) === false) {
              return false;
            }
          }
        }

        return true;
      },
      descriptors(chart) {
        const cache = chart._plugins || (chart._plugins = {});
        if (cache.id === this._cacheId) {
          return cache.descriptors;
        }

        const plugins = [];
        const descriptors = [];

        this._plugins.concat((chart && chart.get('plugins')) || []).forEach(plugin => {
          const idx = plugins.indexOf(plugin);
          if (idx !== -1) {
            return;
          }

          plugins.push(plugin);
          descriptors.push({
            plugin
          });
        });

        cache.descriptors = descriptors;
        cache.id = this._cacheId;
        return descriptors;
      }
    };
  }

  getDefaultCfg() {
    return {
      /**
       * the id of canvas
       * @type {String}
       */
      id: null,
      rendered: false,
      /**
       * padding
       * @type {Array|Number}
       */
      padding: Global.padding,

      /**
       * data
       * @type {Array}
       */
      data: null,
      /**
       * scales of chart
       * @type {Object}
       */
      scales: {},
      /**
       * @private
       * geometry instances
       * @type {Array}
       */
      geoms: [],
      /**
       * scale configuration
       * @type {Object}
       */
      colDefs: null,
      pixelRatio: Global.pixelRatio,
      /**
       * filter options
       * @type {Object}
       */
      filters: null,
      appendPadding: Global.appendPadding
    };
  }

  _syncYScales() {
    const syncY = this.get('syncY');
    if (!syncY) {
      return;
    }
    const geoms = this.get('geoms');
    const syncScales = [];
    let min = [];
    let max = [];
    Util.each(geoms, geom => {
      const yScale = geom.getYScale();
      if (yScale.isLinear) {
        syncScales.push(yScale);
        min.push(yScale.min);
        max.push(yScale.max);
      }
    });

    min = Math.min.apply(null, min);
    max = Math.max.apply(null, max);

    Util.each(syncScales, scale => {
      scale.change({ min });
      scale.change({ max });
    });
  }

  _getFieldsForLegend() {
    const fields = [];
    const geoms = this.get('geoms');
    Util.each(geoms, geom => {
      const attrOptions = geom.get('attrOptions');
      const attrCfg = attrOptions.color;
      if (attrCfg && attrCfg.field && Util.isString(attrCfg.field)) {
        const arr = attrCfg.field.split('*');

        Util.each(arr, item => {
          if (fields.indexOf(item) === -1) {
            fields.push(item);
          }
        });
      }
    });
    return fields;
  }

  _getScaleData(field) {
    let data = this.get('data');
    const filteredData = this.get('filteredData');
    if (filteredData.length) {
      const legendFields = this._getFieldsForLegend();
      if (legendFields.indexOf(field) === -1) {
        data = filteredData;
      }
    }
    return data;
  }

  // _updateScales() {
  //   const scaleController = this.get('scaleController');
  //   scaleController.updateScales();
  //   this._adjustScale();
  // }

  _adjustScale() {
    const self = this;
    const scaleController = self.get('scaleController');
    // 看起来是为了让柱状图最小或最大都默认从0开始
    const geoms = this.get('geoms');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      if (geom.get('type') === 'interval') {
        const yScale = geom.getYScale();
        scaleController.adjustStartZero(yScale);
      }
    }
  }

  _removeGeoms() {
    const geoms = this.get('geoms');
    while (geoms.length > 0) {
      const geom = geoms.shift();
      geom.destroy();
    }
  }

  _clearGeoms() {
    const geoms = this.get('geoms');
    for (let i = 0, length = geoms.length; i < length; i++) {
      const geom = geoms[i];
      geom.clear();
    }
  }

  _clearInner() {
    this._clearGeoms();
    Chart.plugins.notify(this, 'clearInner');
    this.get('axisController') && this.get('axisController').clear();
  }

  _initFilteredData() {
    const filters = this.get('filters');
    let data = this.get('data') || [];
    if (filters) {
      data = data.filter(function(obj) {
        let rst = true;
        Util.each(filters, function(fn, k) {
          if (fn) {
            rst = fn(obj[k], obj);
            if (!rst) {
              return false;
            }
          }
        });
        return rst;
      });
    }
    this.set('filteredData', data);
  }

  _changeGeomsData() {
    const geoms = this.get('geoms');
    const data = this.get('filteredData');

    for (let i = 0, length = geoms.length; i < length; i++) {
      const geom = geoms[i];
      geom.changeData(data);
    }
  }

  _initGeom(geom) {
    const coord = this.get('coord');
    const data = this.get('filteredData');
    const colDefs = this.get('colDefs');
    const middlePlot = this.get('middlePlot');
    geom.set('chart', this);
    geom.set('container', middlePlot.addGroup());
    geom.set('data', data);
    geom.set('coord', coord);
    geom.set('colDefs', colDefs);
    geom.init();
    this.emit(EVENT_AFTER_GEOM_INIT, geom);
  }

  _initGeoms() {
    const geoms = this.get('geoms');

    for (let i = 0, length = geoms.length; i < length; i++) {
      this._initGeom(geoms[i]);
    }
  }

  _initCoord() {
    const plot = this.get('plotRange');
    const coordCfg = Util.mix({
      type: 'cartesian'
    }, this.get('coordCfg'), {
      plot
    });
    const type = coordCfg.type;
    const C = Coord[Util.upperFirst(type)];
    const coord = new C(coordCfg);
    this.set('coord', coord);
  }

  _initLayout() {
    let padding = this.get('_padding');
    if (!padding) {
      padding = this.get('margin') || this.get('padding');
      padding = Util.parsePadding(padding);
    }

    const top = padding[0] === 'auto' ? 0 : padding[0];
    const right = padding[1] === 'auto' ? 0 : padding[1];
    const bottom = padding[2] === 'auto' ? 0 : padding[2];
    const left = padding[3] === 'auto' ? 0 : padding[3];

    const width = this.get('width');
    const height = this.get('height');

    const start = {
      x: left,
      y: top
    };
    const end = {
      x: width - right,
      y: height - bottom
    };
    const plot = this.get('plot');
    if (plot) {
      plot.reset(start, end);
      return;
    }
    const newPlot = new Plot({
      start,
      end
    });
    this.set('plotRange', newPlot);
    this.set('plot', newPlot);
  }

  _initCanvas() {
    const self = this;
    try {
      const canvas = new Canvas({
        el: self.get('el') || self.get('id'),
        context: self.get('context'),
        pixelRatio: self.get('pixelRatio'),
        width: self.get('width'),
        height: self.get('height'),
        fontFamily: Global.fontFamily
      });
      self.set('canvas', canvas);
      self.set('el', canvas.get('el'));
      self.set('width', canvas.get('width'));
      self.set('height', canvas.get('height'));
    } catch (error) {
      throw error;
    }
    Chart.plugins.notify(self, 'afterCanvasInit');
  }

  _initLayers() {
    const canvas = this.get('canvas');
    this.set('backPlot', canvas.addGroup());
    this.set('middlePlot', canvas.addGroup({
      zIndex: 10
    }));
    this.set('frontPlot', canvas.addGroup({
      zIndex: 20
    }));
  }

  _initEvents() {
    // 数据更新后的一些更新
    this.on(EVENT_AFTER_DATA_CHANGE, () => {
      // 数据更新后，重新设置filterdata
      this._initFilteredData();

      // 更新geoms里的数据
      this._changeGeomsData();
      this._adjustScale();
    });

    // 大小变化后的一些更新
    this.on(EVENT_AFTER_SIZE_CHANGE, () => {
      this._initLayout();

      // layout变化后，坐标轴也需要做相应的变化
      const coord = this.get('coord');
      if (coord) {
        coord.reset(this.get('plot'));
      }
    });
  }

  _initScaleController() {
    const scaleController = new ScaleController({
      chart: this
    });
    // 让colDefs 和 scaleController.defs 用同一个对象，这样就不用考虑同步的问题
    this.set('colDefs', scaleController.defs);
    // 已经实例化的scales 也保持统一个对象
    this.set('scales', scaleController.scales);
    this.set('scaleController', scaleController);
  }

  _clearScaleController() {
    const scaleController = this.get('scaleController');
    scaleController.clear();
  }

  _init() {
    const self = this;
    self._initCanvas();
    self._initLayout();
    self._initLayers();
    self._initEvents();
    self._initScaleController();
    self.set('axisController', new AxisController({
      frontPlot: self.get('frontPlot').addGroup({
        className: 'axisContainer'
      }),
      backPlot: self.get('backPlot').addGroup({
        className: 'axisContainer'
      }),
      chart: self
    }));
    Chart.plugins.notify(self, 'init');
  }

  constructor(cfg) {
    super(cfg);
    const self = this;
    Util.each(Geom, function(geomConstructor, className) {
      const methodName = Util.lowerFirst(className);
      self[methodName] = function(cfg) {
        const geom = new geomConstructor(cfg);
        self.addGeom(geom);
        return geom;
      };
    });
    self._init();
  }

  init() {
    // 初始filterData
    this._initFilteredData();
    // initialization coordinate instance
    this._initCoord();

    Chart.plugins.notify(this, 'beforeGeomInit');
    // init all geometry instances
    this._initGeoms();
    // 多 Y 轴的情况时，统一 Y 轴的数值范围。
    this._syncYScales();
    // do some adjust for data
    this._adjustScale();
    this.emit(EVENT_AFTER_INIT);
  }

  /**
   * set data and some scale configuration
   * @chainable
   * @param  {Array} data the dataset to visualize
   * @param  {Object} colDefs the configuration for scales
   * @return {Chart} return the chart instance
   */
  source(data, colDefs) {
    this.set('data', data);
    if (colDefs) {
      this.scale(colDefs);
    }
    return this;
  }

  scale(field, cfg) {
    const scaleController = this.get('scaleController');
    scaleController.setFieldDef(field, cfg);

    return this;
  }

  /**
   * configure the axis
   * @chainable
   * @param  {String|Boolean} field the field name of data
   * @param  {Object} cfg configuration for axis
   * @return {Chart} return the chart instance
   */
  axis(field, cfg) {
    const axisController = this.get('axisController');
    if (!field) {
      axisController.axisCfg = null;
    } else {
      axisController.axisCfg = axisController.axisCfg || {};
      axisController.axisCfg[field] = cfg;
    }
    return this;
  }

  /**
   * configure the coordinate
   * @chainable
   * @param  {String} type set the type of coodinate
   * @param  {Object} cfg configuration for coordinate
   * @return {Chart} return the chart instance
   */
  coord(type, cfg) {
    let coordCfg;
    if (Util.isObject(type)) {
      coordCfg = type;
    } else {
      coordCfg = cfg || {};
      coordCfg.type = type || 'cartesian';
    }
    this.set('coordCfg', coordCfg);
    return this;
  }

  filter(field, condition) {
    const filters = this.get('filters') || {};
    filters[field] = condition;
    this.set('filters', filters);

    // 如果已经render过，则再重新触发一次change
    if (this.get('rendered')) {
      this.emit(EVENT_AFTER_DATA_CHANGE, this.get('data'));
    }
  }

  /**
   * render the chart
   * @chainable
   * @return {Chart} return the chart instance
   */
  render() {
    const rendered = this.get('rendered');
    const canvas = this.get('canvas');
    const geoms = this.get('geoms');

    if (!rendered) {
      this.init();
      this.set('rendered', true);
    }
    this.emit(EVENT_BEFORE_RENDER);

    Chart.plugins.notify(this, 'beforeGeomDraw');
    this._renderAxis();

    const middlePlot = this.get('middlePlot');
    if (this.get('limitInPlot') && !middlePlot.attr('clip')) {
      const coord = this.get('coord');
      const clip = Helper.getClip(coord);
      clip.set('canvas', middlePlot.get('canvas'));
      middlePlot.attr('clip', clip);
    }

    for (let i = 0, length = geoms.length; i < length; i++) {
      const geom = geoms[i];
      geom.paint();
    }

    Chart.plugins.notify(this, 'afterGeomDraw');
    canvas.sort();
    this.get('frontPlot').sort();
    Chart.plugins.notify(this, 'beforeCanvasDraw');
    canvas.draw();

    this.emit(EVENT_AFTER_RENDER);
    return this;
  }

  /**
   * clear the chart, include geometris and all the shapes
   * @chainable
   * @return {Chart} return the chart
   */
  clear() {
    Chart.plugins.notify(this, 'clear');
    this._clearInner();
    this._removeGeoms();
    this._clearScaleController();
    this.set('legendItems', null);
    this.set('filters', null);
    this.set('isUpdate', false);
    this.set('_padding', null);
    this.set('rendered', false);
    const canvas = this.get('canvas');
    canvas.draw();
    return this;
  }

  repaint() {
    // 如果在没有render之前就repaint的，就直接return退出
    const rendered = this.get('rendered');
    if (!rendered) {
      return;
    }
    this.set('isUpdate', true);
    this.set('legendItems', null);
    Chart.plugins.notify(this, 'repaint');
    this._clearInner();
    this.render();
  }

  changeData(data) {
    this.emit(EVENT_BEFORE_DATA_CHANGE, data);
    this.set('data', data);
    Chart.plugins.notify(this, 'changeData');
    this.emit(EVENT_AFTER_DATA_CHANGE, data);
    this.set('_padding', null);
    this.repaint();
  }

  changeSize(width, height) {
    if (width) {
      this.set('width', width);
    } else {
      width = this.get('width');
    }

    if (height) {
      this.set('height', height);
    } else {
      height = this.get('height');
    }

    const canvas = this.get('canvas');
    canvas.changeSize(width, height);
    this.emit(EVENT_AFTER_SIZE_CHANGE, { width, height });
    this.repaint();
    return this;
  }

  destroy() {
    this.clear();
    const canvas = this.get('canvas');
    canvas.destroy();
    Chart.plugins.notify(this, 'afterCanvasDestroyed');

    if (this._interactions) {
      Util.each(this._interactions, interaction => {
        interaction.destroy();
      });
    }

    super.destroy();
  }

  /**
   * calculate dataset's position on canvas
   * @param  {Object} record the dataset
   * @return {Object} return the position
   */
  getPosition(record) {
    const self = this;
    const coord = self.get('coord');
    const xScale = self.getXScale();
    const yScale = self.getYScales()[0];
    const xField = xScale.field;
    const x = xScale.scale(record[xField]);
    const yField = yScale.field;
    const y = yScale.scale(record[yField]);
    return coord.convertPoint({
      x,
      y
    });
  }

  /**
   * get the data item of the point
   * @param  {Object} point canvas position
   * @return {Object} return the data item
   */
  getRecord(point) {
    const self = this;
    const coord = self.get('coord');
    const xScale = self.getXScale();
    const yScale = self.getYScales()[0];
    const invertPoint = coord.invertPoint(point);
    const record = {};
    record[xScale.field] = xScale.invert(invertPoint.x);
    record[yScale.field] = yScale.invert(invertPoint.y);
    return record;
  }
  /**
   * get the dataset of the point
   * @param  {Object} point canvas position
   * @return {Array} return the dataset
  **/
  getSnapRecords(point) {
    const geom = this.get('geoms')[0];
    let data = [];
    if (geom) { // need to judge
      data = geom.getSnapRecords(point);
    }
    return data;
  }

  /**
   * creat scale instances
   * @param  {String} field field name of data
   * @return {Scale} return the scale
   */
  createScale(field) {
    const data = this._getScaleData(field);
    const scaleController = this.get('scaleController');
    return scaleController.createScale(field, data);
  }

  /**
   * @protected
   * add geometry instance to geoms
   * @param {Geom} geom geometry instance
   */
  addGeom(geom) {
    const rendered = this.get('rendered');
    const geoms = this.get('geoms');
    geoms.push(geom);
    // 如果图表已经渲染过了，则直接初始化geom
    if (rendered) {
      this._initGeom(geom);
    }
  }

  /**
   * get the scale of x axis
   * @return {Scale} return the scale
   */
  getXScale() {
    const self = this;
    const geoms = self.get('geoms');
    const xScale = geoms[0].getXScale();
    return xScale;
  }

  /**
   * get the scale of y axis
   * @return {Array} return the scale
   */
  getYScales() {
    const geoms = this.get('geoms');
    const rst = [];

    Util.each(geoms, function(geom) {
      const yScale = geom.getYScale();
      if (rst.indexOf(yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  }

  getLegendItems() {
    if (this.get('legendItems')) {
      return this.get('legendItems');
    }
    const legendItems = {};
    const scales = [];

    const geoms = this.get('geoms');
    Util.each(geoms, geom => {
      const colorAttr = geom.getAttr('color');
      if (colorAttr) {
        const scale = colorAttr.getScale('color');
        // 只支持分类图例
        if (scale.isCategory && !_isScaleExist(scales, scale)) {
          scales.push(scale);

          const field = scale.field;
          const ticks = scale.getTicks();
          const items = [];
          Util.each(ticks, tick => {
            const text = tick.text;
            const name = text;
            const scaleValue = tick.value;
            const value = scale.invert(scaleValue);
            const color = colorAttr.mapping(value).join('') || Global.defaultColor;

            const marker = {
              fill: color,
              radius: 3,
              symbol: 'circle',
              stroke: '#fff'
            };

            items.push({
              name, // for display
              dataValue: value, // the origin value
              checked: true,
              marker
            });
          });

          legendItems[field] = items;
        }
      }
    });

    this.set('legendItems', legendItems);

    return legendItems;
  }

  // register the plugins
  registerPlugins(plugins) {
    const self = this;
    let chartPlugins = self.get('plugins') || [];
    if (!Util.isArray(chartPlugins)) {
      chartPlugins = [ chartPlugins ];
    }

    ([]).concat(plugins).forEach(plugin => {
      if (chartPlugins.indexOf(plugin) === -1) {
        plugin.init && plugin.init(self); // init
        chartPlugins.push(plugin);
      }
    });
    Chart.plugins._cacheId++;
    self.set('plugins', chartPlugins);
  }

  _renderAxis() {
    const axisController = this.get('axisController');
    const xScale = this.getXScale();
    const yScales = this.getYScales();
    const coord = this.get('coord');
    Chart.plugins.notify(this, 'beforeRenderAxis');
    axisController.createAxis(coord, xScale, yScales);
  }

  _isAutoPadding() {
    if (this.get('_padding')) {
      return false;
    }
    const padding = this.get('padding');
    if (Util.isArray(padding)) {
      return padding.indexOf('auto') !== -1;
    }
    return padding === 'auto';
  }

  _updateLayout(padding) {
    const width = this.get('width');
    const height = this.get('height');
    const start = {
      x: padding[3],
      y: padding[0]
    };
    const end = {
      x: width - padding[1],
      y: height - padding[2]
    };

    const plot = this.get('plot');
    const coord = this.get('coord');
    plot.reset(start, end);
    coord.reset(plot);
  }
}

Chart.plugins = Chart.initPlugins();

module.exports = Chart;
