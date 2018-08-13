const Util = require('../util/common');
const Base = require('../base');
const GROUP_ATTRS = [ 'color', 'size', 'shape' ];
const FIELD_ORIGIN = '_origin';
const FIELD_ORIGIN_Y = '_originY';
const Global = require('../global');
const Attr = require('../attr/index');
const Shape = require('./shape/shape');
const Adjust = require('./adjust/base');

function parseFields(field) {
  if (Util.isArray(field)) {
    return field;
  }
  if (Util.isString(field)) {
    return field.split('*');
  }
  return [ field ];
}

/**
 * 图形的基类
 * @class Geom
 */
class Geom extends Base {

  getDefaultCfg() {
    return {
      /**
       * core的类型
       * @type {String}
       */
      type: null,
      /**
       * 图形的数据集合
       * @type {Array}
       */
      data: null,
      /**
       * 属性的键值对
       * @type {Object}
       */
      attrs: {},

      scales: {},

      /**
       * 画布
       * @type {Canvas}
       */
      container: null,
      /**
       * 图形样式
       * @type {Object}
       */
      styleOptions: null,

      chart: null,

      shapeType: '',

      /**
       * 是否生成多个点来绘制图形
       * @protected
       * @type {Boolean}
       */
      generatePoints: false,

      attrOptions: {},

      sortable: false,
      /**
       * 图形的底边是否从 0 开始，默认为 0，即从 0 开始，
       * 否则从最小值开始
       * @type {Boolean}
      */
      startOnZero: true,
      /**
       * 是否连接空数据，对 area、line、path 生效
       */
      connectNulls: false
    };
  }

  init() {
    const self = this;
    self._initAttrs();
    const dataArray = self._processData();
    if (self.get('adjust')) {
      self._adjustData(dataArray);
    }
    self.set('dataArray', dataArray);
  }

