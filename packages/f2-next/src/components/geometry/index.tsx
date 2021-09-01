import {
  isString,
  isArray,
  isFunction,
  each,
  upperFirst,
  isNil,
  mix,
} from "@antv/util";
import Component from "../../base/component";
import { group as arrayGroup, merge as arrayMerge } from '../../util/array'
import Chart from '../../chart';
import * as Adjust from "../../adjust";
import { Linear, Category } from '../../attr';
import { applyMixins } from '../../mixins';
import AttrMixin from '../../mixins/attr';

// 保留原始数据的字段
const FIELD_ORIGIN = "origin";
// 需要映射的属性名
const ATTRS = ['x', 'y', 'color', 'size', 'shape'];
// 分组处理的属性
const GROUP_ATTRS = ["color", "size", "shape"];

class Geometry extends Component implements AttrMixin {

  isGeometry = true;
  chart: Chart;
  data: any;
  attrs: any = {};
  adjust: any;

  // 预处理后的数据
  dataArray: any;
  attrOptions: any;
  // 映射完成后的数据
  mappedArray: any;

  // y 轴是否从0开始
  startOnZero = false;

  constructor(props) {
    super(props);
    this.attrOptions = {};
    this.attrs = {};
  }
  createAttrOption: (option) => any;
  createAttr: (option) => any;
  setAttrRange: (attrName: string, range) => any;
  getAttr: (attrName: string) => any;
  getAttrValue: (attrName, record) => any;


  willMount() {
    const { chart, props } = this;
    const attrOptions = {};

    ATTRS.forEach((attrName) => {
      if (props[attrName]) {
        attrOptions[attrName] = this.createAttrOption(props[attrName]);
      }
    });
    this.attrOptions = attrOptions;

    // 收集需要创建scale的字段
    each(attrOptions, option => {
      const { field } = option;
      chart.setScale(field);
    });
  }

  mount() {
    this._createAttrs();
    this._adjustScales();
    this._processData();
  }

  _createAttrs() {
    const { attrOptions, attrs, chart } = this;

    // @ts-ignore
    const { x, y } = attrOptions;

    if (!x || !y) {
      throw new Error('x, y are is required !');
    }
    // x, y 都是固定Linear 映射
    x.type = Linear;
    y.type = Linear;

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
    const { chart, attrs, props, startOnZero: defaultStartOnZero } = this;
    const { startOnZero = defaultStartOnZero } = props;
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
      typeof adjust === "string"
        ? {
            type: adjust,
          }
        : adjust;
    const adjustType = upperFirst(adjustCfg.type);
    if (!Adjust[adjustType]) {
      throw new Error("not support such adjust : " + adjust);
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
      this._updateStackRange(yField, y.scale, groupedArray)
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
        max
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

  getY0Value() {
    const { attrs, chart } = this;
    const { y } = attrs;
    const { scale } = y;
    return chart.scale.getZeroValue(scale);
  }

  // 获取
  _getAttrsDefaultValue() {
    const { props } = this;
    const { chart } = props;
    const { theme } = chart;
    return {
      color: theme.colors[0],
    }
  }

  _getAttrsRange() {
    const { chart } = this;
    const { theme } = chart;

    // 构造各属性的定义域
    const ranges = {
      color: theme.colors,
      size: theme.sizes,
      shape: theme.shapes,
    };

    return ranges;
  }

  // 映射除 x, y 之外的图形属性
  _mappingAttrs(dataArray) {
    const { x, y, ...attrs } = this.attrs;
    const attrNames = Object.keys(attrs);
    const attrNamesLength = attrNames.length;

    // 设置各属性的定义域
    const attrsRange = this._getAttrsRange();
    for (let key = 0; key < attrNamesLength; key++) {
      const attrName = attrNames[key];
      this.setAttrRange(attrName, attrsRange[attrName]);
    }

    // 默认值
    const defaultValues = this._getAttrsDefaultValue();
    const dataArrayLength = dataArray.length;
    const mappedArray = new Array(dataArrayLength);
    for (let i = 0; i < dataArrayLength; i++) {
      const data = dataArray[i];

      // 图形属性映射，因为每组里面这些属性的值都是相同的，所以只需要映射第一个就可以了
      const attrsValue = {};
      for (let key = 0; key < attrNamesLength; key++) {
        const attrName = attrNames[key];
        attrsValue[attrName] = this.getAttrValue(attrName, data[0]);
      }

      // 生成映射后的数据对象
      const mappedData = new Array(data.length);
      for (let i = 0, len = data.length; i < len; i++) {
        const record = data[i];
        const result = {
          ...record,
          ...defaultValues,
          ...attrsValue,
        }
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
    mappedArray = this._mappingAttrs(dataArray);

    // 位置映射拆分成2个阶段，归一化和坐标映射
    mappedArray = this._normalizePosition(mappedArray);
    mappedArray = this._convertPosition(mappedArray);

    this.mappedArray = mappedArray;
    return mappedArray;
  }

  getXScale() {
    const { chart, attrOptions } = this;
    const { field } = attrOptions.x;
    return chart.getScale(field);
  }

  getYScale() {
    const { chart, attrOptions } = this;
    const { field } = attrOptions.y;
    return chart.getScale(field);
  }

  getSnapRecords(point) {
    const { chart, mappedArray } = this;
    const { coord } = chart;
    const invertPoint = coord.invertPoint(point);

    // 如果不在coord坐标范围内，直接返回空
    if (invertPoint.x < 0 || invertPoint.y < 0) {
      return [];
    }

    let rst = [];
    for (let i = 0; i < mappedArray.length; i++) {
      const data = mappedArray[i];

      let min = Infinity;
      let minRecord = null;
      for (let j = 0, len = data.length; j < len; j++) {
        const record = data[j];
        const { position } = record;
        const offset = Math.abs(invertPoint.x - position.x);
        if (min > offset) {
          min = offset;
          minRecord = record;
        }
      }
      rst.push(minRecord);
    }
    return rst;
  }
}

applyMixins(Geometry, [ AttrMixin ]);

export default Geometry;
 