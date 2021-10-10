// @ts-nocheck
import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { convertRect, mappingRect } from './util';

export default View => {
  return class Interval extends Geometry {

    startOnZero = true;

    getDefaultSize() {
      const { attrs, chart, props } = this;
      const { coord } = chart;
      const { sizeRatio } = props;
      const { x } = attrs;
      const { scale } = x;
      const { values } = scale;

      if (sizeRatio) {
        return 1 / values.length * sizeRatio;
      }
      let ratio = 1;
      // 极坐标默认 1， 直接坐标默认 0.5
      if (!coord.isPolar) {
        ratio = 0.5;
      }
      return 1 / values.length * ratio;
    }

    _convertPosition(mappedArray) {
      const { chart } = this;
      const { coord } = chart;
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
      const { chart } = this;
      const { coord } = chart;
      const data = this.mapping();
      return (
        <View
          coord={ coord }
          mappedArray={ data }
        />
      );
    }
  }
}
