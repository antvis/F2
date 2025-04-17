import { clone, flatten, group, each, isNil, isFunction, valuesOfKey } from '@antv/util';
import { DODGE_RATIO, MARGIN_RATIO } from '../constant';
import { Data, DodgeCfg, Range } from '../interface';
import Adjust from './adjust';

export default class Dodge extends Adjust {
  private cacheMap: { [key: string]: any } = {};
  private adjustDataArray: Data[][] = [];
  private mergeData: Data[] = [];
  private rangeMap: { [key: string]: any } = {};

  constructor(cfg: DodgeCfg) {
    super(cfg);
    const {
      marginRatio = MARGIN_RATIO,
      dodgeRatio = DODGE_RATIO,
      dodgeBy,
      intervalPadding,
      dodgePadding,
      xDimensionLength,
      groupNum,
      defaultSize,
      maxColumnWidth,
      minColumnWidth,
      columnWidthRatio,
      customOffset,
    } = cfg;
    this.marginRatio = marginRatio;
    this.dodgeRatio = dodgeRatio;
    this.dodgeBy = dodgeBy;
    this.intervalPadding = intervalPadding;
    this.dodgePadding = dodgePadding;
    this.xDimensionLegenth = xDimensionLength;
    this.groupNum = groupNum;
    this.defaultSize = defaultSize;
    this.maxColumnWidth = maxColumnWidth;
    this.minColumnWidth = minColumnWidth;
    this.columnWidthRatio = columnWidthRatio;
    this.customOffset = customOffset;
  }

  public process(groupDataArray: Data[][]): Data[][] {
    const groupedDataArray = clone(groupDataArray);
    // 将数据数组展开一层
    const mergeData = flatten(groupedDataArray);

    const { dodgeBy } = this;

    // 如果指定了分组 dim 的字段
    const adjustDataArray = dodgeBy ? group(mergeData, dodgeBy) : groupedDataArray;

    this.cacheMap = {};
    this.adjustDataArray = adjustDataArray;
    this.mergeData = mergeData;

    this.adjustData(adjustDataArray, mergeData);

    this.adjustDataArray = [];
    this.mergeData = [];

    return groupedDataArray;
  }

  /**
   * 获取指定数据记录在指定字段上的位置信息
   * @param record 数据记录，例如 { city: 'Berlin', month: 1, rainfall: 23.2 }
   * @param field 字段名称，例如 'month'
   * @param value 字段值，例如 1
   * @returns 调整后的位置
   */
  public getPositionInfo(record: Data, dim: string, frameIndexKey: number) {
    const { customOffset } = this;
    const value = record[dim];
    const map = this.cacheMap[dim];
    const valueArr = map[value];
    const frameIndex = this.indexMap[frameIndexKey];
    const valIndex = valueArr.indexOf(frameIndex);
    const range = this.rangeMap[value];

    if (!isNil(customOffset)) {
      const { pre, next } = range;
      record[dim] = isFunction(customOffset)
        ? customOffset(record, range)
        : (pre + next) / 2 + customOffset;
    } else {
      record[dim] = this.getDodgeOffset(range, valIndex, valueArr.length);
    }
    return record;
  }

  protected adjustDim(dim: string, values: number[], data: Data[], frameIndex: number): any[] {
    const { customOffset } = this;
    const map = this.getDistribution(dim);
    const groupData = this.groupData(data, dim); // 根据值分组

    each(groupData, (group, key) => {
      let range: Range;

      // xField 中只有一个值，不需要做 dodge
      if (values.length === 1) {
        range = {
          pre: values[0] - 1,
          next: values[0] + 1,
        };
      } else {
        // 如果有多个，则需要获取调整的范围
        range = this.getAdjustRange(dim, parseFloat(key), values);
      }

      this.rangeMap[key] = range;

      each(group, (d) => {
        const value = d[dim];

        const valueArr = map[value];
        const valIndex = valueArr.indexOf(frameIndex);
        if (!isNil(customOffset)) {
          const { pre, next } = range;
          d[dim] = isFunction(customOffset)
            ? customOffset(d, range)
            : (pre + next) / 2 + customOffset;
        } else {
          d[dim] = this.getDodgeOffset(range, valIndex, valueArr.length);
        }
      });
    });
    return [];
  }

  private getDodgeOffset(range: Range, idx: number, len: number): number {
    const { dodgeRatio, marginRatio, intervalPadding, dodgePadding } = this;
    const { pre, next } = range;

    const tickLength = next - pre;
    let position;
    // 分多种输入情况
    if (!isNil(intervalPadding) && isNil(dodgePadding) && intervalPadding >= 0) {
      // 仅配置intervalPadding
      const offset = this.getIntervalOnlyOffset(len, idx);
      position = pre + offset;
    } else if (!isNil(dodgePadding) && isNil(intervalPadding) && dodgePadding >= 0) {
      // 仅配置dodgePadding
      const offset = this.getDodgeOnlyOffset(len, idx);
      position = pre + offset;
    } else if (
      !isNil(intervalPadding) &&
      !isNil(dodgePadding) &&
      intervalPadding >= 0 &&
      dodgePadding >= 0
    ) {
      // 同时配置intervalPadding和dodgePadding
      const offset = this.getIntervalAndDodgeOffset(len, idx);
      position = pre + offset;
    } else {
      // 默认情况
      const width = (tickLength * dodgeRatio) / len;
      const margin = marginRatio * width;
      const offset =
        (1 / 2) * (tickLength - len * width - (len - 1) * margin) +
        ((idx + 1) * width + idx * margin) -
        (1 / 2) * width -
        (1 / 2) * tickLength;
      position = (pre + next) / 2 + offset;
    }
    return position;
  }

