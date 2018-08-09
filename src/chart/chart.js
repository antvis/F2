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
      filters: null,
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
          range = [ 0.5, 1 ]; // 只有一个分类时,防止计算出现 [0.5,0.5]的状态
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
            offset = 1 / count * 1 / 2; // 两边留下分类空间的一半
            range = [ offset, 1 - offset ]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
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
          } else if (max <= 0) { // 当柱状图全为负值时也需要从 0 开始生长
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

    Chart.plugins.notify(this, 'clearInner'); // TODO
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
    let padding = this.get('_padding');
    if (!padding) {
      padding = this.get('margin') || this.get('padding'); // 兼容margin 的写法
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
    } catch (error) { // canvas 创建发生异常
      throw error;
    }
    Chart.plugins.notify(self, 'afterCanvasInit');
    self._initLayout();
  }

  _initLayers() {
    const canvas = this.get('canvas');
    this.set('backPlot', canvas.addGroup()); // 默认 zIndex 为 0
    this.set('middlePlot', canvas.addGroup({
      zIndex: 10
    }));
    this.set('frontPlot', canvas.addGroup({
      zIndex: 20
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
      frontPlot: self.get('frontPlot').addGroup({
        className: 'axisContainer'
      }),
      backPlot: self.get('backPlot').addGroup({
        className: 'axisContainer'
      }),
      chart: self
    }));
    Chart.plugins.notify(self, 'init'); // TODO: beforeInit afterInit
  }

  constructor(cfg) {
    super(cfg);
    // 附加各种 geometry 对应的方法
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
    const filters = this.get('filters') || {};
    filters[field] = condition;
    this.set('filters', filters);
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
    this.get('frontPlot').sort();
    Chart.plugins.notify(self, 'beforeCanvasDraw');
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
    super.destroy();
  }

  /**
   * 获取数据对应在画布空间的坐标
   * @param  {Object} record 原始数据
   * @return {Object} 返回对应的画布上的坐标点
   */
  getPosition(record) {
    const self = this;
    const coord = self.get('coord');
    const xScale = self.getXScale();
    const yScale = self.getYScales()[0]; // 暂时只取第一个y轴，忽视多轴的情况
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
    const xScale = self.getXScale();
    const yScale = self.getYScales()[0];
    const invertPoint = coord.invertPoint(point);
    const record = {};
    record[xScale.field] = xScale.invert(invertPoint.x);
    record[yScale.field] = yScale.invert(invertPoint.y);
    return record;
  }
  /**
   * 根据画布坐标获取对应数据集
   * @param  {Object} point 画布坐标的x,y的值
   * @return {Array} 纵向切割交点对应数据集
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
   * 创建度量
   * @param  {String} field 度量对应的名称
   * @return {Scale} 度量
   */
  createScale(field) {
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
      scales[field] = this._createScale(field, data);
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
    const middlePlot = this.get('middlePlot');
    geoms.push(geom);
    geom.set('chart', this);
    geom.set('container', middlePlot.addGroup());
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
              name, // 图例项显示文本的内容
              dataValue: value, // 图例项对应原始数据中的数值
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

  // 注册插件
  registerPlugins(plugins) {
    const self = this;
    let chartPlugins = self.get('plugins') || [];
    if (!Util.isArray(chartPlugins)) {
      chartPlugins = [ chartPlugins ];
    }

    ([]).concat(plugins).forEach(plugin => {
      if (chartPlugins.indexOf(plugin) === -1) {
        plugin.init && plugin.init(self); // 进行初始化
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
