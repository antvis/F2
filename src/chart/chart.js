/**
 * @fileOverview chart
 * @author dxq613@gail.com
 */

const Base = require('../base');
const Plot = require('./plot');
const Util = require('../util');
const Coord = require('../coord/index');
const Geom = require('../geom/base');
const ScaleAssist = require('./assist/scale');
const AxisAssist = require('./assist/axis');
const GuideAssist = require('./assist/guide');
const Global = require('../global');
const DomUtil = require('../dom-util');
const AnimateAssist = require('./assist/animate');

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

/**
 * @class Chart
 * 图表的入口
 */

class Chart extends Base {
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
      pixelRatio: Global.pixelRatio
    };
  }

  constructor(cfg) {
    super(cfg);
    // 附加各种 geometry 对应的方法
    Util.mix(this, ViewGeoms);
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
    const axisAssist = self.get('axisAssist');
    if (!field) {
      axisAssist.axisCfg = null;
    } else {
      axisAssist.axisCfg = axisAssist.axisCfg || {};
      axisAssist.axisCfg[field] = cfg;
    }
    return self;
  }

  /**
   * 创建度量
   * @param  {String} field 度量对应的名称
   * @param  {Array} data 数据集合
   * @return {Scale} 度量
   */
  createScale(field, data) {
    const self = this;
    data = data || self.get('data');
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
    const scaleAssist = self.get('scaleAssist');
    return scaleAssist.createScale(field, data, inCircle);
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
   * 根据clientX, clientY获取画布上坐标
   * @param  {Number} clientX 事件获取的窗口坐标 x
   * @param  {Number} clientY 事件获取的窗口坐标 y
   * @return {Object} 对应的坐标
   */
  getPointByClient(clientX, clientY) {
    const canvas = this.get('canvas');
    const bbox = canvas.getBoundingClientRect();
    return {
      x: clientX - bbox.left,
      y: clientY - bbox.top
    };
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
    self.set('layers', []);
    self.set('geoms', []);
    self.set('scaleAssist', new ScaleAssist());
    self.set('axisAssist', new AxisAssist({
      canvas: self.get('canvas')
    }));
    self.set('guideAssist', new GuideAssist());
    self.set('animateAssist', new AnimateAssist());
    self._initData(self.get('data'));
  }

  // 初始化数据
  _initData(data) {
    if (data) {
      this.set('data', data);
    }
    const colDefs = this.get('colDefs');
    if (colDefs) {
      const scaleAssist = this.get('scaleAssist');
      scaleAssist.defs = colDefs;
    }
  }

  _getRatio() {
    return this.get('pixelRatio');
  }

  // 初始化画布
  _initCanvas() {
    const self = this;
    const id = self.get('id');
    const el = self.get('el');
    const context = self.get('context');
    let canvas;

    if (context) { // CanvasRenderingContext2D
      canvas = context.canvas;
    } else if (el) { // HTMLElement
      canvas = el;
    } else if (id) { // dom id
      canvas = document.getElementById(id);
    }

    if (!canvas) {
      throw new Error('Please specify the id or el of the chart!');
    }

    self.set('canvas', canvas);

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function() {
        return context;
      };
    }
    let width = self.get('width');
    let height = self.get('height');
    const ratio = self._getRatio();

    if (!width) {
      width = DomUtil.getWidth(canvas);
      self.set('width', width);
    }

    if (!height) {
      height = DomUtil.getHeight(canvas);
      self.set('height', height);
    }

    if (ratio) {
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      DomUtil.modiCSS(canvas, { height: height + 'px' });
      DomUtil.modiCSS(canvas, { width: width + 'px' });
      if (ratio !== 1) {
        const ctx = canvas.getContext('2d');
        ctx.scale(ratio, ratio);
      }
    }

    self._initLayout();
  }

  // 初始化布局
  _initLayout() {
    const self = this;
    // 兼容margin 的写法
    const padding = self.get('margin') || self.get('padding');
    const width = self.get('width');
    const height = self.get('height');
    let top;
    let left;
    let right;
    let bottom;

    if (Util.isNumber(padding)) {
      top = bottom = padding;
      left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNull(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNull(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNull(padding[3]) ? padding[3] : right;
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
      plot
    });
    const type = coordCfg.type;
    const C = Coord[Util.ucfirst(type)] || Coord.Cartesian;
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
    geom.set('container', self.get('canvas'));
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
    this.get('guideAssist').clear();
    this._removeGeoms();
    this._clearInner();
    return this;
  }

  _clearInner() {
    this.get('animateAssist').stop();
    this.set('scales', {});
    this._clearGeoms();
    this._clearCanvas();
    const parent = this.get('canvas').parentNode;
    this.get('guideAssist').reset(parent);
  }

  destroy() {
    this.clear();
    super.destroy();
  }

  _clearCanvas() {
    const canvas = this.get('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  }

  _beforeRenderGuide() {
    const guideAssist = this.get('guideAssist');
    if (guideAssist.guides.length) {
      const xScale = this._getXScale();
      const yScale = this._getYScales()[0];
      guideAssist.setScale(xScale, yScale);
    }
  }

  // 渲染辅助元素
  _renderBackGuide() {
    const self = this;
    const canvas = self.get('canvas');
    const guideAssist = self.get('guideAssist');
    if (guideAssist.guides.length) {
      const coord = self.get('coord');
      guideAssist.paintBack(coord, canvas);
    }
  }

  _renderFrontGuide() {
    const self = this;
    const canvas = self.get('canvas');
    const guideAssist = self.get('guideAssist');
    if (guideAssist && guideAssist.guides.length) {
      const coord = self.get('coord');
      guideAssist.paintFront(coord, canvas);
    }
  }

  _renderAnimate(callback) {
    const self = this;
    const imageData = self.get('imageData');
    const bgImageData = self.get('bgImageData');
    const animateAssist = self.get('animateAssist');
    const canvas = self.get('canvas');
    const coord = self.get('coord');
    const center = coord.get('center');
    const radius = coord.get('radius');
    const geom = self.get('geoms')[0];
    const yScale = geom.getYScale();
    const yMin = geom.getYMinValue();

    const startPoint = coord.convertPoint({
      x: 0,
      y: yScale.scale(yMin)
    });

    if (animateAssist.animate) {
      animateAssist.setOptions({
        imageData,
        bgImageData,
        startPoint,
        center,
        radius
      });
      animateAssist.setCallBack(callback);
      animateAssist.paint(canvas);
    }
  }

  /**
   * 图表绘制
   * @chainable
   * @return {Chart} 返回当前 chart 的引用
   */
  render() {
    const self = this;
    self._initCoord();
    const geoms = self.get('geoms');
    const animateAssist = self.get('animateAssist');
    self._initGeoms(geoms);
    this._adjustScale();
    self.beforeDrawGeom();

    if (animateAssist.animate) {
      self.set('bgImageData', self.getImageData());
      self._clearCanvas();
      self.drawGeom(geoms);
      self.set('imageData', self.getImageData());
      self._clearCanvas();
      self._renderAnimate(self._renderFrontGuide.bind(self));
    } else {
      self.drawGeom(geoms);
      self._renderFrontGuide();
    }
    return self;
  }

  repaint() {
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

  beforeDrawGeom() {
    const self = this;
    self._renderAxis();
    self._beforeRenderGuide();
    self._renderBackGuide();
  }

  getImageData() {
    const self = this;
    const canvas = self.get('canvas');
    const ctx = canvas.getContext('2d');
    const width = self.get('width');
    const height = self.get('height');
    const ratio = self._getRatio();
    return ctx.getImageData(0, 0, width * ratio, height * ratio);
  }

  _initGeoms(geoms) {
    const self = this;
    const coord = self.get('coord');
    const data = self.get('data');
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
    const scaleAssist = self.get('scaleAssist');
    const colDefs = scaleAssist.defs;
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
    const axisAssist = self.get('axisAssist');
    const xScale = self._getXScale();
    const yScales = self._getYScales();
    const coord = self.get('coord');
    axisAssist.createAxis(coord, xScale, yScales);
  }

  /**
   * 添加辅助信息
   * @return {GuideAssist} Guide辅助类
   */
  guide() {
    return this.get('guideAssist');
  }

  animate(cfg) {
    const animateAssist = this.get('animateAssist');
    animateAssist.setAnimate(cfg);
    return self;
  }
}

module.exports = Chart;
