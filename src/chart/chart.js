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

function isFullCircle(coord) {
  const startAngle = coord.startAngle;
  const endAngle = coord.endAngle;
  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && (endAngle - startAngle) < Math.PI * 2) {
    return false;
  }
  return true;
}

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
      geoms: null,
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
      scale.min = min;
      scale.max = max;
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

  _createScale(field, data) {
    const scaleController = this.get('scaleController');
    return scaleController.createScale(field, data);
  }

  _adjustScale() {
    const self = this;
    const coord = self.get('coord');
    const xScale = self.getXScale();
    const yScales = self.getYScales();
    let scales = [];

    xScale && scales.push(xScale);
    scales = scales.concat(yScales);
    const inFullCircle = coord.isPolar && isFullCircle(coord);
    const scaleController = self.get('scaleController');
    const colDefs = scaleController.defs;
    Util.each(scales, function(scale) {
      if ((scale.isCategory || scale.isIdentity) && scale.values && !(colDefs[scale.field] && colDefs[scale.field].range)) {
        const count = scale.values.length;
        let range;
        if (count === 1) {
          range = [ 0.5, 1 ];
        } else {
          let widthRatio = 1;
          let offset = 0;
          if (inFullCircle) {
            if (!coord.transposed) {
              range = [ 0, 1 - 1 / count ];
            } else {
              widthRatio = Global.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [ offset / 2, 1 - offset / 2 ];
            }
          } else {
            offset = 1 / count * 1 / 2;
            range = [ offset, 1 - offset ];
          }
        }
        scale.range = range;
      }
    });

    const geoms = this.get('geoms');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      if (geom.get('type') === 'interval') {
        const yScale = geom.getYScale();
        const { field, min, max, type } = yScale;
        if (!(colDefs[field] && colDefs[field].min) && type !== 'time') {
          if (min > 0) {
            yScale.change({
              min: 0
            });
          } else if (max <= 0) {
            yScale.change({
              max: 0
            });
          }
        }
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
    this.set('scales', {});
    this.set('legendItems', null);
    this._clearGeoms();

    Chart.plugins.notify(this, 'clearInner');
    this.get('axisController') && this.get('axisController').clear();
  }

  _execFilter(data) {
    const filters = this.get('filters');
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
    return data;
  }

  _initGeoms(geoms) {
    const coord = this.get('coord');
    const data = this.get('filteredData');
    const colDefs = this.get('colDefs');

    for (let i = 0, length = geoms.length; i < length; i++) {
      const geom = geoms[i];
      geom.set('data', data);
      geom.set('coord', coord);
      geom.set('colDefs', colDefs);
      geom.init();
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
    const plot = new Plot({
      start: {
        x: left,
        y: top
      },
      end: {
        x: width - right,
        y: height - bottom
      }
    });
    this.set('plotRange', plot);
    this.set('plot', plot);
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
      self.set('width', canvas.get('width'));
      self.set('height', canvas.get('height'));
    } catch (error) {
      throw error;
    }
    Chart.plugins.notify(self, 'afterCanvasInit');
    self._initLayout();
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

  _init() {
    const self = this;
    self._initCanvas();
    self._initLayers();
    self.set('geoms', []);
    self.set('scaleController', new ScaleController());
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
    const colDefs = this.get('colDefs') || {};
    if (Util.isObject(field)) {
      Util.mix(colDefs, field);
    } else {
      colDefs[field] = cfg;
    }

    this.set('colDefs', colDefs);
    const scaleController = this.get('scaleController');
    scaleController.defs = colDefs;

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
  }

  /**
   * render the chart
   * @chainable
   * @return {Chart} return the chart instance
   */
  render() {
    const canvas = this.get('canvas');
    const geoms = this.get('geoms');
    const data = this.get('data') || [];

    const filteredData = this._execFilter(data); // filter data
    this.set('filteredData', filteredData);
    this._initCoord(); // initialization coordinate instance

    Chart.plugins.notify(this, 'beforeGeomInit');

    this._initGeoms(geoms); // init all geometry instances

    this.get('syncY') && this._syncYScales();

    this._adjustScale(); // do some adjust for data

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
    return this;
  }

  /**
   * clear the chart, include geometris and all the shapes
   * @chainable
   * @return {Chart} return the chart
   */
  clear() {
    Chart.plugins.notify(this, 'clear');
    this._removeGeoms();
    this._clearInner();
    this.set('filters', null);
    this.set('isUpdate', false);
    this.set('_padding', null);
    const canvas = this.get('canvas');
    canvas.draw();
    return this;
  }

  repaint() {
    this.set('isUpdate', true);
    Chart.plugins.notify(this, 'repaint');
    this._clearInner();
    this.render();
  }

  changeData(data) {
    this.set('data', data);
    Chart.plugins.notify(this, 'changeData');
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
    this._initLayout();
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
    let data = this.get('data');
    const filteredData = this.get('filteredData');
    if (filteredData.length) {
      const legendFields = this._getFieldsForLegend();
      if (legendFields.indexOf(field) === -1) {
        data = filteredData;
      }
    }

    const scales = this.get('scales');
    if (!scales[field]) {
      scales[field] = this._createScale(field, data);
    }
    return scales[field];
  }

  /**
   * @protected
   * add geometry instance to geoms
   * @param {Geom} geom geometry instance
   */
  addGeom(geom) {
    const geoms = this.get('geoms');
    const middlePlot = this.get('middlePlot');
    geoms.push(geom);
    geom.set('chart', this);
    geom.set('container', middlePlot.addGroup());
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
        if (scale.type !== 'identity' && !_isScaleExist(scales, scale)) {
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
