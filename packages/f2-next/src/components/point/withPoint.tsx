// @ts-nocheck
import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { mappingPoint } from './util';
import { GeomType } from '../geometry/interface';

export default View => {
  return class Line extends Geometry {
    geomType: GeomType = 'point';
    constructor(props, context) {
      super(props, context);
      this.ranges.shape = this.context.theme.shapes[this.geomType];
    }

    // 归一值映射到坐标点
    mapping() {
      const { props } = this;
      const { coord } = props;
      const mappedArray = super.mapping();

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          mix(record, mappingPoint(coord, record));
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
