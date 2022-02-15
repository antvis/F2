import { jsx } from '../../../jsx';
import { isArray, deepMix } from '@antv/util';
import { Style } from '../../../types';

type LineGuideProps = {
  points?: { x: number; y: number }[] | null;
  style?: Style;
  offsetX?: number | number[];
  offsetY?: number | number[];
  theme?: any;
};

export default (props: LineGuideProps) => {
  const { theme = {} } = props;
  const { points, style, offsetX, offsetY, animationCfg } = deepMix({ ...theme.line }, props);
  const { x: x1, y: y1 } = points[0] || {};
  const { x: x2, y: y2 } = points[1] || {};

  const posX1 = x1 + (isArray(offsetX) ? offsetX[0] || 0 : offsetX || 0);
  const posY1 = y1 + (isArray(offsetY) ? offsetY[0] || 0 : offsetY || 0);

  const posX2 = x2 + (isArray(offsetX) ? offsetX[1] || 0 : offsetX || 0);
  const posY2 = y2 + (isArray(offsetY) ? offsetY[1] || 0 : offsetY || 0);

  return (
    <group>
      <line
        attrs={{
          x1: posX1,
          y1: posY1,
          x2: posX2,
          y2: posY2,
          ...style,
        }}
        animation={animationCfg}
      />
    </group>
  );
};
