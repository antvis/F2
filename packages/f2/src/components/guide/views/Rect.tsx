import { jsx, RectStyleProps } from '@antv/f-engine';
import { deepMix } from '@antv/util';
import { GuideProps } from '../withGuide';

export interface RectGuideProps extends GuideProps {
  points?: { x: number; y: number }[] | null;
  style?: Partial<RectStyleProps> | ((record?) => Partial<RectStyleProps>);
  theme?: any;
}

export default (props: RectGuideProps, context) => {
  const { theme = {} } = props;
  const { points, style, animation, offsetX, offsetY } = deepMix({ ...theme.rect }, props);
  const checkNaN = points.some((d) => isNaN(d.x) || isNaN(d.y));
  if (checkNaN) return null;

  const start = points[0] || {};
  const end = points[1] || {};

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  const posX = Math.min(start.x, end.x) + (offsetXNum || 0);
  const posY = Math.min(start.y, end.y) + (offsetYNum || 0);

  return (
    <group>
      <rect
        style={{
          x: posX,
          y: posY,
          width: Math.abs(end.x - start.x),
          height: Math.abs(start.y - end.y),
          ...style,
        }}
        animation={animation}
      />
    </group>
  );
};
