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
            // params.push(descriptor.options);
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
        // const config = (chart && chart.get('plugins'));

        this._plugins.concat((chart && chart.get('plugins')) || []).forEach(function(plugin) {
          const idx = plugins.indexOf(plugin);
          if (idx !== -1) {
            return;
          }

          // const id = plugin.id;
          // let opts = options[id];
          // if (opts === false) {
          //   return;
          // }

          // if (opts === true) {
          //   opts = Util.mix({}, defaults.global.plugins[id]);
          //   // opts = helpers.clone(defaults.global.plugins[id]);
          // }

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
       * 每个 chart 实例的唯一 id
       * @type {[type]}
       */
      chartId: Util.uid(),
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
       * 图层
       * @type {Array}
       */
      layers: null,
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
      filters: {}
    };
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
    const self = this;
    if (colDefs) {
      self.set('colDefs', colDefs);
    }
    self._initData(data);
    return self;
  }

  /**
   * 设置坐标轴配置项
   * @chainable
   * @param  {String|Boolean} field 坐标轴对应的字段
   * @param  {Object} cfg 坐标轴的配置信息
   * @return {Chart} 返回当前 chart 的引用
   */
  axis(field, cfg) {
    const self = this;
    const axisController = self.get('axisController');
    if (!field) {
      axisController.axisCfg = null;
    } else {
      axisController.axisCfg = axisController.axisCfg || {};
      axisController.axisCfg[field] = cfg;
    }
    return self;
  }

  /**
   * [legend description]
   * @param  {[type]} field [description]
   * @param  {[type]} cfg   [description]
   * @return {[type]}       [description]
   */
  legend(field, cfg) {
    const self = this;
    const legendController = self.get('legendController');
    if (!legendController) {
      return self;
    }

    let legendCfg = legendController.legendCfg;
    // legendController.enable = true;

    if (Util.isBoolean(field)) { // 支持 chart.legend(true | false)
      legendController.enable = field;
    } else if (Util.isObject(field)) { // 默认的 legend 配置属性
      legendCfg = field;
    } else {
      legendCfg[field] = cfg; // 配置某一个 field 对应的图例
    }

    legendController.legendCfg = legendCfg;

    return self;
  }

  filter(field, condition) {
    const filters = this.get('filters');
    filters[field] = condition;
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

  /**
   * 创建度量
   * @param  {String} field 度量对应的名称
   * @param  {Array} data 数据集合
   * @return {Scale} 度量
   */
  createScale(field, data) {
    const self = this;
    // data = data || self.get('data');
    if (!data) {
      const filteredData = self.get('filteredData');
      const legendFields = this._getFieldsForLegend();
      // 过滤导致数据为空时，需要使用全局数据
      // 参与过滤的字段的度量也根据全局数据来生成
      if (filteredData.length && legendFields.indexOf(field) === -1) {
        data = filteredData;
      } else {
        data = this.get('data');
      }
    }
    const scales = self.get('scales');
    if (!scales[field]) {
      scales[field] = self._createScale(field, data);
    }
    return scales[field];
  }

  // 内部调用
  _createScale(field, data) {
    const self = this;
    const coord = self.get('coord');
    const inCircle = coord.isPolar;
    const scaleController = self.get('scaleController');
    return scaleController.createScale(field, data, inCircle);
  }

  /**
   * 设置坐标系配置项
   * @chainable
   * @param  {String} type 坐标系类型
   * @param  {Object} cfg 配置项
   * @return {Chart} 返回当前 chart 的引用
   */
  coord(type, cfg) {
    const self = this;
    let coordCfg;
    if (!cfg) {
      if (Util.isString(type)) {
        coordCfg = {
          type
        };
      } else {
        coordCfg = type;
      }
    } else {
      coordCfg = cfg;
      coordCfg.type = type;
    }

    self.set('coordCfg', coordCfg);
    return self;
  }

  /**
   * 获取数据对应在画布空间的坐标
   * @param  {Object} record 原始数据
   * @return {Object} 返回对应的画布上的坐标点
   */
  getPosition(record) {
    const self = this;
    const coord = self.get('coord');
    const xScale = self._getXScale();
    const yScale = self._getYScales()[0]; // 暂时只取第一个y轴，忽视多轴的情况
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
   * 获取画布上坐标对应的数据值
   * @param  {Object} point 画布坐标的x,y的值
   * @return {Object} 当前坐标系的数据值
   */
  getRecord(point) {
    const self = this;
    const coord = self.get('coord');
    const xScale = self._getXScale();
    const yScale = self._getYScales()[0];
    const invertPoint = coord.invertPoint(point);
    const record = {};
    record[xScale.field] = xScale.invert(invertPoint.x);
    record[yScale.field] = yScale.invert(invertPoint.y);
    return record;
  }
  /**
   * 根据画布坐标获取对应数据集
   * @param  {Object} point 画布坐标的x,y的值
   * @param {String} field 字段名
   * @return {Array} 纵向切割交点对应数据集
  **/
  getSnapRecords(point, field) {
    const geom = this.get('geoms')[0];
    const data = geom.getSnapRecords(point, field);
    return data;
  }

  // 初始化
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
    self._initData(self.get('data'));
    Chart.plugins.notify(self, 'init');
  }

  // 初始化数据
  _initData(data) {
    if (data) {
      this.set('data', data);
    }
    const colDefs = this.get('colDefs');
    if (colDefs) {
      const scaleController = this.get('scaleController');
      scaleController.defs = colDefs;
    }
  }

  _getRatio() {
    return this.get('pixelRatio');
  }

  // 初始化画布
  _initCanvas() {
    const self = this;
    try {
      const canvas = new Canvas({
        domId: self.get('id'),
        el: self.get('el'),
        context: self.get('context'),
        pixelRatio: self.get('pixelRatio'),
        width: self.get('width'),
        height: self.get('height')
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
    const backPlot = canvas.addGroup({
      zIndex: 1
    }); // 图表最后面的容器
    const middlePlot = canvas.addGroup({
      zIndex: 2
    }); // 图表所在的容器
    const frontPlot = canvas.addGroup({
      zIndex: 3
    }); // 图表前面的容器

    this.set('backPlot', backPlot);
    this.set('middlePlot', middlePlot);
    this.set('frontPlot', frontPlot);
  }

  // 初始化布局
  _initLayout() {
    const self = this;
    // 兼容margin 的写法
    const padding = self.get('margin') || self.get('padding');
    const canvas = self.get('canvas');
    const width = canvas.get('width'); // TODO 很容易混淆
    const height = canvas.get('height'); // TODO 很容易混淆
    let top;
    let left;
    let right;
    let bottom;

    if (Util.isNumber(padding)) {
      top = bottom = padding;
      left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNil(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNil(padding[3]) ? padding[3] : right;
    }

    bottom = height - bottom;
    right = width - right;
    const plot = new Plot({
      start: {
        x: left,
        y: top
      },
      end: {
        x: right,
        y: bottom
      }
    });
    self.set('plot', plot);
  }

  // 初始化坐标系
  _initCoord() {
    const self = this;
    const plot = self.get('plot');
    const coordCfg = Util.mix({}, self.get('coordCfg'), {
      start: plot.bl,
      end: plot.tr
    });
    const type = coordCfg.type;
    const C = Coord[Util.upperFirst(type)] || Coord.Cartesian;
    const coord = new C(coordCfg);

    self.set('coord', coord);
  }

  /**
   * @protected
   * 添加几何标记
   * @param {Geom} geom 几何标记
   */
  addGeom(geom) {
    const self = this;
    const geoms = self.get('geoms');
    geoms.push(geom);
    geom.set('chart', self);
    geom.set('container', self.get('middlePlot'));
  }

  guide() {
    return this.get('guideController');
  }

  /**
   * @protected
   * 移除几何标记
   * @param {Geom} geom 几何标记
   */
  removeGeom(geom) {
    const geoms = this.get('geoms');
    Util.Array.remove(geoms, geom);
    geom.destroy();
  }

  _removeGeoms() {
    const self = this;
    const geoms = self.get('geoms');
    while (geoms.length > 0) {
      const geom = geoms.shift();
      geom.destroy();
    }
  }

  _clearGeoms() {
    const self = this;
    const geoms = self.get('geoms');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      geom.clear();
    }
  }

  /**
   * 清空图表上面的图层
   * @chainable
   * @return {Chart} 返回当前 chart 的引用
   */
  clear() {
    Chart.plugins.notify(this, 'clear'); // TODO
    this._removeGeoms();
    this._clearInner();
    this.set('filters', {});

    const canvas = this.get('canvas');
    canvas.draw();
    return this;
  }

  _clearInner() {
    this.set('scales', {});
    this._clearGeoms();

    Chart.plugins.notify(this, 'clearInner'); // TODO
    const frontPlot = this.get('frontPlot');
    const backPlot = this.get('backPlot');
    frontPlot && frontPlot.clear();
    backPlot && backPlot.clear();
  }

  destroy() {
    this.clear();
    const canvas = this.get('canvas');
    canvas.destroy();
    super.destroy();
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

    // Chart.plugins.notify(self, 'beforeRender');
    const data = this.get('data') || [];
    const filteredData = this.execFilter(data);
    this.set('filteredData', filteredData);
    self._initCoord();
    self._initGeoms(geoms);
    self._adjustScale();

    Chart.plugins.notify(self, 'beforeGeomDraw');

    self._renderAxis();
    self.drawGeom(geoms);

    Chart.plugins.notify(self, 'afterGeomDraw');

    canvas.draw();
    return self;
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

  drawGeom(geoms) {
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      geom.paint();
    }
  }

  _initGeoms(geoms) {
    const self = this;
    const coord = self.get('coord');
    const data = self.get('filteredData');
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      geom.set('data', data);
      geom.set('coord', coord);
      geom.init();
    }
  }

  _adjustScale() {
    this._setCatScalesRange();
  }

  _setCatScalesRange() {
    const self = this;
    const coord = self.get('coord');
    const xScale = self._getXScale();
    const yScales = self._getYScales();
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

  execFilter(data) {
    const self = this;
    const filters = self.get('filters');
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

  // 获取x轴对应的度量
  _getXScale() {
    const self = this;
    const geoms = self.get('geoms');
    const xScale = geoms[0].getXScale();
    return xScale;
  }

  // 获取y轴对应的度量
  _getYScales() {
    const self = this;
    const geoms = self.get('geoms');
    const rst = [];

    Util.each(geoms, function(geom) {
      const yScale = geom.getYScale();
      if (Util.indexOf(rst, yScale) === -1) {
        rst.push(yScale);
      }
    });
    return rst;
  }

  // 绘制坐标轴
  _renderAxis() {
    const self = this;
    const axisController = self.get('axisController');
    const xScale = self._getXScale();
    const yScales = self._getYScales();
    const coord = self.get('coord');
    axisController.createAxis(coord, xScale, yScales);
  }
}

Chart.plugins = Chart.initPlugins();

module.exports = Chart;
