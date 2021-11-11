import {
  isString,
  isArray,
  isFunction,
  each,
  upperFirst,
  isNil,
  mix,
  groupToMap,
  isObject,
} from '@antv/util';
import Component from '../../base/component';
import {
  group as arrayGroup,
  merge as arrayMerge,
  values,
} from '../../util/array';
import Chart from '../../chart';
import * as Adjust from '../../adjust';
import { Linear, Category } from '../../attr';
import { toTimeStamp } from '../../util/index';
import { GeomType, GeometryProps } from './interface';
import AttrController from '../../controller/attr';
import equal from '../../base/equal';

// 保留原始数据的字段
const FIELD_ORIGIN = 'origin';
// 需要映射的属性名
const ATTRS = ['x', 'y', 'color', 'size', 'shape'];
// 分组处理的属性
const GROUP_ATTRS = ['color', 'size', 'shape'];

class Geometry<T extends GeometryProps = GeometryProps> extends Component<T> {
  isGeometry = true;
  geomType: GeomType;

  attrs: any;
  adjust: any;

  // 预处理后的数据
  dataArray: any;
  records: any[];
  mappedArray: any;
  // y 轴是否从0开始
  startOnZero = false;
  // 是否连接空值
  connectNulls: boolean = false;

  attrController: AttrController;

  getDefaultCfg() {
    return {};
  }

  constructor(props, context?) {
    super(props, context);
    mix(this, this.getDefaultCfg());

    const { chart } = props;

    this.attrController = new AttrController(chart.scale);
    const { attrController } = this;

    const attrOptions = this._getAttrOptions(props);
    attrController.create(attrOptions);
  }

  willReceiveProps(nextProps) {
    const { props: lastProps, attrController } = this;
    const { data: nextData, adjust: nextAdjust } = nextProps;
    const { data: lastData, adjust: lastAdjust } = lastProps;

    const nextAttrOptions = this._getAttrOptions(nextProps);
    const lastAttrOptions = this._getAttrOptions(lastProps);
    if (!equal(nextAttrOptions, lastAttrOptions)) {
      attrController.update(nextAttrOptions);
      this.records = null;
    }

    // 重新处理数据
    if (nextData !== lastData) {
      this.records = null;
    }

    // 重新处理数据
    if (nextAdjust !== lastAdjust) {
      this.records = null;
    }
  }

  willMount() {
    this._createAttrs();
  }
  willUpdate() {
    this._createAttrs();
  }

  didMount() {
    this._initEvent();
  }

  _createAttrs() {
    const { attrController, props } = this;
    const { chart } = props;
    attrController.attrs = {};
    this.attrs = attrController.getAttrs();
  }

  _getAttrOptions(props) {
    if (!props.x || !props.y) {
      throw new Error('x, y are required !');
    }
    const options = {};
    const ranges = this._getAttrRanges();
    const { attrController } = this;
    ATTRS.forEach(attrName => {
      if (!props[attrName]) return;
      const option = attrController.parseOption(props[attrName]);
      if (!option.range) {
        option.range = ranges[attrName];
      }
      options[attrName] = option;
    });
    // @ts-ignore
    const { x, y } = options;

    // x, y 都是固定Linear 映射
    x.type = Linear;
    y.type = Linear;
    return options;
  }

  _getAttrRanges() {
    const { context, props, geomType } = this;
    const { coord } = props;
    const { theme } = context;
    const { colors, sizes, shapes } = theme;

    return {
      x: coord.x,
      y: coord.y,
      color: colors,
      size: sizes,
      shape: shapes[geomType],
    };
  }

  getDefaultAttrValues() {
    const attrRanges = this._getAttrRanges();
    const { color, shape } = attrRanges;
    return {
      color: color[0],
      shape: shape && shape[0],
    };
  }

  _adjustScales() {
    const { attrs, props, startOnZero: defaultStartOnZero } = this;
    const { chart, startOnZero = defaultStartOnZero } = props;
    // 如果从 0 开始，只调整 y 轴 scale
    if (startOnZero) {
      const { y } = attrs;
      chart.scale.adjustStartZero(y.scale);
    }
  }

