import { jsx } from '../../jsx';
import { isArray } from '@antv/util';
import Geometry from '../geometry';
import { LineProps } from './types';

export default (View) => {
  return class Line extends Geometry<LineProps> {
    getDefaultCfg() {
      return {
        geomType: 'line',
        sortable: true,
      };
    }

    splitPoints(points) {
      const topPoints = [];
      const bottomPoints = [];
      for (let i = 0, len = points.length; i < len; i++) {
        const point = points[i];
        const { x, y } = point;
        topPoints.push({ ...point, x, y: y[1] });
        bottomPoints.push({ ...point, x, y: y[0] });
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

      return records.map((record) => {
        const { children } = record;
        const { size, color, shape, y } = children[0];
        const points = children;
        if (coord.isPolar) {
          points.push(points[0]);
        }
        const splitPoints = this.splitNulls(points, connectNulls);

        const newChildren = splitPoints.map((points) => {
          const [topPoints, bottomPoints] = isArray(y)
            ? this.splitPoints(points)
            : [points, undefined];
          return {
            size,
            color,
            shape,
            points: topPoints,
            bottomPoints,
          };
        });

        return {
          ...record,
          children: newChildren,
        };
      });
    }

    render() {
      const { props } = this;
      const { coord } = props;
      const records = this.mapping();
      return <View {...props} coord={coord} records={records} />;
    }
  };
};
