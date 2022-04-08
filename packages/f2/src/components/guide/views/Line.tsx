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

export default (props: LineGuideProps, context) => {
  const { theme = {} } = props;
  const { points, style, offsetX, offsetY, animation } = deepMix({ ...theme.line }, props);
  const { x: x1, y: y1 } = points[0] || {};
  const { x: x2, y: y2 } = points[1] || {};

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);

  const posX1 = x1 + (isArray(offsetXNum) ? offsetXNum[0] || 0 : offsetXNum || 0);
  const posY1 = y1 + (isArray(offsetYNum) ? offsetYNum[0] || 0 : offsetYNum || 0);

  const posX2 = x2 + (isArray(offsetXNum) ? offsetXNum[1] || 0 : offsetXNum || 0);
  const posY2 = y2 + (isArray(offsetYNum) ? offsetYNum[1] || 0 : offsetYNum || 0);

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
        animation={animation}
      />
    </group>
  );
};
