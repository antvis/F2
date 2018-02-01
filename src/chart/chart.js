const Base = require('../base');
const Plot = require('./plot');
const Util = require('../util/common');
const Coord = require('../coord/index');
const Geom = require('../geom/base');
const ScaleController = require('./controller/scale');
const AxisController = require('./controller/axis');
const Global = require('../global');
const { Canvas } = require('../graphic/index');

function isFullCircle(coord) {
  const startAngle = coord.startAngle;
  const endAngle = coord.endAngle;
  if (!Util.isNil(startAngle) && !Util.isNil(endAngle) && (endAngle - startAngle) < Math.PI * 2) {
    return false;
  }
  return true;
}

const ViewGeoms = {};
Util.each(Geom, function(geomConstructor, className) {
  const methodName = Util.lowerFirst(className);
  ViewGeoms[methodName] = function(cfg) {
    const geom = new geomConstructor(cfg);
    this.addGeom(geom);
    return geom;
  };
});

class Chart extends Base {
  static initPlugins() {
    return {
      _plugins: [],
      _cacheId: 0,
      register(plugins) {
        const p = this._plugins;
        ([]).concat(plugins).forEach(function(plugin) {
          if (p.indexOf(plugin) === -1) {
            p.push(plugin);
          }
        });

        this._cacheId++;
      },
      unregister(plugins) {
        const p = this._plugins;
        ([]).concat(plugins).forEach(function(plugin) {
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

        this._plugins.concat((chart && chart.get('plugins')) || []).forEach(function(plugin) {
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
       * 画布的Id
       * @type {String}
       */
      id: null,
      /**
       * 画布中绘制图形的边距
       * @type {Array|Number}
       */
      padding: Global.padding,

      /**
       * 数据
       * @type {Array}
       */
      data: null,
      /**
       * chart 保有的度量
       * @type {Object}
       */
      scales: {},
      /**
       * 坐标系的配置信息
       * @private
       * @type {Object}
       */
      coordCfg: {
        type: 'cartesian'
      },
      /**
       * @private
       * 图层对应的图形
       * @type {Array}
       */
      geoms: null,
      /**
       * 列定义
       * @type {Object}
       */
      colDefs: null,
      pixelRatio: Global.pixelRatio,
      /**
       * 过滤设置
       * @type {Object}
       */
      filters: {},
      appendPadding: Global.appendPadding
    };
  }

  _getFieldsForLegend() {
    const fields = [];
    const geoms = this.get('geoms');
    Util.each(geoms, geom => {
      const attrOptions = geom.get('attrOptions');
      const attrCfg = attrOptions.color;
      if (attrCfg && attrCfg.field && Util.isString(attrCfg.field)) {
        const arr = attrCfg.field.split('*');
        arr.map(item => {
          if (fields.indexOf(item) === -1) {
            fields.push(item);
          }
          return item;
        });
      }
    });
    return fields;
  }

  _createScale(field, data, sortable) {
    const scaleController = this.get('scaleController');
    return scaleController.createScale(field, data, sortable);
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
          range = [ 0.5, 1 ]; // 只有一个分类时,防止计算出现 [0.5,0.5]的状态
        } else {
          let widthRatio = 1;
          let offset = 0;
          if (inFullCircle) {
            if (!coord.isTransposed) {
              range = [ 0, 1 - 1 / count ];
            } else {
              widthRatio = Global.widthRatio.multiplePie;
              offset = 1 / count * widthRatio;
              range = [ offset / 2, 1 - offset / 2 ];
            }
          } else {
            offset = 1 / count * 1 / 2; // 两边留下分类空间的一半
            range = [ offset, 1 - offset ]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
          }
        }
        scale.range = range;
      }
    });
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
    this._clearGeoms();

    Chart.plugins.notify(this, 'clearInner'); // TODO
    this.get('axisController') && this.get('axisController').clear();
    const frontPlot = this.get('frontPlot');
    const backPlot = this.get('backPlot');
    frontPlot && frontPlot.clear();
    backPlot && backPlot.clear();
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
    for (let i = 0, length = geoms.length; i < length; i++) {
      const geom = geoms[i];
      geom.set('data', data);
      geom.set('coord', coord);
      geom.init();
    }
  }

  _initCoord() {
    const plot = this.get('plotRange');
    const coordCfg = Util.mix({}, this.get('coordCfg'), {
      plot
    });
    const type = coordCfg.type;
    const C = Coord[Util.upperFirst(type)] || Coord.Cartesian;
    const coord = new C(coordCfg);
    this.set('coord', coord);
  }

  _initLayout() {
    let padding = this.get('margin') || this.get('padding'); // 兼容margin 的写法
    padding = Util.parsePadding(padding);
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
    } catch (info) { // 绘制时异常，中断重绘
      console.warn('error in init canvas');
      console.warn(info);
    }
    self._initLayout();
  }

