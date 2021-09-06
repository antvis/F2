import { jsx } from "../../../jsx";

type TextGuideProps = {
  points?: { x: number; y: number }[] | null;
  content: string | number;
  style?: any;
  offsetX?: number;
  offsetY?: number;
};

export default (props: TextGuideProps) => {
  const { points, style, offsetX, offsetY, content } = props;
  const { x, y } = points[0] || {};
  const posX = x + (offsetX || 0);
  const posY = y + (offsetY || 0);

  return (
    <text
      attrs={{
        text: content,
        x: posX,
        y: posY,
        ...style,
      }}
    />
  );
};