  // 获取分组的度量
  _getGroupScales() {
    const self = this;
    const scales = [];
    Util.each(GROUP_ATTRS, function(attrName) {
      const attr = self.getAttr(attrName);
      if (attr) {
        const attrScales = attr.scales;
        Util.each(attrScales, function(scale) {
          if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
            scales.push(scale);
          }
        });
      }
    });
    return scales;
  }

  // 分组数据
  _groupData(data) {
    const self = this;
    const groupScales = self._getGroupScales();
    if (groupScales.length) {
      const names = [];
      Util.each(groupScales, function(scale) {
        names.push(scale.field);
      });
      return Util.Array.group(data, names);
    }
    return [ data ];

  }

  // 设置属性配置信息
  _setAttrOptions(attrName, attrCfg) {
    const options = this.get('attrOptions');
    options[attrName] = attrCfg;
  }

  _createAttrOption(attrName, field, cfg, defaultValues) {
    const attrCfg = {};
    attrCfg.field = field;
    if (cfg) {
      if (Util.isFunction(cfg)) {
        attrCfg.callback = cfg;
      } else {
        attrCfg.values = cfg;
      }
    } else {
      attrCfg.values = defaultValues;
    }
    this._setAttrOptions(attrName, attrCfg);
  }

   // step 1: init attrs
  _initAttrs() {
    const self = this;
    const attrs = self.get('attrs');
    const attrOptions = self.get('attrOptions');
    const coord = self.get('coord');

    for (const type in attrOptions) {
      if (attrOptions.hasOwnProperty(type)) {
        const option = attrOptions[type];
        const className = Util.upperFirst(type);
        const fields = parseFields(option.field);
        if (type === 'position') {
          option.coord = coord;
        }
        const scales = [];
        for (let i = 0, len = fields.length; i < len; i++) {
          const field = fields[i];
          const scale = self._createScale(field);
          scales.push(scale);
        }
        if (type === 'position') {
          const yScale = scales[1];
          // 饼图需要填充满整个空间
          if (coord.type === 'polar' && coord.transposed && self.hasAdjust('stack')) {
            if (yScale.values.length) {
              yScale.change({
                nice: false,
                min: 0,
                max: Math.max.apply(null, yScale.values)
              });
            }
          }
        }

        option.scales = scales;
        const attr = new Attr[className](option);
        attrs[type] = attr;
      }
    }
  }

  _createScale(field) {
    const scales = this.get('scales');
    let scale = scales[field];
    if (!scale) {
      scale = this.get('chart').createScale(field);
      scales[field] = scale;
    }
    return scale;
  }

  // 处理数据
  _processData() {
    const self = this;
    const data = this.get('data');
    const dataArray = [];
    const groupedArray = this._groupData(data);
    for (let i = 0, len = groupedArray.length; i < len; i++) {
      const subData = groupedArray[i];
      const tempData = self._saveOrigin(subData);
      if (this.hasAdjust('dodge')) {
        self._numberic(tempData);
      }
      dataArray.push(tempData);
    }
    return dataArray;
  }

  _saveOrigin(data) {
    const rst = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const origin = data[i];
      const obj = {};
      for (const k in origin) {
        obj[k] = origin[k];
      }
      obj[FIELD_ORIGIN] = origin;
      rst.push(obj);
    }
    return rst;
  }

  // step 2.3 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
  _numberic(data) {
    const positionAttr = this.getAttr('position');
    const scales = positionAttr.scales;
    for (let j = 0, len = data.length; j < len; j++) {
      const obj = data[j];
      const count = Math.min(2, scales.length);
      for (let i = 0; i < count; i++) {
        const scale = scales[i];
        if (scale.isCategory) {
          const field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    }
  }

  // 进行数据调整
  _adjustData(dataArray) {
    const self = this;
    const adjust = self.get('adjust');
    if (adjust) {
      const adjustType = Util.upperFirst(adjust.type);
      if (!Adjust[adjustType]) {
        throw new Error('not support such adjust : ' + adjust);
      }

      const xScale = self.getXScale();
      const yScale = self.getYScale();
      const cfg = Util.mix({
        xField: xScale.field,
        yField: yScale.field
      }, adjust);
      const adjustObject = new Adjust[adjustType](cfg);
      adjustObject.processAdjust(dataArray);
      if (adjustType === 'Stack') {
        self._updateStackRange(yScale.field, yScale, dataArray);
      }
    }
  }

  _updateStackRange(field, scale, dataArray) {
    const mergeArray = Util.Array.merge(dataArray);
    let min = scale.min;
    let max = scale.max;
    for (let i = 0, len = mergeArray.length; i < len; i++) {
      const obj = mergeArray[i];
      const tmpMin = Math.min.apply(null, obj[field]);
      const tmpMax = Math.max.apply(null, obj[field]);
      if (tmpMin < min) {
        min = tmpMin;
      }
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
    if (min < scale.min || max > scale.max) {
      scale.change({
        min,
        max
      });
    }
  }

  _sort(mappedArray) {
    const self = this;
    const xScale = self.getXScale();
    const xField = xScale.field;
    if (xScale.type !== 'identity' && xScale.values.length > 1) {
      Util.each(mappedArray, itemArr => {
        itemArr.sort((obj1, obj2) => {
          return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
        });
      });
    }
    self.set('hasSorted', true);
    self.set('dataArray', mappedArray);
  }

  paint() {
    const self = this;
    const dataArray = self.get('dataArray');
    const mappedArray = [];
    const shapeFactory = self.getShapeFactory();
    shapeFactory.setCoord(self.get('coord'));
    self._beforeMapping(dataArray);
    for (let i = 0, len = dataArray.length; i < len; i++) {
      let data = dataArray[i];
      if (data.length) {
        data = self._mapping(data);
        mappedArray.push(data);
        self.draw(data, shapeFactory);
      }
    }
    self.set('dataArray', mappedArray);
  }

  /**
   * @protected
   * 获取图形的工厂类
   * @return {Object} 工厂类对象
   */
  getShapeFactory() {
    let shapeFactory = this.get('shapeFactory');
    if (!shapeFactory) {
      const shapeType = this.get('shapeType');
      shapeFactory = Shape.getShapeFactory(shapeType);
      this.set('shapeFactory', shapeFactory);
    }
    return shapeFactory;
  }

  // step 3.2 mapping
  _mapping(data) {
    const self = this;
    const attrs = self.get('attrs');
    const yField = self.getYScale().field;
    const mappedData = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const record = data[i];
      const newRecord = {};
      newRecord[FIELD_ORIGIN] = record[FIELD_ORIGIN];
      newRecord.points = record.points;
      // 避免
      newRecord[FIELD_ORIGIN_Y] = record[yField];
      for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          const attr = attrs[k];
          const names = attr.names;
          const values = self._getAttrValues(attr, record);
          if (names.length > 1) { // position 之类的生成多个字段的属性
            for (let j = 0, len = values.length; j < len; j++) {
              const val = values[j];
              const name = names[j];
              newRecord[name] = (Util.isArray(val) && val.length === 1) ? val[0] : val; // 只有一个值时返回第一个属性值
            }
          } else {
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }
      mappedData.push(newRecord);
    }

    return mappedData;
  }

  // 获取属性映射的值
  _getAttrValues(attr, record) {
    const scales = attr.scales;
    const params = [];
    for (let i = 0, len = scales.length; i < len; i++) {
      const scale = scales[i];
      const field = scale.field;
      if (scale.type === 'identity') {
        params.push(scale.value);
      } else {
        params.push(record[field]);
      }
    }
    const values = attr.mapping(...params);
    return values;
  }

  getAttrValue(attrName, record) {
    const attr = this.getAttr(attrName);
    let rst = null;
    if (attr) {
      const values = this._getAttrValues(attr, record);
      rst = values[0];
    }
    return rst;
  }

  _beforeMapping(dataArray) {
    const self = this;
    if (self.get('sortable')) { // 需要排序
      self._sort(dataArray);
    }
    if (self.get('generatePoints')) {
      Util.each(dataArray, function(data) {
        self._generatePoints(data);
      });
    }
  }

  isInCircle() {
    const coord = this.get('coord');
    return coord && coord.isPolar;
  }

  getCallbackCfg(fields, cfg, origin) {
    if (!fields) {
      return cfg;
    }
    const tmpCfg = {};
    const params = fields.map(function(field) {
      return origin[field];
    });
    Util.each(cfg, function(v, k) {
      if (Util.isFunction(v)) {
        tmpCfg[k] = v.apply(null, params);
      } else {
        tmpCfg[k] = v;
      }
    });
    return tmpCfg;
  }

  getDrawCfg(obj) {
    const self = this;
    const isInCircle = self.isInCircle();
    const cfg = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle,
      opacity: obj.opacity
    };
    const styleOptions = self.get('styleOptions');
    if (styleOptions && styleOptions.style) {
      cfg.style = self.getCallbackCfg(styleOptions.fields, styleOptions.style, obj[FIELD_ORIGIN]);
    }
    if (self.get('generatePoints')) {
      cfg.points = obj.points;
    }
    if (isInCircle) {
      cfg.center = self.get('coord').center;
    }
    return cfg;
  }

  draw(data, shapeFactory) {
    const self = this;
    const container = self.get('container');
    const yScale = self.getYScale();
    Util.each(data, function(obj, index) {
      if (yScale && Util.isNil(obj._origin[yScale.field])) {
        return;
      }
      obj.index = index;
      const cfg = self.getDrawCfg(obj);
      const shape = obj.shape;
      self.drawShape(shape, obj, cfg, container, shapeFactory);
    });
  }

  drawShape(shape, shapeData, cfg, container, shapeFactory) {
    const gShape = shapeFactory.drawShape(shape, cfg, container);

    if (gShape) {
      Util.each([].concat(gShape), s => {
        s.set('origin', shapeData); // todo
      });
    }
  }

  _generatePoints(data) {
    const self = this;
    const shapeFactory = self.getShapeFactory();
    const shapeAttr = self.getAttr('shape');
    for (let i = 0, len = data.length; i < len; i++) {
      const obj = data[i];
      const cfg = self.createShapePointsCfg(obj);
      const shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }

  /**
   * 获取图形对应点的配置项
   * @protected
   * @param  {Object} obj 数据对象
   * @return {Object} cfg 获取图形对应点的配置项
   */
  createShapePointsCfg(obj) {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const x = this._normalizeValues(obj[xScale.field], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this._normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined
    };
  }

  /**
   * @protected
   * @return {Number} y 轴上的最小值
   */
  getYMinValue() {
    const yScale = this.getYScale();
    const { min, max } = yScale;
    let value;

    if (this.get('startOnZero')) {
      if (max <= 0 && min <= 0) { // 当值全部为负时，需要在现有范围内绘制
        value = max;
      } else {
        value = min >= 0 ? min : 0;
      }
    } else {
      value = min;
    }

    return value;
  }

  // 将数据归一化
  _normalizeValues(values, scale) {
    let rst = [];
    if (Util.isArray(values)) {
      for (let i = 0, len = values.length; i < len; i++) {
        const v = values[i];
        rst.push(scale.scale(v));
      }
    } else {
      rst = scale.scale(values);
    }
    return rst;
  }

  /**
   * 获取属性
   * @protected
   * @param {String} name 属性名
   * @return {Scale} 度量
   */
  getAttr(name) {
    return this.get('attrs')[name];
  }

  /**
   * 获取 x 对应的度量
   * @return {Scale} x 对应的度量
   */
  getXScale() {
    return this.getAttr('position').scales[0];
  }

  /**
   * 获取 y 对应的度量
   * @return {Scale} y 对应的度量
   */
  getYScale() {
    return this.getAttr('position').scales[1];
  }

  hasAdjust(adjust) {
    return this.get('adjust') && (this.get('adjust').type === adjust);
  }

  _getSnap(scale, item, arr) {
    let i = 0;
    let values;
    const yField = this.getYScale().field; // 叠加的维度
    if (this.hasAdjust('stack') && scale.field === yField) {
      values = [];
      arr.forEach(function(obj) {
        values.push(obj[FIELD_ORIGIN_Y]);
      });

      for (let len = values.length; i < len; i++) {
        if (values[0][0] > item) {
          break;
        }
        if (values[values.length - 1][1] <= item) {
          i = values.length - 1;
          break;
        }
        if (values[i][0] <= item && values[i][1] > item) {
          break;
        }
      }
    } else {
      values = scale.values;
      values.sort((a, b) => {
        return a - b;
      });
      for (let len = values.length; i < len; i++) {
        if ((values[0] + values[1]) / 2 > item) {
          break;
        }
        if ((values[i - 1] + values[i]) / 2 <= item && (values[i + 1] + values[i]) / 2 > item) {
          break;
        }
        if ((values[values.length - 2] + values[values.length - 1]) / 2 <= item) {
          i = values.length - 1;
          break;
        }
      }
    }
    const result = values[i];
    return result;
  }

  /**
   * 根据画布坐标获取切割线对应数据集
   * @param  {Object} point 画布坐标的x,y的值
   * @return {Array} 切割交点对应数据集
  **/
  getSnapRecords(point) {
    const self = this;
    const coord = self.get('coord');
    const xScale = self.getXScale();
    const yScale = self.getYScale();
    const xfield = xScale.field;

    const dataArray = self.get('dataArray');
    if (!this.get('hasSorted')) {
      this._sort(dataArray);
    }

    let rst = [];
    const invertPoint = coord.invertPoint(point);
    let invertPointX = invertPoint.x;
    if (self.isInCircle() && !coord.transposed && invertPointX > (1 + xScale.rangeMax()) / 2) {
      invertPointX = xScale.rangeMin(); // 极坐标下，scale 的 range 被做过特殊处理 see chart.js#L183
    }

    let xValue = xScale.invert(invertPointX);
    if (!xScale.isCategory) {
      xValue = self._getSnap(xScale, xValue);
    }

    const tmp = [];

    dataArray.forEach(function(data) {
      data.forEach(function(obj) {
        const originValue = Util.isNil(obj[FIELD_ORIGIN]) ? obj[xfield] : obj[FIELD_ORIGIN][xfield];
        if (self._isEqual(originValue, xValue, xScale)) {
          tmp.push(obj);
        }
      });
    });

    // 特别针对饼图做处理
    if (this.hasAdjust('stack') && coord.isPolar && coord.transposed && xScale.values.length === 1) {
      if (invertPointX >= 0 && invertPointX <= 1) { // 精确拾取
        let yValue = yScale.invert(invertPoint.y);
        yValue = self._getSnap(yScale, yValue, tmp);
        tmp.forEach(obj => {
          if (Util.isArray(yValue) ? obj[FIELD_ORIGIN_Y].toString() === yValue.toString() : obj[FIELD_ORIGIN_Y] === yValue) {
            rst.push(obj);
          }
        });
      }

    } else {
      rst = tmp;
    }

    return rst;
  }

  _isEqual(originValue, value, scale) {
    if (scale.type === 'timeCat') {
      return scale._toTimeStamp(originValue) === value;
    }
    return value === originValue;
  }

  /**
   * 位置属性映射
   * @chainable
   * @param  {String} field 字段名
   * @return {Geom} geom 当前几何标记
   */
  position(field) {
    this._setAttrOptions('position', {
      field
    });
    return this;
  }

  /**
   * 颜色属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 颜色的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  color(field, values) {
    this._createAttrOption('color', field, values, Global.colors);
    return this;
  }

  /**
   * 大小属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 大小的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  size(field, values) {
    this._createAttrOption('size', field, values, Global.sizes);
    return this;
  }

  /**
   * 形状属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 大小的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  shape(field, values) {
    const type = this.get('type');
    const shapes = Global.shapes[type] || [];
    this._createAttrOption('shape', field, values, shapes);
    return this;
  }

  style(field, cfg) {
    let styleOptions = this.get('styleOptions');
    if (!styleOptions) {
      styleOptions = {};
      this.set('styleOptions', styleOptions);
    }
    if (Util.isObject(field)) {
      cfg = field;
      field = null;
    }
    let fields;
    if (field) {
      fields = parseFields(field);
    }
    styleOptions.fields = fields;
    styleOptions.style = cfg;
    return this;
  }

  adjust(type) {
    if (Util.isString(type)) {
      type = { type };
    }
    this.set('adjust', type);
    return this;
  }

  animate(cfg) {
    this.set('animateCfg', cfg);
    return this;
  }

  reset() {
    this.set('attrOptions', {});
    this.set('adjust', null);
    this.clearInner();
  }

  clearInner() {
    const container = this.get('container');
    if (container) {
      container.clear();
      container.setMatrix([ 1, 0, 0, 1, 0, 0 ]);
    }
    container && container.clear();
    this.set('attrs', {});
    this.set('groupScales', null);
    this.set('xDistance', null);
  }

  clear() {
    this.clearInner();
    this.set('scales', {});
  }

  destroy() {
    this.clear();
    // const container = this.get('container');
    // container && container.remove();
    super.destroy();
  }

}

module.exports = Geom;
