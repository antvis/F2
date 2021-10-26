import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';
import { ShapeType } from '../geometry/interface';
import { splitArray } from '../geometry/util';
import { each } from '@antv/util';

export default (View) => {
  return class Area extends Geometry {
    shapeType: ShapeType = 'area';

    constructor(props, context) {
      super(props, context);
      this.ranges.shape = this.context.theme.shapes[this.shapeType];
    }

    parsePoints(dataArray) {
      // 1. 添加 points
      const withPoints = dataArray.map((data) => {
        const points = data;
        const lineStyle = this.mergeStyle(data[0]);
        return {
          ...lineStyle,
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
      const y0 = this.getY0Value();
      const { coord } = this.props;
      const p = coord.convertPoint({ x: 0, y: y0 });
      each(mappedArray, function (obj) {
        const { dataArray } = obj;
        if (dataArray?.length) {
          each(dataArray, function (data) {
            const start = {
              x: data[0].x,
              y: p.y,
            };
            const end = {
              x: data[data.length - 1].x,
              y: p.y,
            };
            // 插入头尾坐标
            data.unshift(start);
            data.push(end);
          });
          obj.dataArray = dataArray;
        }
      });
      return mappedArray;
    }

    render() {
      const { props } = this;
      const mapped = this.mapping();
      const { coord, style } = props;
      return <View coord={coord} mappedArray={mapped} style={style} />;
    }
  };
};
