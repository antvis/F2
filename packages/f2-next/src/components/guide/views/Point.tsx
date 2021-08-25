import { jsx } from "@jsx";

type PointGuideProps = {
  size?: number;
  color?: string;
  // padding?: number | string;
  attrs?: any;
  style?: any;
  offsetX?: number;
  offsetY?: number;
  points?: { x: number; y: number }[] | null;
};

const defaultProps: PointGuideProps = {
  size: 20,
  color: "#1890FF",
};

const baseAttrs = {
  stroke: "#fff",
  lineWidth: "2px",
};

export default (props: PointGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { points, style, attrs, offsetX, offsetY, size, color } = cfg;
  const { x, y } = points[0] || {};

  const posX = x + (offsetX || 0);
  const posY = y + (offsetY || 0);

  return (
    <group style={style}>
      <circle
        attrs={{
          x: posX,
          y: posY,
          r: size / 2 + 'px',
          fill: color,
          ...baseAttrs,
          ...attrs,
        }}
      />
    </group>
  );
};
