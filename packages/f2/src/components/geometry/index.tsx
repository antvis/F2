import { isObject, each, upperFirst, isNil, mix, omit } from '@antv/util';
import Component from '../../base/component';
import {
  group as arrayGroup,
  merge as arrayMerge,
  values,
} from '../../util/array';
import Chart from '../../chart';
import * as Adjust from '../../adjust';
import { Linear, Category } from '../../attr';
import { applyMixins } from '../../mixins';
import AttrMixin from '../../mixins/attr';
import { toTimeStamp } from '../../util/index';
import { AttrRange, GeomType } from './interface';

// 保留原始数据的字段
const FIELD_ORIGIN = 'origin';
// 需要映射的属性名
const ATTRS = ['x', 'y', 'color', 'size', 'shape'];
// 分组处理的属性
const GROUP_ATTRS = ['color', 'size', 'shape'];
class Geometry extends Component implements AttrMixin {
  isGeometry = true;
  isInit = false;
  chart: Chart;
  data: any;
  attrs: any = {};
  defaultRanges: AttrRange = {}; // 各属性的默认值域
  adjust: any;
  geomType?: GeomType;

  // 预处理后的数据
  dataArray: any;
  attrOptions: any;
  // 映射完成后的数据
  mappedArray: any;

  // y 轴是否从0开始
  startOnZero = false;
  // 是否连接空值
  connectNulls: boolean = false;

  createAttrOption: (option) => any;
  createAttr: (option) => any;
  setAttrRange: (attrName: string, range) => any;
  getAttr: (attrName: string) => any;
  getAttrOption: (attrName: string) => any;
  getAttrValue: (attrName, record) => any;
  getAttrRange: (attrName) => any;

  constructor(props, context?) {
    super(props, context);
    this._init();
  }

  _init() {
    this._prepareAttrs();
    this._initAttrRanges();
    this._createAttrs();
    this._adjustScales();
    this._processData();
  }

  willUpdate() {
    this._init();
  }

  didMount() {
    this._initEvent();
  }

  _prepareAttrs() {
    const { props } = this;
    const { chart } = props;

    const attrOptions = {};
    ATTRS.forEach((attrName) => {
      if (props[attrName]) {
        attrOptions[attrName] = this.createAttrOption(props[attrName]);
      }
    });
    this.attrOptions = attrOptions;

    // 收集需要创建scale的字段
    each(attrOptions, (option) => {
      const { field } = option;
      chart.setScale(field);
    });

    this.attrOptions = attrOptions;
    this.attrs = {};
  }

  _createAttrs() {
    const { attrOptions, attrs, props } = this;

    // @ts-ignore
    const { x, y } = attrOptions;

    if (!x || !y) {
      throw new Error('x, y are required !');
    }
    // x, y 都是固定Linear 映射
    x.type = Linear;
    y.type = Linear;

    const { chart } = props;
    each(attrOptions, (option, attrName) => {
      const { field } = option;
      const scale = chart.getScale(field);
      attrs[attrName] = this.createAttr({
        ...option,
        scale,
      });
    });
  }

  _adjustScales() {
    const { attrs, props, startOnZero: defaultStartOnZero } = this;
    const { chart, startOnZero = defaultStartOnZero } = props;
    if (startOnZero) {
      const { y } = attrs;
      chart.scale.adjustStartZero(y.scale);
    }
  }

