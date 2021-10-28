import { jsx } from '../../jsx';
import { isArray, mix, each } from '@antv/util';
import Geometry from '../geometry';
import { GeomType } from '../geometry/interface';
import { Stack } from '../../adjust';
import { splitArray } from '../geometry/util';

export default (View) => {
  return class Area extends Geometry {
    geomType: GeomType = 'area';
    startOnZero: boolean = true; // 面积图默认设为从0开始

    parsePoints(dataArray) {
      const { coord } = this.props;
      // 1. 添加 points
      const withPoints = dataArray.map((data) => {
        const points = data;
        if (coord.isPolar) {
          points.push(data[0]);
        }
        return {
          ...data[0],
          points,
        };
      });
      // 2. 按空值分割
      this._splitPoints(withPoints);
      // 3. 填充多边形 point
      this._generatePolygonPoints(withPoints);
      return withPoints;
    }

    _convertPosition(mappedArray) {
      const { props, startOnZero: defaultStartOnZero } = this;
      const { coord } = props;
      const { startOnZero = defaultStartOnZero } = props;

      const originY = this.getY0Value(); // 坐标轴 y0
      const originCoord = coord.convertPoint({ x: 0, y: originY }); // 零点映射到绝对坐标
      // 面积图基线 y 坐标: 如果不从0开始，则取零点 y 坐标，否则取 yStart
      const baseY = startOnZero ? originCoord.y : coord.y[0];

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          const { x, y } = record;

          // stack 转换后的 y 为一个数组 [y0, y1]
          const isStack = this.adjust?.type === 'stack';
          mix(record, coord.convertPoint({ x, y: isStack ? y[1] : y }));
          const py0 = isStack ? coord.convertPoint({ x, y: y[0] }).y : baseY;
          record.y0 = py0;
        }
      }
      const mapped = this.parsePoints(mappedArray);
      return mapped;
    }

    // 空值处理
    _splitPoints(mappedArray) {
      const { field: yField } = this.attrOptions.y;
      const { connectNulls: defaultConnectNulls } = this;
      const { connectNulls = defaultConnectNulls } = this.props;
      each(mappedArray, function (obj) {
        const dataArray = splitArray(obj.points, yField, connectNulls);
        obj.dataArray = dataArray;
      });
      return mappedArray;
    }

    // 生成多边形 points
    _generatePolygonPoints(mappedArray) {
      each(mappedArray, function (obj) {
        const { dataArray: pointsArray } = obj;
        each(pointsArray, function (points) {
          const bottomPoints = points
            .map(({ x, y0 }) => ({ x, y: y0 }))
            .reverse();
          points.push(...bottomPoints);
        });
        obj.dataArray = pointsArray;
      });
      return mappedArray;
    }

    // TODO: smooth
    render() {
      const { props } = this;
      const mapped = this.mapping();
      const { coord } = props;
      return <View coord={coord} mappedArray={mapped} />;
    }
  };
};
