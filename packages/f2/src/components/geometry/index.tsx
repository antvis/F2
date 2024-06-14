import {
  isFunction,
  each,
  upperFirst,
  mix,
  groupToMap,
  isObject,
  flatten,
  isNull,
  find,
} from '@antv/util';
import { ChartChildProps } from '../../chart';
import Selection, { SelectionProps, SelectionState } from './selection';
import { Adjust, Dodge, Jitter, Stack, Symmetric } from '../../deps/f2-adjust/src';
import { toTimeStamp } from '../../util/index';
import AttrController, { ATTRS } from '../../controller/attr';
import { Scale } from '../../deps/f2-scale/src';
import { AnimationProps, isEqual } from '@antv/f-engine';
import { AdjustType, AdjustProps } from './Adjust';
import { DataRecord, DataField } from '../../chart/Data';

const AdjustMap = {
  Stack: Stack,
  Dodge: Dodge,
  Jitter: Jitter,
  Symmetric: Symmetric,
};

// 保留原始数据的字段
const FIELD_ORIGIN = 'origin';

export type GeometryType = 'line' | 'point' | 'area' | 'polygon' | 'schema' | 'interval';

export interface ColorAttrObject {
  type?: string;
  field?: string;
  range?: any[];
  callback?: (...args) => any;
  scale?: any;
}

export interface SizeAttrObject {
  type?: string;
  field?: string;
  range?: any[];
  callback?: (...args) => any;
  scale?: any;
}

export interface ShapeAttrObject {
  type?: string;
  field?: string;
  range?: any[];
  callback?: (...args) => any;
  scale?: any;
}

export interface GeometryProps<TRecord extends DataRecord = DataRecord> extends SelectionProps {
  x: DataField<TRecord>;
  y: DataField<TRecord>;
  color?: DataField<TRecord> | string | [string, any[]] | ColorAttrObject;
  size?: DataField<TRecord> | number | string | [string, any[]] | SizeAttrObject;
  shape?: DataField<TRecord> | number | string | [string, any[]] | ShapeAttrObject;
  adjust?: AdjustType | AdjustProps;
  startOnZero?: boolean;
  style?: any;
  animation?: AnimationProps;
  /**
   * 是否裁剪显示区
   */
  viewClip?: boolean;

  onPress?: Function;
  onPan?: Function;
  onPressStart?: Function;
  onPressEnd?: Function;
  onPanStart?: Function;
  onPanEnd?: Function;
}

class Geometry<
  TRecord extends DataRecord = DataRecord,
  P extends GeometryProps<TRecord> = GeometryProps<TRecord>,
  S extends SelectionState = SelectionState