  _getGroupScales() {
    const { attrs } = this;
    const scales = [];
    each(GROUP_ATTRS, function (attrName) {
      const attr = attrs[attrName];
      if (attr) {
        const { scale } = attr;
        if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
          scales.push(scale);
        }
      }
    });
    return scales;
  }

  _groupData(data) {
    const groupScales = this._getGroupScales();
    if (!groupScales.length) {
      return [data];
    }

    const appendConditions = {};
    const names = [];
    groupScales.forEach((scale) => {
      const field = scale.field;
      names.push(field);
    });
    return arrayGroup(data, names, appendConditions);
  }

  _saveOrigin(originData) {
    const len = originData.length;
    const data = new Array(len);
    for (let i = 0; i < len; i++) {
      const record = originData[i];
      data[i] = {
        ...record,
        [FIELD_ORIGIN]: record,
      };
    }
    return data;
  }

  _numberic(data) {
    const { attrs } = this;
    const scales = [attrs.x.scale, attrs.y.scale];
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

  _adjustData(groupedArray) {
    const { attrs, props } = this;
    const { adjust } = props;
    if (!adjust) {
      return groupedArray;
    }
    const adjustCfg =
      typeof adjust === 'string'
        ? {
            type: adjust,
          }
        : adjust;
    const adjustType = upperFirst(adjustCfg.type);
    if (!Adjust[adjustType]) {
      throw new Error('not support such adjust : ' + adjust);
    }
    const { x, y } = attrs;
    const xField = x.field;
    const yField = y.field;
    const adjustInstance = new Adjust[adjustType]({
      xField,
      yField,
      ...adjustCfg,
    });

    if (adjustType === 'Dodge') {
      for (let i = 0, len = groupedArray.length; i < len; i++) {
        // 如果是dodge, 需要处理数字再处理
        this._numberic(groupedArray[i]);
      }
    }
    adjustInstance.processAdjust(groupedArray);

    if (adjustType === 'Stack') {
      this._updateStackRange(yField, y.scale, groupedArray);
    }
    this.adjust = adjustInstance;

    return groupedArray;
  }

  _updateStackRange(field, scale, dataArray) {
    const mergeArray = arrayMerge(dataArray);
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
        max,
      });
    }
  }

  _processData() {
    const { props } = this;
    const { data: originData } = props;

    const data = this._saveOrigin(originData);
    // 根据分类度量进行数据分组
    const groupedArray = this._groupData(data);
    // 根据adjust分组
    const dataArray = this._adjustData(groupedArray);

    this.dataArray = dataArray;
  }

  forceUpdate() {
    super.forceUpdate();
    this._processData();
  }

  _initEvent() {
    const { container, props } = this;
    const canvas = container.get('canvas');
    [
      'onPressStart',
      'onPress',
      'onPressEnd',
      'onPan',
      'onPanStart',
      'onPanEnd',
    ].forEach((eventName) => {
      if (props[eventName]) {
        canvas.on(eventName.substr(2).toLowerCase(), (ev) => {
          ev.geometry = this;
          props[eventName](ev);
        });
      }
    });
  }

  getY0Value() {
    const { attrs, props } = this;
    const { chart } = props;
    const { y } = attrs;
    const { scale } = y;
    return chart.scale.getZeroValue(scale);
  }

  // 获取全局主题配置里的属性默认值域
  getDefaultRange(attrName) {
    const { context } = this;
    const { theme } = context;
    if (attrName === 'shape') {
      return theme.shapes[this.geomType];
    }
    return this.defaultRanges[attrName];
  }

  // 初始化各属性默认值域
  _initAttrRanges() {
    const { context } = this;
    const { theme } = context;

    // color & size 的值域通用，shape 需要根据不同的 geometry 去获取
    this.defaultRanges = {
      color: theme.colors,
      size: theme.sizes,
    };

    return this.defaultRanges;
  }

  // 根据各属性映射的值域来获取真正的绘图属性
  getAttrsStyle(attrsValue, record) {
    const { context, props } = this;
    const { theme } = context;
    const { style }: { style: { field?: string } } = props;

    const attrsStyle = {};
    each(attrsValue, (value, attrName) => {
      if (attrName === 'shape') {
        const shapeStyleMap = theme.geometry[this.geomType];
        const shapeStyle = {};

        // 处理style里的function入参
        if (isObject(style)) {
          const { field } = style;
          each(omit(style, ['field']), (attr, key) => {
            if (typeof attr === 'function') {
              shapeStyle[key] = attr(record[field]);
            } else {
              shapeStyle[key] = attr;
            }
          });
        }

        attrsStyle[attrName] = mix(
          {},
          shapeStyleMap.default, // 默认样式
          shapeStyleMap[value], // shape特有的样式
          shapeStyle // 传入的特定样式
        );
      } else {
        attrsStyle[attrName] = value;
      }
    });

    return attrsStyle;
  }

  // 从值域中第一个值获取属性默认 value
  _getAttrsDefaultValue() {
    const { context } = this;
    const { theme } = context;
    const { color, size } = this.defaultRanges;
    const shape = theme.shapes[this.geomType] || [];

    return {
      color: color[0],
      size: size[0],
      shape: shape[0],
    };
  }

  // 映射除 x, y 之外的图形属性
  _mappingAttrs(dataArray) {
    const { x, y, ...attrs } = this.attrs;
    const attrNames = Object.keys(attrs);
    const attrNamesLength = attrNames.length;

    // 设置各属性的值域
    for (let key = 0; key < attrNamesLength; key++) {
      const attrName = attrNames[key];

      if (!this.getAttrRange(attrName)) {
        const attrRange = this.getDefaultRange(attrName);
        this.setAttrRange(attrName, attrRange);
      }
    }

    // 默认值
    const defaultValues = this._getAttrsDefaultValue();
    const dataArrayLength = dataArray.length;
    const mappedArray = new Array(dataArrayLength);
    for (let i = 0; i < dataArrayLength; i++) {
      const data = dataArray[i];

      // 将数据映射成图形属性（color/size/shape...), 因为每组里面这些属性的值都是相同的，所以只需要映射第一个就可以了
      let attrsValue: any = {};
      for (let key = 0; key < attrNamesLength; key++) {
        const attrName = attrNames[key];
        attrsValue[attrName] = this.getAttrValue(attrName, data[0]);
      }

      // 把attrs的value补齐
      attrsValue = mix({}, defaultValues, attrsValue);

      // 生成映射后的数据对象
      const mappedData = new Array(data.length);
      for (let i = 0, len = data.length; i < len; i++) {
        const record = data[i];
        const result = {
          ...record,
          ...this.getAttrsStyle(attrsValue, record),
        };
        mappedData[i] = result;
      }
      mappedArray[i] = mappedData;
    }
    return mappedArray;
  }

  _normalizePosition(dataArray) {
    const { x, y } = this.attrs;
    const { field: xField } = x;
    const { field: yField } = y;
    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];
      for (let j = 0, len = data.length; j < len; j++) {
        const record = data[j];
        const position = {
          x: x.normalize(record[xField]),
          y: y.normalize(record[yField]),
        };
        mix(record, { position, ...position });
      }
    }
    return dataArray;
  }

  _convertPosition(dataArray) {
    return dataArray;
  }

  // 数据映射
  mapping() {
    const { dataArray } = this;
    let mappedArray;

    // 图形属性映射
    mappedArray = this._mappingAttrs(dataArray);

    // 位置映射拆分成2个阶段，归一化和坐标映射
    mappedArray = this._normalizePosition(mappedArray);
    mappedArray = this._convertPosition(mappedArray);

    this.mappedArray = mappedArray;
    return mappedArray;
  }

  getXScale() {
    const { props, attrOptions } = this;
    const { field } = attrOptions.x;
    const { chart } = props;
    return chart.getScale(field);
  }

  getYScale() {
    const { props, attrOptions } = this;
    const { field } = attrOptions.y;
    const { chart } = props;
    return chart.getScale(field);
  }

  _getSnap(scale, invertPointX) {
    if (scale.isCategory) {
      return scale.invert(invertPointX);
    }

    // linear 类型
    const invertValue = scale.invert(invertPointX);
    const values = scale.values;
    const len = values.length;
    // 如果只有1个点直接返回第1个点
    if (len === 1) {
      return values[0];
    }
    // 第1个点和第2个点之间
    if ((values[0] + values[1]) / 2 > invertValue) {
      return values[0];
    }
    // 最后2个点
    if ((values[len - 2] + values[len - 1]) / 2 <= invertValue) {
      return values[len - 1];
    }
    for (let i = 1; i < len; i++) {
      // 中间的点
      if (
        (values[i - 1] + values[i]) / 2 <= invertValue &&
        (values[i + 1] + values[i]) / 2 > invertValue
      ) {
        return values[i];
      }
    }
    return null;
  }

  getSnapRecords(point) {
    const { props, mappedArray } = this;
    const { coord } = props;
    const invertPoint = coord.invertPoint(point);
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    // 如果不在coord坐标范围内，直接返回空
    if (invertPoint.x < 0 || invertPoint.y < 0) {
      return [];
    }

    const rst = [];
    const value = this._getSnap(xScale, invertPoint.x);
    if (!value) {
      return rst;
    }
    const { field: xField } = xScale;
    const { field: yField } = yScale;
    for (let i = 0; i < mappedArray.length; i++) {
      const data = mappedArray[i];
      for (let j = 0, len = data.length; j < len; j++) {
        const record = {
          ...data[j],
          xField,
          yField,
        };
        const originValue = record[FIELD_ORIGIN][xField];
        if (xScale.type === 'timeCat' && toTimeStamp(originValue) === value) {
          rst.push(record);
        } else if (originValue === value) {
          rst.push(record);
        }
      }
    }
    return rst;
  }

  getLegendItems() {
    const colorAttr = this.getAttr('color');
    if (!colorAttr) return null;
    const { scale, field } = colorAttr;
    if (!scale.isCategory) return null;
    const { context } = this;
    const { theme } = context;
    const ticks = scale.getTicks();

    if (!this.getAttrRange('color')) {
      colorAttr.setRange(theme.colors);
    }
    const items = ticks.map((tick) => {
      const { text, tickValue } = tick;
      const color =
        this.getAttrValue('color', { [field]: tickValue }) || theme.colors[0];
      return {
        color,
        name: text, // for display
        tickValue,
      };
    });
    return items;
  }
}

applyMixins(Geometry, [AttrMixin]);

export default Geometry;
