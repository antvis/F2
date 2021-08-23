import { jsx } from "@ali/f2-jsx";

type TextGuideProps = {
  content: string | number;
  points?: { x: number; y: number }[] | null;
  // TODO: 后续补充
  attrs?: any;
  style?: any;
  offsetX?: number;
  offsetY?: number;
};

const defaultProps: TextGuideProps = {
  offsetX: 0,
  offsetY: 0,
  points: [],
  content: null,
};

const baseAttrs = {
  textBaseline: "center",
  fill: "#000",
};

export default (props: TextGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { points, style, attrs, offsetX, offsetY, content } = cfg;
  const { x, y } = points[0] || {};
  const posX = x + (offsetX || 0);
  const posY = y + (offsetY || 0);

  return (
    <group style={style}>
      <text
        attrs={{
          text: content,
          x: posX,
          y: posY,
          ...baseAttrs,
          ...attrs,
        }}
      />
    </group>
  );
};
