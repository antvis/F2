import { jsx } from '@antv/f-engine';
import withLine, { LineProps } from '../line/withLine';
import { DataRecord } from '../../chart/Data';

export type AreaProps<TRecord extends DataRecord = DataRecord> = LineProps<TRecord>;

export default (View) => {
  return class Area<
    TRecord extends DataRecord = DataRecord,
    IProps extends AreaProps<TRecord> = AreaProps<TRecord>
  > extends withLine(View)<TRecord, IProps> {
    getDefaultCfg() {
      return {
        geomType: 'area',
        // 面积图默认设为从0开始
        startOnZero: true,
        // 点需要排序
        sortable: true,
      };
    }

    getBaseY() {
      // 坐标轴 y0
      const y0 = this.getY0Value();
      const { props, startOnZero: defaultStartOnZero } = this;
      const { coord, startOnZero = defaultStartOnZero } = props;
      if (startOnZero) {
        // 零点映射到绝对坐标
        const originCoord = coord.convertPoint({ x: 0, y: y0 });
        return originCoord.y;
      }
      return coord.y[0];
    }

    mapping() {
      const records = super.mapping();
      const baseY = this.getBaseY();

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { points, bottomPoints } = child;

          if (bottomPoints && bottomPoints.length) {
            bottomPoints.reverse();
            child.points = points.concat(bottomPoints);
          } else {
            points.unshift({ x: points[0].x, y: baseY });
            points.unshift({ x: points[points.length - 1].x, y: baseY });
          }
        }
      }
      return records;
    }

    render() {
      const { props } = this;
      const { coord } = props;
      const records = this.mapping();
      const clip = this.getClip();
      const baseY = this.getBaseY();

      return <View {...props} baseY={baseY} coord={coord} records={records} clip={clip} />;
    }
  };
};
