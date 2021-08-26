// @ts-nocheck
import {
  isString,
  isArray,
  isFunction,
  each,
  upperFirst,
  isNil,
  mix,
} from "@antv/util";
import Component from "../../component";
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

  chart: Chart;
  data: any;
  attrs: any = {};
  adjust: any;
  dataArray: any;

  // y 轴是否从0开始
  startOnZero = false;

  constructor(props) {
    super(props);
    this.attrOptions = {};
    this.attrs = {};
  }

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
      chart.scale(field);
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
      chart.adjustStartZero(y.scale);
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
    return chart.getZeroValue(scale);
  }

  getAttrs() {
    const { attrs, props } = this;
    const { chart } = props;
    const { theme } = chart;

    const mapAttrs = { ...attrs };

    // 构造各属性的定义域
    const ranges = {
      x: [0, 1],
      y: [0, 1],
      color: theme.colors,
      size: theme.sizes,
      shape: theme.shapes,
    };

    each(mapAttrs, (attr, attrName) => {
      const range = ranges[attrName];
      attr.setRange(range);
    });

    return mapAttrs;
  }

  // 获取
  _getAttrsDefaultValue() {
    const { props } = this;
    const { chart } = props;
    const { theme } = chart;
    return {
      color: theme.colors[0], 
      // y0,
      // size,
    }
  }

  // 数据映射
  mapping() {
    const { dataArray } = this;
    const attrs = this.getAttrs();
    const attrNames = Object.keys(attrs);
    const attrNamesLength = attrNames.length;
    const defaultValues = this._getAttrsDefaultValue();

    const dataArrayLength = dataArray.length;
    const mappedArray = new Array(dataArrayLength);
    for (let i = 0; i < dataArrayLength; i++) {
      const data = dataArray[i];
      const dataLength = data.length;
      const mappedData = new Array(dataLength);
      for (let i = 0; i < dataLength; i++) {
        const record = data[i];
        const result = {
          ...record,
          ...defaultValues,
        }
        for (let key = 0; key < attrNamesLength; key++) {
          const attrName = attrNames[key];
          const attr = attrs[attrName];
          const { field } = attr;
          const value = record[field];
          const mappedValue = attr.mapping(value);
          result[attrName] = mappedValue;
        }
        mappedData[i] = result;
      }
      mappedArray[i] = mappedData;
    }
    return mappedArray;
  }
}

applyMixins(Geometry, [ AttrMixin ]);

export default Geometry;
 