import * as _ from '@antv/util';
import { Data } from '../interface';
import Adjust from './adjust';

export default class Symmetric extends Adjust {
  public process(groupDataArray: Data[][]): Data[][] {
    const mergeData = _.flatten(groupDataArray);

    const { xField, yField } = this;

    // 每个 x 值对应的 最大值
    const cache = this.getXValuesMaxMap(mergeData);

    // 所有数据的最大的值
    const max = Math.max(...Object.keys(cache).map((key) => cache[key]));

    return _.map(groupDataArray, (dataArray) => {
      return _.map(dataArray, (data) => {
        const yValue = data[yField];
        const xValue = data[xField];

        // 数组处理逻辑
        if (_.isArray(yValue)) {
          const off = (max - cache[xValue]) / 2;

          return {
            ...data,
            [yField]: _.map(yValue, (y: number) => off + y),
          };
        }

        // 非数组处理逻辑
        const offset = (max - yValue) / 2;
        return {
          ...data,
          [yField]: [offset, yValue + offset],
        };
      });
    });
  }

  // 获取每个 x 对应的最大的值
  private getXValuesMaxMap(mergeData: Data[]): { [key: string]: number } {
    const { xField, yField } = this;

    // 根据 xField 的值进行分组
    const groupDataArray = _.groupBy(mergeData, (data) => data[xField] as string);

    // 获取每个 xField 值中的最大值
    return _.mapValues(groupDataArray, (dataArray) => this.getDimMaxValue(dataArray, yField));
  }

  private getDimMaxValue(mergeData: Data[], dim: string): number {
    // 所有的 value 值
    const dimValues = _.map(mergeData, (data) => _.get(data, dim, []));
    // 将数组打平（dim value 有可能是数组，比如 stack 之后的）
    const flattenValues = _.flatten(dimValues);

    // 求出数组的最大值
    return Math.max(...flattenValues);
  }
}
