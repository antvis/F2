import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { convertRect } from './util';
import { GeomType } from '../geometry/interface';

export default Views => {
  return class Interval extends Geometry {
    getDefaultCfg() {
      return {
        geomType: 'interval',
        startOnZero: true,
      };
    }

    getDefaultSize() {
      const { attrs, props, adjust, records } = this;
      const { coord, sizeRatio } = props;
      const { x } = attrs;
      const { scale } = x;
      const { values } = scale;

      if (sizeRatio) {
        return (1 / values.length) * sizeRatio;
      }

      const defaultWithRatio = {
        column: 1 / 2, // 直方图、柱图
        rose: 0.999999, // 玫瑰图
        multiplePie: 3 / 4, // 多饼图
      };

      const count = values.length;

      let ratio;
      if (coord.isPolar) {
        if (coord.transposed && count > 1) {
          ratio = defaultWithRatio.multiplePie;
        } else {
          ratio = defaultWithRatio.rose;
        }
      } else {
        ratio = defaultWithRatio.column;
      }

      const size = (1 / values.length) * ratio;

      // 分组时size要除以类别个数
      if (adjust && adjust.type === 'dodge') {
        return size / records.length;
      }

      return size;
    }

    mapping() {
      const records = super.mapping();

      const { props } = this;
      const { coord } = props;
      const y0 = this.getY0Value();
      const defaultSize = this.getDefaultSize();

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { normalized } = child;
          const { x, y, size = defaultSize } = normalized;
          const rect = convertRect({ x, y, size, y0 });
          mix(child, coord.convertRect(rect));
        }
      }
      return records;
    }

    render() {
      const { props } = this;
      const { coord, shape = 'rect' } = props;
      const View = Views[shape];

      if (!View) return null;

      const records = this.mapping();
      return <View coord={coord} records={records} shape={shape} />;
    }
  };
};
