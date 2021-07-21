import { jsx } from "@ali/f2-jsx";

type ImageGuideProps = {
  src: string;
  points?: { x: number; y: number }[] | null;
  // TODO: 后续补充
  attrs?: any;
  style?: any;
  offsetX?: number;
  offsetY?: number;
};

const defaultProps: ImageGuideProps = {
  offsetX: 0,
  offsetY: 0,
  points: [],
  src: "",
};
const baseAttrs = {
  height: 10,
  width: 10,
};

export default (props: ImageGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { points, style, attrs, offsetX, offsetY, src } = cfg;
  const { x, y } = points[0] || {};
  const { height = 0, width = 0 } = attrs;
  const posX = x + (offsetX || 0) - height / 2;
  const posY = y + (offsetY || 0) - width / 2;

  return (
    <group style={style}>
      <image
        attrs={{
          ...baseAttrs,
          ...attrs,
          x: posX,
          y: posY,
          src,
        }}
      />
    </group>
  );
};
