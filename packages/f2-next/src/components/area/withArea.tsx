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
      // 面积图基线 y 坐标: 如果从0开始，则取零点 y 坐标，否则取 yStart
      const baseY = startOnZero ? originCoord.y : coord.y[0];

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          const { x, y } = record;

          const isStack = this.adjust?.type === 'stack';
          // stack 转换后的 y 为一个数组 [y0, y1]
          mix(record, coord.convertPoint({ x, y }));
          // 如果不为 stack，统一将 y 转换为数组，以便下一步填充多边形底部点
          if (!isStack) {
            record.y = [baseY, record.y];
          }
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
        each(pointsArray, function (points, index) {
          const topPoints = points.map(({ x, y }) => ({ x, y: y[0] }));
          const bottomPoints = points
            .map(({ x, y }) => ({ x, y: y[1] }))
            .reverse();
          pointsArray[index] = [...topPoints, ...bottomPoints];
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
