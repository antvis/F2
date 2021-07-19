import { jsx } from "@ali/f2-jsx";

type ImageGuideProps = {
  src: string;
  offsetX?: number;
  offsetY?: number;
  point?: { x: number; y: number } | null;
  // TODO: 后续补充
  attrs?: any;
  style?: any;
};

const defaultProps: ImageGuideProps = {
  offsetX: 0,
  offsetY: 0,
  point: null,
  src: "",
};

export default (props: ImageGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { point, style, attrs, offsetX, offsetY, src } = cfg;
  const baseAttrs = {
    textBaseline: "center",
    fill: "#000",
  };
  const { x, y } = point || {};
  const { height = 0, width = 0 } = attrs;
  const posX = x + (offsetX || 0) - height / 2;
  const posY = y + (offsetY || 0) - width / 2;

  return (
    <group style={style}>
      <image
        attrs={{
          ...attrs,
          ...baseAttrs,
          x: posX,
          y: posY,
          src,
        }}
      />
    </group>
  );
};