  private getIntervalOnlyOffset(len: number, idx: number): number {
    const {
      defaultSize,
      intervalPadding,
      xDimensionLegenth,
      groupNum,
      dodgeRatio,
      maxColumnWidth,
      minColumnWidth,
      columnWidthRatio,
    } = this;
    const normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
    let normalizedDodgePadding =
      (((1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum) * dodgeRatio) / (len - 1);
    let geomWidth =
      ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum -
        normalizedDodgePadding * (len - 1)) /
      len;
    // 根据columnWidthRatio/defaultSize/maxColumnWidth/minColumnWidth调整宽度
    geomWidth = !isNil(columnWidthRatio) ? (1 / groupNum / len) * columnWidthRatio : geomWidth;
    if (!isNil(maxColumnWidth)) {
      const normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
      geomWidth = Math.min(geomWidth, normalizedMaxWidht);
    }
    if (!isNil(minColumnWidth)) {
      const normalizedMinWidht = minColumnWidth / xDimensionLegenth;
      geomWidth = Math.max(geomWidth, normalizedMinWidht);
    }
    geomWidth = defaultSize ? defaultSize / xDimensionLegenth : geomWidth;
    // 调整组内间隔
    normalizedDodgePadding =
      ((1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum - len * geomWidth) / (len - 1);
    const offset =
      ((1 / 2 + idx) * geomWidth +
        idx * normalizedDodgePadding +
        (1 / 2) * normalizedIntervalPadding) *
        groupNum -
      normalizedIntervalPadding / 2;
    return offset;
  }

  private getDodgeOnlyOffset(len: number, idx: number): number {
    const {
      defaultSize,
      dodgePadding,
      xDimensionLegenth,
      groupNum,
      marginRatio,
      maxColumnWidth,
      minColumnWidth,
      columnWidthRatio,
    } = this;
    const normalizedDodgePadding = dodgePadding / xDimensionLegenth;
    let normalizedIntervalPadding = (1 * marginRatio) / (groupNum - 1);
    let geomWidth =
      ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum -
        normalizedDodgePadding * (len - 1)) /
      len;
    // 根据columnWidthRatio/defaultSize/maxColumnWidth/minColumnWidth调整宽度
    geomWidth = columnWidthRatio ? (1 / groupNum / len) * columnWidthRatio : geomWidth;
    if (!isNil(maxColumnWidth)) {
      const normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
      geomWidth = Math.min(geomWidth, normalizedMaxWidht);
    }
    if (!isNil(minColumnWidth)) {
      const normalizedMinWidht = minColumnWidth / xDimensionLegenth;
      geomWidth = Math.max(geomWidth, normalizedMinWidht);
    }
    geomWidth = defaultSize ? defaultSize / xDimensionLegenth : geomWidth;
    // 调整组间距
    normalizedIntervalPadding =
      (1 - (geomWidth * len + normalizedDodgePadding * (len - 1)) * groupNum) / (groupNum - 1);
    const offset =
      ((1 / 2 + idx) * geomWidth +
        idx * normalizedDodgePadding +
        (1 / 2) * normalizedIntervalPadding) *
        groupNum -
      normalizedIntervalPadding / 2;
    return offset;
  }

  private getIntervalAndDodgeOffset(len: number, idx: number): number {
    const { intervalPadding, dodgePadding, xDimensionLegenth, groupNum } = this;
    const normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
    const normalizedDodgePadding = dodgePadding / xDimensionLegenth;
    const geomWidth =
      ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum -
        normalizedDodgePadding * (len - 1)) /
      len;
    const offset =
      ((1 / 2 + idx) * geomWidth +
        idx * normalizedDodgePadding +
        (1 / 2) * normalizedIntervalPadding) *
        groupNum -
      normalizedIntervalPadding / 2;
    return offset;
  }

  private getDistribution(dim: string) {
    const groupedDataArray = this.adjustDataArray;
    const cacheMap = this.cacheMap;
    let map = cacheMap[dim];

    if (!map) {
      map = {};
      each(groupedDataArray, (data, index) => {
        const values = valuesOfKey(data, dim) as number[];
        if (!values.length) {
          values.push(0);
        }
        each(values, (val: number) => {
          if (!map[val]) {
            map[val] = [];
          }
          map[val].push(index);
        });
      });
      cacheMap[dim] = map;
    }

    return map;
  }
}
