import { jsx, Component } from '@antv/f-engine';
import ScaleController from '../../controller/scale';
import AttrController from '../../controller/attr';
import { isNil } from '@antv/util';

export interface MagnifierProps {
  focusX: number; // 放大镜当前聚焦点索引
  windowSize: number; // 放大镜窗口对应的数据宽度，比如 10
  radius?: number | string; // 放大镜半径，支持 px
  position?: [number, number] | [string, string]; // 放大镜中心位置
  chart?: any;
  style?: {
    [key: string]: any;
  };
  // 放大镜内的辅助线
  lines?: Array<{
    records: any;
    style?: {
      stroke?: string;
      lineWidth?: number;
      lineDash?: number[];
    };
  }>;
}

export default (View) => {
  return class Magnifier extends Component<MagnifierProps> {
    createFocusAttrController() {
      const { chart, focusX, windowSize } = this.props;
      const { position, radius } = this.context.px2hd(this.props);
      const geometries = chart?.getGeometrys();
      if (!geometries?.length) return null;
      const geometry = geometries[0];
      const { attrController } = geometry;
      const { scaleController } = attrController;
      const { data } = scaleController;

      const half = Math.floor(windowSize / 2);
      const start = Math.max(0, focusX - half);
      const end = Math.min(data.length, focusX + half + 1);
      const focusData = data.slice(start, end);

      const scaleC = new ScaleController(focusData);
      const attrsRange = {
        ...geometry._getThemeAttrsRange(),
        x: [position[0] - radius, position[0] + radius],
        y: [position[1] - radius, position[1] + radius],
      };

      const attrControllerNew = new AttrController(scaleC, attrsRange);

      const attrOptions = geometry.attrController.options;
      attrControllerNew.create(attrOptions);
      attrControllerNew.getAttrs();

      return {
        attrController: attrControllerNew,
        focusData,
      };
    }

    mapping() {
      const { chart, lines } = this.props;
      const { position, radius } = this.context.px2hd(this.props);
      const { attrController, focusData } = this.createFocusAttrController();

      const { linearAttrs, nonlinearAttrs } = attrController.getAttrsByLinear();
      const attrValues = attrController.getDefaultAttrValues();
      const attrs = attrController.getAttrs();

      // 非线性属性只映射第一个数据
      const first = focusData[0];

      nonlinearAttrs.forEach((attrName) => {
        const attr = attrs[attrName];
        if (!attr) return;
        attrValues[attrName] = attr.mapping(first?.[attr.field], first);
      });

      const shapeName = attrValues.shape;
      const geometries = chart?.getGeometrys();
      if (!geometries?.length) return null;

      const geometry = geometries[0];

      return {
        pointsData: focusData.map((d) => {
          const normalized = { x: 0, y: 0 };
          linearAttrs.forEach((attrName) => {
            const attr = attrs[attrName];
            if (!attr) return;
            const value = d[attr.field];
            // 分组属性直接映射，否则归一化
            if (attrController.isGroupAttr && attrController.isGroupAttr(attrName)) {
              normalized[attrName] = attr.mapping(value, d);
            } else {
              normalized[attrName] = attr.normalize(value);
            }
          });

          const nx = (normalized.x - 0.5) * 2;
          const ny = (normalized.y - 0.5) * 2;

          const length = Math.sqrt(nx * nx + ny * ny);
          const rx = length > 1 ? nx / length : nx;
          const ry = length > 1 ? ny / length : ny;

          const [cx, cy] = position;
          const r = radius;
          const px = cx + rx * r;
          const py = cy - ry * r;

          const shape = geometry._getShapeStyle(shapeName, d);

          return {
            ...d,
            ...attrValues,
            shape,
            normalized,
            x: px,
            y: py,
          };
        }),

        linesData: (lines || []).map((line) => {
          const { records, style } = line;
          const points = (records || []).map((record) => {
            const normalized = { x: 0, y: 0 };
            linearAttrs.forEach((attrName) => {
              const attr = attrs[attrName];
              if (!attr) return;
              const value = record[attr.field];

              if (!isNil(replaceMap[value])) {
                normalized[attrName] = replaceMap[value];
              } else {
                normalized[attrName] = attr.normalize(value);
              }
            });

            // 直接线性插值，不做极坐标变换
            const [cx, cy] = position;
            const r = radius;
            const px = cx - r + normalized.x * 2 * r;
            const py = cy + r - normalized.y * 2 * r;

            return {
              ...record,
              x: px,
              y: py,
            };
          });

          return {
            ...line,
            points,
            style,
          };
        }),
      };
    }

    render() {
      const { radius } = this.context.px2hd(this.props);
      const { pointsData, linesData } = this.mapping();
      return <View {...this.props} pointsData={pointsData} radius={radius} linesData={linesData} />;
    }
  };
};

// 假设你有 parseReplaceStr 方法可用
const replaceMap = {
  min: 0,
  max: 1,
  median: 0.5,
};
