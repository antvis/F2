import { jsx } from '@ali/f2-jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';

export default View => {
  return class Line extends Geometry {
    render() {
      const mappedArray = this._mapping();
      const mappedData = mappedArray.map(mappedItem => {
        const { color, size } = mappedItem[0];
        const points = new Array(mappedItem.length);
        const data = new Array(mappedItem.length);
        for (let j = 0, subLen = mappedItem.length; j < subLen; j++) {
          const { x, y, origin } = mappedItem[j];
          points[j] = { x, y };
          data[j] = origin;
        }
        return { color, points, size, data: data };
      });
      const { props } = this;
      const { startOnZero } = props;
      return (
        <View
          { ...props }
          basePoint = {this.getBasePoint(startOnZero)}
          mappedData={ mappedData }
        />
      );
    }
  }
}
