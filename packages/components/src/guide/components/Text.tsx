import { jsx } from "@ali/f2-jsx";

type TextGuideProps = {
  content: string | number;
  offsetX?: number;
  offsetY?: number;
  point?: { x: number; y: number } | null;
  // TODO: 后续补充
  attrs?: any;
  style?: any;
};

const defaultProps: TextGuideProps = {
  offsetX: 0,
  offsetY: 0,
  point: null,
  content: null,
};

export default (props: TextGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { point, style, attrs, offsetX, offsetY, content } = cfg;
  const baseAttrs = {
    textBaseline: "center",
    fill: "#000",
  };
  const { x, y } = point || {};
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