  _getGroupScales() {
    const { attrs } = this;
    const scales = [];
    each(GROUP_ATTRS, attrName => {
      const attr = attrs[attrName];
      if (!attr) {
        return;
      }
      const { scale } = attr;
      if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
        scales.push(scale);
      }
    });
    return scales;
  }

  _groupData(data) {
    const groupScales = this._getGroupScales();
    if (!groupScales.length) {
      return [{ children: data }];
    }

    const names = [];
    groupScales.forEach(scale => {
      const field = scale.field;
      names.push(field);
    });
    const groups = groupToMap(data, names);
    const records = [];
    for (const key in groups) {
      records.push({
        key: key.replace(/^_/, ''),
        children: groups[key],
      });
    }
    return records;
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
    let min = Infinity;
    let max = -Infinity;
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
    if (min !== scale.min || max !== scale.max) {
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
    const records = this._groupData(data);
    // groupedArray 是二维数组
    const groupedArray = records.map(record => record.children);
    // 根据adjust分组
    const dataArray = this._adjustData(groupedArray);

    // 主要是调整 y 轴是否从 0 开始
    this._adjustScales();

    this.dataArray = dataArray;
    this.records = records;
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
    ].forEach(eventName => {
      if (props[eventName]) {
        canvas.on(eventName.substr(2).toLowerCase(), ev => {
          ev.geometry = this;
          props[eventName](ev);
        });
      }
    });
  }

  getY0Value() {
    const { attrs, props } = this;
    const { chart } = props;
    const { field } = attrs.y;
    const scale = chart.getScale(field);
    return chart.scale.getZeroValue(scale);
  }

  // 根据各属性映射的值域来获取真正的绘图属性
  _getShapeStyle(shape, origin) {
    const { context, props, geomType } = this;
    const { theme } = context;
    const shapeTheme = theme.shape[geomType] || {};
    const defaultShapeStyle = shapeTheme.default;
    const shapeThemeStyle = shapeTheme[shape];
    const { style } = props;

    const shapeStyle = {
      ...defaultShapeStyle,
      ...shapeThemeStyle,
    };
    if (!style || !isObject(style)) {
      return shapeStyle;
    }
    // @ts-ignore
    const { field, ...styles } = style;
    const value = field ? origin[field] : origin;
    each(styles, (attr, key) => {
      if (isFunction(attr)) {
        shapeStyle[key] = attr(value);
      } else {
        shapeStyle[key] = attr;
      }
    });
    return shapeStyle;
  }

  _mapping(records) {
    const { attrs, props } = this;
    const { coord } = props;
    const attrNames = Object.keys(attrs);
    const linearAttrs = [];
    const nolinearAttrs = [];
    attrNames.forEach(attrName => {
      if (attrs[attrName].constructor === Linear) {
        linearAttrs.push(attrName);
      } else {
        nolinearAttrs.push(attrName);
      }
    });

    const defaultAttrValues = this.getDefaultAttrValues();

    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      const { children } = record;
      // 非线性映射只用映射第一项就可以了
      const attrValues = {
        ...defaultAttrValues,
      };
      const firstChild = children[0];
      for (let k = 0, len = nolinearAttrs.length; k < len; k++) {
        const attrName = nolinearAttrs[k];
        const attr = attrs[attrName];
        attrValues[attrName] = attr.mapping(firstChild[attr.field]);
      }

      // 线性映射
      const linearAttrsLength = linearAttrs.length;
      for (let j = 0, childrenLen = children.length; j < childrenLen; j++) {
        const child = children[j];
        const normalized: any = {};
        for (let k = 0; k < linearAttrsLength; k++) {
          const attrName = linearAttrs[k];
          const attr = attrs[attrName];
          normalized[attrName] = attr.normalize(child[attr.field]);
        }
        const { x, y } = coord.convertPoint({
          x: normalized.x,
          y: normalized.y,
        });
        // 获取shape的style
        const shape = this._getShapeStyle(attrValues.shape, child.origin);
        mix(child, attrValues, {
          normalized,
          x,
          y,
          shape,
        });
      }
    }
    return records;
  }

  // 数据映射
  mapping() {
    if (!this.records) {
      this._processData();
    }
    const { records } = this;
    // 数据映射
    this._mapping(records);

    return records;
  }

  getXScale() {
    const { attrController } = this;
    return attrController.getAttr('x').scale;
  }

  getYScale() {
    const { attrController } = this;
    return attrController.getAttr('y').scale;
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
    const { attrController } = this;
    const colorAttr = attrController.getAttr('color');
    if (!colorAttr) return null;
    const { scale } = colorAttr;
    if (!scale.isCategory) return null;
    const ticks = scale.getTicks();
    const items = ticks.map(tick => {
      const { text, tickValue } = tick;
      const color = colorAttr.mapping(tickValue);
      return {
        color,
        name: text, // for display
        tickValue,
      };
    });
    return items;
  }
}

export default Geometry;
