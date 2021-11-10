import { jsx } from '../../../jsx';

type ImageGuideProps = {
  src: string;
  points?: { x: number; y: number }[] | null;
  attrs?: any;
  style?: any;
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

export default (props: ImageGuideProps) => {
  const cfg = { ...defaultProps, ...props };
  const { points, style, attrs, offsetX, offsetY, src } = cfg;
  const { x, y } = points[0] || {};
  const { height = 0, width = 0 } = attrs;
  const posX = x + (offsetX || 0) - height / 2;
  const posY = y + (offsetY || 0) - width / 2;

  return (
    <group style={style}>
      <image
        attrs={{
          ...baseAttrs,
          ...attrs,
          height: height + 'px',
          width: width + 'px',
          x: posX,
          y: posY,
          src,
        }}
        animation={{
          update: {
            easing: 'linear',
            duration: 450,
            property: ['x', 'y'],
          },
        }}
      />
    </group>
  );
};