  _initLayers() {
    const canvas = this.get('canvas');
    this.set('backPlot', canvas.addGroup({
      zIndex: 1
    }));
    this.set('middlePlot', canvas.addGroup({
      zIndex: 2
    }));
    this.set('frontPlot', canvas.addGroup({
      zIndex: 3
    }));
  }

  initColDefs() {
    const colDefs = this.get('colDefs');
    if (colDefs) {
      const scaleController = this.get('scaleController');
      Util.mix(scaleController.defs, colDefs);
    }
  }

  _init() {
    const self = this;
    self._initCanvas();
    self._initLayers();
    self.set('geoms', []);
    self.set('scaleController', new ScaleController());
    self.set('axisController', new AxisController({
      frontPlot: self.get('frontPlot'),
      backPlot: self.get('backPlot')
    }));
    Chart.plugins.notify(self, 'init'); // TODO: beforeInit afterInit
  }

  constructor(cfg) {
    super(cfg);
    Util.mix(this, ViewGeoms); // 附加各种 geometry 对应的方法
    this._init();
  }

  /**
   * 设置数据源和数据字段定义
   * @chainable
   * @param  {Array} data 数据集合
   * @param  {Object} colDefs 数据字段定义
   * @return {Chart} 返回当前 chart 的引用
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
    this.initColDefs();
    return this;
  }

  /**
   * 设置坐标轴配置项
   * @chainable
   * @param  {String|Boolean} field 坐标轴对应的字段
   * @param  {Object} cfg 坐标轴的配置信息
   * @return {Chart} 返回当前 chart 的引用
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
   * 设置图例
   * @chainable
   * @param  {Boolean|String|Object} field Boolean 表示关闭开启图例，String 表示指定具体的图例，Object 表示为所有的图例设置
   * @param  {Object|Boolean} cfg   图例的配置，Object 表示为对应的图例进行配置，Boolean 表示关闭对应的图例
   * @return {Chart}       返回当前 chart 的引用
   */
  legend(field, cfg) {
    const legendController = this.get('legendController');
    if (!legendController) {
      return this;
    }

    let legendCfg = legendController.legendCfg;

    if (Util.isBoolean(field)) {
      legendController.enable = field;
      legendCfg = cfg || {};
    } else if (Util.isObject(field)) {
      legendCfg = field;
    } else {
      legendCfg[field] = cfg;
    }

    legendController.legendCfg = legendCfg;

    return this;
  }

  /**
   * 设置坐标系配置项
   * @chainable
   * @param  {String} type 坐标系类型
   * @param  {Object} cfg 配置项
   * @return {Chart} 返回当前 chart 的引用
   */
  coord(type, cfg) {
    if (!type) {
      return;
    }
    let coordCfg;
    if (Util.isObject(type)) {
      coordCfg = type;
    } else {
      coordCfg = cfg || {};
      coordCfg.type = type;
    }
    this.set('coordCfg', coordCfg);

    return this;
  }

  filter(field, condition) {
    const filters = this.get('filters');
    filters[field] = condition;
  }

  /**
   * 配置 tooltip
   * @param  {Boolean|Object} enable Boolean 表示是否开启tooltip，Object 则表示配置项
   * @param  {Object} cfg 配置项
   * @return {Chart} 返回 Chart 实例
   */
  tooltip(enable, cfg = {}) {
    const tooltipController = this.get('tooltipController');
    if (!tooltipController) {
      return this;
    }
    if (Util.isObject(enable)) {
      cfg = enable;
      enable = true;
    }
    tooltipController.enable = enable;
    tooltipController.cfg = cfg;

    return this;
  }

