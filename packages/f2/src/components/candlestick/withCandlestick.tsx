import { jsx, ComponentType } from '@antv/f-engine';
import { isNil, mix } from '@antv/util';
import Geometry, { GeometryProps } from '../geometry';
import { DataRecord } from '../../chart/Data';

// 默认配色
const COLORS = [
  '#E62C3B', // 上涨
  '#0E9976', // 下跌
  '#999999', // 平盘
];

export interface CandlestickProps<TRecord extends DataRecord = DataRecord>
  extends GeometryProps<TRecord> {
  /**
   * 柱子的显示比例，默认 0.5
   */
  sizeRatio?: number;
}

export default (View: ComponentType) => {
  return class Candlestick<
    TRecord extends DataRecord = DataRecord,
    IProps extends CandlestickProps<TRecord> = CandlestickProps<TRecord>
  > extends Geometry<TRecord, IProps> {
    getDefaultCfg() {
      return {
        geomType: 'candlestick',
      };
    }

    getSize() {
      const { attrs, props } = this;
      const { sizeRatio = 0.5 } = props;
      const { x } = attrs;
      const { scale } = x;
      const { values } = scale;

      return (1 / values.length) * sizeRatio;
    }

    _getColor(colors, child, prevChild) {
      const { normalized } = child;
      // 处理颜色
      const { y } = normalized;
      const [open, close] = y;
      if (close > open) {
        return colors[0];
      }

      if (close < open) {
        return colors[1];
      }

      // 相等的情况下，再和昨日的收盘价比较
      if (!prevChild) {
        // 第一个固定为涨
        return colors[0];
      }

      const { normalized: prevNormalized } = prevChild;
      // 处理颜色
      const { y: prevY } = prevNormalized;
      const [, prevClose] = prevY;
      if (close > prevClose) {
        return colors[0];
      }
      if (close < prevClose) {
        return colors[1];
      }
      return colors[2];
    }

    mapping() {
      const records = super.mapping();
      const { props } = this;
      const { coord } = props;
      const y0 = this.getY0Value();
      const defaultSize = this.getSize();
      const colorAttr = this.getAttr('color');

      const colors = colorAttr ? colorAttr.range : COLORS;

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { normalized, size: mappedSize } = child;

          // 没有指定size，则根据数据来计算默认size
          if (isNil(mappedSize)) {
            const { x, y, size = defaultSize } = normalized;
            mix(child, coord.convertRect({ x, y, y0, size: size }));
          } else {
            const { x, y } = child;
            const rect = { x, y, y0, size: mappedSize };
            mix(child, coord.transformToRect(rect));
          }

          // 处理颜色
          child.color = this._getColor(colors, child, children[j - 1]);

          mix(child.shape, this.getSelectionStyle(child));
        }
      }
      return records;
    }

    render() {
      const { props } = this;
      const records = this.mapping();
      return <View {...props} records={records} />;
    }
  };
};
