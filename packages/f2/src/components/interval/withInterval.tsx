import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { convertRect } from './util';
import { GeomType } from '../geometry/interface';

export default (Views) => {
  return class Interval extends Geometry {
    geomType: GeomType = 'interval';

    startOnZero = true;

    getDefaultSize() {
      const { attrs, props, adjust, dataArray } = this;
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
        return size / dataArray.length;
      }

      return size;
    }

    _convertPosition(mappedArray) {
      const { props } = this;
      const { coord } = props;
      const y0 = this.getY0Value();
      const intervalSize = this.getDefaultSize();

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          const { position } = record;
          const rect = convertRect({ ...position, size: intervalSize, y0 });
          mix(position, rect);
          mix(record, coord.convertRect(rect));
          mix(record, coord.convertPoint(position));
        }
      }
      return mappedArray;
    }

    render() {
      const { props } = this;
      const { coord, shape = 'rect' } = props;
      const View = Views[shape];

      if (!View) return null;

      const data = this.mapping();
      return <View coord={coord} mappedArray={data} shape={shape} />;
    }
  };
};
