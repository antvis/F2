import * as _ from '@antv/util';
import { GAP } from '../constant';
import { Data, Range } from '../interface';
import Adjust from './adjust';

function randomNumber(min: number, max: number): number {
  return (max - min) * Math.random() + min;
}

export default class Jitter extends Adjust {
  public process(groupDataArray: Data[][]): Data[][] {
    const groupedDataArray = _.clone(groupDataArray);

    // 之前分组之后的数据，然后有合并回去（和分组前可以理解成是一样的）
    const mergeData = _.flatten(groupedDataArray) as Data[];

    // 返回值
    this.adjustData(groupedDataArray, mergeData);

    return groupedDataArray;
  }

  /**
   * 当前数据分组（index）中，按照维度 dim 进行 jitter 调整
   * @param dim
   * @param values
   * @param dataArray
   */
  protected adjustDim(dim: string, values: number[], dataArray: Data[]) {
    // 在每一个分组中，将数据再按照 dim 分组，用于散列
    const groupDataArray = this.groupData(dataArray, dim);
    return _.each(groupDataArray, (data: Data[], dimValue: string) => {
      return this.adjustGroup(data, dim, parseFloat(dimValue), values);
    });
  }

  // 随机出来的字段值
  private getAdjustOffset(range: Range): number {
    const { pre, next } = range;
    // 随机的范围
    const margin = (next - pre) * GAP;
    return randomNumber(pre + margin, next - margin);
  }

  // adjust group data
  private adjustGroup(group: Data[], dim: string, dimValue: number, values: number[]): Data[] {
    // 调整范围
    const range = this.getAdjustRange(dim, dimValue, values);

    _.each(group, (data: Data) => {
      data[dim] = this.getAdjustOffset(range); // 获取调整的位置
    });
    return group;
  }
}
