import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';


export default View => {
  return class Line extends Geometry {
    _convertPosition(mappedArray) {
      const { chart } = this;
      const { coord } = chart;

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
      const { chart } = this;
      const { coord } = chart;
      return dataArray.map(data => {
        const { color, shape, size } = data[0];
        const points = data;
        if (coord.isPolar) {
          points.push(data[0]);
        }
        return {
          color,
          shape,
          size,
          points,
        }
      });
    }

    render() {
      const { chart } = this;
      const { coord } = chart;
      const mapped = this.mapping();
      const mappedArray = this.parsePoints(mapped);
      return (
        <View
          coord={ coord }
          mappedArray={ mappedArray }
        />
      );
    }
  }
}
