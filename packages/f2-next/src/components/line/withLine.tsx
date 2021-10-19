import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';

export default View => {
  return class Line extends Geometry {
    _convertPosition(mappedArray) {
      const { props } = this;
      const { coord } = props;

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          const { x, y } = record;
          mix(record, coord.convertPoint({ x, y }));
        }
      }
      return mappedArray;
    }

    parsePoints(dataArray) {
      const { props } = this;
      const { coord } = props;
      return dataArray.map(data => {
        const { color, shape, size, smooth } = data[0];
        const points = data;
        if (coord.isPolar) {
          points.push(data[0]);
        }
        return {
          color,
          shape,
          size,
          points,
          smooth,
        }
      });
    }

    render() {
      const { props } = this;
      const { smooth, lineWidth } = props;
      const { coord } = props;
      const mapped = this.mapping();
      const mappedArray = this.parsePoints(mapped);
      return (
        <View
          coord={ coord }
          mappedArray={ mappedArray }
          smooth={smooth}
          lineWidth={lineWidth}
        />
      );
    }
  };
};
