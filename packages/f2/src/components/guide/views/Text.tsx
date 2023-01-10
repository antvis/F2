import { jsx, TextStyleProps } from '@antv/f-engine';
import { deepMix } from '@antv/util';

type TextGuideProps = {
  points?: { x: number; y: number }[] | null;
  content: string | number;
  style?: TextStyleProps;
  offsetX?: number;
  offsetY?: number;
  theme?: any;
};

export default (props: TextGuideProps, context) => {
  const { theme = {} } = props;
  const { points, style, offsetX, offsetY, content, animation } = deepMix({ ...theme.text }, props);
  const { x, y } = points[0] || {};

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  const posX = x + (offsetXNum || 0);
  const posY = y + (offsetYNum || 0);

  return (
    <text
      attrs={{
        text: `${content}`,
        x: posX,
        y: posY,
        ...style,
      }}
      animation={deepMix(
        {
          update: {
            easing: 'linear',
            duration: 450,
            property: ['x', 'y'],
          },
        },
        animation
      )}
    />
  );
};
