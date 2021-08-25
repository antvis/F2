import { jsx } from '@jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';

export default View => {
  return class Line extends Geometry {
    render() {
      const { props } = this;
      const { startOnZero } = props;

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
      
      return (
        <View
          { ...props }
          basePoint = {this.getBasePoint(startOnZero)}
          mappedData={ mappedData }
          isInCircle={this.isInCircle} // 坐标系类型
        />
      );
    }
  }
}
