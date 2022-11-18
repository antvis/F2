import { jsx } from '../../../jsx';
import { Style } from '../../../types';
import { deepMix } from '@antv/util';

type ImageGuideProps = {
  src: string;
  points?: { x: number; y: number }[] | null;
  attrs?: any;
  style?: Style;
  offsetX?: number;
  offsetY?: number;
};

const defaultProps: ImageGuideProps = {
  offsetX: 0,
  offsetY: 0,
  points: [],
  src: '',
};
const baseAttrs = {
  height: '20px',
  width: '20px',
};

export default (props: ImageGuideProps, context) => {
  const cfg = deepMix({}, defaultProps, props);
  const { points, style, attrs, offsetX, offsetY, src, animation } = cfg;
  const { x, y } = points[0] || {};
  const { height = 0, width = 0 } = attrs;
  const heightNum = context.px2hd(height + 'px');
  const widthNum = context.px2hd(width + 'px');

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  const posX = x + (offsetXNum || 0) - widthNum / 2;
  const posY = y + (offsetYNum || 0) - heightNum / 2;

  return (
    <group style={style}>
      <image
        attrs={{
          ...baseAttrs,
          ...attrs,
          height: heightNum,
          width: widthNum,
          x: posX,
          y: posY,
          src,
        }}
        cacheImage
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
    </group>
  );
};
