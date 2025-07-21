import { jsx, Component } from '@antv/f-engine';
import ScaleController from '../../controller/scale';
import AttrController from '../../controller/attr';
import { isNil } from '@antv/util';

export interface MagnifierProps {
  focusRange: [number, number]; // 放大镜聚焦的数据范围索引 [startIndex, endIndex]
  radius?: number | string; // 放大镜半径，支持 px
  position?: [number, number] | [string, string]; // 放大镜中心位置
  chart?: any;
  coord?: any; // 坐标系对象
  offsetX?: number | string; // 放大镜偏移量
  offsetY?: number | string; // 放大镜偏移量
  lineStyle?: {
    [key: string]: any;
  };
  frameStyle?: {
    [key: string]: any;
  };
  // 放大镜内的辅助线
  referenceLines?: Array<{
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
    static defaultProps = {
      radius: '50px',
      offsetX: 0,
      offsetY: 0,
    };

    getPositionAndRadius() {
      const { coord } = this.props;
      const { right, top } = coord;
      const { radius, position: propsPosition, offsetX, offsetY } = this.context.px2hd(this.props);

      // 计算默认 position
      const calculatedPosition = [right - radius, top + radius];
      let position = propsPosition || calculatedPosition;

      position = [position[0] + offsetX, position[1] + offsetY];

      return { position, radius };
    }

    createFocusAttrController() {
      const { chart, focusRange } = this.props;
      const { position, radius } = this.getPositionAndRadius();

      const geometries = chart?.getGeometrys();
      if (!geometries?.length) return null;
      const geometry = geometries[0];
      const { dataRecords } = geometry;

      const [start, end] = focusRange;
      // 取第一个 group 的 children 长度
      const childrenLength = dataRecords[0]?.children?.length || 0;
      const validStart = Math.max(0, Math.min(start, childrenLength - 1));
      const validEnd = Math.min(childrenLength - 1, Math.max(validStart, end));
      // 对每个 group 的 children 做 slice
      const focusDataArray = dataRecords.map((group) => ({
        ...group,
        children: group.children.slice(validStart, validEnd + 1),
      }));

      const scaleC = new ScaleController(
        dataRecords.map((group) => group.children.slice(validStart, validEnd + 1)).flat()
      );
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
        focusDataArray,
      };
    }

    mapping() {
      const { chart, referenceLines } = this.props;
      const { position, radius } = this.getPositionAndRadius();
      const { attrController, focusDataArray } = this.createFocusAttrController();

      const { linearAttrs, nonlinearAttrs } = attrController.getAttrsByLinear();
      const attrValues = attrController.getDefaultAttrValues();
      const attrs = attrController.getAttrs();

      const pointsData = focusDataArray.map((focusData) => {
        const first = focusData.children[0];

        nonlinearAttrs.forEach((attrName) => {
          const attr = attrs[attrName];
          if (!attr) return;
          attrValues[attrName] = attr.mapping(first?.[attr.field], first);
        });

        const shapeName = attrValues.shape;
        const geometries = chart?.getGeometrys();
        if (!geometries?.length) return null;

        const geometry = geometries[0];
        const shape = geometry._getShapeStyle(shapeName, focusData);

        return {
          ...attrValues,
          shape,
          children: focusData.children.map((d) => {
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

            return {
              ...d,
              normalized,
              x: px,
              y: py,
            };
          }),
        };
      });

      return {
        pointsData,
        linesData: (referenceLines || []).map((line) => {
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
        center: position,
      };
    }

    render() {
      const { radius } = this.getPositionAndRadius();
      const { pointsData, linesData, center } = this.mapping();

      return (
        <View
          {...this.props}
          pointsData={pointsData}
          radius={radius}
          linesData={linesData}
          center={center}
        />
      );
    }
  };
};

// 假设你有 parseReplaceStr 方法可用
const replaceMap = {
  min: 0,
  max: 1,
  median: 0.5,
};
