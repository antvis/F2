import { jsx } from '../../jsx';
import { isArray } from '@antv/util';
import Geometry from '../geometry';

export default View => {
  return class Line extends Geometry {
    getDefaultCfg() {
      return {
        geomType: 'line',
      };
    }

    splitPoints(points) {
      const topPoints = [];
      const bottomPoints = [];
      for (let i = 0, len = points.length; i < len; i++) {
        const point = points[i];
        const { x, y } = point;
        topPoints.push({ x, y: y[1] });
        bottomPoints.push({ x, y: y[0] });
      }
      return [topPoints, bottomPoints];
    }

    splitNulls(points, connectNulls) {
      if (connectNulls) {
        const tmpPoints = [];
        for (let i = 0, len = points.length; i < len; i++) {
          const point = points[i];
          const { y } = point;
          if (isArray(y)) {
            if (isNaN(y[0])) {
              continue;
            }
            tmpPoints.push(point);
            continue;
          }
          if (isNaN(y)) {
            continue;
          }
          tmpPoints.push(point);
        }
        if (tmpPoints.length) {
          return [tmpPoints];
        }
        return [];
      }
      const result = [];
      let tmpPoints = [];
      for (let i = 0, len = points.length; i < len; i++) {
        const point = points[i];
        const { y } = point;
        if (isArray(y)) {
          if (isNaN(y[0])) {
            if (tmpPoints.length) {
              result.push(tmpPoints);
              tmpPoints = [];
            }
            continue;
          }
          tmpPoints.push(point);
          continue;
        }
        if (isNaN(y)) {
          if (tmpPoints.length) {
            result.push(tmpPoints);
            tmpPoints = [];
          }
          continue;
        }
        tmpPoints.push(point);
      }
      if (tmpPoints.length) {
        result.push(tmpPoints);
      }
      return result;
    }

    mapping() {
      const records = super.mapping();
      const { props, connectNulls: defaultConnectNulls } = this;
      const { coord, connectNulls = defaultConnectNulls } = props;
      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        const { size, color, shape, y, origin } = children[0];
        const points = children.map(child => {
          return {
            x: child.x,
            y: child.y,
          };
        });
        if (coord.isPolar) {
          points.push(points[0]);
        }
        const splitPoints = this.splitNulls(points, connectNulls);

        record.children = splitPoints.map(points => {
          if (isArray(y)) {
            const [topPoints, bottomPoints] = this.splitPoints(points);
            return {
              origin,
              size,
              color,
              shape,
              points: topPoints,
              bottomPoints,
            };
          }
          return { origin, size, color, shape, points };
        });
      }

      return records;
    }

    render() {
      const { props } = this;
      const { style, coord } = props;
      const records = this.mapping();
      return <View {...props} coord={coord} records={records} style={style} />;
    }
  };
};
