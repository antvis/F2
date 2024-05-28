import { jsx } from '@antv/f-engine';
import { GeometryProps } from '../geometry';
import { withInterval } from '../interval';
import { DataRecord } from '../../chart/Data';
import { deepMix } from '@antv/util';

const parsePercent = (value: number | string, total: number) => {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    if (value.endsWith('%')) {
      return (parseFloat(value) / 100) * total;
    } else {
      return 0;
    }
  }
};

export interface PictorialProps<TRecord extends DataRecord = DataRecord>
  extends GeometryProps<TRecord> {
  symbol?: any;
  symbolSize?: (number | string)[];
  symbolOffset?: (number | string)[];
}

export default class Pictorial extends withInterval({}) {
  props: PictorialProps;
  // 默认初始大小
  symbolDefaultSize: number = 400;

  defalutBound(type) {
    switch (type) {
      case 'ellipse':
        return {
          rx: this.symbolDefaultSize / 2,
          ry: this.symbolDefaultSize / 2,
        };

      default:
        return {
          width: this.symbolDefaultSize,
          height: this.symbolDefaultSize,
        };
    }
  }

  preSymbolBound(symbol) {
    symbol.props = deepMix(
      {
        style: this.defalutBound(symbol?.type),
      },
      symbol.props
    );

    return {
      width: this.symbolDefaultSize,
      height: this.symbolDefaultSize,
    };
  }

  parsePercentArray(array, [w, h]) {
    const x = parsePercent(array[0], w);
    const y = parsePercent(array[1], h);
    return [x, y];
  }

  render() {
    const { props, context } = this;
    const { px2hd } = context;
    const { symbol, symbolSize = ['100%', '100%'], symbolOffset = [0, 0] } = px2hd(props);
    const records = this.mapping();

    const { width: symbolW, height: symbolH } = this.preSymbolBound(symbol);

    return (
      <group>
        {records.map((record) => {
          const { key, children } = record;
          return (
            <group key={key}>
              {children.map((item) => {
                const [width, height] = this.parsePercentArray(symbolSize, [
                  item.xMax - item.xMin,
                  item.yMax - item.yMin,
                ]);
                const [offsetX, offsetY] = this.parsePercentArray(symbolOffset, [width, height]);
                const position = [item.xMin + offsetX, item.yMin + offsetY];

                const symbolScale = [width / symbolW, height / symbolH];
                const transform = `translate(${position[0]},${position[1]}) scale(${symbolScale[0]},${symbolScale[1]})`;

                return deepMix(
                  {
                    props: {
                      style: {
                        transform,
                      },
                    },
                  },
                  symbol
                );
              })}
            </group>
          );
        })}
      </group>
    );
  }
}
