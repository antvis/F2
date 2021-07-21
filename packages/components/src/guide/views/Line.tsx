import { jsx } from "@ali/f2-jsx";

type LineGuideProps = {
  attrs?: any;
  style?: any;
  offsetX?: number;
  offsetY?: number;
  points?: { x: number; y: number }[] | null;
}


const defaultProps = {};

const baseAttrs = {
  stroke: "#999",
  lineDash: [0, 2, 2],
  lineWidth: "3px",
}


export default (props: LineGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { points, style, attrs, offsetX, offsetY, } = cfg;
  const { x: x1, y: y1 } = points[0] || {};
  const { x: x2, y: y2 } = points[1] || {};

  const posX1 = x1 + (offsetX || 0)
  const posX2 = x2 + (offsetX || 0)
  const posY1 = y1 + (offsetY || 0)
  const posY2 = y2 + (offsetY || 0)
  
  return (
    <group style={style}>
      <line
        attrs={{
          x1: posX1,
          x2: posX2,
          y1: posY1,
          y2: posY2,
          ...baseAttrs,
          ...attrs,
        }}
      />
    </group>
  );
};
