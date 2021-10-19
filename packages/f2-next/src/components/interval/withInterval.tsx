// @ts-nocheck
import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { convertRect, mappingRect } from './util';

export default View => {
  return class Interval extends Geometry {
    startOnZero = true;

    getDefaultSize() {
      const { attrs, props } = this;
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

      return (1 / values.length) * ratio;
    }

    _convertPosition(mappedArray) {
      const { props } = this;
      const { coord } = props;
      const y0 = this.getY0Value();
      const defaultSize = this.getDefaultSize();

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          const { position, size = defaultSize } = record;
          const rect = convertRect({ ...position, size, y0 });
          mix(position, rect);
          mix(record, coord.convertRect(rect));
        }
      }
      return mappedArray;
    }

    render() {
      const { props } = this;
      const { coord } = props;
      const data = this.mapping();
      return <View coord={coord} mappedArray={data} />;
    }
  };
};
