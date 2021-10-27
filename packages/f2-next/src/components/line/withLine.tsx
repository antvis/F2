import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { GeomType } from '../geometry/interface';
import { splitArray } from '../geometry/util';
import { each } from '@antv/util';

export default (View) => {
  return class Line extends Geometry {
    geomType: GeomType = 'line';
    constructor(props, context) {
      super(props, context);
      this.ranges.shape = this.context.theme.shapes[this.geomType];
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

    splitPoints(mappedArray) {
      const { field: yField } = this.attrOptions.y;
      const { connectNulls: defaultConnectNulls } = this;
      const { connectNulls = defaultConnectNulls } = this.props;
      each(mappedArray, function(obj) {
        const splitArrayObj = splitArray(obj.points, yField, connectNulls);
        obj.dataArray = splitArrayObj;
      });
      return mappedArray;
    }

    render() {
      const { props } = this;
      const { style, coord } = props;
      const mapped = this.mapping();
      const mappedArray = this.splitPoints(this.parsePoints(mapped));
      return <View coord={coord} mappedArray={mappedArray} style={style} />;
    }
  };
};
