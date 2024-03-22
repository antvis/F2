import { jsx, AnimationProps } from '@antv/f-engine';
import { deepMix } from '@antv/util';
import Lottie from '@antv/f-lottie';
import { GuideProps } from '../withGuide';

export interface LottieGuideProps extends GuideProps {
  points?: { x: number; y: number }[] | null;
  data?: string;
  offsetX?: number | string | (string | number)[];
  offsetY?: number | string | (string | number)[];
  animation: AnimationProps | ((points?, chart?) => AnimationProps);
  options?: {
    loop: boolean | number;
    autoplay: boolean;
  };
}

const defaultProps: Omit<LottieGuideProps, 'records'> = {
  offsetX: 0,
  offsetY: 0,
  points: [],
  data: '',
  animation: null,
  options: { loop: true, autoplay: true },
};

export default (props: LottieGuideProps, context) => {
  const cfg = deepMix({}, defaultProps, props);
  const { points, style, offsetX, offsetY, lottieJson, animation, options } = cfg;
  const { x, y } = points[0] || {};
  if(isNaN(x) || isNaN(y)) return null;
  
  const { height = 0, width = 0 } = style;

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  const posX = x + (offsetXNum || 0) - width / 2;
  const posY = y + (offsetYNum || 0) - height / 2;

  return (
    <Lottie
      data={lottieJson}
      options={options}
      style={{ x: posX, y: posY, width, height }}
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
    ></Lottie>
  );
};
