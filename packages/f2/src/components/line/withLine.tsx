import { jsx } from '@antv/f-engine';
import { isArray, isFunction } from '@antv/util';
import Geometry, { GeometryProps } from '../geometry';
import { DataRecord } from '../../chart/Data';
import { Point } from '../../chart/types';

type ZoomRatioCallback<TRecord> = (record: TRecord) => number | null | undefined;

export interface LineProps<TRecord extends DataRecord = DataRecord> extends GeometryProps<TRecord> {
  connectNulls?: boolean;
  /**
   * 柱子放大缩小的比例
   */
  sizeZoom?: number | ZoomRatioCallback<TRecord>;
  endView?: any;
}

export default (View) => {
  return class Line<
    TRecord extends DataRecord = DataRecord,
    IProps extends LineProps<TRecord> = LineProps<TRecord>
  > extends Geometry<TRecord, IProps> {
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
          const { x, y } = point;
          // 过滤 x 为 NaN 的点
          if (isNaN(x)) {
            continue;
          }
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
        const { x, y } = point;
        // 过滤 x 为 NaN 的点
        if (isNaN(x)) {
          continue;
        }
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
      const { props, connectNulls: defaultConnectNulls, context } = this;
      const { coord, connectNulls = defaultConnectNulls, sizeZoom } = props;

      return records.map((record) => {
        const { children } = record;
        // children 有可能为空
        const { size, color, shape, y, origin } = children[0] || {};
        // 极坐标时，需加入起点，从而闭合所绘图形
        const points = coord.isPolar ? [...children, children[0]] : children;

        const sizeZoomRatio = (isFunction(sizeZoom) ? sizeZoom(origin) : sizeZoom) ?? 1;

        const splitPoints = this.splitNulls(points, connectNulls);

        const newChildren = splitPoints.map((points) => {
          const [topPoints, bottomPoints] = isArray(y)
            ? this.splitPoints(points)
            : [points, undefined];
          return {
            size: context.px2hd(size || shape.lineWidth) * sizeZoomRatio,
            color,
            shape,
            points: [].concat(topPoints),
            topPoints,
            bottomPoints,
          };
        });

        return {
          ...record,
          children: newChildren,
        };
      });
    }

    concatPoints(topPoints: Point[], bottomPoints: Point[]) {
      if (!bottomPoints || !bottomPoints.length) {
        return topPoints;
      }
      const { adjust } = this;
      // 堆叠产生的 bottomPoints 不绘制
      if (adjust && adjust.type === 'stack') {
        return topPoints;
      }

      // 说明是 y 轴对应字段为数组， 这种情况下首尾默认相连，如果想画 2 根线，在数据里对数组分拆
      const points = topPoints.concat(bottomPoints.reverse());
      points.push(topPoints[0]);

      return points;
    }

    render() {
      const { props } = this;
      const { coord } = props;
      const records = this.mapping();
      const clip = this.getClip();

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { points, bottomPoints } = child;

          child.points = this.concatPoints(points, bottomPoints);
        }
      }

      return <View {...props} coord={coord} records={records} clip={clip} />;
    }
  };
};
