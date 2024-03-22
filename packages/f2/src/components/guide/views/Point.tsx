import { jsx, CircleStyleProps } from '@antv/f-engine';
import { deepMix } from '@antv/util';
import { GuideProps } from '../withGuide';

export interface PointGuideProps extends GuideProps {
  style?: Partial<CircleStyleProps> | ((record?) => Partial<CircleStyleProps>);
  offsetX?: number | string;
  offsetY?: number | string;
  points?: { x: number; y: number }[] | null;
  theme?: any;
}

export default (props: PointGuideProps, context) => {
  const { theme } = props;
  const { points, style, offsetX, offsetY, animation } = deepMix({ ...theme.point }, props);
  const { x, y } = points[0] || {};
  if(isNaN(x) || isNaN(y)) return null;
  
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
