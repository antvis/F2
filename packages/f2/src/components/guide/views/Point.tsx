import { jsx } from '../../../jsx';
import { deepMix } from "@antv/util";

type PointGuideProps = {
  style?: any;
  offsetX?: number;
  offsetY?: number;
  points?: { x: number; y: number }[] | null;
  theme?: any
};


export default (props: PointGuideProps) => {
  const { theme } = props;
  const { points, style, offsetX, offsetY } = deepMix({ ...theme.point }, props);
  const { x, y } = points[0] || {};

  const posX = x + (offsetX || 0);
  const posY = y + (offsetY || 0);

  return (
    <group >
      <circle
        attrs={{
          x: posX,
          y: posY,
          ...style
        }}
      />
    </group>
  );
};
