import { jsx } from "@jsx";
import { isArray } from "@antv/util";

type LineGuideProps = {
  attrs?: any;
  style?: any;
  offsetX?: number | number[];
  offsetY?: number | number[];
  points?: { x: number; y: number }[] | null;
};

const defaultProps = {};

const baseAttrs = {
  stroke: "#999",
  lineDash: [0, "2px", "2px"],
  lineWidth: "3px",
};

export default (props: LineGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { points, style, attrs, offsetX, offsetY } = cfg;
  const { x: x1, y: y1 } = points[0] || {};
  const { x: x2, y: y2 } = points[1] || {};

  const posX1 = x1 + (isArray(offsetX) ? offsetX[0] || 0 : offsetX || 0);
  const posY1 = y1 + (isArray(offsetY) ? offsetY[0] || 0 : offsetY || 0);

  const posX2 = x2 + (isArray(offsetX) ? offsetX[1] || 0 : offsetX || 0);
  const posY2 = y2 + (isArray(offsetY) ? offsetY[1] || 0 : offsetY || 0);

  return (
    <group style={style}>
      <line
        attrs={{
          x1: posX1,
          y1: posY1,
          x2: posX2,
          y2: posY2,
          ...baseAttrs,
          ...attrs,
        }}
      />
    </group>
  );
};