  /**
   * 为图表添加 guide
   * @return {GuideController} 返回 guide 控制器
   */
  guide() {
    return this.get('guideController');
  }

  /**
   * 图表绘制
   * @chainable
   * @return {Chart} 返回当前 chart 的引用
   */
  render() {
    const self = this;
    const canvas = self.get('canvas');
    const geoms = self.get('geoms');
    // 处理数据
    const data = this.get('data') || [];
    const filteredData = this._execFilter(data);
    this.set('filteredData', filteredData);
    // 初始化坐标系
    self._initCoord();
    // 初始化 geoms
    self._initGeoms(geoms);
    // 调整度量
    self._adjustScale();

    // 绘制坐标轴
    Chart.plugins.notify(self, 'beforeGeomDraw');
    self._renderAxis();

    // 绘制 geom
    for (let i = 0, length = geoms.length; i < length; i++) {
      const geom = geoms[i];
      geom.paint();
    }

    Chart.plugins.notify(self, 'afterGeomDraw');
    canvas.sort();
    canvas.draw();
    return self;
  }

  /**
   * 清空图表上面的图层
   * @chainable
   * @return {Chart} 返回当前 chart 的引用
   */
  clear() {
    Chart.plugins.notify(this, 'clear'); // TODO: beforeClear afterClear
    this._removeGeoms();
    this._clearInner();
    this.set('filters', {});

    const canvas = this.get('canvas');
    canvas.draw();
    return this;
  }

  repaint() {
    Chart.plugins.notify(this, 'repaint');
    this._clearInner();
    this.render();
  }

  changeData(data) {
    this.set('data', data);
    this.repaint();
  }

  destroy() {
    this.clear();
    const canvas = this.get('canvas');
    canvas.destroy();
    super.destroy();
  }

  /**
   * 获取图例的 items
   * [getLegendItems description]
   * @return {[type]} [description]
   */
  getLegendItems() {
    const result = {};
    const legendController = this.get('legendController');
    if (legendController) {
      const legends = legendController.legends;
      Util.each(legends, legendItems => {
        Util.each(legendItems, legend => {
          const { field, items } = legend;
          result[field] = items;
        });
      });
    }
    return result;
  }

  /**
   * 创建度量
   * @param  {String} field 度量对应的名称
   * @param  {Boolean} sortable 是否需要排序
   * @return {Scale} 度量
   */
  createScale(field, sortable) {
    let data = this.get('data');
    const filteredData = this.get('filteredData');
    // 过滤导致数据为空时，需要使用全局数据
    // 参与过滤的字段的度量也根据全局数据来生成
    if (filteredData.length) {
      const legendFields = this._getFieldsForLegend();
      if (legendFields.indexOf(field) === -1) {
        data = filteredData;
      }
    }

    const scales = this.get('scales');
    if (!scales[field]) {
      scales[field] = this._createScale(field, data, sortable);
    }
    return scales[field];
  }

  /**
   * @protected
   * 添加几何标记
   * @param {Geom} geom 几何标记
   */
  addGeom(geom) {
    const geoms = this.get('geoms');
    geoms.push(geom);
    geom.set('chart', this);
    geom.set('container', this.get('middlePlot'));
  }

  /**
   * 获取 x 对应的度量
   * @return {Scale} x 对应的度量
   */
  getXScale() {
    const self = this;
    const geoms = self.get('geoms');
    const xScale = geoms[0].getXScale();
    return xScale;
  }

  /**
   * 获取 y 对应的度量
   * @return {Array} 返回所有 y 的度量
   */
  getYScales() {
    const geoms = this.get('geoms');
    const rst = [];

    Util.each(geoms, function(geom) {
      const yScale = geom.getYScale();
      if (Util.indexOf(rst, yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  }

  _renderAxis() {
    const axisController = this.get('axisController');
    const xScale = this.getXScale();
    const yScales = this.getYScales();
    const coord = this.get('coord');
    axisController.createAxis(coord, xScale, yScales, this);
  }

  _isAutoPadding() {
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
