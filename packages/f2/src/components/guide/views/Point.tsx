import { jsx, CircleStyleProps } from '@antv/f-engine';
import { deepMix } from '@antv/util';

type PointGuideProps = {
  style?: CircleStyleProps;
  offsetX?: number;
  offsetY?: number;
  points?: { x: number; y: number }[] | null;
  theme?: any;
};

export default (props: PointGuideProps, context) => {
  const { theme } = props;
  const { points, style, offsetX, offsetY, animation } = deepMix({ ...theme.point }, props);
  const { x, y } = points[0] || {};

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  const posX = x + (offsetXNum || 0);
  const posY = y + (offsetYNum || 0);

  return (
    <group>
      <circle
        style={{
          cx: posX,
          cy: posY,
          ...style,
        }}
        animation={animation}
      />
    </group>
  );
};
