import * as _ from '@antv/util';
import { Data, StackCfg } from '../interface';
import Adjust from './adjust';

const Cache = _.Cache;

export default class Stack extends Adjust {
  constructor(cfg: StackCfg) {
    super(cfg);

    const { adjustNames = ['y'], height = NaN, size = 10, reverseOrder = false } = cfg;
    this.adjustNames = adjustNames;
    this.height = height;
    this.size = size;
    this.reverseOrder = reverseOrder;
  }

  /**
   * 方法入参是经过数据分组、数据数字化之后的二维数组
   * @param groupDataArray 分组之后的数据
   */
  public process(groupDataArray: Data[][]): Data[][] {
    const { yField, reverseOrder } = this;

    // 如果有指定 y 字段，那么按照 y 字段来 stack
    // 否则，按照高度均分
    const d = yField ? this.processStack(groupDataArray) : this.processOneDimStack(groupDataArray);

    return reverseOrder ? this.reverse(d) : d;
  }

  private reverse(groupedDataArray: Data[][]): Data[][] {
    return groupedDataArray.slice(0).reverse();
  }

  private processStack(groupDataArray: Data[][]): Data[][] {
    const { xField, yField, reverseOrder } = this;

    // 层叠顺序翻转
    const groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;

    // 用来缓存，正数和负数的堆叠问题
    const positive = new Cache<number>();
    const negative = new Cache<number>();

    return groupedDataArray.map((dataArray) => {
      return dataArray.map((data) => {
        const x: number = _.get(data, xField, 0);
        let y: number = _.get(data, [yField]);

        const xKey = x.toString();

        // todo 是否应该取 _origin？因为 y 可能取到的值不正确，比如先 symmetric，再 stack！
        y = _.isArray(y) ? y[1] : y;

        if (!_.isNil(y)) {
          const cache = y >= 0 ? positive : negative;

          if (!cache.has(xKey)) {
            cache.set(xKey, 0);
          }
          const xValue = cache.get(xKey) as number;
          const newXValue = y + xValue;

          // 存起来
          cache.set(xKey, newXValue);

          return {
            ...data,
            // 叠加成数组，覆盖之前的数据
            [yField]: [xValue, newXValue],
          };
        }

        // 没有修改，则直接返回
        return data;
      });
    });
  }

  private processOneDimStack(groupDataArray: Data[][]): Data[][] {
    const { xField, height, reverseOrder } = this;
    const yField = 'y';

    // 如果层叠的顺序翻转
    const groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;

    // 缓存累加数据
    const cache = new Cache<number>();

    return groupedDataArray.map((dataArray): Data[] => {
      return dataArray.map(
        (data): Data => {
          const { size } = this;
          const xValue: string = data[xField];

          // todo 没有看到这个 stack 计算原理
          const stackHeight = (size * 2) / height;

          if (!cache.has(xValue)) {
            cache.set(xValue, stackHeight / 2); // 初始值大小
          }

          const stackValue = cache.get(xValue) as number;
          // 增加一层 stackHeight
          cache.set(xValue, stackValue + stackHeight);

          return {
            ...data,
            [yField]: stackValue,
          };
        }
      );
    });
  }
}
