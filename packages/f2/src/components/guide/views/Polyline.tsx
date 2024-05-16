import { jsx, PolygonStyleProps } from '@antv/f-engine';
import { GuideProps } from '../withGuide';
import { deepMix } from '@antv/util';

export interface LineGuideProps extends GuideProps {
  points?: { x: number; y: number }[] | null;
  style?: Partial<PolygonStyleProps> | ((record?) => Partial<PolygonStyleProps>);
  offsetX?: number | string | (number | string)[];
  offsetY?: number | string | (number | string)[];
  theme?: any;
}

export default (props: LineGuideProps, context) => {
  const { theme = {} } = props;
  const { points, style, offsetX, offsetY, animation } = deepMix({ ...theme.polyline }, props);

  const checkNaN = points.some((d) => isNaN(d.x) || isNaN(d.y));
  if (checkNaN) return;

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);

  return (
    <group>
      <polyline
        style={{
          points: points.map((point) => {
            return [point.x + offsetXNum, point.y + offsetYNum];
          }),
          ...style,
        }}
        animation={animation}
      />
    </group>
  );
};
