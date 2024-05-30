import { jsx } from '@antv/f-engine';
import { GeometryProps } from '../geometry';
import { withInterval } from '../interval';
import { DataRecord } from '../../chart/Data';
export interface PictorialProps<TRecord extends DataRecord = DataRecord>
  extends GeometryProps<TRecord> {
  symbol?: any;
}

export default class Pictorial extends withInterval({}) {
  props: PictorialProps;

  render() {
    const { props, context } = this;
    const { px2hd } = context;
    const { symbol: Symbol } = px2hd(props);
    const records = this.mapping();

    return (
      <group>
        {records.map((record) => {
          const { key, children } = record;
          return (
            <group key={key}>
              {children.map((item) => {
                const { xMax, xMin, yMax, yMin } = item;
                return <Symbol {...item} width={xMax - xMin} height={yMax - yMin} px2hd={px2hd} />;
              })}
            </group>
          );
        })}
      </group>
    );
  }
}
