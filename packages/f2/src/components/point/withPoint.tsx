import { jsx } from '@antv/f-engine';
import Geometry, { GeometryProps } from '../geometry';
import { DataRecord } from '../../chart/Data';

export type PointProps<TRecord extends DataRecord = DataRecord> = GeometryProps<TRecord>;

export default (View) => {
  return class Point<
    TRecord extends DataRecord = DataRecord,
    IProps extends PointProps<TRecord> = PointProps<TRecord>
  > extends Geometry<TRecord, IProps> {
    getDefaultCfg() {
      return {
        geomType: 'point',
      };
    }

    render() {
      const { props } = this;
      const { coord } = props;
      const records = this.mapping();
      const clip = this.getClip();
      return <View {...props} coord={coord} records={records} clip={clip} />;
    }
  };
};
