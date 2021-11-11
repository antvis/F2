import { jsx } from '../../../jsx';
import { deepMix } from '@antv/util';

type TextGuideProps = {
  points?: { x: number; y: number }[] | null;
  content: string | number;
  style?: any;
  offsetX?: number;
  offsetY?: number;
  theme?: any;
};

export default (props: TextGuideProps) => {
  const { theme = {} } = props;
  const { points, style, offsetX, offsetY, content, animation } = deepMix(
    { ...theme.text },
    props
  );
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
      animation={deepMix({
        update: {
          easing: 'linear',
          duration: 450,
          property: ['x', 'y'],
        },
      }, animation)}
    />
  );
};
