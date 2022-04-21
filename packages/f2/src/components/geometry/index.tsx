import { isFunction, each, upperFirst, mix, groupToMap, isObject, flatten } from '@antv/util';
import Selection, { SelectionState } from './selection';
import * as Adjust from '../../adjust';
import { toTimeStamp } from '../../util/index';
import { GeomType, GeometryProps } from './interface';
import AttrController from '../../controller/attr';
import equal from '../../base/equal';
import { AnimationCycle } from '../../canvas/animation/interface';
import type { Scale } from '@antv/scale';

// 保留原始数据的字段
const FIELD_ORIGIN = 'origin';

class Geometry<
  P extends GeometryProps = GeometryProps,
  S extends SelectionState = SelectionState
> extends Selection<P, S> {
  isGeometry = true;
  geomType: GeomType;

  attrs: any;
  adjust: any;

  // 预处理后的数据
  dataArray: any;
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
  animation: AnimationCycle;

  getDefaultCfg() {
    return {};
  }

  constructor(props: P, context?) {
    super(props, context);
    mix(this, this.getDefaultCfg());

    const { chart, coord } = props;

    const attrsRange = this._getThemeAttrsRange();
    this.attrController = new AttrController(chart.scale, attrsRange);
    const { attrController, justifyContent } = this;

    const attrOptions = attrController.getAttrOptions(props, !coord.isCyclic() || justifyContent);
    attrController.create(attrOptions);
  }

  willReceiveProps(nextProps) {
    super.willReceiveProps(nextProps);
    const { props: lastProps, attrController, justifyContent } = this;
    const { data: nextData, adjust: nextAdjust, zoomRange: nextZoomRange, coord } = nextProps;
    const { data: lastData, adjust: lastAdjust, zoomRange: lastZoomRange } = lastProps;

    const justifyContentCenter = !coord.isCyclic() || justifyContent;

    const nextAttrOptions = attrController.getAttrOptions(nextProps, justifyContentCenter);
    const lastAttrOptions = attrController.getAttrOptions(lastProps, justifyContentCenter);
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

    // zoomRange发生变化,records也需要重新计算
    if (!equal(nextZoomRange, lastZoomRange)) {
      this.records = null;
    }
  }

  willMount() {
    this._createAttrs();
    if (!this.records) {
      this._processData();
    }
  }
  willUpdate() {
    this._createAttrs();
    if (!this.records) {
      this._processData();
    }
  }

  didMount() {
    super.didMount();
    this._initEvent();
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

  _adjustScales() {
    const { attrs, props, startOnZero: defaultStartOnZero } = this;
    const { chart, startOnZero = defaultStartOnZero, coord, adjust } = props;
    const { isPolar, transposed } = coord;
    const { y } = attrs;
    const yField = y.field;
    // 如果从 0 开始，只调整 y 轴 scale
    if (startOnZero) {
      const { y } = attrs;
      chart.scale.adjustStartZero(y.scale);
    }
    // 饼图的scale调整，关闭nice
    if (isPolar && transposed && adjust === 'stack') {
      const { y } = attrs;
      chart.scale.adjustPieScale(y.scale);
    }

    if (adjust === 'stack') {
      this._updateStackRange(yField, y.scale, this.dataArray);
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

    this.adjust = adjustInstance;

    return groupedArray;
  }

  _updateStackRange(field, scale, dataArray) {
    const flattenArray = flatten(dataArray);
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0, len = flattenArray.length; i < len; i++) {
      const obj = flattenArray[i];
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
    const groupedArray = records.map((record) => record.children);
    // 根据adjust分组
    const dataArray = this._adjustData(groupedArray);

    this.dataArray = dataArray;

    // scale适配调整，主要是调整 y 轴是否从 0 开始 以及 饼图
    this._adjustScales();

    // 数据排序（非必须）
    if (this.sortable) {
      this._sortData(records);
    }

    this.records = records;
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
          return (
            xScale.translate(record1[FIELD_ORIGIN][field]) -
            xScale.translate(record2[FIELD_ORIGIN][field])
          );
        });
      });
    }
  }

  _initEvent() {
    const { container, props } = this;
    const canvas = container.get('canvas');
    ['onPressStart', 'onPress', 'onPressEnd', 'onPan', 'onPanStart', 'onPanEnd'].forEach(
      (eventName) => {
        if (props[eventName]) {
          canvas.on(eventName.substr(2).toLowerCase(), (ev) => {
            ev.geometry = this;
            props[eventName](ev);
          });
        }
      }
    );
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

    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      const { children } = record;
      const attrValues = {
        ...defaultAttrValues,
      };
      const firstChild = children[0];

      // 非线性映射
      for (let k = 0, len = nonlinearAttrs.length; k < len; k++) {
        const attrName = nonlinearAttrs[k];
        const attr = attrs[attrName];
        // 非线性映射只用映射第一项就可以了
        attrValues[attrName] = attr.mapping(firstChild[attr.field]);
      }

      // 线性属性映射
      for (let j = 0, childrenLen = children.length; j < childrenLen; j++) {
        const child = children[j];
        const normalized: any = {};
        for (let k = 0; k < linearAttrs.length; k++) {
          const attrName = linearAttrs[k];
          const attr = attrs[attrName];
          // 分类属性的线性映射
          if (attrController.isGroupAttr(attrName)) {
            attrValues[attrName] = attr.mapping(child[attr.field]);
          } else {
            normalized[attrName] = attr.normalize(child[attr.field]);
          }
        }

        const { x, y } = coord.convertPoint({
          x: normalized.x,
          y: normalized.y,
        });

        // 获取 shape 的 style
        const shapeName = attrValues.shape;
        const shape = this._getShapeStyle(shapeName, child.origin);
        const selected = this.isSelected(child);

        mix(child, attrValues, {
          normalized,
          x,
          y,
          shapeName,
          shape,
          selected,
        });
      }
    }
    return records;
  }

  // 数据映射
  mapping() {
    const { records } = this;
    // 数据映射
    this._mapping(records);

    return records;
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

    // 处理饼图
    if (adjust === 'stack' && coord.isPolar && coord.transposed) {
      // 弧度在半径范围内
      if (invertPoint.x >= 0 && invertPoint.x <= 1) {
        const snapRecords = this._getYSnapRecords(invertPoint.y, records);
        return snapRecords;
      }
    }

    const rst = [];
    const value = this._getXSnap(invertPoint.x);
    if (!value) {
      return rst;
    }
    const { field: xField } = xScale;
    const { field: yField } = yScale;
    for (let i = 0, len = records.length; i < len; i++) {
      const record = {
        ...records[i],
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

    return rst;
  }

  getLegendItems() {
    const { attrController } = this;
    const colorAttr = attrController.getAttr('color');
    if (!colorAttr) return null;
    const { scale } = colorAttr;
    if (!scale.isCategory) return null;
    const ticks = scale.getTicks();
    const items = ticks.map((tick) => {
      const { text, tickValue } = tick;
      const color = colorAttr.mapping(tickValue);
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
