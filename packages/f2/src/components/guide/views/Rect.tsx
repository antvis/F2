import { jsx, RectStyleProps } from '@antv/f-engine';
import { deepMix } from '@antv/util';

type RectGuideProps = {
  points?: { x: number; y: number }[] | null;
  style?: RectStyleProps;
  theme?: any;
};

export default (props: RectGuideProps) => {
  const { theme = {} } = props;
  const { points, style, animation } = deepMix({ ...theme.rect }, props);

  const start = points[0] || {};
  const end = points[1] || {};

  return (
    <group>
      <rect
        style={{
          x: Math.min(start.x, end.x),
          y: Math.min(start.y, end.y),
          width: Math.abs(end.x - start.x),
          height: Math.abs(start.y - end.y),
          ...style,
        }}
        animation={animation}
      />
    </group>
  );
};