> extends Selection<P & ChartChildProps, S> {
  isGeometry = true;
  geomType: GeometryType;

  attrs: any;
  adjust: AdjustProps & { adjust: Adjust };

  // 预处理后的数据
  dataArray: any;
  // data 预处理后，records mapping 前的数据
  dataRecords: any[];
  records: any[];
  mappedArray: any;
  // x 轴居中
  justifyContent = false;
  // y 轴是否从0开始
  startOnZero = false;
  // 是否连接空值
  connectNulls: boolean = false;
  // 是否需要排序
  sortable: boolean = false;
  attrController: AttrController;

  // 动画配置
  animation: AnimationProps;

  getDefaultCfg() {
    return {};
  }

  constructor(props: P & ChartChildProps, context?) {
    super(props, context);
    mix(this, this.getDefaultCfg());

    const { chart } = props;

    const attrsRange = this._getThemeAttrsRange();
    this.attrController = new AttrController(chart.scale, attrsRange);
    const { attrController } = this;

    const attrOptions = this.getAttrOptions(props);
    attrController.create(attrOptions);
  }

  getAttrOptions(props) {
    const { coord } = props;
    const { attrController, justifyContent } = this;
    const justifyContentCenter = !coord.isCyclic() || justifyContent;

    const args = {};
    ATTRS.forEach((d) => (args[d] = props[d]));

    const attrOptions = attrController.getAttrOptions(
      this.context.px2hd(args),
      justifyContentCenter
    );
    return attrOptions;
  }

  willReceiveProps(nextProps) {
    const { props: lastProps, attrController } = this;
    const { data: nextData, adjust: nextAdjust, selection } = nextProps;
    const { data: lastData, adjust: lastAdjust, selection: lastSelection } = lastProps;

    const lastAttrOptions = this.getAttrOptions(lastProps);
    attrController.attrsRange = this._getThemeAttrsRange();
    const nextAttrOptions = this.getAttrOptions(nextProps);

    if (!isEqual(nextAttrOptions, lastAttrOptions)) {
      attrController.update(nextAttrOptions);
      this.dataRecords = null;
    }

    // 重新处理数据
    if (nextData !== lastData) {
      this.dataRecords = null;
    }

    // 重新处理数据
    if (nextAdjust !== lastAdjust) {
      this.dataRecords = null;
    }

    // selection 发生变化
    if (!isEqual(selection, lastSelection)) {
      super.willReceiveProps(nextProps);
    }
  }

  willMount() {
    this._createAttrs();
    if (!this.dataRecords) {
      this._processData();
    }
  }
  willUpdate() {
    this._createAttrs();
    if (!this.dataRecords) {
      this._processData();
    } else {
      this._readjustData(this.dataRecords);
    }
  }

  didMount() {
    this._initEvent();
    super.didMount();
    // 更新 attrController
    this.attrController.attrsRange = this._getThemeAttrsRange();
  }

  _initEvent() {
    const { props } = this;
    const { chart } = props;
    ['onPressStart', 'onPress', 'onPressEnd', 'onPan', 'onPanStart', 'onPanEnd'].forEach(
      (eventName) => {
        if (props[eventName]) {
          chart.on(eventName.substr(2).toLowerCase(), (ev) => {
            ev.geometry = this;
            props[eventName](ev);
          });
        }
      }
    );
  }

  _createAttrs() {
    const { attrController } = this;
    attrController.attrs = {};
    this.attrs = attrController.getAttrs();
  }

  _getThemeAttrsRange() {
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

  _createAdjust() {
    const { attrs, props } = this;
    const { adjust } = props;

    if (!adjust) {
      return null;
    }
    const adjustCfg: AdjustProps =
      typeof adjust === 'string'
        ? {
            type: adjust,
          }
        : adjust;
    const adjustType = upperFirst(adjustCfg.type);
    const AdjustConstructor = AdjustMap[adjustType];
    if (!AdjustConstructor) {
      throw new Error('not support such adjust : ' + adjust);
    }

    if (adjustType === 'Dodge') {
      // @ts-ignore
      adjustCfg.adjustNames = ['x'];
    }

    const { x, y } = attrs;
    // @ts-ignore
    adjustCfg.xField = x.field;
    // @ts-ignore
    adjustCfg.yField = y.field;

    const adjustInstance = new AdjustConstructor(adjustCfg);

    this.adjust = {
      type: adjustCfg.type,
      adjust: adjustInstance,
    };

    return this.adjust;
  }

  _adjustScales() {
    const { attrs, props, startOnZero: defaultStartOnZero } = this;
    const { chart, startOnZero = defaultStartOnZero, coord, adjust } = props;
    const { isPolar, transposed } = coord;
    const { y } = attrs;

    // 如果从 0 开始，只调整 y 轴 scale
    if (startOnZero) {
      chart.scale.adjustStartZero(y.scale);
    }
    // 饼图的scale调整，关闭nice
    if (
      isPolar &&
      transposed &&
      (adjust === 'stack' || (adjust as AdjustProps)?.type === 'stack')
    ) {
      chart.scale.adjustPieScale(y.scale);
    }

    if (adjust === 'stack' || (adjust as AdjustProps)?.type === 'stack') {
      chart.scale._updateStackRange(y.scale, flatten(this.dataArray));
    }
  }

  _groupData(data) {
    const { attrController } = this;
    const groupScales = attrController.getGroupScales();
    if (!groupScales.length) {
      return [{ children: data }];
    }

    const names = [];
    groupScales.forEach((scale) => {
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
      const count = scales.length;
      for (let i = 0; i < count; i++) {
        const scale = scales[i];
        if (scale.isCategory) {
          const field = scale.field;
          const value = scale.translate(obj.origin[field]);
          obj[field] = value;
        }
      }
    }
  }

  _adjustData(records) {
    const { adjust } = this;
    // groupedArray 是二维数组
    const groupedArray = records.map((record) => record.children);

    if (!adjust) {
      return groupedArray;
    }

    const { attrs } = this;
    const scales = [attrs.x.scale, attrs.y.scale];

    for (let i = 0, len = groupedArray.length; i < len; i++) {
      const records = groupedArray[i];
      for (let j = 0, len = records.length; j < len; j++) {
        const record = records[j];
        const count = scales.length;
        for (let i = 0; i < count; i++) {
          const scale = scales[i];
          const field = scale.field;
          record[field] = record.origin[field];
        }
      }
    }

    if (adjust.type === 'dodge') {
      for (let i = 0, len = groupedArray.length; i < len; i++) {
        // 如果是dodge, 需要处理数字再处理
        this._numberic(groupedArray[i]);
      }
    }

    const adjustData = adjust.adjust.process(groupedArray);

    // process 返回的是新数组，所以要修改 records
    records.forEach((record, index: number) => {
      record.children = adjustData[index];
    });

    return adjustData;
  }

  _processData() {
    const { props } = this;
    const { data: originData } = props;

    const data = this._saveOrigin(originData);
    // 根据分类度量进行数据分组
    const records = this._groupData(data);

    this._createAdjust();
    // 根据adjust分组
    const dataArray = this._adjustData(records);

    this.dataArray = dataArray;

    // scale适配调整，主要是调整 y 轴是否从 0 开始 以及 饼图
    this._adjustScales();

    // 数据排序（非必须）
    if (this.sortable) {
      this._sortData(records);
    }

    this.dataRecords = records;
  }

  _readjustData(records) {
    const { adjust } = this;
    if (!adjust) return;
    // 根据adjust分组
    const dataArray = this._adjustData(records);

    this.dataArray = dataArray;
  }

  _sortData(records) {
    const xScale = this.getXScale();
    const { field, type } = xScale;
    if (type !== 'identity' && xScale.values.length > 1) {
      each(records, ({ children }) => {
        children.sort((record1, record2) => {
          if (type === 'timeCat') {
            return (
              toTimeStamp(record1[FIELD_ORIGIN][field]) - toTimeStamp(record2[FIELD_ORIGIN][field])
            );
          }
          const normalized1 = xScale.translate(record1[FIELD_ORIGIN][field]);
          const normalized2 = xScale.translate(record2[FIELD_ORIGIN][field]);
          if (isNaN(normalized1)) {
            return 1;
          }
          if (isNaN(normalized2)) {
            return -1;
          }
          return normalized1 - normalized2;
        });
      });
    }
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
        const attrValue = attr(value);
        if (!attrValue) {
          return;
        }
        shapeStyle[key] = attrValue;
        return;
      }
      shapeStyle[key] = attr;
    });
    return shapeStyle;
  }

  /**
   * 数据映射到视图属性核心逻辑
   * x、y 每个元素走 normalize 然后 convertPoint
   * color、size、shape
   *  如果是Linear，则每个元素 走 mapping
   *  如果是Category/Identity 则第一个元素走 mapping
   */
  _mapping(records) {
    const { attrs, props, attrController } = this;
    const { coord } = props;

    const { linearAttrs, nonlinearAttrs } = attrController.getAttrsByLinear();
    const defaultAttrValues = attrController.getDefaultAttrValues();

    const mappedRecords = [];

    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      const { children } = record;
      const attrValues = {
        ...defaultAttrValues,
      };
      const firstChild = children[0];
      if (children.length === 0) {
        mappedRecords.push({ ...record });
        continue;
      }
      // 非线性映射
      for (let k = 0, len = nonlinearAttrs.length; k < len; k++) {
        const attrName = nonlinearAttrs[k];
        const attr = attrs[attrName];
        // 非线性映射只用映射第一项就可以了
        attrValues[attrName] = attr.mapping(firstChild[attr.field], firstChild.origin);
      }

      // 线性属性映射
      const mappedChildren = [];
      for (let j = 0, childrenLen = children.length; j < childrenLen; j++) {
        const child = children[j];
        const normalized: any = {};
        for (let k = 0; k < linearAttrs.length; k++) {
          const attrName = linearAttrs[k];
          const attr = attrs[attrName];

          const value = child[attr.field];

          // 分类属性的线性映射
          if (attrController.isGroupAttr(attrName)) {
            attrValues[attrName] = attr.mapping(value, child);
          } else {
            normalized[attrName] = attr.normalize(value);
          }
        }

        const { x, y } = coord.convertPoint({
          x: normalized.x,
          y: normalized.y,
        });

        // 获取 shape 的 style
        const { origin } = child;
        const shapeName = attrValues.shape;
        const shape = this._getShapeStyle(shapeName, origin);
        const selected = this.isSelected(child);

        mappedChildren.push({
          ...child,
          ...attrValues,
          normalized,
          x,
          y,
          shapeName,
          shape,
          selected,
        });
      }
      mappedRecords.push({
        ...record,
        children: mappedChildren,
      });
    }
    return mappedRecords;
  }

  // 数据映射
  mapping() {
    const { dataRecords } = this;
    // 数据映射
    this.records = this._mapping(dataRecords);

    return this.records;
  }

  getClip() {
    const { coord, viewClip } = this.props;
    const { width: contentWidth, height: contentHeight, left, top } = coord;
    if (viewClip) {
      return {
        type: 'rect',
        style: {
          x: left,
          y: top,
          width: contentWidth,
          height: contentHeight,
        },
      };
    }
    return null;
  }

  getAttr(attrName: string) {
    return this.attrController.getAttr(attrName);
  }

  getXScale(): Scale {
    return this.getAttr('x').scale;
  }

  getYScale(): Scale {
    return this.getAttr('y').scale;
  }

  _getXSnap(invertPointX) {
    const xScale = this.getXScale();
    if (xScale.isCategory) {
      return xScale.invert(invertPointX);
    }

    // linear 类型
    const invertValue = xScale.invert(invertPointX);
    const values = xScale.values;
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

  _getYSnapRecords(invertPointY, records) {
    const yScale = this.getYScale();
    const { field: yField } = yScale;
    const yValue = yScale.invert(invertPointY);
    // category
    if (yScale.isCategory) {
      return records.filter((record) => record[FIELD_ORIGIN][yField] === yValue);
    }
    // linear
    return records.filter((record) => {
      const rangeY = record[yField];
      if (rangeY[0] <= yValue && rangeY[1] >= yValue) {
        return true;
      }
      return false;
    });
  }

  _getXSnapRecords(invertPointX, records) {
    const xScale = this.getXScale();
    const { field: xField } = xScale;
    const xValue = xScale.invert(invertPointX);
    // category
    if (xScale.isCategory) {
      return records.filter((record) => record[FIELD_ORIGIN][xField] === xValue);
    }
    // linear
    return records.filter((record) => {
      const rangeX = record[xField];
      if (rangeX[0] <= xValue && rangeX[1] >= xValue) {
        return true;
      }
      return false;
    });
  }

  // 把 records 拍平
  flatRecords() {
    const { records } = this;
    return records.reduce((prevRecords, record) => {
      return prevRecords.concat(record.children);
    }, []);
  }

  getSnapRecords(point, inCoordRange?): any[] {
    const { props } = this;
    const { coord, adjust } = props;

    const invertPoint = coord.invertPoint(point);
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    // 如果不在coord坐标范围内，直接返回空
    // if (invertPoint.x < 0 || invertPoint.y < 0) {
    //   return [];
    // }

    // 是否调整 point，默认为不调整
    if (inCoordRange) {
      const { range: xRange } = xScale;
      const { range: yRange } = yScale;
      // 如果 inCoordRange=true，当 point 不在 coord 坐标范围内时，调整到 range 内
      invertPoint.x = Math.min(Math.max(invertPoint.x, xRange[0]), xRange[1]);
      invertPoint.y = Math.min(Math.max(invertPoint.y, yRange[0]), yRange[1]);
    }

    const records = this.flatRecords();

    const xValue = xScale.invert(invertPoint.x);
    const yValue = yScale.invert(invertPoint.y);

    const coordPoint = coord.convertPoint(invertPoint);
    const coordRecord = {
      // 坐标点
      x: coordPoint.x,
      y: coordPoint.y,
      xValue,
      yValue,
      xText: xScale.getText(xValue),
      yText: yScale.getText(yValue),
    };

    // 处理饼图
    if (adjust === 'stack' && coord.isPolar) {
      if (coord.transposed) {
        // 弧度在半径范围内
        if (invertPoint.x >= 0 && invertPoint.x <= 1) {
          const snapRecords = this._getYSnapRecords(invertPoint.y, records);
          return snapRecords;
        }
      } else {
        if (invertPoint.y >= 0 && invertPoint.y <= 1) {
          const snapRecords = this._getXSnapRecords(invertPoint.x, records);
          return snapRecords;
        }
      }
    }

    const rst = [];
    const value = this._getXSnap(invertPoint.x);
    if (isNull(value)) {
      return rst;
    }
    const { field: xField } = xScale;
    const { field: yField } = yScale;
    for (let i = 0, len = records.length; i < len; i++) {
      const record = {
        ...records[i],
        xField,
        yField,
        coord: coordRecord,
      };
      const originValue = record[FIELD_ORIGIN][xField];
      if (xScale.type === 'timeCat' && toTimeStamp(originValue) === value) {
        rst.push(record);
      } else if (originValue === value) {
        rst.push(record);
      }
    }

    return rst;
  }

  getRecords(data, field = 'xfield') {
    const records = this.flatRecords();
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const { field: xField } = xScale;
    const { field: yField } = yScale;
    const value = data[xField];
    const rst = [];

    for (let i = 0, len = records.length; i < len; i++) {
      const record = {
        ...records[i],
        xField,
        yField,
      };
      const originValue = record[FIELD_ORIGIN][field === 'xfield' ? xField : yField];
      if (originValue === value) {
        rst.push(record);
      }
    }

    return rst;
  }

  getLegendItems() {
    const { attrController, records } = this;
    const colorAttr = attrController.getAttr('color');
    if (!colorAttr) return null;
    const { scale } = colorAttr;
    const { isCategory, field } = scale;
    if (!isCategory) return null;

    const flatRecords = records ? this.flatRecords() : [];
    const ticks = scale.getTicks();
    const items = ticks.map((tick) => {
      const { text, tickValue } = tick;
      const record = find(flatRecords, (item) => {
        if (!item) return false;
        const { origin } = item;
        return origin[field] === tickValue;
      });

      // @ts-ignore
      const color = record ? record.color : colorAttr.mapping(tickValue);
      return {
        field: scale.field,
        color,
        name: text, // for display
        tickValue,
      };
    });
    return items;
  }
}

export default Geometry;
