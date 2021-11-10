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

    getPoints(data) {
      const { coord } = this.props;
      const points = data.map((item) => ({
        x: item.x,
        y: item.y,
      }));
      // 处理极坐标
      if (coord.isPolar) {
        points.push(points[0]);
      }
      // 处理堆叠
      if (isArray(points[0].y)) {
        const [topPoints, bottomPoints] = this.splitPoints(points);
        return bottomPoints;
      }
      return points;
    }

    getNestedPoints(records) {
      const { props, connectNulls: defaultConnectNulls } = this;
      const { connectNulls = defaultConnectNulls } = props;
      return records.map(record => {
        const { children } = record;
        const points = this.getPoints(children);
        const splitPoints = this.splitNulls(points, connectNulls);
        return splitPoints;
      });
    }


    render() {
      const { props } = this;
      const { style, coord } = props;
      const records = this.mapping();
      const nestedPoints = this.getNestedPoints(records);
      return <View {...props} coord={coord} records={records} nestedPoints={nestedPoints} style={style} />;
    }
  };
};
