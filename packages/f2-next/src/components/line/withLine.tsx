import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { ShapeType } from '../geometry/interface';

export default (View) => {
  return class Line extends Geometry {
    shapeType: ShapeType = 'line';
    constructor(props, context) {
      super(props, context);
      this.ranges.shape = this.context.theme.shapes[this.shapeType];
    }

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
      return dataArray.map((data) => {
        const points = data;
        if (coord.isPolar) {
          points.push(data[0]);
        }
        const lineStyle = this.mergeStyle(data[0]);
        return {
          ...lineStyle,
          points,
        };
      });
    }

    render() {
      const { props } = this;
      const { style } = props;
      const { coord } = props;
      const mapped = this.mapping();
      const mappedArray = this.parsePoints(mapped);
      return <View coord={coord} mappedArray={mappedArray} style={style} />;
    }
  };
};
